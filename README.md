# 💍 Lista de Presentes de Casamento

Site divertido de lista de presentes em **cotas**, com visual estilo Airbnb,
checkout via **Mercado Pago** (PIX/cartão) e painel admin para os noivos.

Feito com **Next.js 15 + Tailwind + Supabase + Mercado Pago**.

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:3000
```

Sem variáveis de ambiente, o site roda em **modo demonstração**: mostra os
presentes do seed (`lib/data/seed.ts`) e o botão de presentear exibe um aviso em
vez de cobrar. Ótimo para ver o visual antes de conectar os serviços.

## Para ativar de verdade

1. **Supabase** — crie um projeto, rode a migration `supabase/migrations/0001_init.sql`
   (cria tabelas, RLS, o bucket de fotos e o seed dos presentes) e crie um usuário
   admin em Authentication. Pegue a URL, a `anon key` e a `service_role key`.
2. **Mercado Pago** — crie um app e gere o **Access Token** (comece pelas
   credenciais de teste).
3. Copie `.env.local.example` para `.env.local` e preencha tudo.
4. `npm run dev` de novo e acesse `/admin/login`.

## Estrutura

| Caminho | O quê |
|---|---|
| `app/page.tsx` | Home: hero + filtros + grid de presentes |
| `app/presente/[slug]` | Página de um presente (deep-link) |
| `app/obrigado` | Página pós-pagamento |
| `app/admin` | Painel: CRUD de presentes, recados, configurações |
| `app/api/checkout` | Cria a compra (pendente) + preferência do Mercado Pago |
| `app/api/webhooks/mercadopago` | Confirma o pagamento e dá baixa na cota |
| `lib/data/*` | Acesso a dados (Supabase com fallback no seed) |
| `lib/mercadopago.ts` | Integração do checkout |

## Deploy (Vercel)

Suba o repositório, configure as mesmas variáveis de ambiente no projeto da Vercel
(incluindo `NEXT_PUBLIC_SITE_URL` com a URL final) e faça o deploy. Depois,
aponte o webhook do Mercado Pago para `https://SEU-SITE/api/webhooks/mercadopago`.
