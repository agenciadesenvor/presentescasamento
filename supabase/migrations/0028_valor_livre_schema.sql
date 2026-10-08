-- Presentes de "valor livre": o convidado escolhe quanto quer dar.
-- Nesses presentes, cota_price funciona como VALOR MÍNIMO e total_cotas é só um teto alto.
alter table public.gifts add column if not exists valor_livre boolean not null default false;

-- Expõe a coluna na view (colunas novas só podem entrar no fim).
create or replace view public.gifts_public with (security_invoker = on) as
select
  g.id, g.slug, g.title, g.description, g.category, g.is_fun,
  g.cota_price, g.total_cotas, g.photos, g.sort_order, g.active,
  coalesce(sum(p.quantity) filter (where p.status = 'paid'), 0)::int as cotas_sold,
  g.valor_livre
from public.gifts g
left join public.purchases p on p.gift_id = g.id
group by g.id;

revoke select on public.gifts_public from anon, authenticated;
