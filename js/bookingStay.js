/* =========================================================================
 * 인스타호텔 - 예약결제 페이지 숙박정보 위젯 (js/bookingStay.js)  v1.0
 * -------------------------------------------------------------------------
 * booking.html 안에 펼쳐지는 달력 + 객실/인원 선택기입니다.
 * 홈페이지 상단 예약바와는 별개이며, 홈페이지 코드는 건드리지 않습니다.
 *
 * 금액 계산과 마감일 판정은 공용 파일을 씁니다.
 *   - js/bookingQuote.js     (BookingQuote.quote)
 *   - js/roomAvailability.js (RoomAvailability)
 *   - js/roomPricing.js      (ROOM_PRICING, getNightRate)
 * 따라서 홈페이지와 예약결제 페이지의 금액은 구조적으로 어긋날 수 없습니다.
 * ========================================================================= */
(function (w) {
  'use strict';

  var CSS = [
    '.bs-wrap{--bs-ink:rgb(28,28,28);--bs-line:#e8e8e8;}',
    '.bs-fields{display:grid;grid-template-columns:1fr 1fr;gap:14px;}',
    '.bs-field{border:1px solid var(--bs-line);border-radius:9px;padding:12px 14px;cursor:pointer;background:#fff;transition:border-color .15s;}',
    '.bs-field:hover{border-color:#bbb;}',
    '.bs-field.on{border-color:var(--bs-ink);}',
    '.bs-flabel{display:block;font-size:11.5px;color:#8a8a8a;margin-bottom:5px;letter-spacing:.01em;}',
    '.bs-fval{font-size:14.5px;font-weight:600;color:var(--bs-ink);display:flex;align-items:center;gap:8px;}',
    '.bs-fval .bs-arrow{color:#bbb;font-size:12px;}',
    '.bs-fval .bs-ph{color:#b0b0b0;font-weight:400;}',
    '.bs-panel{display:none;margin-top:14px;border:1px solid var(--bs-line);border-radius:11px;padding:18px;background:#fff;}',
    '.bs-panel.open{display:block;}',
    '.bs-months{display:grid;grid-template-columns:1fr 1fr;gap:26px;}',
    '.bs-mhead{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;height:26px;}',
    '.bs-mtitle{font-size:14px;font-weight:700;color:var(--bs-ink);}',
    '.bs-nav{width:26px;height:26px;border:1px solid var(--bs-line);border-radius:50%;background:#fff;cursor:pointer;color:#666;font-size:11px;line-height:1;display:flex;align-items:center;justify-content:center;}',
    '.bs-nav:hover{border-color:#999;color:#111;}',
    '.bs-nav[disabled]{opacity:.25;cursor:default;}',
    '.bs-nav-sp{width:26px;height:26px;}',
    '.bs-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;}',
    '.bs-dn{font-size:11px;color:#9a9a9a;text-align:center;padding:6px 0;}',
    '.bs-d{position:relative;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--bs-ink);border-radius:7px;cursor:pointer;user-select:none;}',
    '.bs-d:hover:not(.bs-off):not(.bs-closed){background:#f0f0f0;}',
    '.bs-d.bs-off{color:#d8d8d8;cursor:default;}',
    '.bs-d.bs-closed{color:#ccc;cursor:default;}',
    '.bs-d.bs-closed s{text-decoration:line-through;}',
    '.bs-clabel{position:absolute;bottom:2px;left:0;right:0;text-align:center;font-size:8.5px;color:#c9a0a0;}',
    '.bs-d.bs-checkout-ok{color:#6b7681;border:1px dashed #d5d5d5;}',
    '.bs-d.bs-checkout-ok:hover{background:#f0f0f0;}',
    '.bs-d.bs-in{background:#ebebeb;border-radius:0;}',
    '.bs-d.bs-start,.bs-d.bs-end,.bs-d.bs-only{background:var(--bs-ink);color:#fff;font-weight:700;}',
    '.bs-d.bs-start{border-radius:7px 0 0 7px;}',
    '.bs-d.bs-end{border-radius:0 7px 7px 0;}',
    '.bs-d.bs-only{border-radius:7px;}',
    '.bs-hint{margin-top:14px;font-size:12.5px;color:#8a8a8a;text-align:center;}',
    '.bs-row{display:flex;align-items:center;justify-content:space-between;padding:13px 2px;}',
    '.bs-row + .bs-row{border-top:1px solid #f2f2f2;}',
    '.bs-rl{font-size:14px;font-weight:600;color:var(--bs-ink);}',
    '.bs-rs{font-size:12px;color:#9a9a9a;margin-top:3px;}',
    '.bs-ctl{display:flex;align-items:center;gap:14px;}',
    '.bs-btn{width:30px;height:30px;border:1px solid #d5d5d5;border-radius:50%;background:#fff;cursor:pointer;color:#333;font-size:14px;line-height:1;display:flex;align-items:center;justify-content:center;}',
    '.bs-btn:hover:not([disabled]){border-color:#111;}',
    '.bs-btn[disabled]{opacity:.3;cursor:default;}',
    '.bs-num{min-width:18px;text-align:center;font-size:14.5px;font-weight:700;}',
    '.bs-done{width:100%;margin-top:14px;padding:12px;border:0;border-radius:8px;background:var(--bs-ink);color:#fff;font-size:14px;font-weight:700;cursor:pointer;}',
    '.bs-warn{margin-top:12px;font-size:13px;color:#c0392b;background:#fdf3f2;border:1px solid #f5d5d1;border-radius:8px;padding:11px 13px;line-height:1.6;}',
    '@media(max-width:720px){.bs-fields{grid-template-columns:1fr;}.bs-months{grid-template-columns:1fr;gap:20px;}}'
  ].join('');

  var DAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];
  var MAX_DAYS_AHEAD = 360;

  function injectCss() {
    if (document.getElementById('bs-css')) return;
    var s = document.createElement('style');
    s.id = 'bs-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function ymd(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') +
           '-' + String(d.getDate()).padStart(2, '0');
  }
  function parseYmd(s) {
    var p = String(s).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function midnight(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function Widget(opts) {
    this.o = opts;
    this.roomId = opts.roomId;
    this.checkin = opts.checkin ? midnight(parseYmd(opts.checkin)) : null;
    this.checkout = opts.checkout ? midnight(parseYmd(opts.checkout)) : null;
    /* 다른 객실에서 넘어오면 이전 인원이 그대로 따라온다.
       (예: 스페셜 4인 → 이코노미 2인 객실인데 4인이 유지됨)
       ± 버튼에만 상한이 걸려 있어서, 손님이 아무것도 안 누르면
       정원 초과 상태로 결제까지 통과했다. 처음부터 잘라준다. */
    this.roomCount  = Math.min(Math.max(opts.roomCount || 1, 1), 5);
    this.adultCount = Math.max(opts.adultCount || 1, 1);
    var _cap = this._maxGuests() * this.roomCount;
    if (this.adultCount > _cap) this.adultCount = _cap;
    this.open = opts.openPanel || null;     // 'date' | 'guest' | null
    this.today = midnight(new Date());
    this.maxDate = midnight(new Date(Date.now() + MAX_DAYS_AHEAD * 86400000));
    this.month = new Date((this.checkin || this.today).getFullYear(),
                          (this.checkin || this.today).getMonth(), 1);
    this.warn = '';
    this.el = opts.container;
    injectCss();
    this._bind();
    this.render();
    this._loadClosed();
  }

  Widget.prototype._maxGuests = function () {
    var pt = w.ROOM_PRICING && w.ROOM_PRICING[this.roomId];
    return pt && pt.maxGuests ? pt.maxGuests : 2;
  };

  Widget.prototype._loadClosed = function () {
    var self = this;
    if (!w.RoomAvailability || !this.o.sb || !this.o.roomUuid) return;
    try {
      var p = w.RoomAvailability.fetchClosedDates(this.o.sb, this.o.roomUuid);
      if (p && p.then) p.then(function () { self.render(); });
    } catch (e) { console.warn('마감일 조회 실패', e); }
  };

  Widget.prototype._isClosed = function (dateStr) {
    try { return w.RoomAvailability ? w.RoomAvailability.isClosed(dateStr) : false; }
    catch (e) { return false; }
  };

  Widget.prototype._bind = function () {
    var self = this;
    this.el.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-bs]');
      if (!t || !self.el.contains(t)) return;
      var a = t.getAttribute('data-bs');
      if (a === 'toggle-date')  { self.open = self.open === 'date' ? null : 'date'; self.render(); }
      else if (a === 'toggle-guest') { self.open = self.open === 'guest' ? null : 'guest'; self.render(); }
      else if (a === 'prev')  { self.month.setMonth(self.month.getMonth() - 1); self.render(); }
      else if (a === 'next')  { self.month.setMonth(self.month.getMonth() + 1); self.render(); }
      else if (a === 'day')   { self._pick(t.getAttribute('data-d')); }
      else if (a === 'room')  { self._step('roomCount', +t.getAttribute('data-v')); }
      else if (a === 'adult') { self._step('adultCount', +t.getAttribute('data-v')); }
      else if (a === 'done')  { self.open = null; self.render(); }
    });
  };

  /* 체크아웃이 비워졌음을 부모에게 알린다.
     이걸 안 부르면 달력은 새 날짜를 보여주는데 결제는 옛 날짜·옛 금액으로 나간다. */
  Widget.prototype._invalidate = function (reason, closedDate) {
    if (!this.o.onChange) return;
    this.o.onChange({
      ok: false, reason: reason || 'incomplete', closedDate: closedDate || null,
      checkin: this.checkin ? ymd(this.checkin) : null, checkout: null, nights: 0,
      roomCount: this.roomCount, adultCount: this.adultCount, totalPrice: 0
    });
  };

  Widget.prototype._pick = function (ds) {
    var d = midnight(parseYmd(ds));
    if (d < this.today || d > this.maxDate) return;
    if (!this.checkin || this.checkout) {          // 처음 클릭 또는 다시 시작
      this.checkin = d; this.checkout = null; this.warn = '';
      this._invalidate('incomplete');
    } else if (d.getTime() === this.checkin.getTime()) {
      return;                                       // 같은 날 무시
    } else if (d > this.checkin) {
      /* 체크인~체크아웃 사이에 마감일이 끼면 범위로 잡지 않고, 누른 날을 새 체크인으로 */
      var blocked = this._closedBetween(this.checkin, d);
      if (blocked) {
        this.warn = blocked + ' 이 마감이라 그 날짜를 건너뛰는 예약은 할 수 없습니다. ' +
                    '체크인을 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일로 옮겼습니다.';
        this.checkin = d;
        this.checkout = null;
        this.render();
        this._invalidate('closed', blocked);
        return;
      }
      this.warn = '';
      this.checkout = d;
    } else {
      this.checkin = d;                             // 앞 날짜면 체크인 다시 잡기
      this._invalidate('incomplete');
    }
    this.render();
    if (this.checkin && this.checkout) {
      var self = this;
      this._emit().then(function (q) {
        if (!q || !q.ok) return;            // 마감이 끼면 인원 단계로 넘어가지 않음
        setTimeout(function () { self.open = 'guest'; self.render(); }, 280);
      });
    }
  };

  /* 체크인(포함) ~ 체크아웃(제외) 사이에 마감일이 있으면 그 날짜를 돌려준다 */
  Widget.prototype._closedBetween = function (from, to) {
    var d = new Date(from);
    while (d < to) {
      var ds = ymd(d);
      if (this._isClosed(ds)) return ds;
      d.setDate(d.getDate() + 1);
    }
    return null;
  };

  Widget.prototype._step = function (key, delta) {
    var v = this[key] + delta;
    if (key === 'roomCount') {
      if (v < 1 || v > 5) return;
      this.roomCount = v;
      var cap = this._maxGuests() * this.roomCount;
      if (this.adultCount > cap) this.adultCount = cap;
      if (this.adultCount < this.roomCount) this.adultCount = this.roomCount;
    } else {
      if (v < 1 || v > this._maxGuests() * this.roomCount) return;
      this.adultCount = v;
    }
    this.render();
    this._emit();
  };

  /* 현재 선택으로 금액을 계산해 부모에게 알림 */
  Widget.prototype._emit = function () {
    var self = this;
    if (!this.checkin || !this.checkout) return;
    var nights = Math.round((this.checkout - this.checkin) / 86400000);
    return w.BookingQuote.quote({
      sb: this.o.sb, roomUuid: this.o.roomUuid, roomId: this.roomId,
      checkinDate: this.checkin, nights: nights, roomCount: this.roomCount
    }).then(function (q) {
      /* 아래에서 checkout 을 되돌릴 수 있으므로 날짜 문자열을 먼저 확보한다 */
      var ciStr = ymd(self.checkin);
      var coStr = self.checkout ? ymd(self.checkout) : null;
      if (!q.ok && q.reason === 'closed') {
        /* 요약과 달력이 서로 다른 날짜를 보이지 않도록, 잘못된 범위는 되돌린다 */
        self.warn = '선택하신 기간에 마감된 날짜가 있습니다 (' + q.closedDate +
                    '). 체크아웃 날짜를 다시 골라 주세요.';
        self.checkout = null;
      } else {
        self.warn = '';
      }
      self.render();
      if (self.o.onChange) {
        self.o.onChange({
          ok: q.ok, reason: q.reason || null, closedDate: q.closedDate || null,
          checkin: ciStr, checkout: coStr,
          nights: nights, roomCount: self.roomCount, adultCount: self.adultCount,
          totalPrice: q.total || 0
        });
      }
      return q;
    });
  };

  Widget.prototype._monthHtml = function (year, month) {
    var h = DAYS_KO.map(function (d) { return '<div class="bs-dn">' + d + '</div>'; }).join('');
    var first = new Date(year, month, 1).getDay();
    var last = new Date(year, month + 1, 0).getDate();
    for (var i = 0; i < first; i++) h += '<div class="bs-d bs-off"></div>';
    for (var n = 1; n <= last; n++) {
      var d = new Date(year, month, n);
      var ds = ymd(d);
      var cls = 'bs-d';
      if (d < this.today || d > this.maxDate) {
        h += '<div class="bs-d bs-off">' + n + '</div>'; continue;
      }
      /* 마감일은 '숙박'이 불가할 뿐, 그날 아침에 나가는 '체크아웃'은 가능하다.
         체크인만 고른 상태이고 그 사이에 마감이 없으면 체크아웃으로 선택할 수 있게 연다. */
      if (this._isClosed(ds)) {
        var okAsCheckout = this.checkin && !this.checkout &&
                           d > this.checkin && !this._closedBetween(this.checkin, d);
        if (okAsCheckout) {
          h += '<div class="bs-d bs-checkout-ok" data-bs="day" data-d="' + ds + '"' +
               ' title="체크아웃만 가능 (이날 숙박은 마감)">' + n + '</div>';
        } else {
          h += '<div class="bs-d bs-closed" title="예약 마감"><s>' + n + '</s>' +
               '<span class="bs-clabel">마감</span></div>';
        }
        continue;
      }
      var ci = this.checkin, co = this.checkout;
      if (ci && d.getTime() === ci.getTime()) cls += co ? ' bs-start' : ' bs-only';
      if (co && d.getTime() === co.getTime()) cls += ' bs-end';
      if (ci && co && d > ci && d < co) cls += ' bs-in';
      h += '<div class="' + cls + '" data-bs="day" data-d="' + ds + '">' + n + '</div>';
    }
    return h;
  };

  Widget.prototype._dateText = function () {
    if (!this.checkin) return '<span class="bs-ph">날짜를 선택해 주세요</span>';
    var f = function (d) {
      return (d.getMonth() + 1) + '월 ' + d.getDate() + '일 (' + DAYS_KO[d.getDay()] + ')';
    };
    if (!this.checkout) return f(this.checkin) + ' <span class="bs-arrow">→</span> <span class="bs-ph">체크아웃</span>';
    var nights = Math.round((this.checkout - this.checkin) / 86400000);
    return f(this.checkin) + ' <span class="bs-arrow">→</span> ' + f(this.checkout) +
           ' <span class="bs-arrow">' + nights + '박</span>';
  };

  Widget.prototype.render = function () {
    var y = this.month.getFullYear(), m = this.month.getMonth();
    var r = new Date(y, m + 1, 1);
    var atStart = (y === this.today.getFullYear() && m === this.today.getMonth());

    var cap = this._maxGuests() * this.roomCount;

    this.el.innerHTML =
      '<div class="bs-wrap">' +
        '<div class="bs-fields">' +
          '<div class="bs-field' + (this.open === 'date' ? ' on' : '') + '" data-bs="toggle-date">' +
            '<span class="bs-flabel">체크인 · 체크아웃</span>' +
            '<span class="bs-fval">' + this._dateText() + '</span>' +
          '</div>' +
          '<div class="bs-field' + (this.open === 'guest' ? ' on' : '') + '" data-bs="toggle-guest">' +
            '<span class="bs-flabel">객실 · 인원</span>' +
            '<span class="bs-fval">' + this.roomCount + ' 객실, ' + this.adultCount + ' 성인</span>' +
          '</div>' +
        '</div>' +

        '<div class="bs-panel' + (this.open === 'date' ? ' open' : '') + '">' +
          '<div class="bs-months">' +
            '<div><div class="bs-mhead">' +
              '<button type="button" class="bs-nav" data-bs="prev"' + (atStart ? ' disabled' : '') + '>&#10094;</button>' +
              '<span class="bs-mtitle">' + y + '년 ' + (m + 1) + '월</span>' +
              '<span class="bs-nav-sp"></span></div>' +
              '<div class="bs-grid">' + this._monthHtml(y, m) + '</div></div>' +
            '<div><div class="bs-mhead">' +
              '<span class="bs-nav-sp"></span>' +
              '<span class="bs-mtitle">' + r.getFullYear() + '년 ' + (r.getMonth() + 1) + '월</span>' +
              '<button type="button" class="bs-nav" data-bs="next">&#10095;</button></div>' +
              '<div class="bs-grid">' + this._monthHtml(r.getFullYear(), r.getMonth()) + '</div></div>' +
          '</div>' +
          '<div class="bs-hint">' +
            (this.checkin && this.checkout
               ? Math.round((this.checkout - this.checkin) / 86400000) + '박 선택됨 · 날짜를 다시 누르면 변경됩니다'
               : this.checkin ? '체크아웃 날짜를 선택해 주세요' : '체크인 날짜부터 선택해 주세요') +
          '</div>' +
        '</div>' +

        '<div class="bs-panel' + (this.open === 'guest' ? ' open' : '') + '">' +
          '<div class="bs-row"><div><div class="bs-rl">객실</div>' +
            '<div class="bs-rs">최대 5개</div></div>' +
            '<div class="bs-ctl">' +
              '<button type="button" class="bs-btn" data-bs="room" data-v="-1"' + (this.roomCount <= 1 ? ' disabled' : '') + '>&minus;</button>' +
              '<span class="bs-num">' + this.roomCount + '</span>' +
              '<button type="button" class="bs-btn" data-bs="room" data-v="1"' + (this.roomCount >= 5 ? ' disabled' : '') + '>+</button>' +
            '</div></div>' +
          '<div class="bs-row"><div><div class="bs-rl">성인</div>' +
            '<div class="bs-rs">이 객실 기준 최대 ' + cap + '인</div></div>' +
            '<div class="bs-ctl">' +
              '<button type="button" class="bs-btn" data-bs="adult" data-v="-1"' + (this.adultCount <= 1 ? ' disabled' : '') + '>&minus;</button>' +
              '<span class="bs-num">' + this.adultCount + '</span>' +
              '<button type="button" class="bs-btn" data-bs="adult" data-v="1"' + (this.adultCount >= cap ? ' disabled' : '') + '>+</button>' +
            '</div></div>' +
          '<button type="button" class="bs-done" data-bs="done">완료</button>' +
        '</div>' +

        (this.warn ? '<div class="bs-warn">' + esc(this.warn) + '</div>' : '') +
      '</div>';
  };

  w.BookingStay = {
    mount: function (opts) { return new Widget(opts); }
  };
})(window);
