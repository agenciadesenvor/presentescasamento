-- Ingresso do Corinthians vira 2 ingressos, presente único de R$ 250.
update public.gifts
set title = '2 ingressos pro jogo do Corinthians',
    description = 'Porque o noivo também merece sofrer fora do casamento — e agora acompanhado. São dois lugares na arquibancada pra torcer (e xingar o juiz) a dois.',
    cota_price = 25000,
    total_cotas = 1
where slug = 'ingresso-do-corinthians';
