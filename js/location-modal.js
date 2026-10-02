/* =========================================================================
 * 호텔인스타 - 오시는 길 모달 (js/location-modal.js)  v1.0
 * -------------------------------------------------------------------------
 * 마크업·CSS·동작이 index.html 안에만 있어서, 같은 지도 아이콘을 쓰는
 * rooms / gallery / nearby / suwon-events 네 페이지에서는 눌러도 아무 일도
 * 일어나지 않았다(openLocationModal 이 undefined). 셋을 이 파일로 모아
 * 다섯 페이지가 함께 쓴다.
 *
 * ★ 번역: 모달 안에 data-i18n 이 여러 개 있는데, 주입은 translations.js 가
 *   번역을 끝낸 뒤에 일어난다. 그대로 두면 모달만 한국어로 남으므로
 *   주입 직후 setLanguage() 를 다시 호출한다.
 * ========================================================================= */
(function (w, d) {
  'use strict';

  var CSS = `
/* ── 오시는 길 팝업 ── */
#locationModal { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:10000; align-items:center; justify-content:center; padding:20px; backdrop-filter:blur(4px); }
#locationModal.open { display:flex; }
.loc-modal-box { background:#fff; border-radius:20px; width:100%; max-width:860px; max-height:90vh; display:flex; flex-direction:column; box-shadow:0 28px 70px rgba(0,0,0,0.28); overflow:hidden; animation:locPop 0.3s cubic-bezier(0.2,0.8,0.2,1); }
@keyframes locPop { from { opacity:0; transform:scale(0.95) translateY(14px); } to { opacity:1; transform:none; } }
.loc-modal-header { display:flex; justify-content:space-between; align-items:center; padding:20px 28px; border-bottom:1px solid #ebebeb; flex-shrink:0; }
.loc-modal-header-left { display:flex; flex-direction:column; gap:3px; }
.loc-modal-tag { font-size:11px; font-weight:600; color:rgb(112,112,112); letter-spacing:0.5px; text-transform:uppercase; }
.loc-modal-title { font-size:20px; font-weight:700; color:rgb(28,28,28); letter-spacing:-0.4px; }
.loc-modal-close { background:none; border:none; font-size:22px; cursor:pointer; color:rgb(112,112,112); width:36px; height:36px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.15s; flex-shrink:0; }
.loc-modal-close:hover { background:#f0f0f0; color:rgb(28,28,28); }
.loc-modal-body { display:flex; flex:1; overflow:hidden; }
.loc-modal-info { width:320px; flex-shrink:0; padding:24px 28px; overflow-y:auto; border-right:1px solid #ebebeb; display:flex; flex-direction:column; gap:0; }
.loc-modal-address { margin-bottom:20px; }
.loc-modal-address strong { display:block; font-size:14px; font-weight:700; color:rgb(28,28,28); margin-bottom:6px; }
.loc-modal-address p { font-size:13px; color:rgb(80,80,80); line-height:1.65; margin:0 0 3px; }
.loc-modal-address a { font-size:13px; color:rgb(42,145,168); text-decoration:none; font-weight:600; display:inline-flex; align-items:center; gap:5px; margin-top:10px; }
.loc-modal-address a:hover { text-decoration:underline; }
.loc-modal-divider { border:none; border-top:1px solid #f0f0f0; margin:0 0 16px; }
.loc-modal-transport-title { font-size:11px; font-weight:700; color:rgb(112,112,112); letter-spacing:0.5px; text-transform:uppercase; margin-bottom:12px; }
.loc-modal-acc-item { display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid #f4f4f4; cursor:pointer; font-size:13px; font-weight:600; color:rgb(28,28,28); transition:color 0.2s; user-select:none; }
.loc-modal-acc-item:hover { color:rgb(42,145,168); }
.loc-modal-acc-left { display:flex; align-items:center; gap:9px; }
.loc-modal-acc-left i { width:16px; color:rgb(42,145,168); }
.loc-modal-acc-chevron { font-size:11px; color:rgb(160,160,160); transition:transform 0.25s; }
.loc-modal-acc-item.acc-open .loc-modal-acc-chevron { transform:rotate(180deg); }
.loc-modal-acc-content { display:none; padding:10px 0 14px 25px; }
.loc-modal-acc-content.acc-open { display:block; }
.loc-modal-acc-content ul { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px; }
.loc-modal-acc-content li { font-size:12px; color:rgb(80,80,80); line-height:1.6; padding-left:10px; border-left:2px solid #e0e0e0; }
.loc-modal-acc-content li strong { color:rgb(28,28,28); }
.loc-modal-map { flex:1; overflow:hidden; }
.loc-modal-map iframe { width:100%; height:100%; border:none; display:block; }
`;

  var HTML = `
<!-- 오시는 길 팝업 -->
<div id="locationModal" onclick="closeLocationModal(event)">
    <div class="loc-modal-box">
        <div class="loc-modal-header">
            <div class="loc-modal-header-left">
                <span class="loc-modal-tag" data-i18n="loc.subtitle">호텔 위치</span>
                <span class="loc-modal-title" data-i18n="loc.title">오시는 길</span>
            </div>
            <button class="loc-modal-close" onclick="closeLocationModalBtn()">&times;</button>
        </div>
        <div class="loc-modal-body">
            <div class="loc-modal-info">
                <div class="loc-modal-address">
                    <strong>INSTA HOTEL</strong>
                    <p data-i18n-html="loc.address">경기도 수원시 영통구 영통로 94-6, 대한민국</p>
                    <p><span data-i18n="loc.tel">전화:</span> +82 31-203-4301</p>
                    <a href="https://map.naver.com/p/entry/place/1630717211?placePath=%2Fhome" target="_blank" rel="noopener">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> <span data-i18n="loc.modal.naver">네이버 지도로 보기</span>
                    </a>
                </div>
                <hr class="loc-modal-divider">
                <div class="loc-modal-transport-title" data-i18n="loc.modal.transport">교통편 안내</div>

                <div class="loc-modal-acc-item" onclick="toggleLocAcc(this)">
                    <div class="loc-modal-acc-left"><i class="fa-solid fa-plane-departure"></i><span data-i18n="loc.acc.incheon">인천국제공항</span></div>
                    <i class="fa-solid fa-chevron-down loc-modal-acc-chevron"></i>
                </div>
                <div class="loc-modal-acc-content">
                    <ul>
                        <li data-i18n-html="loc.modal.incheon.1"><strong>공항리무진 A4100</strong> — 망포역 7번 출구 탑승 → T1·T2<br>약 1시간 40분 / 13,500원</li>
                        <li data-i18n-html="loc.modal.incheon.2"><strong>지하철+공항철도</strong> — 망포역(수인분당선) 환승, 약 2시간</li>
                        <li data-i18n-html="loc.modal.incheon.3"><strong>택시 / 자가용</strong> — 약 70km, 약 1시간~1시간 20분</li>
                    </ul>
                </div>

                <div class="loc-modal-acc-item" onclick="toggleLocAcc(this)">
                    <div class="loc-modal-acc-left"><i class="fa-solid fa-plane"></i><span data-i18n="loc.acc.gimpo">김포국제공항</span></div>
                    <i class="fa-solid fa-chevron-down loc-modal-acc-chevron"></i>
                </div>
                <div class="loc-modal-acc-content">
                    <ul>
                        <li data-i18n-html="loc.modal.gimpo.1"><strong>지하철</strong> — 망포역에서 김포공항역까지 약 1시간 20~40분</li>
                        <li data-i18n-html="loc.modal.gimpo.2"><strong>택시 / 자가용</strong> — 약 45km, 약 50분~1시간</li>
                    </ul>
                </div>

                <div class="loc-modal-acc-item" onclick="toggleLocAcc(this)">
                    <div class="loc-modal-acc-left"><i class="fa-solid fa-bus-simple"></i><span data-i18n="loc.acc.other">기타 교통수단</span></div>
                    <i class="fa-solid fa-chevron-down loc-modal-acc-chevron"></i>
                </div>
                <div class="loc-modal-acc-content">
                    <ul>
                        <li data-i18n-html="loc.modal.other.1"><strong>지하철</strong> — 수인분당선 망포역 (도보 이동)</li>
                        <li data-i18n-html="loc.modal.other.2"><strong>시내버스</strong> — 7-1 / 7-1A (동탄1차고지 ↔ 경기대정문 등) · 13-5 (동탄1차고지 ↔ 당수동) · 20-2 (망포역 ↔ 신영통현대아파트단지 순환) · 34 / 34-1 (수원동부차고지 ↔ 병점역/왕림리) · 62-1 (동탄 ↔ 성균관대역) · 92-1 (동탄차고지 ↔ 성균관대역) · 98 (이목동차고지 ↔ 반월동)</li>
                        <li data-i18n-html="loc.modal.other.3"><strong>시외버스</strong> — 1550-1 (한신대 ↔ 신논현역·강남역)</li>
                        <li data-i18n-html="loc.modal.other.4"><strong>주차</strong> — 투숙객 전용 주차장 무료 이용 (사전예약 불필요)</li>
                    </ul>
                </div>

                <!-- 주요 비즈니스 -->
                <div class="loc-modal-acc-item" onclick="toggleLocAcc(this)">
                    <div class="loc-modal-acc-left"><i class="fa-solid fa-briefcase"></i><span data-i18n="loc.acc.biz">주요 비즈니스</span></div>
                    <i class="fa-solid fa-chevron-down loc-modal-acc-chevron"></i>
                </div>
                <div class="loc-modal-acc-content">
                    <ul>
                        <li data-i18n-html="loc.acc.biz.1"><strong>삼성디지털시티</strong> — 차량 약 8분<br>삼성전자 본사 및 연구시설이 위치한 글로벌 IT 비즈니스 중심지.</li>
                        <li data-i18n-html="loc.acc.biz.2"><strong>삼성전자 기흥캠퍼스</strong> — 차량 약 10분<br>반도체 연구 및 생산시설로 국내외 비즈니스 출장객이 많이 방문하는 사업장.</li>
                        <li data-i18n-html="loc.acc.biz.3"><strong>삼성전자 화성캠퍼스</strong> — 차량 약 6분<br>세계적인 반도체 생산시설로 국내외 기업과 협력사의 방문이 활발한 사업장.</li>
                        <li data-i18n-html="loc.acc.biz.4"><strong>삼성전자 인재개발원</strong> — 차량 약 6분<br>국내외 임직원 교육과 연수가 진행되는 삼성전자 교육시설.</li>
                        <li data-i18n-html="loc.acc.biz.5"><strong>삼성이노베이션뮤지엄(SIM)</strong> — 차량 약 9분<br>삼성전자의 기술과 혁신을 소개하는 전시관으로 국내외 방문객이 찾는 기업 문화 공간.</li>
                        <li data-i18n-html="loc.acc.biz.6"><strong>수원컨벤션센터</strong> — 차량 약 15분<br>국제회의, 전시회, 박람회, 학회 등 다양한 MICE 행사가 개최되는 경기 남부 대표 컨벤션센터.</li>
                        <li data-i18n-html="loc.acc.biz.7"><strong>수원메쎄</strong> — 차량 약 20분<br>전시회, 박람회, 산업행사 등 연중 다양한 행사가 개최되는 수도권 대표 전시장.</li>
                        <li data-i18n-html="loc.acc.biz.8"><strong>광교테크노밸리</strong> — 차량 약 15분<br>IT·바이오 기업과 연구기관이 모여 있는 첨단산업단지.</li>
                        <li data-i18n-html="loc.acc.biz.9"><strong>경희대학교 국제캠퍼스</strong> — 차량 약 7분<br>국제행사, 학회, 교육 프로그램 등 다양한 방문 수요가 있는 캠퍼스.</li>
                        <li data-i18n-html="loc.acc.biz.10"><strong>아주대학교병원</strong> — 차량 약 15분<br>의료 방문과 보호자 숙박 수요가 많은 상급종합병원.</li>
                    </ul>
                </div>
            </div>
            <div class="loc-modal-map">
                <iframe data-src="https://maps.google.com/maps?q=37.2377421,127.0593218&z=17&output=embed&hl=ko" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" style="width:100%;height:100%;border:none;display:block;"></iframe>
            </div>
        </div>
    </div>
</div>
`;

  function openLocationModal(e) {
      e.preventDefault();
      var modal = document.getElementById('locationModal');
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      var mIframe = modal.querySelector('.loc-modal-map iframe[data-src]');
      if (mIframe) { mIframe.src = mIframe.getAttribute('data-src'); mIframe.removeAttribute('data-src'); }
  }
  function closeLocationModal(e) {
      if (e.target === document.getElementById('locationModal')) {
          document.getElementById('locationModal').classList.remove('open');
          document.body.style.overflow = '';
      }
  }
  function closeLocationModalBtn() {
      document.getElementById('locationModal').classList.remove('open');
      document.body.style.overflow = '';
  }
  function toggleLocAcc(item) {
      var content = item.nextElementSibling;
      var isOpen = item.classList.contains('acc-open');
      item.classList.toggle('acc-open', !isOpen);
      content.classList.toggle('acc-open', !isOpen);
  }

  /* 인라인 onclick 에서 부르므로 전역에 올린다 */
  w.openLocationModal    = openLocationModal;
  w.closeLocationModal   = closeLocationModal;
  w.closeLocationModalBtn= closeLocationModalBtn;
  w.toggleLocAcc         = toggleLocAcc;

  function inject() {
    if (d.getElementById('locationModal')) return;   /* index.html 등 이미 있으면 건너뜀 */

    var st = d.createElement('style');
    st.id = 'loc-modal-css';
    st.textContent = CSS;
    (d.head || d.documentElement).appendChild(st);

    var tmp = d.createElement('div');
    tmp.innerHTML = HTML;
    while (tmp.firstElementChild) d.body.appendChild(tmp.firstElementChild);

    /* 저장된 언어를 직접 읽는다 — translations.js 의 초기화보다 먼저 돌아도
       currentLang 기본값(ko)으로 되돌려 버리지 않도록. */
    if (typeof w.setLanguage === 'function') {
      var lang = w.currentLang;
      try { lang = localStorage.getItem('siteLang') || sessionStorage.getItem('siteLang') || lang; } catch (e) {}
      try { w.setLanguage(lang); } catch (e) {}
    }
  }

  /* ESC 로 닫기 — index.html 에는 자체 핸들러가 있지만 나머지 네 페이지에는 없다.
     둘 다 돌아도 이미 닫힌 모달을 또 닫는 것뿐이라 문제없다. */
  d.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var el = d.getElementById('locationModal');
    if (el && el.classList.contains('open')) closeLocationModalBtn();
  });

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', inject);
  else inject();
})(window, document);
