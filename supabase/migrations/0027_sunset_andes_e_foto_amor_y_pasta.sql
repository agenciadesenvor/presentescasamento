-- 1) "Embalse el Yeso e Termas da Colina" (duplicava o Embalse) vira
--    "Sunset na Cordilheira dos Andes", com foto enviada pelo casal.
--    Mantém preço (R$ 549) e total_cotas definidos no admin.
update public.gifts set
  slug = 'sunset-cordilheira-andes',
  title = 'Sunset na Cordilheira dos Andes',
  description = 'Subir a Cordilheira no fim da tarde e ver o sol se pôr sobre os picos nevados, com o céu pegando fogo sobre os Andes. O espetáculo que fecha o dia no Chile.',
  photos = '{"/gifts/sunset-cordilheira-andes.jpg"}'
where slug = 'embalse-el-yeso-termas';

-- 2) Amor y Pasta: foto real da experiência (enviada pelo casal).
update public.gifts set photos = '{"/gifts/amor-y-pasta.jpg"}'
where slug = 'jantar-no-chile';
