---
name: psychologist-site-template
description: Master template for CeliDigital's own site and for cloning individual psychologist sites. Read this before adding sections, changing brand data, or spinning up a new client site from this codebase.
---

# Psychologist Site Template (CeliDigital Master Template)

> **Regra de ouro:** não reconstruir componentes existentes sem necessidade.
> Prefira configuração e composição de componentes. Nunca coloque informação
> específica de um cliente (nome, CRP, cores, textos, contato) diretamente
> dentro de um componente reutilizável — ela vive em `src/config/site.ts` e
> `src/data/*.ts`.

## 1. Objetivo do template

Este projeto é dois produtos ao mesmo tempo:

1. **Site comercial da CeliDigital** — vende criação de sites + tráfego pago
   para psicólogos.
2. **Master template** — a mesma base de código deve ser clonada para criar o
   site individual de cada psicólogo cliente, trocando apenas
   configuração/dados/assets/cores, sem reescrever componentes ou layout.

Se uma mudança só faz sentido para *um* cliente específico, ela não pertence
a um componente — pertence a `config/` ou `data/`.

## 2. Público-alvo

Psicólogos que ainda não têm site, dependem só do Instagram, querem mais
profissionalismo, mais presença no Google e mais contatos — e, no caso do
site institucional, psicólogos avaliando contratar a CeliDigital para isso.
Comunicação: premium, tecnológica, sofisticada, humana. Nunca: agência
genérica, template WordPress, landing page colorida/infantil.

## 3. Arquitetura

Separação em 4 camadas, sempre nessa direção de dependência:

```
config/  → identidade da marca (uma vez por site)
data/    → conteúdo das seções (arrays tipados)
components/ → estrutura visual (lê config/data via props, nunca hardcoded)
app/     → composição das páginas (importa e ordena components/sections)
```

Um componente nunca importa "o psicólogo X" — ele recebe dados de `config` ou
`data`, ou de props. Isso é o que torna o clone possível.

## 4. Estrutura de pastas

```
src/
├── app/            # rotas Next.js (App Router), layout.tsx = SEO/metadata
├── components/
│   ├── ui/         # primitivos reutilizáveis (GlassCard, CTAButton, ...)
│   ├── layout/     # Navbar, Footer
│   └── sections/   # Hero, Services, BentoGrid, ... (uma seção = um arquivo)
├── config/
│   └── site.ts     # ÚNICA fonte de identidade de marca/contato/SEO
├── data/           # arrays de conteúdo (services, process, bento, ...)
├── lib/            # utils.ts (cn(), buildWhatsappLink())
├── styles/         # (globals.css vive em app/, ver seção 5)
└── types/          # tipos compartilhados entre config/data/components

public/
├── images/         # fotos/imagens reais do cliente
├── logos/          # logo do cliente
├── icons/          # ícones customizados (favicon etc.)
└── assets/         # outros arquivos estáticos

docs/design-reference/  # imagens de referência visual (NÃO são assets do
                          site — apenas documentação/inspiração de design)
tasks/                   # um .md por mudança relevante (ver seção 20/21)
```

## 5. Design tokens (Tailwind v4)

Este projeto usa Tailwind CSS v4, que é **CSS-first** — não existe
`tailwind.config.ts`. Os tokens (cores, radius, fontes) ficam em
`src/app/globals.css`, em duas camadas:

- `:root { --primary: ...; }` — valores brutos.
- `@theme inline { --color-primary: var(--primary); }` — expõe como utilitário
  Tailwind (`bg-primary`, `text-primary`, etc).

Para mudar a paleta de um clone, edite os valores em `:root` — não crie um
novo arquivo de config.

## 6. Componentes reutilizáveis

`components/ui/`:

