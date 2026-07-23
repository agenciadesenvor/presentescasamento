-- Ajuste de preços: Vinícola Alyan R$ 300, Teleférico de Santiago R$ 250.
update public.gifts set cota_price = 30000 where slug = 'vinicola-alyan';
update public.gifts set cota_price = 25000 where slug = 'teleferico-santiago';
