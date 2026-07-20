-- Aspirador de pó portátil: troca fotos do Unsplash pela foto de produto local.
update public.gifts
set photos = '{"/gifts/aspirador-portatil.jpg"}'
where slug = 'aspirador-portatil';
