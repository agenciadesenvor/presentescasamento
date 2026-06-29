-- =====================================================================
-- Mural de recados — mensagens públicas deixadas pelos convidados.
-- Acesso somente via service_role (servidor), igual às demais tabelas.
-- =====================================================================

create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_at_idx on public.messages(created_at desc);

alter table public.messages enable row level security;
-- Sem políticas: anon/authenticated não têm acesso. Leitura/escrita só pelo
-- servidor (service_role), validado nas server actions.
