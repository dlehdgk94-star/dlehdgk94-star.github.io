/* =========================================================================
 * 인스타호텔 - 예약 금액 계산 공용 모듈 (js/bookingQuote.js)  v1.0
 * -------------------------------------------------------------------------
 * index.html 의 goToBooking() 안에 있던 "날짜 배열 만들기 → room_inventory
 * 조회 → 마감 확인 → 총액 계산" 부분을 그대로 떼어낸 것입니다.
 * 계산 규칙은 1도 바뀌지 않았습니다. booking.html 에서도 같은 함수를 써서
 * 두 페이지의 결제 금액이 절대 어긋나지 않게 하는 것이 목적입니다.
 *
 * 의존: js/roomPricing.js 의 getNightRate(roomId, date)
 * ========================================================================= */
(function (w) {
  'use strict';

  /* 로컬 기준 YYYY-MM-DD (UTC 변환 없이) */
  function localDateStr(d) {
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + dd;
  }

  /* 체크인 당일부터 nights 일치 날짜 문자열 배열 */
  function dateRange(checkinDate, nights) {
    var out = [];
    for (var i = 0; i < nights; i++) {
      var d = new Date(checkinDate);
      d.setDate(d.getDate() + i);
      out.push(localDateStr(d));
    }
    return out;
  }

  /* room_inventory 조회. 실패하면 빈 객체를 돌려주고 기본 요금으로 계산됨 */
  function fetchInventory(sb, roomUuid, dateStrs) {
    var byDate = {};
    if (!sb || !roomUuid || !dateStrs.length) return Promise.resolve(byDate);
    return sb.from('room_inventory')
      .select('date, price, is_available, stock')
      .eq('room_id', roomUuid)
      .gte('date', dateStrs[0])
      .lte('date', dateStrs[dateStrs.length - 1])
      .then(function (res) {
        if (res && res.data) res.data.forEach(function (r) { byDate[r.date] = r; });
        return byDate;
      })
      .catch(function (e) {
        console.warn('room_inventory 조회 실패, 기본 요금 사용', e);
        return byDate;
      });
  }

  /* -----------------------------------------------------------------------
   * quote(opts) -> Promise<{ ok, nights, dateStrs, perNight[], total, closedDate }>
   *   opts.sb         Supabase 클라이언트 (없으면 기본 요금만 사용)
   *   opts.roomUuid   rooms 테이블의 UUID (없으면 기본 요금만 사용)
   *   opts.roomId     'edelweiss' 같은 코드 (getNightRate 용)
   *   opts.checkinDate  Date
   *   opts.checkoutDate Date  (nights 를 직접 주면 생략 가능)
   *   opts.nights     숫자 (주면 checkoutDate 대신 사용)
   *   opts.roomCount  객실 수 (기본 1)
   *
   * 마감된 날짜가 하나라도 있으면 ok:false 와 closedDate 를 돌려줍니다.
   * (화면에 어떻게 알릴지는 부르는 쪽이 정합니다)
   * --------------------------------------------------------------------- */
  function quote(opts) {
    opts = opts || {};
    var checkinDate = opts.checkinDate;
    var nights = opts.nights;
    if (nights == null && opts.checkoutDate) {
      nights = Math.round((opts.checkoutDate - checkinDate) / 86400000);
    }
    var roomCount = opts.roomCount || 1;
    var roomId = opts.roomId;

    if (!checkinDate || !nights || nights < 1 || !roomId) {
      return Promise.resolve({ ok: false, reason: 'invalid', nights: nights || 0, total: 0 });
    }

    var dateStrs = dateRange(checkinDate, nights);

    return fetchInventory(opts.sb, opts.roomUuid, dateStrs).then(function (invByDate) {
      /* 마감 날짜 체크 */
      for (var i = 0; i < nights; i++) {
        var inv = invByDate[dateStrs[i]];
        if (inv && (inv.is_available === false || inv.stock === 0)) {
          return { ok: false, reason: 'closed', closedDate: dateStrs[i],
                   nights: nights, dateStrs: dateStrs, total: 0 };
        }
      }

      /* 요금 계산: room_inventory 우선, 없으면 roomPricing.js fallback */
      var perNight = [];
      var total = 0;
      for (var j = 0; j < nights; j++) {
        var d2 = new Date(checkinDate); d2.setDate(d2.getDate() + j);
        var inv2 = invByDate[dateStrs[j]];
        var rate = (inv2 && inv2.price) ? inv2.price : getNightRate(roomId, d2);
        perNight.push({ date: dateStrs[j], rate: rate });
        total += rate;
      }
      total *= roomCount;

      return { ok: true, nights: nights, dateStrs: dateStrs,
               perNight: perNight, total: total, closedDate: null };
    });
  }

  w.BookingQuote = {
    localDateStr: localDateStr,
    dateRange: dateRange,
    fetchInventory: fetchInventory,
    quote: quote
  };
})(window);
