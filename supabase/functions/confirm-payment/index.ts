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

/* ════════════════════════════════════════════════════════════════════════
   승인 후 공통 후처리 — reservations INSERT + room_inventory 재고 차감
   (통화별 중복 구현 방지용 공통 함수. 현재 USD(toss_paypal) 경로가 호출한다.
    LMS/이메일 알림은 여기서 보내지 않는다 → reservations INSERT(paid)가
    notify-reservation DB 웹훅을 자동 트리거하므로 이중 발송을 피한다.)
   booking-success.html saveReservation() 의 컬럼/재고 로직과 동일하게 맞춘다.
   ════════════════════════════════════════════════════════════════════════ */
async function finalizeReservation(
  sbUrl: string,
  sbKey: string,
  data: {
    orderId: string; paymentKey: string; res: Record<string, unknown>;
    provider: string; currency: string; paidAmount: number; rate: number; markup: number;
  },
): Promise<{ inserted: boolean; overbooked: boolean; reason?: string; reservation?: Record<string, unknown> }> {
  const headers = {
    'apikey': sbKey,
    'Authorization': `Bearer ${sbKey}`,
    'Content-Type': 'application/json',
  };
  const r = data.res;

  // ── 멱등성: 동일 order_id 예약이 이미 있으면 INSERT/재고차감을 하지 않고 기존 행을 반환 ──
  //    (confirm-payment 재호출 시 예약 중복 생성·재고 이중 차감 방지)
  const exRes = await fetch(
    `${sbUrl}/rest/v1/reservations?order_id=eq.${encodeURIComponent(data.orderId)}&select=*`,
    { headers },
  );
  if (exRes.ok) {
    const rows = await exRes.json() as Record<string, unknown>[];
    if (rows.length > 0) {
      console.log(`[confirm-payment] 이미 저장된 예약 존재 → INSERT/재고차감 skip (idempotent) — orderId=${data.orderId}`);
      return { inserted: false, overbooked: false, reason: 'duplicate', reservation: rows[0] };
    }
  }

  // room_id UUID 해석 (rooms.name_en → id) — saveReservation 과 동일
  let roomUuid: string | null = null;
  const roomEn = r.roomId as string | undefined;
  if (roomEn) {
    const rr = await fetch(
      `${sbUrl}/rest/v1/rooms?name_en=eq.${encodeURIComponent(roomEn)}&select=id`,
      { headers },
    );
    if (rr.ok) {
      const rows = await rr.json() as { id: string }[];
      roomUuid = rows[0]?.id ?? null;
    }
  }

  const checkin  = r.checkin  ? String(r.checkin).split('T')[0]  : null;
  const checkout = r.checkout ? String(r.checkout).split('T')[0] : null;
  const nights     = r.nights     != null ? Number(r.nights)     : null;
  const roomCount  = r.roomCount  != null ? Number(r.roomCount)  : null;
  const adultCount = r.adultCount != null ? Number(r.adultCount) : null;

  const insBody = {
    order_id:        data.orderId,
    payment_key:     data.paymentKey || null,
    room_id:         roomUuid,
    room_name:       (r.roomName as string) ?? null,
    checkin_date:    checkin,
    checkout_date:   checkout,
    nights,
    room_count:      roomCount,
    adult_count:     adultCount,
    total_price:     r.totalPrice != null ? Number(r.totalPrice) : null, // 원화 기준가(내부 정산·통계용)
    guest_name:      (r.guestName as string)      ?? null,
    guest_email:     (r.guestEmail as string)     ?? null,
    guest_phone:     (r.guestPhone as string)     ?? null,
    guest_country:   (r.guestCountry as string)   ?? null,
    guest_instagram: (r.guestInstagram as string) ?? null,
    special_request: (r.specialRequest as string) ?? null,
    payment_status:  'paid',
    // ── 결제 통화·환율 스냅샷 ──
    payment_provider: data.provider,   // 'toss_paypal'
    currency:         data.currency,   // 'USD'
    paid_amount:      data.paidAmount,  // 실제 결제 USD 금액
    exchange_rate:    data.rate,        // 결제 시점 usd_rate (서버 조회 스냅샷)
    markup_rate:      data.markup,      // 결제 시점 usd_markup
    guest_name_en:    (r.guestNameEn as string) ?? null,
  };

  const insRes = await fetch(`${sbUrl}/rest/v1/reservations`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'return=minimal' },
    body: JSON.stringify(insBody),
  });
  if (!insRes.ok) {
    const errText = await insRes.text();

    // ── UNIQUE 위반(23505): 동시 재호출로 다른 요청이 먼저 저장함 → 에러가 아니라 정상(중복)으로 처리 ──
    //    이 분기는 INSERT 실패 시점이므로 재고 차감은 실행되지 않는다(아래 재고 로직 미도달).
    if (insRes.status === 409 || errText.includes('23505') || errText.includes('duplicate key')) {
      console.log(`[confirm-payment] order_id UNIQUE 충돌(23505) → 기존 예약 반환 (idempotent) — orderId=${data.orderId}`);
      let existing: Record<string, unknown> | undefined;
      const exRes2 = await fetch(
        `${sbUrl}/rest/v1/reservations?order_id=eq.${encodeURIComponent(data.orderId)}&select=*`,
        { headers },
      );
      if (exRes2.ok) {
        const rows = await exRes2.json() as Record<string, unknown>[];
        existing = rows[0];
      }
      return { inserted: false, overbooked: false, reason: 'duplicate', reservation: existing };
    }

    // ★수동복구필요★ 그 외 실패 — 결제는 승인됐으나 예약 저장 실패 → orderId/paymentKey 를 반드시 남긴다
    console.error(
      `[confirm-payment] ★수동복구필요★ 결제 승인됨 but reservations INSERT 실패 — ` +
      `orderId=${data.orderId}, paymentKey=${data.paymentKey}, currency=${data.currency}, ` +
      `paidAmount=${data.paidAmount}, provider=${data.provider} :: ${errText}`,
    );
    return { inserted: false, overbooked: false, reason: 'insert_failed' };
  }
  console.log('[confirm-payment] reservations INSERT 성공 ✓ (webhook 이 알림 발송)');

  // ── room_inventory 재고 차감 (낙관적 락) — saveReservation 과 동일 ──
  let overbooked = false;
  if (roomUuid && checkin && nights && roomCount) {
    for (let i = 0; i < nights; i++) {
      const d = new Date(String(checkin) + 'T00:00:00');
      d.setDate(d.getDate() + i);
      const dateStr = localDateStr(d);

      const invRes = await fetch(
        `${sbUrl}/rest/v1/room_inventory?room_id=eq.${roomUuid}&date=eq.${dateStr}&select=stock`,
        { headers },
      );
      if (!invRes.ok) continue;
      const invRows = await invRes.json() as { stock: number }[];
      if (!invRows || invRows.length === 0) continue; // 미설정 날짜 → skip

      const cur = invRows[0].stock;
      if (cur < roomCount) { overbooked = true; break; }

      const patchRes = await fetch(
        `${sbUrl}/rest/v1/room_inventory?room_id=eq.${roomUuid}&date=eq.${dateStr}&stock=eq.${cur}&stock=gte.${roomCount}`,
        {
          method: 'PATCH',
          headers: { ...headers, 'Prefer': 'return=representation' },
          body: JSON.stringify({ stock: cur - roomCount }),
        },
      );
      if (!patchRes.ok) { overbooked = true; break; }
      const updated = await patchRes.json() as unknown[];
      if (!updated || updated.length === 0) { overbooked = true; break; }
    }
  }

  if (overbooked) {
    await fetch(`${sbUrl}/rest/v1/reservations?order_id=eq.${encodeURIComponent(data.orderId)}`, {
      method: 'PATCH',
      headers: { ...headers, 'Prefer': 'return=minimal' },
      body: JSON.stringify({ payment_status: 'overbooked' }),
    });
    console.warn('[confirm-payment] 오버부킹 감지 — 관리자 확인 필요:', data.orderId);
  }

  return { inserted: true, overbooked };
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
  let body: Record<string, unknown>;
  try {
    body = await req.json();
    paymentKey = body.paymentKey as string;
    orderId    = body.orderId as string;
    amount     = Number(body.amount);
  } catch {
    return json({ ok: false, error: 'Invalid JSON body' }, 400);
  }

  if (!paymentKey || !orderId || !amount) {
    return json({ ok: false, error: 'paymentKey, orderId, amount 는 필수입니다.' }, 400);
  }

  /* ── 2. 통화 분기 + 시크릿 키 로드 ── */
  const isUsd = body.currency === 'USD';
  const secretKey = isUsd
    ? Deno.env.get('TOSS_WIDGET_SECRET_KEY')
    : Deno.env.get('TOSS_SECRET_KEY');
  if (!secretKey) {
    console.error(`[confirm-payment] ${isUsd ? 'TOSS_WIDGET_SECRET_KEY' : 'TOSS_SECRET_KEY'} 환경변수 미설정`);
    return json({ ok: false, error: '서버 설정 오류' }, 500);
  }

  /* ── 3. Toss /v1/payments/confirm 호출 (원화·USD 공통) ── */
  // Toss Basic Auth: base64(secretKey + ":")  ← 시크릿 키 뒤 콜론 필수
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
  if (isUsd) {
    // USD 는 소수점 오차 대비 — === 금지, 절대오차 비교
    if (Math.abs(Number(tossData.totalAmount) - amount) >= 0.01) {
      console.error(
        `[confirm-payment] USD 금액 불일치 — 클라이언트: ${amount}, Toss: ${tossData.totalAmount}`,
      );
      return json({ ok: false, error: '결제 금액 불일치 — 승인 거절' }, 400);
    }
  } else {
    // 원화 — 기존 로직 그대로 (수정 금지)
    if (tossData.totalAmount !== amount) {
      console.error(
        `[confirm-payment] 금액 불일치 — 클라이언트: ${amount}, Toss: ${tossData.totalAmount}`,
      );
      return json({ ok: false, error: '결제 금액 불일치 — 승인 거절' }, 400);
    }
  }

  /* ── 6. USD 전용: 환율 스냅샷 조회 + 예약 저장 + 재고 차감 ── */
  //    (원화는 기존대로 프론트 saveReservation 이 담당 → 여기서 아무것도 하지 않음)
  let usdSaved: { inserted: boolean; overbooked: boolean; reason?: string; reservation?: Record<string, unknown> } | null = null;
  if (isUsd) {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!SUPABASE_URL || !SERVICE_KEY) {
      // ★수동복구필요★ 결제 승인됐으나 저장 불가 → orderId/paymentKey 로그 필수
      console.error(
        `[confirm-payment] ★수동복구필요★ Supabase 환경변수 미설정 — USD 예약 저장 불가 — ` +
        `orderId=${orderId}, paymentKey=${tossData.paymentKey ?? paymentKey}, totalAmount=${tossData.totalAmount}`,
      );
      // 결제는 이미 승인됨 → 저장 실패를 알리되 승인 자체는 성공 처리(손님 이중결제 방지)
      return json({
        ok: true,
        warning: 'saved_failed',
        paymentKey: tossData.paymentKey, orderId: tossData.orderId,
        totalAmount: tossData.totalAmount, method: tossData.method, approvedAt: tossData.approvedAt,
        currency: 'USD',
      });
    }

    // 환율·마크업은 클라이언트를 신뢰하지 않고 서버에서 직접 조회(스냅샷)
    let rate = 1350, markup = 1.10;
    try {
      const cfgRes = await fetch(
        `${SUPABASE_URL}/rest/v1/app_settings?select=key,value&key=in.(usd_rate,usd_markup)`,
        { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } },
      );
      if (cfgRes.ok) {
        const rows = await cfgRes.json() as { key: string; value: number }[];
        rows.forEach((row) => {
          if (row.key === 'usd_rate'   && Number(row.value) > 0) rate   = Number(row.value);
          if (row.key === 'usd_markup' && Number(row.value) > 0) markup = Number(row.value);
        });
      }
    } catch (e) {
      console.warn('[confirm-payment] app_settings 조회 실패 — 기본 환율 사용', e);
    }

    const resPayload = (body.reservation as Record<string, unknown>) ?? {};
    usdSaved = await finalizeReservation(SUPABASE_URL, SERVICE_KEY, {
      orderId,
      paymentKey: tossData.paymentKey ?? paymentKey,
      res: resPayload,
      provider: 'toss_paypal',
      currency: 'USD',
      paidAmount: Number(tossData.totalAmount),
      rate,
      markup,
    });
  }

  /* ── 7. 성공 ── */
  const result: Record<string, unknown> = {
    ok:          true,
    paymentKey:  tossData.paymentKey,
    orderId:     tossData.orderId,
    totalAmount: tossData.totalAmount,
    method:      tossData.method,
    approvedAt:  tossData.approvedAt,
  };
  if (isUsd) {
    result.currency = 'USD';
    result.reservation = usdSaved;
  }
  return json(result);
});
