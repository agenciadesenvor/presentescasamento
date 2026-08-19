-- Lote de cotas novas (divertidas/contribuição/lua de mel/casa) usando placeholder
-- emoji (padrão emoji:X do GiftImage). Presente único cada. + 2 ajustes.

insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('perguntar-quando-filhos','Cota para perguntar quando terão filhos','Aquela pergunta que todo parente adora soltar no casamento. Cada cota dá o direito de perguntar quando vêm os filhos — e ver os noivos rindo sem graça.','divertidas',true,9000,1,'{"emoji:👶"}',26),
('proteger-tpm-noivo','Ajude o noivo a se proteger da TPM da noiva','Kit de sobrevivência do marido: chocolate, paciência e um bom fone de ouvido. Cada cota garante mais uns dias de paz no lar.','divertidas',true,10000,1,'{"emoji:🛡️"}',27),
('mes-de-aluguel','Um mês de aluguel para os noivos','Um empurrãozinho generoso pra deixar o começo da vida a dois mais leve. Cada cota é um pedaço do teto sobre a cabeça do casal.','casa',false,80000,1,'{"emoji:🏠"}',28),
('apenas-uma-lembrancinha','Apenas uma lembrancinha','Sem motivo e sem desculpa: só um miminho pra dizer que você está torcendo por eles. Simples e do coração.','divertidas',true,12000,1,'{"emoji:🎀"}',29),
('cafe-da-manha-lua-de-mel','Café da manhã farto na lua de mel','Pra começar cada dia da viagem com mesa cheia: pães quentinhos, frutas, sucos e um bom café a dois.','lua_de_mel',false,17000,1,'{"emoji:🥐"}',30),
('camisa-de-forca-noiva','Camisa de força pra noiva não surtar até o casamento','Organizar casamento é esporte radical. Cada cota ajuda a manter a noiva (quase) sã até a hora do sim.','divertidas',true,30000,1,'{"emoji:😵‍💫"}',31),
('contribuicao-bondosa','Contribuição bondosa','Pra quem quer ajudar com carinho e sem complicação. Um gesto bondoso que os noivos guardam no coração.','divertidas',true,35000,1,'{"emoji:😇"}',32),
('contribuicao-generosa-lua-de-mel','Contribuição generosa para a lua de mel','Pra lua de mel dos sonhos ficar ainda mais inesquecível. Cada cota é um brinde à viagem da vida deles.','lua_de_mel',false,120000,1,'{"emoji:💸"}',33),
('amigos-para-sempre','Cota amigos para sempre','Porque amizade de verdade a gente leva pra vida toda. Cada cota reserva seu lugar cativo na história do casal.','divertidas',true,37000,1,'{"emoji:🤝"}',34),
('jogar-buque','Cota pra noiva jogar o buquê na sua direção','Quer ser o próximo da fila? Cada cota aumenta misteriosamente suas chances de pegar o buquê no ar.','divertidas',true,25000,1,'{"emoji:💐"}',35),
('almoco-romantico','Almoço romântico para os noivos','Um almoço a dois sem pressa, pra celebrar o amor num dia comum. Romance servido à mesa.','divertidas',true,47000,1,'{"emoji:🍽️"}',36),
('proxima-a-casar','Cota para ser a próxima a casar','Dizem que casamento chama casamento. Cada cota reserva seu lugar na fila do próximo sim.','divertidas',true,18000,1,'{"emoji:💍"}',37),
('tia-preferida','Cota pra ser a tia preferida dos futuros filhos','A disputa começou cedo! Cada cota dá pontos extras na corrida por tio ou tia favorito da criançada que vem por aí.','divertidas',true,80000,1,'{"emoji:🧸"}',38),
('deus-te-iluminou','Deus te iluminou hoje, seja generoso','Um convite carinhoso pra abençoar o começo dessa nova família com generosidade. Que volte em dobro pra você.','divertidas',true,100000,1,'{"emoji:✨"}',39),
('escolher-musica-casamento','Escolha uma música pra tocar no casamento','Tem aquela música que combina com o casal? Cada cota garante um pedido especial na trilha sonora da festa.','divertidas',true,20000,1,'{"emoji:🎶"}',40),
('ir-na-lua-de-mel','Ir com os noivos para a lua de mel','A cota mais ousada da lista! Faz as malas que... é brincadeira. Ou não. Pra quem topa qualquer perrengue chique.','divertidas',true,325000,1,'{"emoji:🧳"}',41),
('levar-nao-convidado','Levar alguém que não foi convidado pro casamento','Aquele acompanhante surpresa? Só liberado com esta cota especialíssima (e olha que ela não é nada barata).','divertidas',true,500000,1,'{"emoji:🕵️"}',42),
('cantar-com-a-banda','Subir no palco e cantar com a banda do casamento','Seu momento popstar chegou! Cada cota libera o microfone pra você soltar a voz com a banda na festa.','divertidas',true,21000,1,'{"emoji:🎤"}',43),
('look-novo-lua-de-mel','Look novo pra usar na lua de mel','Pra desfilar bonito nas fotos da viagem. Cada cota ajuda a montar aquele look de arrasar na lua de mel.','lua_de_mel',false,15000,1,'{"emoji:👗"}',44),
('padrinhos-favoritos','Padrinhos favoritos dos noivos','Título disputadíssimo! Cada cota rende pontos na corrida pelo posto de padrinho ou madrinha número um do casal.','divertidas',true,80000,1,'{"emoji:🤵"}',45),
('so-pra-dizer-que-nao-dei-nada','Só pra dizer que não dei nada','A cota mais sincera de todas: você deu (a gente sabe), e agora pode dizer por aí que não deu nada.','divertidas',true,10000,1,'{"emoji:🙃"}',46),
('mes-de-faxina','Um mês de faxina pra noiva descansar','Um mês sem esfregar chão nem lavar louça. Cada cota é uma folga bem merecida pra noiva colocar os pés pra cima.','divertidas',true,40000,1,'{"emoji:🧹"}',47),
('lava-e-seca','Um lava e seca pra não sofrer mais lavando roupa','Chega de estender roupa e rezar pra não chover. Cada cota aproxima o casal da vida moderna: lava, seca e pronto.','casa',false,178000,1,'{"emoji:🧺"}',48),
('vale-passeio-chile','Vale passeio no Chile','Um vale livre pra escolher aquele passeio especial na lua de mel chilena. Aventura garantida nos Andes.','lua_de_mel',false,34000,1,'{"emoji:🎫"}',49),
('passeio-costanera','Passeio na Costanera (Chile)','Subir ao topo do Sky Costanera, o prédio mais alto da América do Sul, e ver Santiago inteira com os Andes ao fundo.','lua_de_mel',false,15000,1,'{"emoji:🌇"}',50),
('fundo-emergencial-tpm','Fundo Emergencial para TPM da noiva','Reserva estratégica de chocolate, sorvete e paz. Pra acionar nos dias em que o mundo precisa recuar um pouquinho.','divertidas',true,10000,1,'{"emoji:🍫"}',51)
on conflict (slug) do nothing;

-- Ajuste 1: pilates vira "1 mês" e R$ 220.
update public.gifts set
  title = '1 mês de pilates pra noiva',
  description = 'Um mês inteiro de pilates pra noiva alongar o corpo e a paciência. Cada cota é mais equilíbrio — e menos surto pré-casamento.',
  cota_price = 22000
where slug = 'pilates-da-noiva';

-- Ajuste 2: jantar no Chile vira a experiência no restaurante Amor y Pasta, R$ 400.
update public.gifts set
  title = 'Experiência no restaurante Amor y Pasta (Chile)',
  description = 'Uma noite especial num dos restaurantes mais charmosos de Santiago: massas artesanais, vinho chileno e clima romântico. O jantar perfeito da lua de mel.',
  cota_price = 40000
where slug = 'jantar-no-chile';
