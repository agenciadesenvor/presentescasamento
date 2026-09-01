-- Cafeteira elétrica (categoria cozinha, R$ 300, presente único).
insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('cafeteira','Cafeteira elétrica','Pra começar as manhãs do casal do jeito certo: café passado na hora, programável e com jarra grande — porque amor também se mede em xícaras. ☕','cozinha',false,30000,1,'{"/gifts/cafeteira.jpg"}',52)
on conflict (slug) do nothing;
