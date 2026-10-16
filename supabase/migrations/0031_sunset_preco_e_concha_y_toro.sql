-- 1) Sunset na Cordilheira dos Andes: valor do passeio (R$ 309,68 por pessoa).
update public.gifts set cota_price = 30968 where id = '09d64ee0-ac61-4c69-a309-f3fb154c108f';

-- 2) Vinícola Alyan sai da lista (soft-delete: tem 1 cota PAGA, o registro fica preservado)
--    e entra a Vinícola Concha y Toro como presente novo, no mesmo lugar da lista.
update public.gifts set active = false where id = '6fcba21a-d543-4170-b438-1a4b3c0be8ae';

insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('vinicola-concha-y-toro','Vinícola Concha y Toro','A vinícola mais famosa do Chile, em Pirque: a casona histórica, os jardins, os vinhedos e a lendária adega do Casillero del Diablo, com degustação dos vinhos da casa. Foto: Apincheira (CC BY-SA 3.0).','lua_de_mel',false,30000,2,'{"/gifts/concha-y-toro.jpg"}',23)
on conflict (slug) do nothing;
