-- Aspirador de pó portátil (categoria casa, R$ 250, presente único).
insert into public.gifts (slug, title, description, category, is_fun, cota_price, total_cotas, photos, sort_order) values
('aspirador-portatil','Aspirador de pó portátil','Pra dar aquela geral rapidinho sem arrastar mangueira pela casa toda — leve, sem fio e sempre à mão pra deixar o cantinho novo impecável.','casa',false,25000,1,'{"https://images.unsplash.com/photo-1746645297698-306ef29852ca?w=1200&q=80&auto=format&fit=crop","https://images.unsplash.com/photo-1569698134101-f15cde5cd66c?w=1200&q=80&auto=format&fit=crop"}',17)
on conflict (slug) do nothing;
