import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

/* ════════════════════════════════════════════════════════════════════════
   update-app-setting
   - app_settings(환율/마크업)를 service_role 로 안전하게 변경한다.
   - anon 은 RLS 로 쓰기가 막혀 있으므로 이 Edge Function 을 경유한다.
   - 입력: { key, value, adminPassword }
   - 검증 순서: key 화이트리스트 → 비밀번호 → 값 범위/숫자
   ════════════════════════════════════════════════════════════════════════ */

// ── CORS: instarhotel.com 도메인만 허용 ──
const ALLOWED_ORIGINS = [
  'https://instarhotel.com',
  'https://www.instarhotel.com',
];

function corsHeaders(origin: string | null) {
  // 허용 목록에 있으면 해당 Origin 을 그대로 echo, 아니면 대표 도메인으로 고정
  const allow = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

// ── 허용 키 화이트리스트 + 값 범위 ──
const LIMITS: Record<string, { min: number; max: number }> = {
  usd_rate:   { min: 500, max: 3000 },
  usd_markup: { min: 1.0, max: 2.0 },
};

serve(async (req) => {
  const origin = req.headers.get('Origin');

  // CORS preflight
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(origin) });
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405, origin);

  /* ── 1. 요청 파싱 ── */
  let key: string, value: number, adminPassword: string;
  try {
    const body = await req.json();
    key           = String(body.key ?? '');
    value         = Number(body.value);
    adminPassword = String(body.adminPassword ?? '');
  } catch {
    return json({ ok: false, error: '잘못된 요청' }, 400, origin);
  }

  /* ── 2. key 화이트리스트 (임의 설정 조작 차단) ── */
  if (!Object.prototype.hasOwnProperty.call(LIMITS, key)) {
    return json({ ok: false, error: '허용되지 않은 설정 키입니다.' }, 400, origin);
  }

  /* ── 환경변수 로드 ── */
  const ADMIN_PASSWORD = Deno.env.get('ADMIN_PASSWORD');
  const SUPABASE_URL   = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY    = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!ADMIN_PASSWORD || !SUPABASE_URL || !SERVICE_KEY) {
    console.error('[update-app-setting] 환경변수 미설정');
    return json({ ok: false, error: '서버 설정 오류' }, 500, origin);
  }

  /* ── 3. 비밀번호 검증 (어떤 값이 틀렸는지 노출하지 않음) ── */
  if (!adminPassword || adminPassword !== ADMIN_PASSWORD) {
    return json({ ok: false, error: '인증에 실패했습니다.' }, 401, origin);
  }

  /* ── 4. 값 범위/숫자 검증 (오입력·악용 방지) ── */
  const lim = LIMITS[key];
  if (!Number.isFinite(value) || value < lim.min || value > lim.max) {
    return json({ ok: false, error: '허용 범위를 벗어난 값입니다.' }, 400, origin);
  }

  /* ── 5. service_role 로 app_settings UPDATE ── */
  let patchRes: Response;
  try {
    patchRes = await fetch(
      `${SUPABASE_URL}/rest/v1/app_settings?key=eq.${encodeURIComponent(key)}`,
      {
        method: 'PATCH',
        headers: {
          'apikey':        SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Content-Type':  'application/json',
          'Prefer':        'return=representation',
        },
        body: JSON.stringify({ value, updated_at: new Date().toISOString() }),
      },
    );
  } catch (err) {
    console.error('[update-app-setting] DB 연결 실패:', err);
    return json({ ok: false, error: '설정 저장 실패' }, 502, origin);
  }

  if (!patchRes.ok) {
    // 내부 에러 본문/스택은 로그로만 남기고 응답에는 노출하지 않는다
    console.error('[update-app-setting] DB 업데이트 실패:', await patchRes.text());
    return json({ ok: false, error: '설정 저장 실패' }, 500, origin);
  }

  const rows = await patchRes.json();
  if (!Array.isArray(rows) || rows.length === 0) {
    return json({ ok: false, error: '대상 설정을 찾을 수 없습니다.' }, 404, origin);
  }

  /* ── 6. 성공: 갱신된 row 반환 ── */
  return json({ ok: true, setting: rows[0] }, 200, origin);
});
