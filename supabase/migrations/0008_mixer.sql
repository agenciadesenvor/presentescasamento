-- Mixer (categoria cozinha, R$ 240).
insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('mixer','Mixer','Pra deixar a cozinha completíssima — bater, misturar e preparar de tudo com praticidade de chef.','cozinha',false,24000,1,'{"/gifts/mixer.jpg"}',16)
on conflict (slug) do nothing;