| Componente | Uso |
|---|---|
| `GlassCard` | container com glassmorphism, `glow`/`strong` opcionais |
| `Badge` | pill pequeno (eyebrow text, tags "exemplo") |
| `SectionHeader` | eyebrow + título (com highlight em gradiente) + descrição |
| `CTAButton` | botão principal/secundário com hover/tap via Motion |
| `MetricCard` | card de métrica pequena, com flag `isPlaceholder` |
| `Logo` | wordmark lido de `siteConfig.brandName` (ver seção 9) |
| `Reveal` | wrapper de entrada por scroll (`whileInView`) |
| `Float` | flutuação infinita suave (para cards/elementos da Hero) |
| `MouseParallax` | profundidade por movimento do cursor |
| `ScrollFrameSequence` | sequência de imagens (`frame-001.webp`...) desenhada em `<canvas>`, um frame por tick de scroll — recebe `progress` (MotionValue 0→1) de fora, não sabe nada de scroll/pin por si só. `fill` faz cobrir o container todo (`object-cover` manual, use com um véu escuro por cima se o fundo dos frames não for transparente). Buffer do canvas é redimensionado por `devicePixelRatio` (nítido em telas retina/4K). `enabled={false}` baixa só 1 frame estático em vez da sequência inteira — sempre passe `enabled` amarrado à mesma condição que desliga o pin/scroll (nunca deixe `true` fixo, senão mobile baixa a sequência toda à toa) |

`lib/hooks.ts` tem `useMediaQuery()` (via `useSyncExternalStore`, SSR-safe) —
usado para desligar efeitos pesados (como o pin/scroll-scrub da Hero) abaixo
de um breakpoint. Nunca use `useState`+`useEffect` para isso: o React
Compiler deste projeto rejeita `setState` síncrono dentro de `useEffect`.

`components/layout/`: `Navbar`, `Footer` — leem `data/navigation.ts` e
`config/site.ts`, nunca têm texto de marca hardcoded.

`components/sections/`: uma seção = um arquivo = uma responsabilidade. Cada
seção lê o próprio array de `data/` e não sabe nada sobre as outras seções.

## 7. Sistema de configuração

`src/config/site.ts` exporta `siteConfig: SiteConfig` (tipo em
`src/types/index.ts`). Contém: `brandName`, `tagline`, `professionalName`,
`profession`, `councilId` (CRP/CRM), `description`, `url`, `contact`
(whatsapp/email/instagram), `location`, `specialties`, `seo`, `logo`.

**Nenhum componente deve importar dados de contato/marca de outro lugar.**

## 8. Como trocar os dados de um psicólogo

1. Edite `src/config/site.ts` (nome, profissão, CRP, contato, SEO, logo).
2. Edite os arrays em `src/data/` (`services.ts`, `process.ts`, `bento.ts`,
   `benefits.ts`, `logos.ts`, `navigation.ts`) com o conteúdo do novo cliente.
3. Não edite `components/` a menos que uma seção inteira precise ser
   adicionada/removida (ver seção 14).

## 9. Como trocar imagens

Coloque os arquivos reais em `public/images/` (fotos), `public/logos/`
(logo) ou `public/icons/`. Nunca distorça uma imagem para caber — use
`object-fit`/`object-position`, ajuste o container, ou crie uma variante
CSS (crop, overlay, máscara) antes de forçar a imagem a um aspect ratio que
não é o dela. Imagens de referência (moodboard, mockups de inspiração) vão em
`docs/design-reference/` e nunca são renderizadas no site.

## 10. Como trocar o logo

Hoje `Logo.tsx` (`components/ui/Logo.tsx`) renderiza um wordmark em CSS
(inicial da marca + `siteConfig.brandName`) porque não existe um arquivo de
logo real ainda. Quando houver um logo real:

1. Coloque o arquivo em `public/logos/`.
2. Atualize `siteConfig.logo.src`/`alt` em `config/site.ts`.
3. Em `Logo.tsx`, troque a marca CSS por `<Image src={siteConfig.logo.src} alt={siteConfig.logo.alt} .../>`.

## 11. Como trocar cores

Edite os valores em `:root` no topo de `src/app/globals.css` (`--primary`,
`--secondary`, `--accent`, `--background`, etc — ver seção 5). Os gradientes
(`--gradient-brand`, `--gradient-text`) e glows (`--glow-primary`) devem ser
recalculados a partir das novas cores para manter a mesma sensação "premium".
Não crie cores soltas em componentes — sempre via token.

