-- Triturador de alimentos: ajusta preço para R$ 220.
update public.gifts
set cota_price = 22000
where slug = 'triturador-de-alimentos';
