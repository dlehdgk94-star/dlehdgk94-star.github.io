/* =========================================================================
 * 인스타호텔 - 설문 참여 할인 위젯 (js/bookingSurvey.js)  v2.0
 * -------------------------------------------------------------------------
 * 예약결제 페이지에서 설문 3문항에 답하면 문항당 1,000원씩 최대 3,000원 할인.
 * 쿠폰 코드가 없습니다. 답하는 즉시 우측 결제금액이 깎입니다.
 *
 * Q1 어떻게 알게 되셨나요            → 선택 시 1,000원 ('기타'는 자유 입력을 적어야 인정)
 * Q2 이번 숙박의 주된 목적            → 선택 시 1,000원 ('기타'는 자유 입력을 적어야 인정)
 * Q3 어떤 검색어로 찾으셨나요          → 입력 후 [입력 완료] 를 눌러야 1,000원
 *
 * 2026-09-13: Q4 '공식 인스타그램 팔로우' 문항 삭제, 상한 4,000 → 3,000원.
 *   admin.html 의 parseSurvey() 는 예전 예약을 위해 인스타 해석을 그대로 둔다.
 *
 * ★ 자유 입력이 있는 문항(Q1기타·Q2기타·Q3검색어)은 손님이 아무 글자나 넣을 수
 *   있습니다. 이 값은 booking.html 의 _requestWithSurvey() 가 special_request
 *   한 줄에 이어 붙이고, admin.html 이 다시 쪼개 읽습니다. 구분자(' / ')와
 *   줄바꿈이 값 안에 들어가면 그 파싱이 깨지므로 clean() 에서 미리 걸러냅니다.
 *   화면에 뿌릴 때는 반드시 esc() 를 통과시켜야 합니다.
 * ========================================================================= */