## 12. Como configurar SEO

Tudo em `siteConfig.seo` (`title`, `description`, `keywords`) e consumido por
`src/app/layout.tsx` (`metadata`). Ao trocar de cliente: reescreva
title/description focados na cidade/especialidade dele, evite keyword
stuffing. A imagem de Open Graph **não** é um arquivo estático — é gerada em
`src/app/opengraph-image.tsx` a partir do próprio `siteConfig` (edite esse
arquivo, ou troque por um `opengraph-image.png` real se preferir uma arte
desenhada à mão).

### Analytics (Google Tag Manager)

`NEXT_PUBLIC_GTM_ID` (variável de ambiente, ver `.env.local.example`) liga o
Google Tag Manager via `@next/third-parties/google` em `layout.tsx` — é o
**único** script de analytics que entra em código. GA4 e qualquer outra tag
(Meta Pixel, conversão do Google Ads, etc.) se configuram dentro do painel do
GTM, não aqui — evita contar visita em dobro e permite adicionar novas tags
sem mexer em código. Sem `NEXT_PUBLIC_GTM_ID` definido, nada é injetado. Cada
clone do template usa seu próprio container.

Passo a passo completo (criar a tag do GA4 dentro do GTM, testar, publicar):
[docs/guia-google-tag-manager.md](../../../docs/guia-google-tag-manager.md).
Use esse mesmo guia pra cada novo site do template.

## 13. Como configurar WhatsApp

`siteConfig.contact.whatsapp` — apenas dígitos, com código do país (ex:
`"5511999999999"`). `siteConfig.contact.whatsappDisplay` é a versão formatada
para exibição. Use sempre `buildWhatsappLink()` de `lib/utils.ts` para montar
o link (nunca concatene a URL manualmente em um componente).

## 14. Como configurar redes sociais

`siteConfig.contact.instagram` (URL completa) e `instagramHandle` (para
exibição, ex: `"@celidigital"`). Se um clone precisar de mais redes, estenda
o tipo `SiteConfig["contact"]` em `types/index.ts` e consuma no `Footer`.

## 15. Como adicionar/remover seções

1. Crie o componente em `components/sections/NomeDaSecao.tsx` (leia dados de
   um novo arquivo em `data/`, não hardcode).
2. Importe e posicione em `src/app/page.tsx`.
3. Se a seção deve estar acessível pela navbar, adicione uma entrada em
   `data/navigation.ts` com o `href` = `#id-da-secao`.
4. Documente a mudança em `tasks/00X_nome.md` (ver seção 21).

Nunca delete uma seção só comentando o import — remova a entrada de
`page.tsx` e, se for definitivo, o arquivo do componente.

## 16. Padrão de responsividade

