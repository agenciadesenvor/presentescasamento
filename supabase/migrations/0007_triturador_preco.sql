-- Ajuste de preço do triturador para R$ 150 (1 cota).
update public.gifts
   set cota_price = 15000, total_cotas = 1
 where slug = 'triturador-de-alimentos';
