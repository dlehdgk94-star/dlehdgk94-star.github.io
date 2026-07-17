import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

/* ══════════════════════════════════════════════════════════
   설정 상수 — 실제 번호로 교체 후 사용
══════════════════════════════════════════════════════════ */
const STAFF_PHONES: string[] = [
  '01052525258',
  '01090846412',
  '01091716412',
  '01085325258',
  '01042077372',
];

const FROM_NUMBER = '01085325258'; // 솔라피에 사전 등록된 발신번호

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
   손님 예약 확인 이메일 HTML 생성 (한국어 / 영어)
══════════════════════════════════════════════════════════ */
function buildEmailContent(
  r: Record<string, unknown>,
): { subject: string; html: string } {
  const isKorean = r.guest_country === 'KR';

  const orderId    = String(r.order_id    ?? '-');
  const roomName   = String(r.room_name   ?? '-');
  const checkin    = String(r.checkin_date  ?? '-');
  const checkout   = String(r.checkout_date ?? '-');
  const nights     = r.nights ? String(r.nights) : '-';
  const roomCount  = r.room_count  ? String(r.room_count)  : '-';
  const adultCount = r.adult_count ? String(r.adult_count) : '-';
  const guestName  = String(r.guest_name ?? '-');
  const price      = r.total_price != null
    ? '₩' + Number(r.total_price).toLocaleString('ko-KR')
    : '-';

  /* ── 호텔 정보 (주소는 placeholder) ── */
  const HOTEL_ADDRESS = '경기도 수원시 팔달구 ○○로 ○○'; // ← 실제 주소로 교체
  const HOTEL_PHONE   = '031-203-4301';

  /* ── 공통 스타일 ── */
  const cell  = 'style="padding:12px 0;font-size:14px;border-bottom:1px solid #f0f0f0;"';
  const label = 'style="color:#888;width:120px;vertical-align:top;font-weight:500;"';
  const val   = 'style="color:#1c1c1c;font-weight:600;"';

  /* ── 행 생성 헬퍼 ── */
  const row = (k: string, v: string) =>
    `<tr><td ${cell}><table width="100%" cellpadding="0" cellspacing="0"><tr>
       <td ${label}>${k}</td><td ${val}>${v}</td>
     </tr></table></td></tr>`;

  if (isKorean) {
    const subject = `[INSTA HOTEL] 예약이 확인되었습니다 — ${orderId}`;
    const html = `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Apple SD Gothic Neo',Malgun Gothic,sans-serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 16px;">
  <tr><td align="center">
  <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.07);">

    <!-- 헤더 -->
    <tr><td style="background:#1c1c1c;padding:36px 40px;text-align:center;">
      <div style="font-size:20px;font-weight:800;letter-spacing:3px;color:#ffffff;">INSTA HOTEL</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:6px;letter-spacing:1px;">BOOKING CONFIRMATION</div>
    </td></tr>

    <!-- 인사말 -->
    <tr><td style="padding:32px 40px 0;">
      <p style="margin:0;font-size:15px;color:#1c1c1c;">안녕하세요, <strong>${guestName}</strong>님.</p>
      <p style="margin:10px 0 0;font-size:14px;color:#666;line-height:1.7;">
        INSTA HOTEL 예약이 완료되었습니다.<br>아래 예약 내용을 확인해 주세요.
      </p>
    </td></tr>

    <!-- 예약번호 박스 -->
    <tr><td style="padding:20px 40px 0;">
      <div style="background:#f8f8f8;border-radius:8px;padding:16px 20px;">
        <div style="font-size:11px;color:#aaa;font-weight:700;letter-spacing:0.5px;margin-bottom:6px;">예약번호</div>
        <div style="font-size:15px;font-weight:700;color:#1c1c1c;font-family:monospace;letter-spacing:0.5px;">${orderId}</div>
      </div>
    </td></tr>

    <!-- 예약 정보 -->
    <tr><td style="padding:28px 40px 0;">
      <div style="font-size:11px;font-weight:700;color:#aaa;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">예약 정보</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row('객실', roomName)}
        ${row('체크인', checkin + ' (오후 3:00)')}
        ${row('체크아웃', checkout + ' (낮 12:00)')}
        ${row('숙박', nights + '박')}
        ${row('객실/인원', roomCount + '객실 · 성인 ' + adultCount + '인')}
        ${row('결제금액', `<span style="font-size:16px;color:#1c1c1c;">${price}</span>`)}
      </table>
    </td></tr>

    <!-- 안내 문구 -->
    <tr><td style="padding:24px 40px 0;">
      <div style="background:#fffbf0;border:1px solid #ffe082;border-radius:8px;padding:14px 18px;font-size:13px;color:#7a6000;line-height:1.7;">
        체크인 시 예약번호를 프런트에 알려주시면 됩니다.<br>
        문의사항은 아래 연락처로 연락해 주세요.
      </div>
    </td></tr>

    <!-- 호텔 정보 -->
    <tr><td style="padding:28px 40px 32px;">
      <div style="border-top:1px solid #f0f0f0;padding-top:20px;">
        <div style="font-size:13px;font-weight:700;color:#1c1c1c;margin-bottom:8px;">호텔인스타 본점</div>
        <div style="font-size:12px;color:#999;line-height:1.9;">
          📞 ${HOTEL_PHONE}<br>
          📍 ${HOTEL_ADDRESS}
        </div>
        <div style="margin-top:16px;font-size:11px;color:#bbb;">
          본 이메일은 예약 확인을 위해 자동 발송되었습니다.
        </div>
      </div>
    </td></tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
    return { subject, html };
  }

  /* ── 영어 버전 ── */
  const subject = `[INSTA HOTEL] Booking Confirmation — ${orderId}`;
  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Barlow,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 16px;">
  <tr><td align="center">
  <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.07);">

    <!-- Header -->
    <tr><td style="background:#1c1c1c;padding:36px 40px;text-align:center;">
      <div style="font-size:20px;font-weight:800;letter-spacing:3px;color:#ffffff;">INSTA HOTEL</div>
      <div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:6px;letter-spacing:1px;">BOOKING CONFIRMATION</div>
    </td></tr>

    <!-- Greeting -->
    <tr><td style="padding:32px 40px 0;">
      <p style="margin:0;font-size:15px;color:#1c1c1c;">Dear <strong>${guestName}</strong>,</p>
      <p style="margin:10px 0 0;font-size:14px;color:#666;line-height:1.7;">
        Thank you for choosing INSTA HOTEL.<br>Your booking has been confirmed. Please review the details below.
      </p>
    </td></tr>

    <!-- Order number -->
    <tr><td style="padding:20px 40px 0;">
      <div style="background:#f8f8f8;border-radius:8px;padding:16px 20px;">
        <div style="font-size:11px;color:#aaa;font-weight:700;letter-spacing:0.5px;margin-bottom:6px;">BOOKING NUMBER</div>
        <div style="font-size:15px;font-weight:700;color:#1c1c1c;font-family:monospace;letter-spacing:0.5px;">${orderId}</div>
      </div>
    </td></tr>

    <!-- Booking details -->
    <tr><td style="padding:28px 40px 0;">
      <div style="font-size:11px;font-weight:700;color:#aaa;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">Booking Details</div>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row('Room', roomName)}
        ${row('Check-in', checkin + ' (3:00 PM)')}
        ${row('Check-out', checkout + ' (12:00 PM)')}
        ${row('Duration', nights + (nights === '1' ? ' night' : ' nights'))}
        ${row('Guests', roomCount + (roomCount === '1' ? ' room' : ' rooms') + ' · ' + adultCount + (adultCount === '1' ? ' adult' : ' adults'))}
        ${row('Total', `<span style="font-size:16px;color:#1c1c1c;">${price}</span>`)}
      </table>
    </td></tr>

    <!-- Notice -->
    <tr><td style="padding:24px 40px 0;">
      <div style="background:#fffbf0;border:1px solid #ffe082;border-radius:8px;padding:14px 18px;font-size:13px;color:#7a6000;line-height:1.7;">
        Please present your booking number at the front desk upon check-in.<br>
        For any inquiries, please contact us using the information below.
      </div>
    </td></tr>

    <!-- Hotel info -->
    <tr><td style="padding:28px 40px 32px;">
      <div style="border-top:1px solid #f0f0f0;padding-top:20px;">
        <div style="font-size:13px;font-weight:700;color:#1c1c1c;margin-bottom:8px;">INSTA HOTEL (호텔인스타 본점)</div>
        <div style="font-size:12px;color:#999;line-height:1.9;">
          📞 ${HOTEL_PHONE}<br>
          📍 ${HOTEL_ADDRESS}
        </div>
        <div style="margin-top:16px;font-size:11px;color:#bbb;">
          This is an automated booking confirmation email. Please do not reply to this email.
        </div>
      </div>
    </td></tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
  return { subject, html };
}

/* ══════════════════════════════════════════════════════════
   손님에게 예약 확인 이메일 발송 (Resend)
══════════════════════════════════════════════════════════ */
async function sendGuestEmail(
  r: Record<string, unknown>,
  resendApiKey: string,
): Promise<void> {
  const { subject, html } = buildEmailContent(r);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: 'INSTA HOTEL <reservation@instarhotel.com>',
      to:   [String(r.guest_email)],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend HTTP ${res.status}: ${body}`);
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

  /* ── 1. 직원 문자 발송 (솔라피) ── */
  const apiKey    = Deno.env.get('SOLAPI_API_KEY');
  const apiSecret = Deno.env.get('SOLAPI_API_SECRET');

  let smsSent = 0;
  if (!apiKey || !apiSecret) {
    console.error('[notify-reservation] SOLAPI_API_KEY 또는 SOLAPI_API_SECRET 미설정 — 문자 skip');
  } else {
    const text = buildMessage(record);
    console.log('[notify-reservation] 문자 발송 대상 수:', STAFF_PHONES.length);

    const smsResults = await Promise.allSettled(
      STAFF_PHONES.map((phone) => sendLms(phone, text, apiKey, apiSecret)),
    );

    smsResults.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        smsSent++;
        console.log(`[notify-reservation] ✓ SMS ${STAFF_PHONES[i]} 발송 성공`);
      } else {
        console.error(`[notify-reservation] ✗ SMS ${STAFF_PHONES[i]} 발송 실패:`, result.reason);
      }
    });
    console.log(`[notify-reservation] SMS 완료 — 성공 ${smsSent}/${STAFF_PHONES.length}`);
  }

  /* ── 2. 손님 이메일 발송 (Resend) — 문자 발송과 독립적으로 처리 ── */
  let emailStatus = 'skipped';
  const guestEmail = record.guest_email;

  if (!guestEmail || String(guestEmail).trim() === '') {
    console.warn('[notify-reservation] guest_email 없음 — 이메일 skip');
  } else {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      console.error('[notify-reservation] RESEND_API_KEY 미설정 — 이메일 skip');
      emailStatus = 'no_secret';
    } else {
      try {
        await sendGuestEmail(record, resendApiKey);
        console.log(`[notify-reservation] ✓ 이메일 발송 성공 → ${guestEmail}`);
        emailStatus = 'sent';
      } catch (err) {
        console.error(`[notify-reservation] ✗ 이메일 발송 실패 → ${guestEmail}:`, err);
        emailStatus = 'failed';
      }
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      sms:   { sent: smsSent, total: STAFF_PHONES.length },
      email: { status: emailStatus, to: guestEmail ?? null },
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } },
  );
});
