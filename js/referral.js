/* =========================================================================
 * 호텔인스타 - 유입경로 기록 (js/referral.js)  v1.0
 * -------------------------------------------------------------------------
 * 손님이 어디서 들어왔는지 손님 브라우저에 30일간 기억해 둔다.
 * 예약이 완료되면 이 값이 예약 정보(referral_source)에 함께 저장된다.
 *
 * ■ 들어오는 길
 *   1) instarhotel.com/go/tripgokr          → 404.html 이 아래 2)번 주소로 바꿔 넘김
 *   2) ?utm_source=tripgokr&utm_medium=blog → "블로그(tripgokr)"
 *      ?ref=tripgokr                        → "tripgokr"
 *   3) 꼬리표 없이 외부 사이트 링크로 들어온 경우(리퍼러) → "네이버 블로그" 등
 *      ※ 3)은 이미 기억된 값이 없을 때만 저장. 꼬리표(1·2)가 항상 우선.
 *
 * ■ 손님 화면에는 아무 변화가 없다. 기록 후 주소창의 꼬리표만 지운다
 *   (GA4 가 먼저 읽을 수 있도록 페이지 로드 2초 뒤에 지움).
 *
 * ■ 다른 파일에서 읽기:  window.InstaReferral.get()  →  "블로그(tripgokr)" 또는 null
 * ========================================================================= */
(function (w, d) {
  'use strict';

  var KEY      = 'instaHotelRef';
  var TTL_DAYS = 30;
  var TAG_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'ref'];

  /* 결제사·카드사에서 돌아오는 페이지에서는 리퍼러를 기록하지 않는다
     (그러지 않으면 '토스페이먼츠에서 유입'으로 잘못 찍힘) */
  var NO_REFERRER_PAGES = /booking-success|booking-fail/;

  function clean(v) {
    return String(v == null ? '' : v)
      .replace(/[^0-9A-Za-z\uAC00-\uD7A3_\-.]/g, '')
      .slice(0, 40);
  }

  function save(obj) {
    obj.ts = Date.now();
    try { localStorage.setItem(KEY, JSON.stringify(obj)); } catch (e) {}
  }

  function load() {
    try {
      var o = JSON.parse(localStorage.getItem(KEY));
      if (!o || !o.ts) return null;
      if (Date.now() - o.ts > TTL_DAYS * 864e5) { localStorage.removeItem(KEY); return null; }
      return o;
    } catch (e) { return null; }
  }

  var MEDIUM_LABEL = {
    blog: '블로그', insta: '인스타', instagram: '인스타', sns: 'SNS',
    cafe: '카페', ad: '광고', cpc: '광고', qr: 'QR', email: '이메일', sms: '문자'
  };

  /* 저장된 값 → 관리자·문자에 보일 한 줄 */
  function label(o) {
    if (!o) return null;
    if (o.type === 'referrer') return o.source || null;
    var src = o.source || '';
    if (o.campaign) src += '-' + o.campaign;
    var m = MEDIUM_LABEL[String(o.medium || '').toLowerCase()] || o.medium || '';
    if (!src) return null;
    return m ? (m + '(' + src + ')') : src;
  }

  /* 리퍼러 도메인 → 사람이 읽을 이름 */
  function referrerName(host, path) {
    if (/(^|\.)blog\.naver\.com$/.test(host))   return '네이버 블로그';
    if (/(^|\.)cafe\.naver\.com$/.test(host))   return '네이버 카페';
    if (/(^|\.)map\.naver\.com$/.test(host) || /(^|\.)m\.place\.naver\.com$/.test(host) || /(^|\.)pcmap\.place\.naver\.com$/.test(host)) return '네이버 지도';
    if (/(^|\.)search\.naver\.com$/.test(host)) return '네이버 검색';
    if (/naver\.com$/.test(host))               return '네이버';
    if (/gemini\.google\.com$/.test(host))      return 'Gemini';
    if (/(^|\.)google\./.test(host))            return '구글 검색';
    if (/daum\.net$/.test(host) && /search/.test(path)) return '다음 검색';
    if (/tistory\.com$/.test(host))             return '티스토리';
    if (/daum\.net$/.test(host))                return '다음';
    if (/(^|\.)instagram\.com$/.test(host))     return '인스타그램';
    if (/(^|\.)facebook\.com$/.test(host))      return '페이스북';
    if (/kakao/.test(host))                     return '카카오';
    if (/(chatgpt|openai)\.com$/.test(host))    return 'ChatGPT';
    if (/perplexity\.ai$/.test(host))           return 'Perplexity';
    if (/bing\.com$/.test(host))                return '빙 검색';
    return host.replace(/^www\./, '');
  }

  /* ── 1. 주소창 꼬리표 읽기 ── */
  var q = new URLSearchParams(location.search);
  var src = clean(q.get('utm_source') || q.get('ref'));
  if (src) {
    save({
      type:     'tag',
      source:   src,
      medium:   clean(q.get('utm_medium')),
      campaign: clean(q.get('utm_campaign')),
      landing:  location.pathname
    });
  } else if (!load() && d.referrer && !NO_REFERRER_PAGES.test(location.pathname)) {
    /* ── 2. 꼬리표가 없으면 리퍼러로 보조 기록 ── */
    try {
      var r = new URL(d.referrer);
      var mine = r.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, '');
      if (!mine && /^https?:$/.test(r.protocol)) {
        save({ type: 'referrer', source: referrerName(r.hostname, r.pathname), landing: location.pathname });
      }
    } catch (e) {}
  }

  /* ── 3. 주소창 꼬리표 지우기 (checkin 등 다른 값은 유지) ── */
  var hasTag = TAG_KEYS.some(function (k) { return q.has(k); });
  if (hasTag && w.history && history.replaceState) {
    w.addEventListener('load', function () {
      setTimeout(function () {
        var p = new URLSearchParams(location.search);
        TAG_KEYS.forEach(function (k) { p.delete(k); });
        var s = p.toString();
        history.replaceState(history.state, '', location.pathname + (s ? '?' + s : '') + location.hash);
      }, 2000);
    });
  }

  w.InstaReferral = {
    get: function () { return label(load()); },
    raw: load
  };
})(window, document);
