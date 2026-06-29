-- =====================================================================
-- Passeios da lua de mel (We Love Chile) — categoria lua_de_mel.
-- Valores do portfólio Verão 2026 (preços em BRL).
-- =====================================================================

insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('portillo-laguna-del-inca','Portillo e Laguna del Inca','O centro de esqui mais antigo do Hemisfério Sul, a 2.600m nos Andes, com a deslumbrante Laguna del Inca de águas azul-turquesa. Tour guiado saindo de Santiago, com coquetel a bordo. (O passeio mais procurado do roteiro!)','lua_de_mel',false,38800,1,'{"https://images.unsplash.com/photo-1614586125858-e695dd97d1b6?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1610226977301-986edce66047?w=1200&q=80&auto=format&fit=crop"}',12),
('embalse-el-yeso','Embalse el Yeso','Uma aventura pelos Andes até a represa gigante cercada de montanhas, com uma vista de tirar o fôlego. Tour guiado saindo de Santiago, pelo Cajón del Maipo.','lua_de_mel',false,32300,1,'{"https://images.unsplash.com/photo-1589071780475-89033c3cef5a?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1719258179071-8f04134d6796?w=1200&q=80&auto=format&fit=crop"}',13),
('embalse-el-yeso-termas','Embalse el Yeso e Termas da Colina','O azul do Embalse El Yeso somado ao relaxamento nas águas termais naturais das Termas da Colina, em meio às montanhas. Inclui café da manhã e roupão personalizado.','lua_de_mel',false,54900,1,'{"https://images.unsplash.com/photo-1709214406424-7acd64e9c438?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1600024102232-cb447dea5ba3?w=1200&q=80&auto=format&fit=crop"}',14)
on conflict (slug) do nothing;
