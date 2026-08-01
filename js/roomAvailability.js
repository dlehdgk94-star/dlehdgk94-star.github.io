/* ============================================================================
   roomAvailability.js — 객실 마감(재고) 조회 공용 모듈 (Single Source of Truth)
   ----------------------------------------------------------------------------
   기존 index.html 에만 있던 마감 처리 로직(_fetchClosedDates / _invClosedDates /
   renderCalendar 의 cal-closed 표시 / 예약 진행 시 마감 차단)을 통합하여
   index.html · rooms.html 두 페이지가 함께 참조한다.
   (요금표를 js/roomPricing.js 로 단일화한 것과 동일한 방식)

   ★ 정본은 index.html(실제 결제 청구 경로)의 로직이다.
     마감 판정 = room_inventory.is_available === false  ||  stock === 0

   [API]
     RoomAvailability.getClient()                       — (선택) 내장 Supabase 클라이언트(지연 생성)
     RoomAvailability.loadRoomUuids()                   — (선택) rooms 테이블 name_en→id 매핑 로드
     RoomAvailability.uuidOf(roomId)                    — (선택) roomId(name_en) → room UUID
     RoomAvailability.fetchClosedDates(sb, roomUuid)    — 향후 3개월 마감일 조회 → 내부 Set 갱신·반환
     RoomAvailability.isClosed(dateStr)                 — 위에서 채운 Set 기준 마감 여부(달력 표시용)
     RoomAvailability.getClosedDates()                  — 내부 마감일 Set
     RoomAvailability.firstClosedInRange(sb, uuid, ds)  — 지정 날짜 배열 중 첫 마감일 반환(없으면 null·예약 진행 검증용)

   ※ sb / roomUuid 를 인자로 받으므로, 이미 자체 Supabase 클라이언트·UUID 맵을
     가진 페이지(index.html)는 그것을 그대로 넘겨 쓰고, 없는 페이지(rooms.html)는
     이 모듈의 getClient()/loadRoomUuids()/uuidOf() 를 사용하면 된다.
   ============================================================================ */
window.RoomAvailability = (function () {
  var SB_URL = 'https://lbhdujheuokkmiowobzu.supabase.co';
  var SB_KEY = 'sb_publishable_2X3S_RgN_0ipbUtR-zAV6A_yIp1n5PC';

  var _sb = null;
  var _uuidMap = {};
  var _closed = new Set();

  function _localDateStr(d) {
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + dd;
  }

  /* ── (선택) 자체 Supabase 클라이언트 ── */
  function getClient() {
    if (!_sb && window.supabase) {
      try {
        _sb = window.supabase.createClient(SB_URL, SB_KEY);
      } catch (e) {
        console.warn('[RoomAvailability] Supabase 초기화 실패', e);
      }
    }
    return _sb;
  }

  /* ── (선택) rooms.name_en → id 매핑 로드 ── */
  async function loadRoomUuids() {
    var sb = getClient();
    if (!sb) return _uuidMap;
    try {
      var res = await sb.from('rooms').select('id, name_en');
      if (res.data) res.data.forEach(function (r) {
        if (r.id && r.name_en) _uuidMap[r.name_en] = r.id;
      });
    } catch (e) {
      console.warn('[RoomAvailability] rooms UUID 로드 실패', e);
    }
    return _uuidMap;
  }

  function uuidOf(roomId) {
    return _uuidMap[roomId];
  }

  /* ── 달력 표시용: 향후 3개월 마감일 조회 → 내부 Set 갱신 ── */
  async function fetchClosedDates(sb, roomUuid) {
    _closed = new Set();
    if (!sb || !roomUuid) return _closed;
    var today = new Date();
    var end3m = new Date(today.getFullYear(), today.getMonth() + 3, 0);
    try {
      var res = await sb.from('room_inventory')
        .select('date, is_available, stock')
        .eq('room_id', roomUuid)
        .gte('date', _localDateStr(today))
        .lte('date', _localDateStr(end3m));
      if (res.data) res.data.forEach(function (r) {
        if (r.is_available === false || r.stock === 0) _closed.add(r.date);
      });
    } catch (e) {
      console.warn('[RoomAvailability] 마감 날짜 조회 실패', e);
    }
    return _closed;
  }

  function isClosed(dateStr) {
    return _closed.has(dateStr);
  }

  function getClosedDates() {
    return _closed;
  }

  /* ── 예약 진행 검증용: 지정 날짜 배열 중 첫 마감일 반환(없으면 null) ── */
  async function firstClosedInRange(sb, roomUuid, dateStrs) {
    if (!sb || !roomUuid || !dateStrs || !dateStrs.length) return null;
    try {
      var res = await sb.from('room_inventory')
        .select('date, is_available, stock')
        .eq('room_id', roomUuid)
        .gte('date', dateStrs[0])
        .lte('date', dateStrs[dateStrs.length - 1]);
      var byDate = {};
      if (res.data) res.data.forEach(function (r) { byDate[r.date] = r; });
      for (var i = 0; i < dateStrs.length; i++) {
        var inv = byDate[dateStrs[i]];
        if (inv && (inv.is_available === false || inv.stock === 0)) return dateStrs[i];
      }
    } catch (e) {
      console.warn('[RoomAvailability] 마감 검증 조회 실패', e);
    }
    return null;
  }

  return {
    getClient: getClient,
    loadRoomUuids: loadRoomUuids,
    uuidOf: uuidOf,
    fetchClosedDates: fetchClosedDates,
    isClosed: isClosed,
    getClosedDates: getClosedDates,
    firstClosedInRange: firstClosedInRange,
  };
})();
