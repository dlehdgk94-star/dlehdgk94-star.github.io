-- ============================================================================
-- reservations.order_id UNIQUE 제약 (2026-07-31)
-- ----------------------------------------------------------------------------
-- 목적: confirm-payment 재호출/동시 요청 시 동일 order_id 예약이 두 번 INSERT되는
--       레이스를 DB 레벨에서 원천 차단(멱등성).
-- 사전조사(2026-07-31): reservations 12행, 중복 order_id 0건, order_id NULL 0건 확인 후 생성.
--
-- ★ partial index: order_id IS NOT NULL 인 행만 대상 → NULL 레거시 행은 제외(영향 없음).
-- ★ order_id 에 NOT NULL 제약은 추가하지 않는다(레거시 행 보호).
-- ============================================================================
create unique index if not exists reservations_order_id_uniq
  on public.reservations (order_id)
  where order_id is not null;

-- ── 검증 쿼리 ──
-- (a) 중복 없음 확인(생성 전제):
--   select order_id, count(*) from public.reservations
--   where order_id is not null group by order_id having count(*) > 1;   -- 0행이어야 함
-- (b) 인덱스 생성 확인:
--   select indexname, indexdef from pg_indexes
--   where schemaname='public' and tablename='reservations'
--     and indexname='reservations_order_id_uniq';
-- (c) NULL 레거시 행이 제약에 안 걸리는지(여러 NULL 허용):
--   select count(*) from public.reservations where order_id is null;
-- ============================================================================
