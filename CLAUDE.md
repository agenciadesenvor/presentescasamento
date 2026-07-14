# CLAUDE.md — Site de Lista de Presentes (Elison & Patrícia)

Contexto do projeto para o Claude Code. Leia antes de mexer.

## O que é

Site de **lista de presentes de casamento** do casal **Elison & Patrícia** (data: **23/10/2026, 16h**).
Visual estilo Airbnb: grid de cards com foto, filtros por categoria e modal de detalhe. Convidados
presenteiam **cotas** (via PIX/cartão, Mercado Pago) e deixam **recados**. Tem player de música,
contagem regressiva e mural de recados.

- 🌐 Produção: **https://elisonepatricia.com.br** (também `presentes-casamentos.vercel.app`)
- 💾 Repositório: `https://github.com/agenciadesenvor/presentescasamento` (branch `main`)

## Stack

- **Next.js 16** (App Router, TypeScript) + **Tailwind CSS v3**
- **Supabase** (Postgres, Auth, Storage) — projeto **compartilhado** `qggiltvexcnwkvirduhw` ("agenciadesenvor's Project")
- **Mercado Pago** (Checkout Pro + webhook) — **em produção** (conta real, PIX ativo)
- **Vercel** (hospedagem) + **framer-motion** (animações) + **lucide-react** (ícones)

## Comandos

```bash
npm run dev            # localhost:3000
npm run build          # build de produção (rode antes de deploy)
vercel deploy --prod   # publica na Vercel (CLI já autenticada como elisonrdm-3718)
```

Git é separado do deploy: commitar/pushar (`git push origin main`) NÃO publica; a Vercel é via `vercel deploy --prod`.
Sempre ≥ Next 16 — a Vercel **bloqueia** versões vulneráveis do Next.

## Arquitetura / convenções IMPORTANTES

- **O site é DB-driven.** Os presentes vêm do Supabase em runtime (`lib/data/gifts.ts`, páginas com `export const dynamic = "force-dynamic"`). O `lib/data/seed.ts` é só **fallback de demonstração** (quando não há env vars). Mudança no banco reflete no ar **na hora** (sem deploy).
- **Todo acesso ao banco é via `service_role` no servidor** (`createAdminClient`, `lib/supabase/admin.ts`). O RLS está **fechado** (tabelas sem política para anon/authenticated) — nunca exponha service_role ao cliente. Isso é importante porque o projeto Supabase é compartilhado com outros sistemas.
- **Segredos** ficam SÓ em `.env.local` (gitignored) e nas **env vars da Vercel** (produção). Nunca comitar.
- **Admin** (`/admin`) é restrito por e-mail via env `ADMIN_EMAILS` (`isAdminEmail()` em `lib/supabase/config.ts`).
- **Paleta de marca** (Tailwind): `forest` (verde #374A32), `mocha` (marrom #69452D), `cream` (off-white #FFFBF8), `stone` (cinza). Fontes: Playfair (serif) + Inter (sans). NÃO existem cores `coral`/`sage` (foram renomeadas).
- **Fotos dos presentes**: URLs remotas (Unsplash, allowlist em `next.config.mjs`) OU arquivos locais em `public/gifts/`. Fotos de produto (Amazon/Carrefour) e imagens que podem sumir → **baixar para `public/gifts/`** e servir localmente.
- **Migrations** em `supabase/migrations/` (histórico append-only). Aplicar no banco via MCP do Supabase.

## Modelo de dados (Supabase)

- `gifts`: id, slug, title, description, `category` (`divertidas`|`casa`|`cozinha`|`lua_de_mel`), `is_fun`,
  `cota_price` (centavos), `total_cotas`, `photos` (text[]), `sort_order`, `active`.
- `purchases`: compra de cotas + recado; status `pending`→`paid` (webhook dá baixa). Só admin lê.
- `messages`: recados públicos do mural.
- `settings`: nomes do casal, data, tagline.
- View `gifts_public`: gifts + `cotas_sold` (soma das compras pagas). `security_invoker`.

## Como adicionar um presente

1. Baixar/definir a(s) foto(s) (local em `public/gifts/` ou URL Unsplash validada).
2. `insert into public.gifts (...)` no banco (via migration MCP) — vira live na hora.
3. Espelhar no `lib/data/seed.ts` (array `RAW`) e criar `supabase/migrations/000X_*.sql`.
4. Se usou **imagem local**, precisa `vercel deploy --prod` (o arquivo estático vai junto).
5. Commit + push.

Preço é sempre em **centavos**. `total_cotas: 1` = presente único (uma pessoa dá inteiro).
Categorias vazias não aparecem no filtro (`CategoryFilter` esconde as com 0 itens).

## Componentes principais

- `Hero.tsx` — foto full-bleed + monograma (`public/hero-monograma.svg`) + data + CTA (design do Figma).
- `GiftGrid` / `GiftCard` / `GiftModal` — vitrine e detalhe.
- `PurchaseForm` — seletor de cotas + `POST /api/checkout` → redireciona pro Mercado Pago.
- `MessageWall` — mural de recados (server action `postMessage`, honeypot anti-spam).
- `Countdown` — contagem até 2026-10-23T16:00-03:00 (rodapé).
- `SiteNav` + `ui/tubelight-navbar` — navbar flutuante (Início/Lista/Recados/Contagem).
- `MusicPlayer` — playlist flutuante (`public/music/*.mp3`) com autoplay no 1º gesto.
- `app/admin/*` — painel (CRUD presentes, compras/recados, moderação).
- `app/api/checkout` e `app/api/webhooks/mercadopago` — fluxo de pagamento.

## Pagamento (Mercado Pago)

Está em **PRODUÇÃO** (dinheiro real, PIX + cartão). Token de produção nas env vars da Vercel
(`MERCADO_PAGO_ACCESS_TOKEN`). O webhook re-verifica o pagamento na API antes de marcar `paid`
(à prova de fraude). Elementos flutuantes (navbar/player) usam `pointer-events-none` no wrapper para
não bloquear cliques.

## Env vars (nomes; valores só em .env.local / Vercel)

`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`MERCADO_PAGO_ACCESS_TOKEN`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_EMAILS`.

## Observações do ambiente

- Preview MCP de screenshot não funciona aqui; verifique via `curl` na URL ao vivo.
- Gravar segredos na Vercel via CLI pode ser bloqueado pelo classificador — precisa do OK explícito do usuário.
- `formatBRL` usa espaço não-quebrável (grep por `R$ 150,00` com espaço normal falha; use `150,00`).
