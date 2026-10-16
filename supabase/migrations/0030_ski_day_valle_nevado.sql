-- "Sunset Cordilheira" (antigo Portillo renomeado no admin, duplicava o outro sunset e
-- tinha foto de Torres del Paine) vira Ski Day no Valle Nevado: 2 cotas de R$ 200.
update public.gifts set
  slug = 'ski-day-valle-nevado',
  title = 'Ski Day no Valle Nevado',
  description = 'Um dia inteiro na neve dos Andes: esquiar (ou tentar 😅), descer de snowboard e curtir as pistas do Valle Nevado, que este ano ficou aberto até novembro pela primeira vez na história. Foto: Jimmy Baikovicius (CC BY-SA 2.0).',
  category = 'lua_de_mel',
  is_fun = false,
  cota_price = 20000,
  total_cotas = 2,
  photos = '{"/gifts/ski-day-valle-nevado.jpg"}'
where id = 'cfe4bef5-0868-4a15-9293-7ab6437a1b3c';
