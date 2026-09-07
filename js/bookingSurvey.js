/* =========================================================================
 * 인스타호텔 - 설문 참여 할인 위젯 (js/bookingSurvey.js)  v1.0
 * -------------------------------------------------------------------------
 * 예약결제 페이지에서 설문 3문항에 답하면 문항당 1,000원씩 최대 3,000원 할인.
 * 쿠폰 코드가 없습니다. 답하는 즉시 우측 결제금액이 깎입니다.
 *
 * Q1 어떻게 알게 되셨나요        → 선택 시 1,000원
 * Q2 이번 숙박의 주된 목적        → 선택 시 1,000원
 * Q3 인스타 팔로워 500명 이상 + 계정 입력 → 1,000원 (체크인 시 확인 안내)
 * ========================================================================= */
(function (w) {
  'use strict';

  var PER = 1000;   // 문항당 할인액
  var MAX = 3000;   // 최대 할인액 (조작 방지용 상한)

  var Q1 = {
    key: 'source',
    title: '인스타호텔을 어떻게 알게 되셨나요?',
    options: ['네이버 검색·지도', '네이버 블로그', '구글 검색·지도', '인스타그램·SNS',
              '예약 앱', '지인·회사 추천', '전에 묵었어요', '기타']
  };
  var Q2 = {
    key: 'purpose',
    title: '이번 숙박의 주된 목적은 무엇인가요?',
    options: ['출장·비즈니스', '여행·관광', '가족 여행', '운동·대회 참가',
              '시험·학교 일정', '병원·검진', '공연·행사 관람', '친구·지인 방문', '기타']
  };

  var CSS = [
    '.sv-wrap{--sv-ink:rgb(28,28,28);--sv-line:#e8e8e8;--sv-accent:#1A1A1A;}',
    '.sv-top{display:flex;align-items:center;gap:12px;background:#faf7f2;border-radius:10px;padding:13px 16px;margin-bottom:20px;}',
    '.sv-top-l{font-size:13px;color:#6b7681;white-space:nowrap;}',
    '.sv-track{flex:1;height:7px;border-radius:99px;background:#e6e0d6;overflow:hidden;}',
    '.sv-track i{display:block;height:100%;border-radius:99px;background:var(--sv-accent);transition:width .25s ease;}',
    '.sv-amt{font-size:16px;font-weight:800;white-space:nowrap;font-variant-numeric:tabular-nums;color:#b9bfc5;}',
    '.sv-amt.on{color:var(--sv-accent);}',
    '.sv-q{margin-bottom:20px;}',
    '.sv-q:last-child{margin-bottom:0;}',
    '.sv-qh{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;}',
    '.sv-qk{font-size:12px;font-weight:800;color:var(--sv-ink);}',
    '.sv-qt{font-size:14.5px;font-weight:600;color:var(--sv-ink);}',
    '.sv-qp{font-size:12px;font-weight:700;color:#8a8a8a;white-space:nowrap;}',
    '.sv-qp.done{color:var(--sv-accent);}',
    '.sv-chips{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:11px;}',
    '.sv-chip{border:1.5px solid var(--sv-line);border-radius:9px;padding:11px 6px;text-align:center;',
    'font-size:13px;color:#3d4853;cursor:pointer;user-select:none;transition:border-color .12s,background .12s;}',
    '.sv-chip:hover{border-color:#b5b5b5;}',
    '.sv-chip.on{border-color:var(--sv-accent);background:var(--sv-accent);color:#fff;font-weight:600;}',
    '.sv-ig{margin-top:11px;border:1.5px solid var(--sv-line);border-radius:9px;padding:14px 16px;}',
    '.sv-ig.on{border-color:var(--sv-accent);}',
    '.sv-check{display:flex;align-items:flex-start;gap:10px;cursor:pointer;user-select:none;}',
    '.sv-box{width:19px;height:19px;flex-shrink:0;border:1.5px solid #c8c8c8;border-radius:5px;margin-top:1px;',
    'display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;line-height:1;}',
    '.sv-check.on .sv-box{background:var(--sv-accent);border-color:var(--sv-accent);}',
    '.sv-ct{font-size:13.5px;color:#3d4853;line-height:1.55;}',
    '.sv-note{display:block;font-size:12px;color:#9a9a9a;margin-top:5px;line-height:1.55;}',
    '.sv-input{display:none;margin-top:12px;}',
    '.sv-input.show{display:block;}',
    '.sv-input input{width:100%;border:1.5px solid var(--sv-line);border-radius:8px;padding:11px 13px;font-size:14px;color:var(--sv-ink);outline:none;}',
    '.sv-input input:focus{border-color:var(--sv-accent);}',
    '.sv-foot{margin-top:18px;padding-top:14px;border-top:1px solid #f0f0f0;font-size:12px;color:#9a9a9a;line-height:1.6;}',
    '@media(max-width:720px){.sv-chips{grid-template-columns:repeat(2,1fr);}}'
  ].join('');

  function injectCss() {
    if (document.getElementById('sv-css')) return;
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
  function won(n) { return n.toLocaleString('ko-KR') + '원'; }

  function Widget(opts) {
    this.o = opts;
    var v = opts.value || {};
    this.source = v.source || null;
    this.purpose = v.purpose || null;
    this.igChecked = !!v.igChecked;
    this.ig = v.instagram || '';
    this.el = opts.container;
    injectCss();
    this._bind();
    this.render();
    this._emit();
  }

  /* 인스타 계정은 체크 + 계정 입력이 둘 다 있어야 인정 */
  Widget.prototype._igValid = function () {
    return this.igChecked && this.ig.trim().replace(/^@/, '').length >= 2;
  };

  Widget.prototype.discount = function () {
    var n = 0;
    if (this.source) n += PER;
    if (this.purpose) n += PER;
    if (this._igValid()) n += PER;
    return Math.min(n, MAX);
  };

  Widget.prototype.value = function () {
    return {
      source: this.source,
      purpose: this.purpose,
      igChecked: this.igChecked,
      instagram: this._igValid() ? '@' + this.ig.trim().replace(/^@/, '') : '',
      discount: this.discount()
    };
  };

  Widget.prototype._emit = function () {
    if (this.o.onChange) this.o.onChange(this.value());
  };

  Widget.prototype._bind = function () {
    var self = this;
    this.el.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-sv]');
      if (!t || !self.el.contains(t)) return;
      var a = t.getAttribute('data-sv');
      if (a === 'q1' || a === 'q2') {
        var key = a === 'q1' ? 'source' : 'purpose';
        var val = t.getAttribute('data-v');
        self[key] = (self[key] === val) ? null : val;   // 다시 누르면 해제
        self.render(); self._emit();
      } else if (a === 'igcheck') {
        self.igChecked = !self.igChecked;
        if (!self.igChecked) self.ig = '';
        self.render(); self._emit();
        if (self.igChecked) {
          var inp = self.el.querySelector('#svIg');
          if (inp) inp.focus();
        }
      }
    });
    this.el.addEventListener('input', function (ev) {
      if (ev.target.id !== 'svIg') return;
      self.ig = ev.target.value;
      self._updateMeter();      // 입력 중에는 다시 그리지 않음 (포커스 유지)
      self._emit();
    });
  };

  /* 입력 중 화면 전체를 다시 그리면 포커스가 날아가므로 게이지만 갱신 */
  Widget.prototype._updateMeter = function () {
    var d = this.discount();
    var amt = this.el.querySelector('.sv-amt');
    var bar = this.el.querySelector('.sv-track i');
    var q3p = this.el.querySelector('#svQ3p');
    if (amt) { amt.textContent = won(d); amt.className = 'sv-amt' + (d ? ' on' : ''); }
    if (bar) bar.style.width = (d / MAX * 100) + '%';
    if (q3p) {
      q3p.textContent = this._igValid() ? '1,000원 할인 적용됨' : '1,000원 할인 받기';
      q3p.className = 'sv-qp' + (this._igValid() ? ' done' : '');
    }
    var box = this.el.querySelector('.sv-ig');
    if (box) box.className = 'sv-ig' + (this._igValid() ? ' on' : '');
  };

  Widget.prototype._chips = function (q, sel, tag) {
    return q.options.map(function (o) {
      return '<div class="sv-chip' + (sel === o ? ' on' : '') + '" data-sv="' + tag +
             '" data-v="' + esc(o) + '">' + esc(o) + '</div>';
    }).join('');
  };

  Widget.prototype.render = function () {
    var d = this.discount();
    var igOk = this._igValid();

    this.el.innerHTML =
      '<div class="sv-wrap">' +
        '<div class="sv-top">' +
          '<span class="sv-top-l">현재 할인</span>' +
          '<span class="sv-track"><i style="width:' + (d / MAX * 100) + '%"></i></span>' +
          '<span class="sv-amt' + (d ? ' on' : '') + '">' + won(d) + '</span>' +
        '</div>' +

        '<div class="sv-q">' +
          '<div class="sv-qh"><span class="sv-qk">Q1</span><span class="sv-qt">' + esc(Q1.title) + '</span>' +
            '<span class="sv-qp' + (this.source ? ' done' : '') + '">' +
            (this.source ? '1,000원 할인 적용됨' : '1,000원 할인 받기') + '</span></div>' +
          '<div class="sv-chips">' + this._chips(Q1, this.source, 'q1') + '</div>' +
        '</div>' +

        '<div class="sv-q">' +
          '<div class="sv-qh"><span class="sv-qk">Q2</span><span class="sv-qt">' + esc(Q2.title) + '</span>' +
            '<span class="sv-qp' + (this.purpose ? ' done' : '') + '">' +
            (this.purpose ? '1,000원 할인 적용됨' : '1,000원 할인 받기') + '</span></div>' +
          '<div class="sv-chips">' + this._chips(Q2, this.purpose, 'q2') + '</div>' +
        '</div>' +

        '<div class="sv-q">' +
          '<div class="sv-qh"><span class="sv-qk">Q3</span><span class="sv-qt">인스타그램 계정을 남겨주세요</span>' +
            '<span class="sv-qp' + (igOk ? ' done' : '') + '" id="svQ3p">' +
            (igOk ? '1,000원 할인 적용됨' : '1,000원 할인 받기') + '</span></div>' +
          '<div class="sv-ig' + (igOk ? ' on' : '') + '">' +
            '<div class="sv-check' + (this.igChecked ? ' on' : '') + '" data-sv="igcheck">' +
              '<span class="sv-box">' + (this.igChecked ? '&#10003;' : '') + '</span>' +
              '<span class="sv-ct">인스타그램 팔로워가 <b>500명 이상</b>입니다' +
                '<span class="sv-note">체크인 시 프런트에서 확인될 수 있습니다.</span>' +
              '</span>' +
            '</div>' +
            '<div class="sv-input' + (this.igChecked ? ' show' : '') + '">' +
              '<input id="svIg" type="text" placeholder="@username" autocomplete="off" value="' +
              esc(this.ig) + '">' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="sv-foot">답하신 항목만큼 바로 할인됩니다 (문항당 1,000원 · 최대 3,000원). ' +
        '숙박 예약 1건당 1회 적용되며, 이름·연락처는 이 설문에 쓰이지 않습니다.</div>' +
      '</div>';
  };

  w.BookingSurvey = {
    PER: PER,
    MAX: MAX,
    mount: function (opts) { return new Widget(opts); }
  };
})(window);
