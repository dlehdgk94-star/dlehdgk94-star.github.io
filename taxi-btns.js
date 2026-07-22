(function () {
    var kakaoSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.5 31.22"><g transform="translate(-218.2681,-557.008)"><path d="m 246.9821,588.228 h -26.209 c -1.384,0 -2.505,-1.122 -2.505,-2.505 v -26.209 c 0,-1.384 1.121,-2.506 2.505,-2.506 h 26.209 c 1.384,0 2.505,1.122 2.505,2.506 v 26.209 c 0,1.383 -1.121,2.505 -2.505,2.505" fill="#20284f"/><path d="m 243.243,563.252 h -18.732 v 2.226 h 18.732 z" fill="#ffea00"/><path d="m 243.2435,568.0508 h -8.014 v 13.933 h 2.336 v -11.707 h 5.678 z" fill="#ffea00"/><path d="m 224.5117,568.0508 v 2.226 h 5.678 v 11.707 h 2.336 v -13.933 z" fill="#ffea00"/></g></svg>';

    var uberSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="15%"/><path fill="#fff" d="M119.8,303.6c17.6,0,31.3-13.6,31.3-33.8V191.3h19.1V318.6H151.3V306.8a45.9,45.9,0,0,1-33.6,14c-27.3,0-48.2-19.8-48.2-49.8V191.4H88.6v78.5c0,20.5,13.4,33.7,31.2,33.7m64.6-112.3h18.4v46.4a46.11,46.11,0,0,1,32.9-13.8,48.45,48.45,0,0,1,0,96.9A46.52,46.52,0,0,1,202.6,307v11.6H184.4V191.3Zm50,113.2a32.2,32.2,0,1,0-32-32.4v.2a32,32,0,0,0,31.8,32.2h.2M339.3,224c26.7,0,46.4,20.5,46.4,48.2v6H310.3A31.09,31.09,0,0,0,341,304.6c10.7,0,19.8-4.4,26.7-13.6l13.3,9.8c-9.3,12.4-23.1,19.8-40,19.8-27.8,0-49.3-20.7-49.3-48.4-.1-26.2,20.5-48.2,47.6-48.2m-28.8,39.6H367c-3.1-14.2-14.5-23.6-28.2-23.6-13.5,0-25,9.5-28.3,23.6m124.4-21.4c-12,0-20.7,9.3-20.7,23.6v52.7H395.8V225.8H414v11.5c4.5-7.5,12-12.2,22.2-12.2h6.4v17.1Z"/></svg>';

    var APP_ADDRESS = '경기도 수원시 영통구 영통로 94-6';

    function getBase() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src && scripts[i].src.indexOf('taxi-btns.js') !== -1) {
                return scripts[i].src.split('taxi-btns.js')[0];
            }
        }
        return '';
    }

    var base = getBase();

    var html = '\
<div id="taxi-btns-wrap">\
    <button class="taxi-btn-item taxi-btn-app" onclick="openAppModal(\'taxi\',\'https://kakaot.com\')" aria-label="카카오T 택시">\
        <div class="taxi-btn-icon">' + kakaoSvg + '</div>\
        <span class="taxi-btn-label">Taxi</span>\
    </button>\
    <button class="taxi-btn-item taxi-btn-app" onclick="openAppModal(\'taxi\',\'https://m.uber.com\')" aria-label="우버">\
        <div class="taxi-btn-icon">' + uberSvg + '</div>\
        <span class="taxi-btn-label">Taxi</span>\
    </button>\
    <div id="food-delivery-group">\
        <div id="food-delivery-icons">\
            <button class="taxi-btn-item food-icon taxi-btn-app" onclick="openAppModal(\'delivery\',\'https://www.baemin.com\')" aria-label="배달의민족">\
                <div class="taxi-btn-icon"><img src="/images/baemin.svg" alt="배민" style="width:100%;height:100%;object-fit:contain;display:block;"></div>\
            </button>\
            <button id="taxi-btn-coupang" class="taxi-btn-item food-icon taxi-btn-app" onclick="openAppModal(\'delivery\',\'https://www.coupangeats.com\')" aria-label="쿠팡이츠">\
                <div class="taxi-btn-icon"><img src="/images/coupang-eats1.svg" alt="쿠팡이츠" style="width:100%;height:100%;object-fit:contain;display:block;"></div>\
            </button>\
        </div>\
        <span class="taxi-btn-label">Order Food Delivery</span>\
    </div>\
</div>\
<div id="mobile-bottom-bar">\
    <button class="mbb-item" onclick="openAppModal(\'taxi\',\'https://kakaot.com\')" aria-label="카카오T 택시">\
        <div class="mbb-icon">' + kakaoSvg + '</div>\
        <span class="mbb-label">Taxi</span>\
    </button>\
    <button class="mbb-item" onclick="openAppModal(\'taxi\',\'https://m.uber.com\')" aria-label="우버">\
        <div class="mbb-icon">' + uberSvg + '</div>\
        <span class="mbb-label">Taxi</span>\
    </button>\
    <button class="mbb-item" onclick="openAppModal(\'delivery\',\'https://www.baemin.com\')" aria-label="배달의민족">\
        <div class="mbb-icon"><img src="/images/baemin.svg" alt="배민" style="width:100%;height:100%;object-fit:contain;display:block;"></div>\
        <span class="mbb-label">Food</span>\
    </button>\
    <button class="mbb-item mbb-coupang" onclick="openAppModal(\'delivery\',\'https://www.coupangeats.com\')" aria-label="쿠팡이츠">\
        <div class="mbb-icon"><img src="/images/coupang-eats1.svg" alt="쿠팡이츠" style="width:100%;height:100%;object-fit:contain;display:block;"></div>\
        <span class="mbb-label">Food</span>\
    </button>\
    <a class="mbb-item" href="https://gemini.google.com" target="_blank" rel="noopener" aria-label="Gemini">\
        <div class="mbb-icon"><img src="/images/gemini-color.svg" alt="Gemini" style="width:100%;height:100%;object-fit:contain;display:block;"></div>\
        <span class="mbb-label">Gemini</span>\
    </a>\
    <button class="mbb-item mbb-chatgpt" onclick="window.toggleAiChat&&window.toggleAiChat()">\
        <div class="mbb-icon mbb-icon-chatgpt"><img src="/images/symbol-icon.png" alt="ChatGPT" style="width:72%;height:72%;object-fit:contain;display:block;"></div>\
        <span class="mbb-label">Chat GPT</span>\
    </button>\
</div>\
<div id="app-modal-overlay" onclick="if(event.target===this)closeAppModal()">\
    <div id="app-modal-card">\
        <button id="app-modal-close" onclick="closeAppModal()" aria-label="닫기">&times;</button>\
        <h3 id="app-modal-title">택시 호출</h3>\
        <div id="app-modal-addr-wrap">\
            <span id="app-modal-addr-label">호텔 주소</span>\
            <div id="app-modal-address">' + APP_ADDRESS + '</div>\
        </div>\
        <p id="app-modal-hint">출발지에 입력하세요</p>\
        <div id="app-modal-btns">\
            <button id="app-modal-copy" onclick="appModalCopy()">주소 복사</button>\
            <a id="app-modal-open" href="#" target="_blank" rel="noopener">앱 열기</a>\
        </div>\
    </div>\
</div>\
<style>\
#taxi-btns-wrap {\
    position: fixed;\
    bottom: 24px;\
    left: 24px;\
    z-index: 99000;\
    display: grid;\
    grid-template-columns: 56px 56px;\
    gap: 14px 12px;\
}\
.taxi-btn-item {\
    display: flex;\
    flex-direction: column;\
    align-items: center;\
    gap: 5px;\
    text-decoration: none;\
    cursor: default;\
    pointer-events: none;\
    width: 56px;\
    background: none;\
    border: none;\
    padding: 0;\
    font-family: "Barlow", sans-serif;\
}\
.taxi-btn-app {\
    pointer-events: auto;\
    cursor: pointer;\
}\
.taxi-btn-app:hover .taxi-btn-icon { transform: scale(1.08); }\
#food-delivery-group {\
    grid-column: 1 / -1;\
    display: flex;\
    flex-direction: column;\
    align-items: center;\
    gap: 5px;\
}\
#food-delivery-icons {\
    display: flex;\
    flex-direction: row;\
    gap: 12px;\
}\
.food-icon {\
    width: 44px;\
}\
.taxi-btn-icon {\
    width: 44px;\
    height: 44px;\
    display: flex;\
    align-items: center;\
    justify-content: center;\
    overflow: hidden;\
    transition: transform 0.2s;\
    flex-shrink: 0;\
}\
#taxi-btn-coupang .taxi-btn-icon { border: 1.5px solid #c8c8c8; border-radius: 10px; }\
.taxi-btn-icon svg { width: 100%; height: 100%; display: block; }\
.taxi-btn-label {\
    font-size: 11px;\
    font-weight: 700;\
    color: rgb(58, 154, 180);\
    font-family: "Barlow", sans-serif;\
    letter-spacing: 0.2px;\
    user-select: none;\
    text-align: center;\
    line-height: 1.4;\
    white-space: nowrap;\
}\
@media (max-width: 768px) {\
    #taxi-btns-wrap { display: none; }\
    body { padding-bottom: 68px !important; }\
}\
#mobile-bottom-bar {\
    display: none;\
    position: fixed;\
    bottom: 0;\
    left: 0;\
    right: 0;\
    width: 100%;\
    background: rgba(255,255,255,0);\
    -webkit-backdrop-filter: blur(12px);\
    backdrop-filter: blur(12px);\
    border-top: 1px solid rgba(0,0,0,0.10);\
    box-shadow: 0 -2px 12px rgba(0,0,0,0.10);\
    z-index: 99000;\
    padding-bottom: env(safe-area-inset-bottom, 0px);\
    box-sizing: border-box;\
}\
@media (max-width: 768px) {\
    #mobile-bottom-bar { display: flex; }\
}\
.mbb-item {\
    flex: 1;\
    display: flex;\
    flex-direction: column;\
    align-items: center;\
    justify-content: center;\
    gap: 3px;\
    padding: 8px 2px 6px;\
    text-decoration: none;\
    background: none;\
    border: none;\
    cursor: pointer;\
    font-family: "Barlow", sans-serif;\
    -webkit-tap-highlight-color: transparent;\
    box-sizing: border-box;\
}\
.mbb-icon {\
    width: 34px;\
    height: 34px;\
    display: flex;\
    align-items: center;\
    justify-content: center;\
    overflow: hidden;\
    flex-shrink: 0;\
}\
.mbb-icon svg { width: 100%; height: 100%; display: block; }\
.mbb-icon-chatgpt {\
    border-radius: 50%;\
    background: #fff;\
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);\
}\
.mbb-coupang .mbb-icon { border: 1.5px solid #c8c8c8; border-radius: 8px; }\
.mbb-label {\
    font-size: 9px;\
    font-weight: 700;\
    color: rgb(30, 110, 140);\
    font-family: "Barlow", sans-serif;\
    letter-spacing: 0.2px;\
    user-select: none;\
    text-align: center;\
    white-space: nowrap;\
    line-height: 1.3;\
    text-shadow: 0 0 2px rgba(255,255,255,0.8);\
}\
#app-modal-overlay {\
    display: none;\
    position: fixed;\
    inset: 0;\
    background: rgba(0,0,0,0.48);\
    z-index: 999999;\
    align-items: center;\
    justify-content: center;\
    padding: 20px;\
    box-sizing: border-box;\
}\
#app-modal-card {\
    position: relative;\
    background: #fff;\
    border-radius: 18px;\
    padding: 28px 22px 22px;\
    width: 100%;\
    max-width: 340px;\
    box-shadow: 0 16px 56px rgba(0,0,0,0.22);\
    font-family: "Barlow", sans-serif;\
}\
#app-modal-close {\
    position: absolute;\
    top: 14px;\
    right: 14px;\
    background: none;\
    border: none;\
    font-size: 24px;\
    line-height: 1;\
    color: rgb(160,160,160);\
    cursor: pointer;\
    padding: 2px 6px;\
    border-radius: 6px;\
    transition: color 0.15s;\
}\
#app-modal-close:hover { color: rgb(28,28,28); }\
#app-modal-title {\
    font-size: 17px;\
    font-weight: 700;\
    color: rgb(28,28,28);\
    margin-bottom: 16px;\
    padding-right: 28px;\
    line-height: 1.3;\
}\
#app-modal-addr-wrap {\
    background: #f4f4f4;\
    border-radius: 10px;\
    padding: 11px 14px;\
    margin-bottom: 10px;\
}\
#app-modal-addr-label {\
    display: block;\
    font-size: 10px;\
    font-weight: 700;\
    color: rgb(140,140,140);\
    text-transform: uppercase;\
    letter-spacing: 0.6px;\
    margin-bottom: 4px;\
}\
#app-modal-address {\
    font-size: 14px;\
    font-weight: 600;\
    color: rgb(28,28,28);\
    line-height: 1.45;\
    word-break: keep-all;\
}\
#app-modal-hint {\
    font-size: 12px;\
    color: rgb(112,112,112);\
    margin-bottom: 20px;\
    line-height: 1.55;\
    white-space: pre-line;\
}\
#app-modal-btns {\
    display: flex;\
    gap: 10px;\
}\
#app-modal-copy {\
    flex: 1;\
    background: #fff;\
    border: 1.5px solid rgb(28,28,28);\
    border-radius: 22px;\
    padding: 11px 4px;\
    font-size: 13px;\
    font-weight: 700;\
    color: rgb(28,28,28);\
    cursor: pointer;\
    font-family: "Barlow", sans-serif;\
    transition: background 0.15s;\
    text-align: center;\
}\
#app-modal-copy:hover { background: #f0f0f0; }\
#app-modal-open {\
    flex: 1;\
    background: rgb(114,107,113);\
    border-radius: 22px;\
    padding: 11px 4px;\
    font-size: 13px;\
    font-weight: 700;\
    color: #fff;\
    font-family: "Barlow", sans-serif;\
    text-decoration: none;\
    display: flex;\
    align-items: center;\
    justify-content: center;\
    transition: background 0.15s;\
    text-align: center;\
}\
#app-modal-open:hover { background: rgb(95,89,94); }\
</style>';

    document.body.insertAdjacentHTML('beforeend', html);

    // ── 모달 열기 ──
    window.openAppModal = function(type, appUrl) {
        var overlay  = document.getElementById('app-modal-overlay');
        var titleEl  = document.getElementById('app-modal-title');
        var labelEl  = document.getElementById('app-modal-addr-label');
        var hintEl   = document.getElementById('app-modal-hint');
        var openBtn  = document.getElementById('app-modal-open');
        var copyBtn  = document.getElementById('app-modal-copy');

        var tFn = (typeof t === 'function') ? t : function(k) { return k; };

        var titleKey = type === 'taxi' ? 'appmodal.taxi.title' : 'appmodal.delivery.title';
        var hintKey  = type === 'taxi' ? 'appmodal.taxi.hint'  : 'appmodal.delivery.hint';

        titleEl.setAttribute('data-i18n', titleKey);
        hintEl.setAttribute('data-i18n', hintKey);

        titleEl.textContent = tFn(titleKey);
        labelEl.textContent = tFn('appmodal.address.label');
        hintEl.textContent  = tFn(hintKey);
        copyBtn.textContent = tFn('appmodal.copy');
        openBtn.textContent = tFn('appmodal.open');
        openBtn.href = appUrl;

        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    // ── 모달 닫기 ──
    window.closeAppModal = function() {
        var overlay = document.getElementById('app-modal-overlay');
        if (overlay) {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    };

    // ── 주소 복사 ──
    window.appModalCopy = function() {
        var copyBtn = document.getElementById('app-modal-copy');
        var tFn = (typeof t === 'function') ? t : function(k) { return k; };

        function feedback() {
            copyBtn.textContent = tFn('appmodal.copied');
            setTimeout(function() { copyBtn.textContent = tFn('appmodal.copy'); }, 2000);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(APP_ADDRESS).then(feedback, feedback);
        } else {
            var el = document.createElement('textarea');
            el.value = APP_ADDRESS;
            el.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
            document.body.appendChild(el);
            el.select();
            try { document.execCommand('copy'); } catch(e) {}
            document.body.removeChild(el);
            feedback();
        }
    };

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') window.closeAppModal();
    });
})();
