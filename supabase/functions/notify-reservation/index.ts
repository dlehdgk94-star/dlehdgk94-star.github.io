import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

/* ══════════════════════════════════════════════════════════
   설정 상수 — 실제 번호로 교체 후 사용
══════════════════════════════════════════════════════════ */
const STAFF_PHONES: string[] = [
  '01000000000',
  '01000000000',
  '01000000000',
  '01000000000',
  '01000000000',
];

const FROM_NUMBER = '01000000000'; // 솔라피에 사전 등록된 발신번호

/* ══════════════════════════════════════════════════════════
   국가 코드 → 한국어 매핑
══════════════════════════════════════════════════════════ */
const COUNTRIES: Record<string, string> = {
  KR: '대한민국', US: '미국',   JP: '일본',   CN: '중국',   GB: '영국',
  FR: '프랑스',   DE: '독일',   AU: '호주',   CA: '캐나다', SG: '싱가포르',
  TH: '태국',     VN: '베트남', PH: '필리핀', MY: '말레이시아',
  ID: '인도네시아', IN: '인도', OTHER: '기타',
};

/* ══════════════════════════════════════════════════════════
   솔라피 HMAC-SHA256 서명 생성
   서명 대상: date + salt
══════════════════════════════════════════════════════════ */
async function buildAuthHeader(apiKey: string, apiSecret: string): Promise<string> {
  const date = new Date().toISOString();
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(apiSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sigBuf = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(date + salt),
  );
  const signature = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

/* ══════════════════════════════════════════════════════════
   LMS 문자 내용 조립
══════════════════════════════════════════════════════════ */
function buildMessage(r: Record<string, unknown>): string {
  const country =
    COUNTRIES[r.guest_country as string] || r.guest_country || '-';

  const rawPhone = String(r.guest_phone ?? '');
  const phone = rawPhone
    ? rawPhone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
    : '-';

  const price = r.total_price != null
    ? Number(r.total_price).toLocaleString('ko-KR') + '원'
    : '-';

  const specialReq =
    r.special_request && String(r.special_request).trim()
      ? String(r.special_request).trim()
      : '없음';

  const lines = [
    '[INSTA HOTEL] 새 예약 알림',
    '─────────────────',
    `예약번호: ${r.order_id ?? '-'}`,
    `객실: ${r.room_name ?? '-'}`,
    `체크인: ${r.checkin_date ?? '-'}`,
    `체크아웃: ${r.checkout_date ?? '-'}`,
    `숙박: ${r.nights ? r.nights + '박' : '-'}`,
    '─────────────────',
    `예약자: ${r.guest_name ?? '-'}`,
    `연락처: ${phone}`,
    `국가: ${country}`,
    `특별요청: ${specialReq}`,
    '─────────────────',
    `결제금액: ${price}`,
  ];
  return lines.join('\n');
}

/* ══════════════════════════════════════════════════════════
   단일 수신자에게 LMS 발송
   실패 시 throw — 호출부에서 Promise.allSettled로 처리
══════════════════════════════════════════════════════════ */
async function sendLms(
  to: string,
  text: string,
  apiKey: string,
  apiSecret: string,
): Promise<void> {
  const auth = await buildAuthHeader(apiKey, apiSecret);
  const res = await fetch('https://api.solapi.com/messages/v4/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
    },
    body: JSON.stringify({
      message: { to, from: FROM_NUMBER, text, type: 'LMS' },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body}`);
  }
}

/* ══════════════════════════════════════════════════════════
   메인 핸들러 — Supabase Database Webhook 수신
══════════════════════════════════════════════════════════ */
serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  /* Webhook payload 파싱 */
  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  /* Database Webhook 구조: { type, table, schema, record, old_record } */
  const record = payload.record as Record<string, unknown> | undefined;
  if (!record) {
    console.warn('[notify-reservation] record 필드 없음 — 종료');
    return new Response(
      JSON.stringify({ ok: false, reason: 'no record' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  /* paid가 아닌 경우(overbooked 등)는 발송하지 않음 */
  if (record.payment_status !== 'paid') {
    console.log(
      `[notify-reservation] payment_status="${record.payment_status}" — 발송 skip`,
    );
    return new Response(
      JSON.stringify({ ok: true, reason: 'skipped', payment_status: record.payment_status }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  }

  /* 환경변수 확인 */
  const apiKey    = Deno.env.get('SOLAPI_API_KEY');
  const apiSecret = Deno.env.get('SOLAPI_API_SECRET');
  if (!apiKey || !apiSecret) {
    console.error('[notify-reservation] SOLAPI_API_KEY 또는 SOLAPI_API_SECRET 미설정');
    return new Response(
      JSON.stringify({ ok: false, error: 'Solapi secrets not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }

  /* 문자 내용 조립 */
  const text = buildMessage(record);
  console.log('[notify-reservation] 발송 대상 수:', STAFF_PHONES.length);
  console.log('[notify-reservation] 문자 내용:\n' + text);

  /* 5명 병렬 발송 — 일부 실패해도 나머지 계속 진행 */
  const results = await Promise.allSettled(
    STAFF_PHONES.map((phone) => sendLms(phone, text, apiKey, apiSecret)),
  );

  let successCount = 0;
  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      successCount++;
      console.log(`[notify-reservation] ✓ ${STAFF_PHONES[i]} 발송 성공`);
    } else {
      console.error(
        `[notify-reservation] ✗ ${STAFF_PHONES[i]} 발송 실패:`,
        result.reason,
      );
    }
  });

  console.log(
    `[notify-reservation] 완료 — 성공 ${successCount}/${STAFF_PHONES.length}`,
  );

  return new Response(
    JSON.stringify({ ok: true, sent: successCount, total: STAFF_PHONES.length }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
});
