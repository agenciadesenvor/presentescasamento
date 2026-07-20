-- Kit de panelas inox (categoria cozinha, R$ 550, presente único).
insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('kit-panelas-inox','Kit de panelas inox','Aço inox de verdade, com fundo triplo pra distribuir o calor por igual — do arroz de todo dia ao jantar especial. O tipo de kit que dura o casamento inteiro (e olha que é pra durar bastante).','cozinha',false,55000,1,'{"https://images.unsplash.com/photo-1604414499020-f9ac575bc5ec?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1511224931379-b4e4324ea7fc?w=1200&q=80&auto=format&fit=crop"}',18)
on conflict (slug) do nothing;
