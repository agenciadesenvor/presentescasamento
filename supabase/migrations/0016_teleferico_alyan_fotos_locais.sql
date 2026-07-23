-- Teleférico e Vinícola Alyan: usam foto principal local (enviada pelo casal),
-- mantendo uma imagem ilustrativa do Unsplash como 2ª da galeria.
update public.gifts
set photos = '{"/gifts/teleferico-santiago.jpg","https://images.unsplash.com/photo-1693643210415-195688c860f8?w=1200&q=80&auto=format&fit=crop"}'
where slug = 'teleferico-santiago';

update public.gifts
set photos = '{"/gifts/vinicola-alyan.jpg","https://images.unsplash.com/photo-1567072629554-20e689de2400?w=1200&q=80&auto=format&fit=crop"}'
where slug = 'vinicola-alyan';
