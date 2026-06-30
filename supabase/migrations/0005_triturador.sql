-- Triturador de alimentos (categoria cozinha).
insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('triturador-de-alimentos','Triturador de alimentos','Pra dar fim aos restos de comida direto na pia, sem entupimento e sem aquela discussão de quem limpa. Praticidade que a cozinha nova merece.','cozinha',false,7000,10,'{"https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1609210884848-2d530cfb2a07?w=1200&q=80&auto=format&fit=crop"}',15)
on conflict (slug) do nothing;
