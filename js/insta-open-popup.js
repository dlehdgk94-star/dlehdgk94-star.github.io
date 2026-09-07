/* =========================================================================
 * 인스타호텔 - OPEN 기념행사 팝업 (insta-open-popup.js)  v4.0
 * -------------------------------------------------------------------------
 * 세로형 구성
 *   상단  : 안내 한 줄 → 큰 제목 → 배지
 *   가운데: 3D 그림 (popup-art.webp)
 *   하단  : 흰 바 — [지금 적용하기]  |  닫기 ✕
 *
 * 설치
 *   1) popup-art.webp 를 /images/ 에 둡니다.
 *   2) 이 파일을 /js/insta-open-popup.js 로 둡니다.
 *   3) 각 HTML 의 body 닫는 태그 바로 위에:
 *        <script src="/js/insta-open-popup.js?v=1"><\/script>
 *
 * 주소 끝에 ?popup=1 을 붙이면 '하루 1회' 제한을 무시하고 항상 뜹니다(테스트용).
 * 콘솔: OpenPopup.open() / OpenPopup.close() / OpenPopup.reset()
 * ========================================================================= */
(function () {
  'use strict';

  /* ===================== 1. 설정 ===================== */
  var CONFIG = {
    artUrl: '/images/popup-art.webp',   // 3D 그림 경로

    scrollTarget: '#rooms-target',      // [지금 적용하기] 를 누르면 갈 곳
    scrollOffset: 'auto',               // 'auto' = 상단 고정 예약바 높이를 자동 측정

    showOncePerDay: false,              // false = 페이지를 열 때마다 매번 노출 (새로고침·뒤로가기 포함)
    delaySeconds: 0,                    // 0 = 화면이 그려지자마자
    exitIntent: true,                   // 마우스가 주소창으로 빠질 때도 노출
    excludePaths: ['/reservation', '/booking', '/payment', '/complete', '/admin'],

    scrollOnClose: true,                // 닫아도 객실 & 스테이로 내려가기
    showMiniButton: true,               // 닫은 뒤 우하단 '다시 보기' 버튼
    miniOnMobile: false,                // true 로 바꾸면 모바일에서도 표시

    align: 'right',                     // 팝업 가로 위치: 'center' | 'right' | 'left'
    alignOffset: '12vw',                // 화면 가장자리에서 띄울 거리 (px 로 써도 됩니다)

    cardWidth: 440,                     // 팝업 가로 폭(px)
    artHeight: 300,                     // 그림 영역 높이(px)

    /* 글씨 굵기 — 작을수록 가늘어집니다 (400 얇게 ~ 800 두껍게).
       Pretendard 가변폰트라 550, 650 같은 중간값도 그대로 반영됩니다. */
    weightTitle:  600,
    weightBadge:  500,
    weightButton: 700,
    weightMini:   600,

    /* 한글 웹폰트(Pretendard). 팝업에만 적용됩니다. ''로 비우면 기본 글꼴 사용 */
    webfontUrl: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',

    /* 색 */
    gold:  '#F7CE73',
    coral: '#E8552D',
    ink:   '#1A1A1A'
  };

  /* ===================== 2. 문구 ===================== */
  var I18N = {
    ko: {
      lead: '공식 홈페이지 단독 객실 특가 제공',
      line1: '인스타 OPEN 기념행사',
      line2a: '지금 예약하여 ',
      line2b: '할인받기',
      badge: 'OPEN 특별혜택',
      cta: '지금 적용하기',
      close: '닫기',
      mini: 'OPEN 기념행사',
      miniAria: 'OPEN 기념행사 혜택 다시 보기'
    },
    en: {
      lead: 'Exclusive room rates on the official site',
      line1: 'INSTA Grand Open Event',
      line2a: 'Book now and ',
      line2b: 'save',
      badge: 'GRAND OPEN OFFER',
      cta: 'See the rooms',
      close: 'Close',
      mini: 'Grand Open Event',
      miniAria: 'Show the grand open offer again'
    },
    ja: {
      lead: '公式サイト限定の客室特価',
      line1: 'INSTA オープン記念イベント',
      line2a: '今すぐご予約で ',
      line2b: '割引',
      badge: 'オープン特別特典',
      cta: '客室を見る',
      close: '閉じる',
      mini: 'オープン記念イベント',
      miniAria: 'オープン記念特典をもう一度見る'
    },
    zh: {
      lead: '官网独家客房特价',
      line1: 'INSTA 开业纪念活动',
      line2a: '立即预订 ',
      line2b: '享受折扣',
      badge: '开业特别优惠',
      cta: '查看客房',
      close: '关闭',
      mini: '开业纪念活动',
      miniAria: '再次查看开业纪念优惠'
    }
  };

  /* ===================== 3. 준비 ===================== */
  /* 언어는 translations.js 가 쓰는 값(siteLang / currentLang)을 따라갑니다.
     html lang 속성은 항상 'ko' 라서 그것만 보면 영어로 바꿔도 한국어가 나옵니다. */
  function detectLang() {
    var l = null;
    try { l = localStorage.getItem('siteLang') || sessionStorage.getItem('siteLang'); } catch (e) {}
    if (!l && typeof window.currentLang === 'string') l = window.currentLang;
    if (!l) l = document.documentElement.lang || navigator.language || 'ko';
    l = String(l).slice(0, 2).toLowerCase();
    return I18N[l] ? l : 'ko';
  }
  var lang = detectLang();
  var T = I18N[lang];

  var path = location.pathname.toLowerCase();
  for (var i = 0; i < CONFIG.excludePaths.length; i++) {
    if (path.indexOf(CONFIG.excludePaths[i]) !== -1) return;
  }

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2);
  }
  function store(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); }
    catch (e) { return null; }
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  var SEEN_KEY = 'gb_seen_' + todayKey();
  var wrap, opened = false, shown = false, cssDone = false, lastFocus, prevOverflow;

  /* 한글 웹폰트 미리 불러오기 (한 번만) */
  function loadWebfont() {
    if (!CONFIG.webfontUrl) return;
    if (document.querySelector('link[data-gb-font]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = CONFIG.webfontUrl;
    l.setAttribute('data-gb-font', '1');
    (document.head || document.documentElement).appendChild(l);
  }
  loadWebfont();

  /* ===================== 4. 스타일 ===================== */
  var FONT = 'font-family:"Pretendard Variable",Pretendard,"Apple SD Gothic Neo",'
           + '"Noto Sans KR","맑은 고딕","Malgun Gothic",-apple-system,BlinkMacSystemFont,sans-serif;';

  var CSS = ''
  + '.gb-wrap{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:20px;}'
  + (CONFIG.align === 'right'
      ? '.gb-wrap{justify-content:flex-end;padding-right:' + CONFIG.alignOffset + ';}'
      : CONFIG.align === 'left'
        ? '.gb-wrap{justify-content:flex-start;padding-left:' + CONFIG.alignOffset + ';}'
        : '')
  + '.gb-wrap.gb-on{display:flex;}'
  + '.gb-wrap,.gb-wrap *,.gb-wrap *::before,.gb-wrap *::after{box-sizing:border-box;}'
  /* 사이트의 * { font-family:'Barlow' } 가 팝업 안까지 덮어쓰므로 자식까지 직접 지정 */
  + '.gb-wrap,.gb-wrap *,.gb-mini,.gb-mini *{' + FONT
  + '-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}'
  + '.gb-bg{position:absolute;inset:0;background:rgba(0,0,0,.72);animation:gbFade .28s ease;}'

  /* ---- 카드 + 버튼을 함께 담는 세로 묶음 ---- */
  + '.gb-stack{position:relative;width:100%;max-width:' + CONFIG.cardWidth + 'px;max-height:96vh;'
  + 'padding-top:50px;display:flex;flex-direction:column;'
  + 'animation:gbUp .38s cubic-bezier(.2,.8,.25,1);}'

  /* ---- 세로형 카드 ---- */
  + '.gb-card{position:relative;flex:0 1 auto;min-height:0;overflow:hidden;'
  + 'display:flex;flex-direction:column;border-radius:20px;background:#08090C;'
  + 'box-shadow:0 30px 80px rgba(0,0,0,.6);}'

  /* ---- 상단 글자 ---- */
  + '.gb-head{position:relative;padding:34px 26px 14px;text-align:center;flex:none;}'
  + '.gb-head::before{content:"";position:absolute;inset:0;pointer-events:none;'
  + 'background:radial-gradient(90% 120% at 50% 0%,rgba(214,158,58,.16) 0%,transparent 62%);}'
  + '.gb-head > *{position:relative;z-index:1;}'
  + '.gb-lead{font-size:13.5px;color:#A9A296;letter-spacing:.005em;margin:0;}'
  + '.gb-h{margin:12px 0 0;font-size:26px;line-height:1.44;font-weight:' + CONFIG.weightTitle + ';'
  + 'letter-spacing:-.01em;color:#fff;}'
  + '.gb-h .gd{color:' + CONFIG.gold + ';font-weight:' + (CONFIG.weightTitle + 100) + ';white-space:nowrap;}'
  + '.gb-badge{display:inline-block;margin-top:16px;padding:8px 20px;border-radius:999px;'
  + 'border:1.3px solid rgba(232,192,110,.55);background:linear-gradient(180deg,rgba(60,44,18,.6),rgba(16,12,6,.6));'
  + 'color:#F3DFA8;font-size:13px;font-weight:' + CONFIG.weightBadge + ';letter-spacing:.02em;}'

  /* ---- 그림 ---- */
  + '.gb-art{flex:none;width:100%;height:' + CONFIG.artHeight + 'px;'
  + 'background-position:center center;background-size:contain;background-repeat:no-repeat;'
  + '-webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 16%);'
  + 'mask-image:linear-gradient(180deg,transparent 0%,#000 16%);}'

  /* ---- 카드 밖 아래에 붙는 큰 버튼 ---- */
  + '.gb-cta{flex:none;display:flex;align-items:center;justify-content:center;gap:11px;width:100%;'
  + 'margin-top:22px;border:0;border-radius:999px;cursor:pointer;padding:19px 24px;'
  + 'font:inherit;font-size:18px;font-weight:' + CONFIG.weightButton + ';letter-spacing:-.005em;'
  + 'color:#2A1B05;text-decoration:none;'
  + 'background:linear-gradient(180deg,#FDE9A6 0%,#FAD478 38%,#F3B94C 72%,#E3A337 100%);'
  + 'box-shadow:0 0 34px rgba(243,185,76,.45),0 10px 26px rgba(0,0,0,.34),'
  + '0 0 0 1.4px rgba(255,238,190,.6) inset;'
  + 'transition:transform .16s,box-shadow .16s;}'
  + '.gb-cta:hover{transform:translateY(-2px);'
  + 'box-shadow:0 0 44px rgba(243,185,76,.6),0 14px 32px rgba(0,0,0,.4),0 0 0 1.4px rgba(255,244,210,.8) inset;}'
  + '.gb-cta:active{transform:translateY(0);}'
  + '.gb-cta svg{width:16px;height:16px;}'

  /* ---- 카드 위 오른쪽 닫기 ---- */
  + '.gb-x{position:absolute;top:0;right:2px;width:38px;height:38px;border-radius:50%;border:0;padding:0;'
  + 'background:rgba(255,255,255,.2);color:#fff;cursor:pointer;'
  + 'display:flex;align-items:center;justify-content:center;transition:.15s;}'
  + '.gb-x:hover{background:rgba(255,255,255,.34);}'
  + '.gb-x svg{width:15px;height:15px;}'

  /* ---- 닫은 뒤 우하단 '다시 보기' 버튼 ---- */
  + '.gb-mini{position:fixed;right:24px;z-index:98999;display:none;align-items:center;'
  + 'padding:10px 18px;border:1.4px solid rgba(232,192,110,.7);border-radius:999px;cursor:pointer;'
  + 'background:linear-gradient(180deg,rgba(38,28,12,.96),rgba(14,11,6,.96));color:#F6E3AE;'
  + 'font-size:13.5px;font-weight:' + CONFIG.weightMini + ';letter-spacing:.015em;white-space:nowrap;'
  + 'box-shadow:0 6px 20px rgba(0,0,0,.34),0 0 0 1px rgba(255,232,170,.10) inset;'
  + 'opacity:0;transform:translateY(8px);transition:opacity .3s,transform .3s,box-shadow .2s;}'
  + '.gb-mini.gb-show{display:flex;}'
  + '.gb-mini.gb-in{opacity:1;transform:none;}'
  + '.gb-mini:hover{box-shadow:0 10px 26px rgba(0,0,0,.42),0 0 0 1px rgba(255,232,170,.22) inset;}'

  + '@keyframes gbFade{from{opacity:0}to{opacity:1}}'
  + '@keyframes gbUp{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}'

  /* ---- 모바일 ---- */
  + '@media(max-width:520px){'
  + '.gb-wrap{padding:16px;justify-content:center;}'
  + '.gb-stack{max-width:none;width:100%;padding-top:46px;}'
  + '.gb-head{padding:26px 20px 12px;}'
  + '.gb-lead{font-size:12.5px;}'
  + '.gb-h{font-size:23px;line-height:1.46;margin-top:10px;}'
  + '.gb-badge{margin-top:14px;padding:7px 17px;font-size:12px;}'
  + '.gb-art{height:' + Math.round(CONFIG.artHeight * 0.78) + 'px;}'
  + '.gb-cta{margin-top:18px;padding:17px 20px;font-size:16.5px;}'
  + '.gb-x{width:36px;height:36px;}'
  + '.gb-mini{right:16px;font-size:13px;padding:9px 15px;}'
  + '}'
  + '@media(max-height:700px){.gb-art{height:' + Math.round(CONFIG.artHeight * 0.66) + 'px;}'
  + '.gb-head{padding-top:22px;}.gb-cta{margin-top:14px;padding:15px 20px;}}'
  + '@media(prefers-reduced-motion:reduce){.gb-card,.gb-bg{animation:none;}.gb-cta{transition:none;}}';

  function injectCSS() {
    if (cssDone) return;
    cssDone = true;
    var st = document.createElement('style');
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  /* ===================== 5. 마크업 ===================== */
  var ARROW = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 3l5 5-5 5"/></svg>';
  var XICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>';

  function markup() {
    return '<div class="gb-bg" data-gb-close></div>'
    + '<div class="gb-stack">'
      + '<button type="button" class="gb-x" aria-label="' + esc(T.close) + '" data-gb-close>' + XICON + '</button>'
      + '<div class="gb-card">'
        + '<div class="gb-head">'
          + '<p class="gb-lead">' + esc(T.lead) + '</p>'
          + '<h2 class="gb-h">' + esc(T.line1) + '<br>' + esc(T.line2a)
            + '<span class="gd">' + esc(T.line2b) + '</span></h2>'
          + '<span class="gb-badge">' + esc(T.badge) + '</span>'
        + '</div>'
        + '<div class="gb-art" style="background-image:url(\'' + CONFIG.artUrl + '\')"></div>'
      + '</div>'
      + '<button type="button" class="gb-cta" data-gb-go>' + esc(T.cta) + ARROW + '</button>'
    + '</div>';
  }

  /* ===== 닫은 뒤 남는 작은 '다시 보기' 버튼 ===== */
  var mini = null, miniTimer = null;

  function miniAllowed() {
    if (!CONFIG.showMiniButton) return false;
    if (!CONFIG.miniOnMobile && window.matchMedia('(max-width:768px)').matches) return false;
    return true;
  }

  /* Gemini·ChatGPT 아이콘 바로 위에 놓습니다 (아이콘 높이를 실제로 재서) */
  function placeMini() {
    if (!mini) return;
    var b = 24;
    var anchor = document.getElementById('ai-chat-wrap');
    if (anchor) {
      var r = anchor.getBoundingClientRect();
      if (r.height > 0) b = Math.max(24, Math.round(window.innerHeight - r.top) + 12);
    }
    mini.style.bottom = b + 'px';
  }

  function showMini() {
    if (!miniAllowed()) return;
    if (!mini) {
      injectCSS();
      mini = document.createElement('button');
      mini.type = 'button';
      mini.className = 'gb-mini';
      mini.setAttribute('aria-label', T.miniAria || T.mini);
      mini.innerHTML = '<span></span>';
      mini.addEventListener('click', function () {
        track('open_popup_reopen', {});
        open('mini');
      });
      document.body.appendChild(mini);
      window.addEventListener('resize', placeMini, { passive: true });
    }
    mini.querySelector('span').textContent = T.mini;
    mini.classList.add('gb-show');
    placeMini();
    clearTimeout(miniTimer);
    miniTimer = setTimeout(function () { mini.classList.add('gb-in'); }, 20);
  }

  function hideMini() {
    if (!mini) return;
    clearTimeout(miniTimer);
    mini.classList.remove('gb-in');
    miniTimer = setTimeout(function () { mini.classList.remove('gb-show'); }, 300);
  }

  /* ===================== 6. '객실 & 스테이'로 스크롤 ===================== */
  function findTarget() {
    if (CONFIG.scrollTarget) {
      try { var el = document.querySelector(CONFIG.scrollTarget); if (el) return el; } catch (e) {}
    }
    var keys = { ko: '객실', ja: '客室', zh: '客房', en: 'room' };
    var key = (keys[lang] || '객실').toLowerCase();
    var hs = document.querySelectorAll('h1,h2,h3,h4,[class*="title"],[class*="Title"]');
    for (var i = 0; i < hs.length; i++) {
      var txt = (hs[i].textContent || '').toLowerCase().replace(/\s+/g, '');
      if (txt.indexOf(key) !== -1) {
        return (hs[i].closest && hs[i].closest('section,article,div')) || hs[i];
      }
    }
    return null;
  }

  /* 스크롤 후 상단에 붙어 있을 요소(예약바 등)의 높이만큼 덜 내려갑니다 */
  function headerOffset() {
    if (typeof CONFIG.scrollOffset === 'number') return CONFIG.scrollOffset;
    var h = 0;
    var els = document.querySelectorAll('.sticky-wrapper,header,[class*="sticky"],[class*="fixed"]');
    for (var i = 0; i < els.length; i++) {
      var st = getComputedStyle(els[i]);
      if (st.position !== 'sticky' && st.position !== 'fixed') continue;
      var r = els[i].getBoundingClientRect();
      if (r.height > 0 && r.top <= 2) h = Math.max(h, r.height);
    }
    return h + 14;
  }

  function scrollToRooms() {
    var el = findTarget();
    if (!el) { location.hash = '#rooms-target'; return; }
    var y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    var soft = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    try { window.scrollTo({ top: y, behavior: soft ? 'auto' : 'smooth' }); }
    catch (e) { window.scrollTo(0, y); }
  }

  function go() {
    track('open_popup_cta', { lang: lang });
    close('cta');
    setTimeout(scrollToRooms, 180);
  }

  function track(name, params) {
    try {
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, params));
    } catch (e) {}
  }

  /* ===================== 7. 열기 / 닫기 ===================== */
  function build() {
    injectCSS();
    wrap = document.createElement('div');
    wrap.className = 'gb-wrap';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-label', T.line1);
    wrap.innerHTML = markup();
    document.body.appendChild(wrap);

    wrap.addEventListener('click', function (e) {
      var t = e.target;
      if (t.closest && t.closest('[data-gb-go]')) { go(); return; }
      if (t.closest && t.closest('[data-gb-close]')) { close('dismiss'); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && opened) close('esc');
    });
  }

  function open(trigger) {
    if (opened) return;
    if (shown && trigger !== 'manual' && trigger !== 'mini') return;
    shown = true;
    var now = detectLang();
    if (wrap && now !== lang) { wrap.parentNode.removeChild(wrap); wrap = null; }
    lang = now; T = I18N[lang];
    if (!wrap) build();
    opened = true;
    lastFocus = document.activeElement;
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    hideMini();
    wrap.classList.add('gb-on');
    if (CONFIG.showOncePerDay) store(SEEN_KEY, '1');
    var btn = wrap.querySelector('.gb-cta');
    if (btn) setTimeout(function () { btn.focus(); }, 60);
    track('open_popup_view', { trigger: trigger || 'manual' });
  }

  function close(reason) {
    if (!opened) return;
    reason = reason || 'dismiss';
    opened = false;
    wrap.classList.remove('gb-on');
    document.body.style.overflow = prevOverflow || '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    track('open_popup_close', { reason: reason });

    /* 그냥 닫아도 객실 & 스테이로 내려주고, 다시 볼 수 있게 작은 버튼을 남깁니다.
       [지금 적용하기] 는 go() 가 이미 스크롤하므로 여기서는 건드리지 않습니다. */
    if (reason !== 'cta') {
      if (CONFIG.scrollOnClose) setTimeout(scrollToRooms, 160);
      setTimeout(showMini, 420);
    } else {
      setTimeout(showMini, 900);
    }
  }

  /* ===================== 8. 노출 트리거 ===================== */
  function arm() {
    /* 주소 끝에 ?popup=1 → 하루 1회 제한 무시 (테스트·시연용) */
    var force = /[?&]popup=1(&|$)/.test(location.search);

    if (!force && CONFIG.showOncePerDay && store(SEEN_KEY) === '1') {
      console.info('[팝업] 오늘 이미 노출되어 건너뜁니다. '
                 + '(Ctrl+Shift+R 로는 안 풀립니다) '
                 + '다시 보려면 OpenPopup.reset() 후 새로고침, 또는 주소 끝에 ?popup=1');
      return;
    }

    var wait = Math.max(0, Number(CONFIG.delaySeconds) || 0) * 1000;
    if (wait > 0) {
      try { var pre = new Image(); pre.src = CONFIG.artUrl; } catch (e) {}
      setTimeout(function () { open('dwell'); }, wait);
    } else {
      /* 즉시 노출: 그림과 웹폰트가 준비되면 띄웁니다.
         (먼저 띄우면 빈 상자가 보였다가 채워지고, 글꼴이 한 번 바뀌며 출렁입니다)
         배경 탭에서 열렸으면 그 탭을 볼 때 띄우고, 늦어도 900ms 안에는 무조건 띄웁니다. */
      var didOpen = false, armed = false, waiting = 2;
      var fireNow = function () { if (didOpen) return; didOpen = true; open('load'); };
      var fireWhenVisible = function () {
        if (document.visibilityState !== 'hidden') { fireNow(); return; }
        document.addEventListener('visibilitychange', function h() {
          if (document.visibilityState !== 'hidden') {
            document.removeEventListener('visibilitychange', h);
            fireNow();
          }
        });
      };
      var ready = function () { if (armed) return; armed = true; fireWhenVisible(); };
      var step = function () { if (--waiting <= 0) ready(); };

      try {
        var im = new Image();
        im.onload = step; im.onerror = step; im.src = CONFIG.artUrl;
        if (im.complete) step();
      } catch (e) { step(); }

      try {
        if (CONFIG.webfontUrl && document.fonts && document.fonts.load) {
          document.fonts.load(CONFIG.weightTitle + ' 26px "Pretendard Variable"').then(step, step);
        } else { step(); }
      } catch (e) { step(); }

      setTimeout(ready, 900);
    }

    if (CONFIG.exitIntent) {
      document.addEventListener('mouseout', function (e) {
        if (!e.relatedTarget && e.clientY <= 4) open('exit_intent');
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arm);
  else arm();

  window.OpenPopup = {
    open: function () { shown = false; opened = false; open('manual'); },
    close: close,
    reset: function () { try { localStorage.removeItem(SEEN_KEY); } catch (e) {} shown = false; },
    config: CONFIG
  };
})();
