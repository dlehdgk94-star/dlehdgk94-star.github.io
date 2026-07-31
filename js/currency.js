/* ============================================================================
   currency.js — 표시 통화(KRW/USD) 전환 (표시 전용, 결제 금액은 항상 KRW)
   ----------------------------------------------------------------------------
   · 언어가 'ko'면 KRW, 그 외(en/ja/zh)면 USD 로 화면 표시만 전환한다.
   · USD = Math.ceil((KRW * markup / rate) * 2) / 2  (0.50 단위 올림, toFixed(2))
   · usd_rate / usd_markup 은 app_settings 에서 1회 로드해 캐싱(+localStorage).
     로드 실패 시 기본값(1350, 1.10) 사용. (실제 청구 금액/SDK 는 절대 건드리지 않음)
   ============================================================================ */
(function (global) {
  'use strict';

  var DEFAULT_RATE = 1350, DEFAULT_MARKUP = 1.10;
  var _rate = DEFAULT_RATE, _markup = DEFAULT_MARKUP, _loaded = false;

  var SB_URL  = 'https://lbhdujheuokkmiowobzu.supabase.co';
  var SB_ANON = 'sb_publishable_2X3S_RgN_0ipbUtR-zAV6A_yIp1n5PC';
  var CACHE_KEY = 'currencyConfig';

  // 이전 방문에서 캐싱된 값으로 즉시 프라임(클라이언트 없는 페이지도 일관성 유지)
  try {
    var c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (c && Number(c.rate)   > 0) _rate   = Number(c.rate);
    if (c && Number(c.markup) > 0) _markup = Number(c.markup);
  } catch (e) {}

  function _applyRows(rows) {
    (rows || []).forEach(function (r) {
      if (r.key === 'usd_rate'   && Number(r.value) > 0) _rate   = Number(r.value);
      if (r.key === 'usd_markup' && Number(r.value) > 0) _markup = Number(r.value);
    });
  }
  function _cache() {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ rate: _rate, markup: _markup })); } catch (e) {}
  }

  // app_settings 1회 로드. supabase 클라이언트가 있으면 그것으로, 없으면 REST fetch 로.
  function loadCurrencyConfig(supabase) {
    var p;
    if (supabase && typeof supabase.from === 'function') {
      p = supabase.from('app_settings').select('key,value').in('key', ['usd_rate', 'usd_markup'])
        .then(function (res) { if (res && res.data) _applyRows(res.data); });
    } else {
      p = fetch(SB_URL + '/rest/v1/app_settings?select=key,value&key=in.(usd_rate,usd_markup)', {
        headers: { apikey: SB_ANON, Authorization: 'Bearer ' + SB_ANON }
      }).then(function (r) { return r.json(); })
        .then(function (rows) { if (Array.isArray(rows)) _applyRows(rows); });
    }
    return p.then(function () { _loaded = true; _cache(); return { rate: _rate, markup: _markup }; })
            .catch(function () { _loaded = true; return { rate: _rate, markup: _markup }; });
  }

  // 결제 시 스냅샷 저장용
  function getRate()   { return _rate; }
  function getMarkup() { return _markup; }

  // KRW → USD (0.50 단위 올림). 숫자 반환.
  // 정수 연산 기반: markup 적용액을 원 단위로 먼저 반올림해 부동소수점 노이즈를 제거한 뒤
  // 나눗셈·0.50 올림 → 108000 같은 값이 $88.50이 아닌 $88.00 으로 정확히 계산됨.
  function krwToUsd(krw) {
    var won = Math.round(Number(krw) * _markup);
    return Math.ceil((won / _rate) * 2) / 2;
  }

  // 부동소수점 오차 대비 — USD 금액 비교 시 === 대신 사용
  function usdEquals(a, b) { return Math.abs(Number(a) - Number(b)) < 0.005; }

  // 현재 표시 통화: 언어가 ko 면 KRW, 그 외 USD
  function getCurrency() {
    var lang;
    if (typeof currentLang !== 'undefined' && currentLang) lang = currentLang;
    else { try { lang = localStorage.getItem('siteLang') || sessionStorage.getItem('siteLang'); } catch (e) {} }
    return (lang || 'ko') === 'ko' ? 'KRW' : 'USD';
  }

  // 금액 문자열: KRW → '49,500원', USD → '$40.50'
  function formatPrice(krw, currency) {
    var cur = currency || getCurrency();
    var n = Number(krw) || 0;
    if (cur === 'USD') return '$' + krwToUsd(n).toFixed(2);
    return n.toLocaleString('ko-KR') + '원';
  }

  global.loadCurrencyConfig = loadCurrencyConfig;
  global.getRate            = getRate;
  global.getMarkup          = getMarkup;
  global.krwToUsd           = krwToUsd;
  global.usdEquals          = usdEquals;
  global.getCurrency        = getCurrency;
  global.formatPrice        = formatPrice;
})(window);
