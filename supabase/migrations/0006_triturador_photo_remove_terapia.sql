-- Foto real do triturador (produto Carrefour, servida localmente) + remoção da terapia de casal.
update public.gifts
   set photos = '{"/gifts/triturador-1.jpg","/gifts/triturador-2.jpg"}'
 where slug = 'triturador-de-alimentos';

delete from public.gifts where slug = 'terapia-de-casal';
