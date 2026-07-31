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

function localDateStr(d: Date): string {
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);

  /* ── 1. 요청 파싱 ── */
  let orderId: string, cancelAmount: number, cancelReason: string;
  try {
    const body = await req.json();
    orderId      = String(body.orderId      ?? '');
    cancelAmount = Number(body.cancelAmount ?? 0);
    cancelReason = String(body.cancelReason ?? '관리자 취소');
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  if (!orderId || !cancelAmount) {
    return json({ ok: false, error: 'orderId, cancelAmount는 필수입니다.' }, 400);
  }

  /* ── 환경변수 ── */
  const SUPABASE_URL  = Deno.env.get('SUPABASE_URL');
  const SERVICE_KEY   = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!SUPABASE_URL || !SERVICE_KEY) {
    console.error('[cancel-reservation] Supabase 환경변수 미설정');
    return json({ ok: false, error: '서버 설정 오류 (Supabase)' }, 500);
  }
  // Toss 시크릿 키는 통화(payment_provider) 확정 후 선택한다(STEP1 아래).

  const sbHeaders = {
    'apikey':        SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Type':  'application/json',
  };

  /* ════════════════════════════════════════
     STEP 1 — 예약 조회 및 사전 검증
  ════════════════════════════════════════ */
  console.log(`[cancel-reservation] STEP1 예약 조회: orderId=${orderId}`);

  const resRes = await fetch(
    `${SUPABASE_URL}/rest/v1/reservations?order_id=eq.${encodeURIComponent(orderId)}&select=*`,
    { headers: sbHeaders },
  );
  if (!resRes.ok) {
    const err = await resRes.text();
    console.error('[cancel-reservation] 예약 조회 실패:', err);
    return json({ ok: false, error: '예약 조회 중 오류가 발생했습니다.' }, 500);
  }

  const reservations = await resRes.json() as Record<string, unknown>[];
  if (!reservations || reservations.length === 0) {
    return json({ ok: false, error: '예약을 찾을 수 없습니다.' }, 404);
  }

  const r = reservations[0];
  console.log(`[cancel-reservation] 예약 확인: payment_status=${r.payment_status}`);

  if (r.payment_status === 'cancelled') {
    return json({ ok: false, error: '이미 취소된 예약입니다.' }, 400);
  }
  if (r.payment_status !== 'paid') {
    return json({ ok: false, error: `취소할 수 없는 상태입니다: ${r.payment_status}` }, 400);
  }
  if (!r.payment_key) {
    return json({ ok: false, error: 'payment_key가 없습니다. 수동으로 처리해 주세요.' }, 400);
  }

  /* ── 통화 분기: payment_provider 기준 (기존 원화 예약은 'toss_krw' → 기존 동작 유지) ── */
  const isUsd = r.payment_provider === 'toss_paypal';
  const TOSS_SECRET = isUsd
    ? Deno.env.get('TOSS_WIDGET_SECRET_KEY')
    : Deno.env.get('TOSS_SECRET_KEY');
  if (!TOSS_SECRET) {
    console.error(`[cancel-reservation] ${isUsd ? 'TOSS_WIDGET_SECRET_KEY' : 'TOSS_SECRET_KEY'} 미설정`);
    return json({ ok: false, error: '서버 설정 오류 (Toss)' }, 500);
  }

  // 취소 상한 검증 — USD 는 paid_amount(USD) 기준(원화 재환산 금지), 원화는 total_price 기준
  if (isUsd) {
    // USD 소수점 오차 대비 — === 금지, 허용오차 비교
    if (cancelAmount - Number(r.paid_amount) > 0.01) {
      return json({
        ok: false,
        error: `환불 금액($${cancelAmount.toFixed(2)})이 결제 금액($${Number(r.paid_amount).toFixed(2)})을 초과합니다.`,
      }, 400);
    }
  } else {
    if (cancelAmount > Number(r.total_price)) {
      return json({
        ok: false,
        error: `환불 금액(${cancelAmount.toLocaleString()}원)이 결제 금액(${Number(r.total_price).toLocaleString()}원)을 초과합니다.`,
      }, 400);
    }
  }

  /* ════════════════════════════════════════
     STEP 2 — Toss 결제 취소 API 호출
     (실패 시 DB를 절대 변경하지 않음)
  ════════════════════════════════════════ */
  const encoded = btoa(TOSS_SECRET + ':');
  // 취소 요청 본문 — USD 부분 취소는 currency:"USD" 필수, 전체 취소는 기존과 동일(currency 불필요)
  const cancelBody: Record<string, unknown> = { cancelReason, cancelAmount };
  if (isUsd && Math.abs(cancelAmount - Number(r.paid_amount)) >= 0.01) {
    cancelBody.currency = 'USD';
  }
  console.log(`[cancel-reservation] STEP2 Toss 취소 요청: paymentKey=${r.payment_key}, amount=${cancelAmount}, provider=${r.payment_provider}, currency=${cancelBody.currency ?? '(full)'}`);

  let tossRes: Response;
  try {
    tossRes = await fetch(
      `https://api.tosspayments.com/v1/payments/${r.payment_key}/cancel`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${encoded}`,
          'Content-Type':  'application/json',
        },
        body: JSON.stringify(cancelBody),
      },
    );
  } catch (err) {
    console.error('[cancel-reservation] Toss API 네트워크 오류:', err);
    return json({ ok: false, error: 'Toss API 연결 실패 — DB는 변경되지 않았습니다.' }, 502);
  }

  const tossData = await tossRes.json();
  if (!tossRes.ok) {
    console.warn('[cancel-reservation] Toss 취소 거절:', tossData);
    return json({
      ok:    false,
      error: tossData.message || 'Toss 결제 취소 실패 — DB는 변경되지 않았습니다.',
      code:  tossData.code,
    }, 400);
  }

  console.log('[cancel-reservation] STEP2 Toss 취소 성공 ✓');

  /* ════════════════════════════════════════
     STEP 3 — reservations.payment_status = 'cancelled'
     (Toss 취소 성공 후에만 실행)
  ════════════════════════════════════════ */
  console.log('[cancel-reservation] STEP3 payment_status → cancelled');

  const updateRes = await fetch(
    `${SUPABASE_URL}/rest/v1/reservations?order_id=eq.${encodeURIComponent(orderId)}`,
    {
      method:  'PATCH',
      headers: { ...sbHeaders, 'Prefer': 'return=minimal' },
      body:    JSON.stringify({ payment_status: 'cancelled' }),
    },
  );

  if (!updateRes.ok) {
    const updateErr = await updateRes.text();
    console.error('[cancel-reservation] payment_status 업데이트 실패:', updateErr);
    // Toss 취소는 완료됐으므로 치명적 경고 반환 (수동 DB 수정 필요)
    return json({
      ok:    false,
      error: 'Toss 취소는 완료됐지만 DB 상태 업데이트에 실패했습니다. 수동으로 payment_status를 cancelled로 변경해 주세요.',
    }, 500);
  }

  console.log('[cancel-reservation] STEP3 payment_status 업데이트 완료 ✓');

  /* ════════════════════════════════════════
     STEP 4 — room_inventory 재고 복원
     booking-success.html 차감 로직의 정확한 역순:
     체크인 포함, 체크아웃 전날까지 nights 횟수 순회
  ════════════════════════════════════════ */
  const failedDates: string[] = [];
  const { room_id, checkin_date, nights, room_count } = r;

  if (room_id && checkin_date && nights && room_count) {
    console.log(`[cancel-reservation] STEP4 재고 복원: ${nights}박, room_count=${room_count}`);

    for (let i = 0; i < Number(nights); i++) {
      const d = new Date(String(checkin_date) + 'T00:00:00');
      d.setDate(d.getDate() + i);
      const dateStr = localDateStr(d);

      /* 현재 stock 조회 */
      const invRes = await fetch(
        `${SUPABASE_URL}/rest/v1/room_inventory?room_id=eq.${room_id}&date=eq.${dateStr}&select=stock`,
        { headers: sbHeaders },
      );

      if (!invRes.ok) {
        console.error(`[cancel-reservation] 재고 조회 실패: ${dateStr}`);
        failedDates.push(dateStr);
        continue;
      }

      const invRows = await invRes.json() as { stock: number }[];
      if (!invRows || invRows.length === 0) {
        /* 해당 날짜 행 자체가 없으면 복원 불필요 (미설정 상태) */
        console.warn(`[cancel-reservation] room_inventory 행 없음: ${dateStr} — skip`);
        continue;
      }

      const currentStock = invRows[0].stock;
      const newStock     = currentStock + Number(room_count);

      const patchRes = await fetch(
        `${SUPABASE_URL}/rest/v1/room_inventory?room_id=eq.${room_id}&date=eq.${dateStr}`,
        {
          method:  'PATCH',
          headers: { ...sbHeaders, 'Prefer': 'return=minimal' },
          body:    JSON.stringify({ stock: newStock }),
        },
      );

      if (!patchRes.ok) {
        const patchErr = await patchRes.text();
        console.error(`[cancel-reservation] 재고 복원 실패 ${dateStr}:`, patchErr);
        failedDates.push(dateStr);
      } else {
        console.log(`[cancel-reservation] ✓ 재고 복원: ${dateStr} stock ${currentStock} → ${newStock}`);
      }
    }

    console.log(
      `[cancel-reservation] STEP4 재고 복원 완료 — 실패 날짜: ${failedDates.length === 0 ? '없음' : failedDates.join(', ')}`,
    );
  } else {
    console.warn('[cancel-reservation] STEP4 재고 복원 정보 부족 — skip');
  }

  /* ════════════════════════════════════════
     응답
  ════════════════════════════════════════ */
  return json({
    ok:                   true,
    orderId,
    cancelAmount,
    failedInventoryDates: failedDates,
    message:              failedDates.length > 0
      ? `취소 완료. 일부 날짜 재고 복원 실패 (수동 확인 필요): ${failedDates.join(', ')}`
      : '취소 및 재고 복원이 완료되었습니다.',
  });
});
