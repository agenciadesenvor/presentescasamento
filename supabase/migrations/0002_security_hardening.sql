-- =====================================================================
-- Fechamento de segurança
-- O app acessa o banco SOMENTE via service_role (lado servidor), então
-- anon e authenticated não precisam de acesso às nossas tabelas. Isto é
-- especialmente importante porque o projeto Supabase é COMPARTILHADO com
-- outros sistemas — assim, usuários logados de outros sistemas não têm
-- nenhum acesso aos dados do casamento.
-- =====================================================================

-- View de presentes: respeita as permissões de quem chama (não mais SECURITY
-- DEFINER) e deixa de ser acessível por anon/authenticated.
alter view public.gifts_public set (security_invoker = on);
revoke select on public.gifts_public from anon, authenticated;

-- Remove as políticas permissivas (USING true) das nossas tabelas.
-- Sem políticas + RLS habilitado => anon/authenticated ficam sem acesso.
-- O service_role (usado pelo servidor) continua funcionando pois ignora o RLS.
drop policy if exists "gifts_public_read"     on public.gifts;
drop policy if exists "gifts_admin_write"      on public.gifts;
drop policy if exists "settings_read"          on public.settings;
drop policy if exists "settings_admin_write"   on public.settings;
drop policy if exists "purchases_admin_read"   on public.purchases;

-- Observação: RLS permanece HABILITADO em gifts, purchases e settings.
-- O aviso "RLS enabled, no policy" do linter é o estado desejado aqui
-- (acesso exclusivamente pelo servidor via service_role).
