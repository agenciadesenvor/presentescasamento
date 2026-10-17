-- Valor livre: mínimo sobe para R$ 70 (validado no checkout, não exibido ao convidado).
update public.gifts set cota_price = 7000 where slug = 'presente-valor-livre' and valor_livre;
