/* ══════════════════════════════════════════════════════════
   직원 문자(LMS) 공용 모듈 — 솔라피
   ----------------------------------------------------------
   사용처: cancel-reservation (예약 취소 알림)
   ※ notify-reservation(예약 알림)은 아직 자기 파일 안에 같은 번호 목록을
     따로 갖고 있다. 직원 번호가 바뀌면 두 곳 모두 고칠 것.
   환경변수: SOLAPI_API_KEY, SOLAPI_API_SECRET (프로젝트 공통 시크릿)
══════════════════════════════════════════════════════════ */

export const STAFF_PHONES: string[] = [
  '01052525258',
  '01090846412',
  '01091716412',
  '01085325258',
  '01042077372',
];

const FROM_NUMBER = '01085325258'; // 솔라피에 사전 등록된 발신번호

/* 솔라피 HMAC-SHA256 서명 (서명 대상: date + salt) */
async function buildAuthHeader(apiKey: string, apiSecret: string): Promise<string> {
  const date = new Date().toISOString();
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(apiSecret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const sigBuf = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(date + salt));
  const signature = Array.from(new Uint8Array(sigBuf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return `HMAC-SHA256 apiKey=${apiKey}, date=${date}, salt=${salt}, signature=${signature}`;
}

async function sendLms(to: string, text: string, apiKey: string, apiSecret: string): Promise<void> {
  const auth = await buildAuthHeader(apiKey, apiSecret);
  const res = await fetch('https://api.solapi.com/messages/v4/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': auth },
    body: JSON.stringify({ message: { to, from: FROM_NUMBER, text, type: 'LMS' } }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
}

/**
 * 직원 전원에게 문자 발송. 절대 throw 하지 않는다
 * (문자 실패가 호출한 쪽의 본 작업 — 예: 취소 응답 — 을 깨뜨리면 안 되므로).
 */
export async function sendStaffSms(text: string, tag = 'staff-sms'): Promise<{ sent: number; total: number }> {
  const apiKey    = Deno.env.get('SOLAPI_API_KEY');
  const apiSecret = Deno.env.get('SOLAPI_API_SECRET');
  if (!apiKey || !apiSecret) {
    console.error(`[${tag}] SOLAPI_API_KEY 또는 SOLAPI_API_SECRET 미설정 — 문자 skip`);
    return { sent: 0, total: STAFF_PHONES.length };
  }
  const results = await Promise.allSettled(
    STAFF_PHONES.map((phone) => sendLms(phone, text, apiKey, apiSecret)),
  );
  let sent = 0;
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') sent++;
    else console.error(`[${tag}] ✗ SMS ${STAFF_PHONES[i]} 발송 실패:`, r.reason);
  });
  console.log(`[${tag}] SMS 완료 — 성공 ${sent}/${STAFF_PHONES.length}`);
  return { sent, total: STAFF_PHONES.length };
}
