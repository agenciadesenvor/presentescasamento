-- Remove "Uma diária de silêncio pro noivo" do site.
-- Soft-delete (active = false): há 1 compra PAGA real (R$ 80, mp_payment_id 165579997121),
-- então NÃO apagamos o registro — apenas escondemos o presente do site.
update public.gifts set active = false where slug = 'diaria-de-silencio';