Mobile-first nos componentes de seção; breakpoints padrão do Tailwind v4
(`sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px) sem overrides. No mobile,
a Hero reordena prioridade: headline → CTA → visual → elementos
complementares (nunca apenas encolhe o layout desktop). Sem overflow
horizontal: qualquer elemento decorativo posicionado com `absolute` deve ter
uma versão mobile testada (esconder com `hidden sm:block` quando necessário).

## 17. Padrão de animações

- Framer/Motion (`motion/react`) para interações e entrada por scroll
  (`Reveal`), Motion também para float/parallax (`Float`, `MouseParallax`).
- CSS puro (`@keyframes`) para loops contínuos e baratos, como o marquee de
  logos.
- **Sempre** anime `transform`/`opacity` — nunca `width`/`top`/`left` direto.
- **Sempre** respeite `prefers-reduced-motion`: há um fallback global em
  `globals.css` (zera duração de animação/transição) e os componentes com
  Motion usam `useReducedMotion()` para trocar a animação por um estado
  estático em vez de apenas acelerá-la.
- **Scroll pinado (`position: sticky` + seção alta) só em desktop.** A Hero
  usa esse padrão para a sequência de imagens 3D (`ScrollFrameSequence`),
  mas só ativa abaixo de `lg` se o conteúdo couber em UMA tela — senão a
  parte de baixo fica inacessível durante o pin (bug real encontrado na
  Task 002). Ao copiar esse padrão para outra seção, sempre meça a altura
  do conteúdo pinado contra o viewport mobile antes de ativar o pin lá.
- **Pin (travar a tela) e scrub (a sequência reagir ao scroll) são flags
  separadas**, não a mesma coisa — ver `shouldPin` vs `shouldScrub` em
  `Hero.tsx` (Task 003). Dá pra ter a sequência de imagens avançando com o
  scroll SEM travar a seção: troque o `offset` do `useScroll` para
  `["start end", "end start"]` (progresso ao longo da passagem natural da
  seção pela viewport) em vez de `["start start", "end end"]` (que exige
  uma seção alta + `sticky`). Se a seção tiver duas resoluções de asset
  (uma leve pra mobile), escolha pelo mesmo `isDesktop` que decide o pin.

## 18. Padrão visual

Paleta: preto/escuro (`--background`) + roxo (`--primary`) + azul
(`--secondary`) + lavanda (`--accent`) + branco (`--foreground`), com
glassmorphism (`.glass`/`.glass-strong`), glow sutil
(`.glow-primary`/`.glow-secondary`) e gradiente de marca
(`.bg-gradient-brand`/`.text-gradient-brand`). Evite excesso: 3D aqui é
profundidade e glass, não literalmente WebGL/partículas — "premium e
sofisticado", não "site gamer".

## 19. Regras de performance

- `next/image` para qualquer foto real (nunca `<img>` cru).
- Client Components (`"use client"`) só onde há interatividade/Motion —
  seções puramente estáticas continuam Server Components.
- Sem bibliotecas novas sem necessidade real (o projeto já inclui apenas
  `motion`, `lucide-react`, `clsx`, `tailwind-merge` além do Next/React
  padrão — pense duas vezes antes de adicionar mais uma).

## 20. Regras de acessibilidade

- Contraste AA mínimo entre `--foreground`/`--muted` e `--background`.
- Todo ícone decorativo leva `aria-hidden="true"`; todo ícone com função
  (ex: botão de menu) leva `aria-label`.
- Navegação por teclado: `CTAButton`/links usam `:focus-visible` com anel
  visível (ver `focus-visible:ring-*` em `CTAButton`).
- `alt` obrigatório em qualquer imagem real adicionada.

## 21. Regras para não quebrar o template

- Não duplique um componente de `ui/` para "customizar levemente" — estenda
  via props.
- Não hardcode textos/contatos de um cliente dentro de `components/`.
- Não invente números/depoimentos/clientes reais em `data/` — use
  `isPlaceholder: true` (onde o tipo suportar) e deixe claro no texto
  ("exemplo", "dado demonstrativo") quando o conteúdo for ilustrativo.
- Não quebre a convenção de pastas (config/data/components/types) descrita
  na seção 3 ao adicionar algo novo.
- Rode `npm run build` antes de considerar qualquer tarefa concluída.

## 22. Processo para criar um novo site a partir do template

1. Copie o projeto inteiro para um novo diretório (ex: `sites/psicologo-nome`
   ou um novo repositório).
2. `rm -rf node_modules .next && npm install`.
3. Edite `src/config/site.ts` com os dados reais do novo psicólogo.
4. Edite `src/data/*.ts` com o conteúdo real (serviços, processo, bento,
   benefícios) — pode remover/adaptar seções que não fazem sentido para um
   site individual (ex: a seção "Tráfego Pago" da CeliDigital pode virar uma
   seção sobre a abordagem clínica do psicólogo).
5. Substitua os arquivos em `public/images/` e `public/logos/` pelos ativos
   reais do cliente; atualize `Logo.tsx` conforme a seção 10.
6. Ajuste a paleta em `globals.css` (`:root`) se a identidade visual do
   cliente pedir cores diferentes.
7. Rode `npm run build` e verifique responsividade/acessibilidade antes de
   publicar.
8. Registre a criação em `tasks/00X_novo_site_<nome>.md`.
