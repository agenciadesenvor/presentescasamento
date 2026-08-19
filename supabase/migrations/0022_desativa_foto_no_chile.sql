-- Remove "Uma foto bonita no Chile" (R$ 90) do site. Sem compras; soft-delete por consistência.
update public.gifts set active = false where slug = 'foto-chique-no-chile';