(function (w) {
  'use strict';

  var PER = 1000;   // 문항당 할인액
  var MAX = 3000;   // 최대 할인액 (조작 방지용 상한) — booking.html 표기와 함께 바꿀 것
  var FREE_MAX = 60;   // 자유 입력 최대 글자수

  var Q1 = {
    key: 'source',
    title: '인스타호텔을 어떻게 알게 되셨나요?',
    options: ['네이버 검색', '네이버 지도·플레이스', '네이버 블로그', '카카오맵',
              '티맵', '카카오내비', '구글 검색', '구글 지도',
              'ChatGPT·Gemini 등 AI 검색', '인스타그램', '지인·회사 추천',
              '이전에 이용했어요', '기타'],
    etcPh: '어떻게 알게 되셨는지 적어주세요'
  };
  var Q2 = {
    key: 'purpose',
    title: '이번 숙박의 주된 목적은 무엇인가요?',
    options: ['출장·비즈니스', '여행·관광', '친구 모임', '친척·지인 방문',
              '골프', '병원 진료·검진', '시험·면접·학교 일정', '전시회·박람회·컨벤션',
              '공연·축제·행사 관람', '스포츠 경기·대회 참가', '이사·집수리',
              '반려동물 동반', '장기 숙박', '기타'],
    etcPh: '어떤 목적인지 적어주세요'
  };
  var ETC = '기타';

  var GOLD = 'linear-gradient(180deg,#FDE9A6 0%,#FAD478 38%,#F3B94C 72%,#E3A337 100%)';

  var CSS = [
    '.sv-wrap{--sv-ink:rgb(28,28,28);--sv-line:#e8e8e8;--sv-accent:#1A1A1A;}',
    '.sv-top{display:flex;align-items:center;gap:12px;background:#faf7f2;border-radius:10px;padding:13px 16px;margin-bottom:20px;}',
    '.sv-top-l{font-size:13px;color:#6b7681;white-space:nowrap;}',
    '.sv-track{flex:1;height:7px;border-radius:99px;background:#e6e0d6;overflow:hidden;}',
    /* 금색은 booking.html 섹션 제목(.section-pill)과 같은 그라데이션.
       글씨는 #2A1B05 — 금색 바탕에 흰 글씨는 대비 1.8:1 이라 읽히지 않는다. */
    '.sv-track i{display:block;height:100%;border-radius:99px;background:' + GOLD + ';transition:width .25s ease;}',
    '.sv-amt{font-size:16px;font-weight:800;white-space:nowrap;font-variant-numeric:tabular-nums;color:#b9bfc5;}',
    '.sv-amt.on{color:var(--sv-accent);}',
    '.sv-q{margin-bottom:22px;}',
    '.sv-q:last-child{margin-bottom:0;}',
    '.sv-qh{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;}',
    '.sv-qk{font-size:12px;font-weight:800;color:var(--sv-ink);}',
    '.sv-qt{font-size:14.5px;font-weight:600;color:var(--sv-ink);}',
    '.sv-qp{font-size:12px;font-weight:700;color:#8a8a8a;white-space:nowrap;}',
    '.sv-qp.done{color:var(--sv-accent);}',
    '.sv-sub{font-size:12.5px;color:#8a8a8a;margin-top:6px;line-height:1.6;}',
    '.sv-chips{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:11px;}',
    '.sv-chip{border:1.5px solid var(--sv-line);border-radius:9px;padding:11px 6px;text-align:center;',
    'font-size:13px;color:#3d4853;cursor:pointer;user-select:none;transition:border-color .12s,background .12s;}',
    '.sv-chip:hover{border-color:#b5b5b5;}',
    '.sv-chip.on{border-color:#E3A337;background:' + GOLD + ';color:#2A1B05;font-weight:600;}',
    '.sv-box2{margin-top:11px;border:1.5px solid var(--sv-line);border-radius:9px;padding:14px 16px;}',
    '.sv-box2.on{border-color:#E3A337;}',
    '.sv-input{margin-top:10px;}',
    '.sv-input input{width:100%;border:1.5px solid var(--sv-line);border-radius:8px;padding:11px 13px;',
    'font-size:14px;color:var(--sv-ink);outline:none;background:#fff;}',
    '.sv-input input::placeholder{color:#c4c4c4;}',
    '.sv-input input:focus{border-color:#E3A337;}',
    '.sv-input input:disabled{background:#f7f7f7;color:#7a7a7a;}',
    '.sv-row{display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap;}',
    '.sv-row .sv-input{flex:1;min-width:180px;margin-top:0;}',
    '.sv-btn{flex:none;border:0;border-radius:8px;padding:12px 18px;font:inherit;font-size:13.5px;',
    'font-weight:700;cursor:pointer;background:' + GOLD + ';color:#2A1B05;white-space:nowrap;}',
    '.sv-btn:disabled{background:#ececec;color:#a6a6a6;cursor:default;}',
    '.sv-btn.undo{background:none;color:#8a8a8a;font-weight:600;text-decoration:underline;padding:12px 6px;}',
    '.sv-done{display:flex;align-items:center;gap:8px;margin-top:10px;font-size:13.5px;color:var(--sv-ink);flex-wrap:wrap;}',
    '.sv-done b{font-weight:700;}',
    '.sv-note{display:block;font-size:12px;color:#9a9a9a;margin-top:8px;line-height:1.55;}',
    '.sv-note.hide{display:none;}',
    '.sv-etc{border-color:#E3A337 !important;background:#fffdf8 !important;}',
    '.sv-etc.ok{border-color:var(--sv-line) !important;background:#fff !important;}',
    '.sv-foot{margin-top:18px;padding-top:14px;border-top:1px solid #f0f0f0;font-size:12px;color:#9a9a9a;line-height:1.6;}',
    '@media(max-width:720px){.sv-chips{grid-template-columns:repeat(2,1fr);}',
    '.sv-row .sv-input{min-width:100%;}.sv-btn{width:100%;}}'
  ].join('');

  function injectCss() {
    var old = document.getElementById('sv-css');
    if (old) old.remove();          // 버전이 올라가면 예전 스타일을 덮어쓴다
    var s = document.createElement('style');
    s.id = 'sv-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* 자유 입력 정리 — special_request 한 줄에 실려 가므로
     줄바꿈과 구분자('/')가 값 안에 남아 있으면 관리자 페이지 파싱이 깨진다.
     '[' 도 막는다: 손님이 '[설문] ...' 을 흉내내 가짜 줄을 만들 수 있다. */
  function clean(s) {
    return String(s == null ? '' : s)
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/[\/\[\]]/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .trim()
      .slice(0, FREE_MAX);
  }

  function won(n) { return n.toLocaleString('ko-KR') + '원'; }

  function Widget(opts) {
    this.o = opts;
    var v = opts.value || {};
    this.source     = v.source     || null;
    this.sourceEtc  = v.sourceEtc  || '';
    this.purpose    = v.purpose    || null;
    this.purposeEtc = v.purposeEtc || '';
    this.kw         = v.keyword    || '';
    this.kwLocked   = !!v.keyword;
    this.el = opts.container;
    injectCss();
    this._bind();
    this.render();
    this._emit();
  }

  /* '기타' 는 자유 입력을 적어야 인정한다 (그냥 고르기만 하면 할인 없음) */
  Widget.prototype._q1Ok = function () {
    return !!this.source && (this.source !== ETC || clean(this.sourceEtc).length > 0);
  };
  Widget.prototype._q2Ok = function () {
    return !!this.purpose && (this.purpose !== ETC || clean(this.purposeEtc).length > 0);
  };
  Widget.prototype._kwOk = function () { return this.kwLocked && clean(this.kw).length > 0; };

  Widget.prototype.discount = function () {
    var n = 0;
    if (this._q1Ok())  n += PER;
    if (this._q2Ok())  n += PER;
    if (this._kwOk())  n += PER;
    return Math.min(n, MAX);
  };

  Widget.prototype.value = function () {
    return {
      source:     this._q1Ok() ? this.source : null,
      sourceEtc:  (this._q1Ok() && this.source === ETC) ? clean(this.sourceEtc) : '',
      purpose:    this._q2Ok() ? this.purpose : null,
      purposeEtc: (this._q2Ok() && this.purpose === ETC) ? clean(this.purposeEtc) : '',
      keyword:    this._kwOk() ? clean(this.kw) : '',
      discount:   this.discount()
    };
  };

  Widget.prototype._emit = function () { if (this.o.onChange) this.o.onChange(this.value()); };

  Widget.prototype._bind = function () {
    var self = this;

    this.el.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-sv]');
      if (!t || !self.el.contains(t)) return;
      var a = t.getAttribute('data-sv');

      if (a === 'q1' || a === 'q2') {
        var key = a === 'q1' ? 'source' : 'purpose';
        var val = t.getAttribute('data-v');
        self[key] = (self[key] === val) ? null : val;    // 다시 누르면 해제
        if (self[key] !== ETC) self[key === 'source' ? 'sourceEtc' : 'purposeEtc'] = '';
        self.render(); self._emit();
        if (self[key] === ETC) self._focus(a === 'q1' ? '#svEtc1' : '#svEtc2');

      } else if (a === 'kwlock') {
        if (!clean(self.kw)) return;
        self.kwLocked = true;  self.render(); self._emit();
      } else if (a === 'kwedit') {
        self.kwLocked = false; self.render(); self._emit(); self._focus('#svKw');
      }
    });

    /* 입력 중에는 절대 다시 그리지 않는다 — 포커스와 한글 조합이 끊긴다 */
    this.el.addEventListener('input', function (ev) {
      var id = ev.target.id;
      if      (id === 'svEtc1') self.sourceEtc = ev.target.value;
      else if (id === 'svEtc2') self.purposeEtc = ev.target.value;
      else if (id === 'svKw')   self.kw = ev.target.value;
      else return;
      self._refreshLive();
      self._emit();
    });

    /* 엔터로도 확정되게 */
    this.el.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Enter') return;
      if (ev.target.id === 'svKw' && clean(self.kw)) {
        ev.preventDefault(); self.kwLocked = true; self.render(); self._emit();
      }
    });
  };

  Widget.prototype._focus = function (sel) {
    var i = this.el.querySelector(sel);
    if (i) { i.focus(); var n = i.value.length; try { i.setSelectionRange(n, n); } catch (e) {} }
  };

  /* 타이핑 중 갱신해도 되는 것만 — 게이지와 버튼 활성 상태 */
  Widget.prototype._refreshLive = function () {
    var d = this.discount();
    var amt = this.el.querySelector('.sv-amt');
    var bar = this.el.querySelector('.sv-track i');
    if (amt) { amt.textContent = won(d); amt.className = 'sv-amt' + (d ? ' on' : ''); }
    if (bar) bar.style.width = (d / MAX * 100) + '%';
    var kb = this.el.querySelector('[data-sv="kwlock"]');
    if (kb) kb.disabled = !clean(this.kw);

    /* '기타' 자유 입력은 글자가 들어온 순간 할인이 붙으므로 알약도 같이 바꾼다 */
    var self = this;
    [['svP1', this._q1Ok(), 'svEtc1'], ['svP2', this._q2Ok(), 'svEtc2']].forEach(function (t) {
      var pill = self.el.querySelector('#' + t[0]);
      if (pill) {
        pill.textContent = t[1] ? '1,000원 할인 적용됨' : '1,000원 할인 받기';
        pill.className = 'sv-qp' + (t[1] ? ' done' : '');
      }
      var inp  = self.el.querySelector('#' + t[2]);
      var note = self.el.querySelector('#' + t[2] + 'n');
      if (inp)  inp.className  = 'sv-etc' + (t[1] ? ' ok' : '');
      if (note) note.className = 'sv-note' + (t[1] ? ' hide' : '');
    });
  };

  Widget.prototype._chips = function (q, sel, tag) {
    return q.options.map(function (o) {
      return '<div class="sv-chip' + (sel === o ? ' on' : '') + '" data-sv="' + tag +
             '" data-v="' + esc(o) + '">' + esc(o) + '</div>';
    }).join('');
  };

  Widget.prototype._pill = function (ok, id) {
    return '<span class="sv-qp' + (ok ? ' done' : '') + '"' + (id ? ' id="' + id + '"' : '') + '>' +
           (ok ? '1,000원 할인 적용됨' : '1,000원 할인 받기') + '</span>';
  };

  Widget.prototype._etcBox = function (q, sel, val, id) {
    if (sel !== ETC) return '';
    var ok = clean(val).length > 0;
    return '<div class="sv-input"><input id="' + id + '" class="sv-etc' + (ok ? ' ok' : '') +
             '" type="text" maxlength="' + FREE_MAX + '" placeholder="' + esc(q.etcPh) +
             '" autocomplete="off" value="' + esc(val) + '"></div>' +
           '<span class="sv-note' + (ok ? ' hide' : '') + '" id="' + id + 'n">' +
             '적어주셔야 1,000원 할인이 적용됩니다.</span>';
  };

  Widget.prototype.render = function () {
    var d     = this.discount();
    var kwOk  = this._kwOk();

    var q3body = kwOk
      ? '<div class="sv-done"><span>검색어 <b>' + esc(clean(this.kw)) + '</b> 로 찾으셨군요. 감사합니다.</span>' +
          '<button type="button" class="sv-btn undo" data-sv="kwedit">수정</button></div>'
      : '<div class="sv-row">' +
          '<div class="sv-input"><input id="svKw" type="text" maxlength="' + FREE_MAX +
            '" placeholder="예) 수원 호텔, 영통 숙소, 망포역 호텔, 삼성전자 근처 숙소" autocomplete="off" value="' +
            esc(this.kw) + '"></div>' +
          '<button type="button" class="sv-btn" data-sv="kwlock"' + (clean(this.kw) ? '' : ' disabled') +
            '>입력 완료 · 1,000원 할인받기</button>' +
        '</div>';

    this.el.innerHTML =
      '<div class="sv-wrap">' +
        '<div class="sv-top">' +
          '<span class="sv-top-l">현재 할인</span>' +
          '<span class="sv-track"><i style="width:' + (d / MAX * 100) + '%"></i></span>' +
          '<span class="sv-amt' + (d ? ' on' : '') + '">' + won(d) + '</span>' +
        '</div>' +

        '<div class="sv-q">' +
          '<div class="sv-qh"><span class="sv-qk">Q1</span><span class="sv-qt">' + esc(Q1.title) + '</span>' +
            this._pill(this._q1Ok(), 'svP1') + '</div>' +
          '<div class="sv-chips">' + this._chips(Q1, this.source, 'q1') + '</div>' +
          this._etcBox(Q1, this.source, this.sourceEtc, 'svEtc1') +
        '</div>' +

        '<div class="sv-q">' +
          '<div class="sv-qh"><span class="sv-qk">Q2</span><span class="sv-qt">' + esc(Q2.title) + '</span>' +
            this._pill(this._q2Ok(), 'svP2') + '</div>' +
          '<div class="sv-chips">' + this._chips(Q2, this.purpose, 'q2') + '</div>' +
          this._etcBox(Q2, this.purpose, this.purposeEtc, 'svEtc2') +
        '</div>' +

        '<div class="sv-q">' +
          '<div class="sv-qh"><span class="sv-qk">Q3</span>' +
            '<span class="sv-qt">어떤 검색어로 인스타호텔을 찾으셨나요?</span>' + this._pill(kwOk) + '</div>' +
          '<div class="sv-sub">실제로 검색하셨던 문구를 그대로 적어주세요.</div>' +
          '<div class="sv-box2' + (kwOk ? ' on' : '') + '">' + q3body + '</div>' +
        '</div>' +

        '<div class="sv-foot">답하신 항목만큼 바로 할인됩니다 (문항당 1,000원 · 최대 ' + won(MAX) + '). ' +
        '숙박 예약 1건당 1회 적용되며, 이름·연락처는 이 설문에 쓰이지 않습니다.</div>' +
      '</div>';
  };

  w.BookingSurvey = {
    PER: PER,
    MAX: MAX,
    clean: clean,
    mount: function (opts) { return new Widget(opts); }
  };
})(window);
