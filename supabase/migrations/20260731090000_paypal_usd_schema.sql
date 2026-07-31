-- ============================================================================
-- PayPal USD 결제용 DB 스키마 추가 (2026-07-31)
-- ----------------------------------------------------------------------------
-- 목적: PayPal(USD) 결제 플로우를 위한 환율/마크업 설정 테이블과
--       reservations 결제 메타 컬럼을 추가한다.
-- 원칙: "추가만" 한다. 기존 원화(toss_krw) 결제 플로우에 영향 없음.
--   - reservations 기존 컬럼 수정/삭제 금지
--   - 기존 RLS 정책 변경 금지 (이 파일은 reservations RLS를 건드리지 않음)
--   - 모든 문장은 idempotent (재실행 안전)
--
-- ★ admin 인증 방식 확인 결과 (RLS 설계 근거):
--   admin.html 은 Supabase Auth 를 쓰지 않고 클라이언트측 비밀번호(sessionStorage)
--   로만 게이트하며, 접속은 공개 프론트와 동일한 anon(publishable) 키를 사용한다.
--   => DB 레벨에 "관리자" 역할이 존재하지 않는다.
--   => anon 에 쓰기를 열면 곧 전체 공개가 되므로, app_settings 쓰기(INSERT/UPDATE/
--      DELETE)는 정책을 만들지 않는다. RLS 활성 상태에서 anon/authenticated 는 쓰기
--      거부되고, service_role(=Edge Function / 대시보드)만 RLS 를 우회해 변경한다.
--      환율/마크업 변경은 Supabase 대시보드 또는 향후 service_role Edge Function 으로 수행.
-- ============================================================================


-- ─────────────────────────────────────────────────────────────────────────
-- 1. app_settings 테이블 (환율/마크업 등 런타임 설정)
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.app_settings (
  key        text primary key,
  value      numeric not null,
  updated_at timestamptz default now()
);

-- 초기값: 환율 1350, 마크업 1.10 (이미 있으면 유지)
insert into public.app_settings (key, value) values
  ('usd_rate',   1350),
  ('usd_markup', 1.10)
on conflict (key) do nothing;

-- RLS 활성화
alter table public.app_settings enable row level security;

-- anon(+authenticated) : SELECT 만 허용 (프론트에서 환율 조회 필요)
drop policy if exists "app_settings_select_anon" on public.app_settings;
create policy "app_settings_select_anon"
  on public.app_settings
  for select
  to anon, authenticated
  using (true);

-- ※ INSERT/UPDATE/DELETE 정책은 의도적으로 생성하지 않는다.
--   RLS 활성 상태에서 정책이 없는 동작은 거부된다 (anon/authenticated 쓰기 차단).
--   service_role 은 RLS 를 우회하므로 Edge Function / 대시보드에서만 변경 가능.


-- ─────────────────────────────────────────────────────────────────────────
-- 2. reservations 결제 메타 컬럼 추가 (기존 컬럼은 건드리지 않음)
-- ─────────────────────────────────────────────────────────────────────────
alter table public.reservations
  add column if not exists payment_provider text default 'toss_krw',
  add column if not exists currency         text default 'KRW',
  add column if not exists paid_amount      numeric(12,2),
  add column if not exists exchange_rate    numeric(10,2),
  add column if not exists markup_rate      numeric(5,3),
  add column if not exists guest_name_en    text;

-- 값 규약 문서화 (CHECK 제약은 걸지 않음 — 기존 원화 플로우 INSERT 를 막지 않기 위함)
--   payment_provider : 'toss_krw' | 'toss_paypal'
--   exchange_rate / markup_rate : 결제 시점 값을 스냅샷으로 저장 (환율 변동 후 취소·정산 대사용)
comment on column public.reservations.payment_provider is '결제수단: toss_krw | toss_paypal (기본 toss_krw)';
comment on column public.reservations.currency         is '결제 통화 코드 (기본 KRW)';
comment on column public.reservations.paid_amount      is '실제 청구/결제 금액 (해당 통화 기준)';
comment on column public.reservations.exchange_rate    is '결제 시점 USD 환율 스냅샷 (정산/취소 대사용)';
comment on column public.reservations.markup_rate      is '결제 시점 마크업 배수 스냅샷 (예: 1.10)';
comment on column public.reservations.guest_name_en    is 'PayPal 등 영문 이름 필드';

-- 기존 레코드는 default 값(payment_provider='toss_krw', currency='KRW')으로 자동 채워짐 → 백필 불필요.


-- ============================================================================
-- 검증 쿼리 (적용 후 SQL 에디터에서 실행해 확인)
-- ============================================================================
-- (a) app_settings 초기값 확인
--   select * from public.app_settings order by key;
--
-- (b) reservations 신규 컬럼 확인
--   select column_name, data_type, column_default
--   from information_schema.columns
--   where table_schema='public' and table_name='reservations'
--     and column_name in ('payment_provider','currency','paid_amount',
--                         'exchange_rate','markup_rate','guest_name_en')
--   order by column_name;
--
-- (c) 기존 예약이 default 로 채워졌는지 확인
--   select id, payment_provider, currency from public.reservations limit 5;
--
-- (d) app_settings RLS 정책 확인
--   select policyname, cmd, roles from pg_policies
--   where schemaname='public' and tablename='app_settings';
-- ============================================================================
