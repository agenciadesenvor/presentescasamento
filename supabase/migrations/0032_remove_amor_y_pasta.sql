-- Remove "Experiência no restaurante Amor y Pasta (Chile)" do site (sem compras; soft-delete).
update public.gifts set active = false where id = '199c3ff7-784d-4562-b57c-2d6b101c3a6b';
