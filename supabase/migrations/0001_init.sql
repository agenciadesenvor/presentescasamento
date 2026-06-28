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
  'A gente já tem o principal: um ao outro. Mas se quiser fazer parte da nossa próxima fase, escolhe uma cota aí embaixo. 🤎',
  'Entre encontros, risadas e muitos perrengues divididos, a gente descobriu que a vida fica bem melhor a dois. Agora é pra sempre — e queremos você junto nessa festa.'
)
on conflict (id) do nothing;

-- ---------- SEED: presentes ----------
insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('caipirinha-lua-de-mel','Caipirinha na lua de mel','Cada cota é uma caipirinha gelada que vamos tomar na beira da praia pensando em você. Spoiler: vamos brindar ao seu nome (e talvez chorar de saudade).','divertidas',true,4000,25,'{"emoji:🍹","emoji:🏖️"}',1),
('antironco-madrugada','Antironco da madrugada','Fundo coletivo para travesseiros melhores, faixa nasal e paz conjugal às 3 da manhã. Sua contribuição salva um casamento (o nosso).','divertidas',true,3500,20,'{"emoji:😴","emoji:🛌"}',2),
('pelo-de-pet-no-sofa','Pelo de pet no sofá','Amamos nossos bichos, mas o sofá não. Cada cota vira um pedacinho de aspirador potente. O sofá agradece, os pets nem ligam.','divertidas',true,5000,15,'{"emoji:🐶","emoji:🐱"}',3),
('briga-de-casal-evitada','Briga de casal evitada','Reverte em massagem relaxante e/ou terapia de casal. Funciona melhor que contar até dez. Presente cientificamente comprovado por nós dois.','divertidas',true,7000,12,'{"emoji:🧘","emoji:💆"}',4),
('um-dia-sem-cozinhar','Um dia sem cozinhar','Cada cota é um delivery que a gente vai pedir sem culpa nenhuma. Pizza, sushi, açaí: o destino decide. Você só assiste à preguiça vencer.','divertidas',true,4500,30,'{"emoji:🍕","emoji:🍣"}',5),
('tijolo-da-casa-nova','Um tijolo da casa nova','Literalmente um tijolo. Junte alguns e a gente levanta uma parede. Junte muitos e ganha um quarto com seu nome (mentira, mas o carinho é real).','divertidas',true,3000,50,'{"emoji:🧱","emoji:🏗️"}',6),
('tanque-cheio-lua-de-mel','Tanque cheio rumo à lua de mel','Combustível para chegar (e voltar) da viagem dos sonhos. Cada cota é um pedaço de estrada com a janela aberta e a playlist no talo.','divertidas',true,6000,20,'{"emoji:⛽","emoji:🚗"}',7),
('vinho-da-segunda-feira','Vinho pra aguentar a segunda','Uma garrafa boa transforma qualquer segunda em quinta. Ajude a montar nossa adega de sobrevivência semanal.','divertidas',true,5500,24,'{"emoji:🍷","emoji:🧀"}',8),
('geladeira-dos-sonhos','Geladeira dos sonhos','Aquela enorme, com dispenser de água e espaço pra esconder sobremesa. Dividida em cotas pra ficar leve no seu bolso e pesada na nossa cozinha.','casa',false,5000,30,'{"emoji:🧊","emoji:🍦"}',10),
('sofa-pra-maratonar','Sofá pra maratonar séries','O trono oficial das nossas noites de pijama. Cada cota é um cantinho confortável onde a gente vai dormir no meio do filme.','casa',false,5000,20,'{"emoji:🛋️","emoji:📺"}',11),
('jogo-de-cama-king','Jogo de cama king size','Lençóis macios o suficiente pra ninguém querer levantar. Cada cota é um fio dessa felicidade de algodão egípcio.','casa',false,4000,15,'{"emoji:🛏️","emoji:🌙"}',12),
('jogo-de-panelas','Jogo de panelas completo','Pra cozinhar pros amigos (e fingir que somos chefs). Cada cota é uma panela onde vai nascer um jantar inesquecível ou um miojo gourmet.','cozinha',false,5000,10,'{"emoji:🍳","emoji:🥘"}',13),
('air-fryer','Air fryer (adeus, fritura)','A gente promete usar todo dia nas primeiras duas semanas. Cada cota nos aproxima de batatas crocantes sem culpa.','cozinha',false,4500,12,'{"emoji:🍟","emoji:🍗"}',14),
('diaria-hotel-dos-sonhos','Diária no hotel dos sonhos','Aquele hotel com vista pro mar e café da manhã sem hora pra acabar. Cada cota é um pedacinho do nosso descanso merecido.','lua_de_mel',false,5000,40,'{"emoji:🏝️","emoji:🌅"}',15),
('passeio-de-barco','Passeio de barco a dois','Pôr do sol, mar calmo e zero sinal de celular. Cada cota é uma onda mais perto desse momento de cinema.','lua_de_mel',false,8000,15,'{"emoji:⛵","emoji:🌊"}',16)
on conflict (slug) do nothing;
