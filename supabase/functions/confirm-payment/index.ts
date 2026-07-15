import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS });
  }

  if (req.method !== 'POST') {
    return json({ ok: false, error: 'Method not allowed' }, 405);
  }

  /* ── 1. 요청 파싱 ── */
  let paymentKey: string, orderId: string, amount: number;
  try {
    const body = await req.json();
    paymentKey = body.paymentKey;
    orderId    = body.orderId;
    amount     = Number(body.amount);
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  if (!paymentKey || !orderId || !amount) {
    return json({ ok: false, error: 'paymentKey, orderId, amount 는 필수입니다.' }, 400);
  }

  /* ── 2. 환경변수에서 시크릿 키 로드 ── */
  const secretKey = Deno.env.get('TOSS_SECRET_KEY');
  if (!secretKey) {
    console.error('[confirm-payment] TOSS_SECRET_KEY 환경변수 미설정');
    return json({ ok: false, error: '서버 설정 오류' }, 500);
  }

  /* ── 3. Toss /v1/payments/confirm 호출 ── */
  // Toss Basic Auth: base64(secretKey + ":")
  const encoded = btoa(secretKey + ':');

  let tossRes: Response;
  try {
    tossRes = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encoded}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });
  } catch (err) {
    console.error('[confirm-payment] Toss API 네트워크 오류:', err);
    return json({ ok: false, error: 'Toss API 연결 실패' }, 502);
  }

  const tossData = await tossRes.json();

  /* ── 4. Toss 승인 실패 처리 ── */
  if (!tossRes.ok) {
    console.warn('[confirm-payment] Toss 승인 거절:', tossData);
    return json({
      ok: false,
      error: tossData.message || '결제 승인 실패',
      code:  tossData.code,
    }, 400);
  }

  /* ── 5. 금액 위변조 검증 ── */
  if (tossData.totalAmount !== amount) {
    console.error(
      `[confirm-payment] 금액 불일치 — 클라이언트: ${amount}, Toss: ${tossData.totalAmount}`,
    );
    return json({ ok: false, error: '결제 금액 불일치 — 승인 거절' }, 400);
  }

  /* ── 6. 성공 ── */
  return json({
    ok:          true,
    paymentKey:  tossData.paymentKey,
    orderId:     tossData.orderId,
    totalAmount: tossData.totalAmount,
    method:      tossData.method,
    approvedAt:  tossData.approvedAt,
  });
});
