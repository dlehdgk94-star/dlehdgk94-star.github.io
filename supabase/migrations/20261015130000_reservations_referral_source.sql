-- ============================================================================
-- reservations.referral_source 칸 추가 (2026-10-15)
-- ----------------------------------------------------------------------------
-- 목적: 손님이 어디서 들어와 예약했는지(유입경로) 기록.
--       값 예) '블로그(tripgokr)', '블로그(tripgokr-exam)', '네이버 블로그', NULL
--       NULL = 기록 없음 → 관리자 화면·알림 문자에서 '직접 방문'으로 표시.
-- 값 출처: js/referral.js (InstaReferral.get()) → booking-success.html / confirm-payment
--
-- ★ 반드시 이 SQL 을 먼저 실행한 뒤 3단계(예약 저장 코드)를 배포할 것.
--   칸이 없는 상태에서 홈페이지가 referral_source 를 보내면 예약 저장이 실패한다.
-- ★ 기존 예약 행에는 영향 없음(NULL 로 채워짐).
-- ============================================================================
alter table public.reservations
  add column if not exists referral_source text;

comment on column public.reservations.referral_source
  is '유입경로 (js/referral.js). NULL = 직접 방문/알 수 없음';

-- ── 검증 쿼리 ──
--   select column_name, data_type from information_schema.columns
--   where table_schema = 'public' and table_name = 'reservations'
--     and column_name = 'referral_source';            -- 1행이 나와야 함
