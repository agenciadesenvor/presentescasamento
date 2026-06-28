-- =====================================================================
-- Lista de Presentes de Casamento — schema inicial
-- Tabelas: gifts, purchases, settings
-- View: gifts_public (gifts + cotas vendidas)
-- RLS habilitado; leitura pública dos presentes ativos.
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------- ENUMS ----------
do $$ begin
  create type gift_category as enum ('casa', 'lua_de_mel', 'cozinha', 'divertidas');
exception when duplicate_object then null; end $$;

do $$ begin
  create type purchase_status as enum ('pending', 'paid', 'failed');
exception when duplicate_object then null; end $$;

-- ---------- TABELAS ----------
create table if not exists public.gifts (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  description  text not null default '',
  category     gift_category not null default 'casa',
  is_fun       boolean not null default false,
  cota_price   integer not null check (cota_price > 0),   -- em centavos
  total_cotas  integer not null check (total_cotas > 0),
  photos       text[] not null default '{}',
  sort_order   integer not null default 0,
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

create table if not exists public.purchases (
  id               uuid primary key default gen_random_uuid(),
  gift_id          uuid not null references public.gifts(id) on delete cascade,
  buyer_name       text not null,
  buyer_email      text not null,
  message          text,
  quantity         integer not null check (quantity > 0),
  amount           integer not null check (amount > 0),    -- em centavos
  status           purchase_status not null default 'pending',
  mp_preference_id text,
  mp_payment_id    text,
  paid_at          timestamptz,
  created_at       timestamptz not null default now()
);

create index if not exists purchases_gift_id_idx on public.purchases(gift_id);
create index if not exists purchases_status_idx on public.purchases(status);

create table if not exists public.settings (
  id           boolean primary key default true check (id),  -- linha única
  couple_names text not null default 'Os Noivos',
  wedding_date date,
  hero_photo   text,
  hero_tagline text,
  story        text,
  pix_key      text,
  updated_at   timestamptz not null default now()
);

-- ---------- VIEW PÚBLICA (presentes + cotas vendidas) ----------
create or replace view public.gifts_public as
select
  g.id, g.slug, g.title, g.description, g.category, g.is_fun,
  g.cota_price, g.total_cotas, g.photos, g.sort_order, g.active,
  coalesce(sum(p.quantity) filter (where p.status = 'paid'), 0)::int as cotas_sold
from public.gifts g
left join public.purchases p on p.gift_id = g.id
group by g.id;

-- ---------- RLS ----------
alter table public.gifts enable row level security;
alter table public.purchases enable row level security;
alter table public.settings enable row level security;

-- Presentes: qualquer um pode LER os ativos. Escrita só para autenticados (admin).
drop policy if exists "gifts_public_read" on public.gifts;
create policy "gifts_public_read" on public.gifts
  for select using (active = true);

drop policy if exists "gifts_admin_write" on public.gifts;
create policy "gifts_admin_write" on public.gifts
  for all to authenticated using (true) with check (true);

-- Configurações: leitura pública, escrita autenticada.
drop policy if exists "settings_read" on public.settings;
create policy "settings_read" on public.settings for select using (true);

drop policy if exists "settings_admin_write" on public.settings;
create policy "settings_admin_write" on public.settings
  for all to authenticated using (true) with check (true);

-- Compras: NENHUM acesso por anon/authenticated via API pública.
-- Inserção/atualização/leitura acontecem só via service role (checkout/webhook/admin),
-- que ignora o RLS. Admin autenticado pode LER para o painel.
drop policy if exists "purchases_admin_read" on public.purchases;
create policy "purchases_admin_read" on public.purchases
  for select to authenticated using (true);

-- Grants da view (expõe apenas contagens agregadas, sem dados de comprador).
grant select on public.gifts_public to anon, authenticated;

-- ---------- STORAGE: bucket público para fotos dos presentes ----------
-- Bucket público => URLs das fotos são acessíveis sem autenticação.
-- Uploads acontecem via service role (admin), que ignora o RLS do storage.
insert into storage.buckets (id, name, public)
values ('gift-photos', 'gift-photos', true)
on conflict (id) do nothing;

-- ---------- SEED: configurações ----------
insert into public.settings (id, couple_names, wedding_date, hero_photo, hero_tagline, story)
values (
  true,
  'Elison & Patrícia',
  '2026-10-23',
  null,
  'A gente já tem o principal: um ao outro. Mas se quiser fazer parte da nossa próxima fase (e dar boas risadas), escolhe uma cota aí embaixo. 🤎',
  null
)
on conflict (id) do nothing;

-- ---------- SEED: presentes ----------
insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('jiu-jitsu-do-noivo','Um mês de jiu-jitsu pro noivo','Pra ele descontar no tatame todo o estresse que a noiva causa (com muito amor, claro). Cada cota é um mês de mata-leão terapêutico e paz garantida em casa.','divertidas',true,15000,12,'{"https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1603210185246-b1662978ea37?w=1200&q=80&auto=format&fit=crop"}',1),
('parcela-do-ps5','Uma parcela do PS5 pro noivo','Pra ele lembrar que ainda tem sonhos mesmo depois de casado. Cada cota quita uma parcela rumo ao console — e a noiva finge que não viu.','divertidas',true,20000,10,'{"https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=1200&q=80&auto=format&fit=crop"}',2),
('diaria-de-silencio','Uma diária de silêncio pro noivo','Um dia inteirinho pra ele jogar em paz, sem nenhum “amor, vem aqui rapidinho”. Cada cota garante mais horas sagradas de concentração total.','divertidas',true,8000,15,'{"https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1610041321327-b794c052db27?w=1200&q=80&auto=format&fit=crop"}',3),
('pilates-da-noiva','2 sessões de pilates pra noiva','Pra ela aguentar firme o peso de estar sempre certa (e ela está). Cada cota são duas aulas de alongamento, equilíbrio e paciência reforçada.','divertidas',true,16000,10,'{"https://images.unsplash.com/photo-1747239069226-55382c570116?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1579454566790-f9e5697ddf36?w=1200&q=80&auto=format&fit=crop"}',4),
('massagem-da-noiva','1 sessão de massagem pra noiva','Pra relaxar os ombros depois de explicar a mesma coisa pela quinta vez. Cada cota é uma hora de paz total e zero perguntas repetidas.','divertidas',true,12000,12,'{"https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80&auto=format&fit=crop"}',5),
('guerra-do-ar-condicionado','Uma cota do ar-condicionado','Ele quer 18°C, ela quer 23°C. Cada cota financia a paz climática do lar (e o cobertor extra de quem perder a discussão).','divertidas',true,7000,18,'{"https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1700124113583-81aa99ea2aa2?w=1200&q=80&auto=format&fit=crop"}',6),
('robo-aspirador-da-paz','Um robô aspirador pra paz do lar','Pra encerrar de vez a discussão milenar de quem vai limpar. Cada cota é um pedacinho do nosso novo melhor amigo (que trabalha sozinho).','divertidas',true,13000,12,'{"https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1600322305530-45714a0bc945?w=1200&q=80&auto=format&fit=crop"}',7),
('terapia-de-casal','Uma rodada de terapia de casal','Pra decidir, com ajuda profissional, de quem é a culpa (a gente já sabe, mas é bom ter testemunha). Cada cota é uma sessão rumo ao “eu te entendo”.','divertidas',true,14000,10,'{"https://images.unsplash.com/photo-1551847677-dc82d764e1eb?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1541976844346-f18aeac57b06?w=1200&q=80&auto=format&fit=crop"}',8)
on conflict (slug) do nothing;
