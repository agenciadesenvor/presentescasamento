-- Presente de valor livre (mínimo R$ 10; o teto de R$ 10.000 é validado no checkout).
insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order, valor_livre) values
('presente-valor-livre','Um presente do seu jeito','Prefere escolher o valor? Digite quanto quer dar e pague por PIX ou cartão. Todo carinho conta — e vira casa nova, lua de mel e muitas memórias pra nós dois.','casa',false,1000,100000,'{"/gifts/valor-livre.jpg"}',0,true)
on conflict (slug) do nothing;
