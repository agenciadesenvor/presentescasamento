-- Jantar romântico no Chile (lua_de_mel, R$ 300) e jantar a dois em São Paulo
-- (divertidas, R$ 250). Presente único.
insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('jantar-no-chile','Um jantar romântico no Chile','Uma noite só de vocês dois no Chile: mesa reservada, brinde com vinho chileno e aquele jantar que fecha a lua de mel com chave de ouro.','lua_de_mel',false,30000,1,'{"https://images.unsplash.com/photo-1731941465921-eb4285693713?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1706586346290-68657e61cfc4?w=1200&q=80&auto=format&fit=crop"}',24),
('jantar-em-sao-paulo','Um jantar a dois em São Paulo','Pra provar que casado também namora: um jantar a dois em São Paulo, longe da pia e da Netflix. Romance renovado — e ninguém lava a louça depois.','divertidas',true,25000,1,'{"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1723132688333-83018f3560be?w=1200&q=80&auto=format&fit=crop"}',25)
on conflict (slug) do nothing;
