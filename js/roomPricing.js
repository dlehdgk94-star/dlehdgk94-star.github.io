/* ============================================================================
   roomPricing.js — 객실 요금 단일 정본(Single Source of Truth)
   ----------------------------------------------------------------------------
   기존에 index.html(ROOM_PRICE_TABLE_I) · rooms.html(ROOM_PRICE_TABLE) ·
   admin.html(ROOM_DEFAULTS) 에 각각 하드코딩돼 있던 요금표/요일 로직을 통합.

   ★ 값과 로직 모두 index.html(실제 결제 청구 경로)을 정본으로 삼는다.
     - prices:[평일, 금, 토]  (index ROOM_PRICE_TABLE_I 와 동일)
     - maxGuests              (index/rooms 와 동일)
     - stock                  (admin ROOM_DEFAULTS 기본 재고)
     - name                   (한국어 객실명)

   요일 요금 로직(getNightRate): 토(getDay()===6)=prices[2],
     금(===5)=prices[1], 그 외 평일(일~목)=prices[0].
   → index.getNightRateI / rooms.getNightRate / admin.defPrice 와 완전히 동일.

   ※ 실제 청구는 각 숙박일마다 room_inventory.price 가 있으면 그 값을,
     없으면 이 표의 getNightRate 를 사용한다(=fallback). 이 파일은 fallback 정본이며
     room_inventory 조회 로직은 각 페이지에 그대로 남아 있다.
   ============================================================================ */
const ROOM_PRICING = {
  edelweiss: { name: '이코노미 룸',                     prices: [49500,  58500,  72000],  maxGuests: 2, stock: 5 },
  aurora:    { name: '스탠다드 룸 (디자인 랜덤배정)',    prices: [58000,  67000,  81000],  maxGuests: 2, stock: 5 },
  glorio:    { name: '디럭스 룸 (디자인 랜덤배정)',      prices: [67000,  76000,  99000],  maxGuests: 2, stock: 3 },
  envidion:  { name: '트윈 룸',                         prices: [76000,  85000,  108000], maxGuests: 3, stock: 3 },
  special:   { name: '스페셜 룸',                       prices: [99000,  108000, 126000], maxGuests: 4, stock: 2 },
  ruby:      { name: '루비 룸',                         prices: [76000,  85000,  108000], maxGuests: 2, stock: 2 },
};

const ROOM_ORDER = ['edelweiss', 'aurora', 'glorio', 'envidion', 'special', 'ruby'];

// 요일별 1박 요금 (room_inventory 오버라이드가 없을 때의 기본 요금)
function getNightRate(roomId, date) {
  const r = ROOM_PRICING[roomId];
  if (!r) return 0;
  const d = date.getDay();
  return d === 6 ? r.prices[2] : d === 5 ? r.prices[1] : r.prices[0];
}
