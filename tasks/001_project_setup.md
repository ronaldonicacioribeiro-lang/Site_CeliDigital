# Task 001 — Project Setup: CeliDigital 3D Premium Template

## Status
Done (skeleton phase — placeholder/demonstrative content, no real client data).

## Objetivo
Criar do zero o projeto CeliDigital: um site 3D premium que serve (1) como site
comercial da CeliDigital (venda de sites + tráfego pago para psicólogos) e (2)
como **master template** reutilizável para gerar sites individuais de
psicólogos no futuro, trocando apenas configuração/dados/assets — sem
reconstruir componentes.

## Arquivos/pastas criados
- Scaffold Next.js 16 (App Router, TypeScript, Tailwind CSS v4) em `/` (raiz do
  repo `Site_celi_digital`).
- `src/config/site.ts` — configuração central de marca/contato/SEO.
- `src/data/*.ts` — `navigation`, `services`, `process` (2 conjuntos:
  `howItWorksSteps` e `siteCreationSteps`), `bento`, `benefits`, `logos`.
- `src/types/index.ts` — tipos compartilhados (`SiteConfig`, `NavLink`,
  `ServiceItem`, `ProcessStep`, `BentoCard`, `BenefitItem`, `LogoItem`).
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge) e `buildWhatsappLink()`.
- `src/components/ui/` — primitivos: `GlassCard`, `Badge`, `SectionHeader`,
  `CTAButton`, `MetricCard`, `Logo`, `Reveal` (scroll-entrance), `Float`
  (idle floating), `MouseParallax` (parallax por cursor).
- `src/components/layout/` — `Navbar` (sticky, glass on scroll, menu mobile),
  `Footer`.
- `src/components/sections/` — `Hero`, `LogoCarousel` (prova/credibilidade),
  `Services`, `BentoGrid`, `HowItWorks`, `ProcessSection`, `TrafficSection`,
  `BenefitsSection`, `CTASection`.
- `src/app/layout.tsx` — metadata/SEO (title template, OG, keywords),
  `src/app/page.tsx` — composição final das seções.
- `src/app/globals.css` — design tokens (Tailwind v4 `@theme`): paleta
  preto/roxo/azul/lavanda/branco, glass, gradientes, glow, easing, marquee
  keyframes, fallback global de `prefers-reduced-motion`.
- `.claude/skills/psychologist-site-template/SKILL.md` — documentação do
  template para clonagem futura.
- `docs/design-reference/` — as 3 imagens de referência originais enviadas
  pelo usuário (não usadas como assets ao vivo, apenas documentação/inspiração
  visual — ver decisão abaixo).
- `.claude/launch.json` — config de dev server para preview.

## Decisões importantes
- **Localização do projeto**: criado em `Site_celi_digital/` (pasta adicional
  vazia), não em `app_sarah/` (projeto não relacionado — PsiConecta).
- **Uso das imagens de referência**: `2.jpg` (Sereni) e `4.webp` (mockup
  CeliDigital) são screenshots de página inteira, não fotos isoladas.
  Confirmado com o usuário: usadas **apenas como referência visual/composição**
  — a Hero real foi construída inteiramente em código (glass mockup de site +
  cards flutuantes), sem embutir as imagens no site. `1.jpg`/`3.jpg` eram
  duplicatas — usada uma só, como referência estrutural do Bento Grid (sem
  copiar texto/conteúdo da imagem, conforme instrução).
- Um arquivo zip anexado (`ezgif-...-png-split.zip`) continha 50 frames de uma
  animação não relacionada (ilustração de "cabeça com cérebro", tema mental
  health) — não usado neste projeto.
- Nenhum dado real (clientes, depoimentos, métricas) foi inventado. Cards com
  números demonstrativos (ex: bento "88%", hero "Novos contatos: Exemplo")
  têm uma badge visível "exemplo" — ver `isPlaceholder` em `BentoCard` /
  `MetricCard`.
- Sem logo real disponível: `Logo.tsx` renderiza uma marca CSS (inicial da
  marca + wordmark) lendo `siteConfig.brandName`. Documentado no SKILL como
  trocar por um arquivo de logo real.

## Bug encontrado e corrigido durante a verificação
- **Menu mobile ilegível no topo da página**: o painel dropdown do menu
  (`Navbar.tsx`) usava `.glass-strong` (fundo ~6% opaco) sobre um `<header>`
  transparente quando `scrollY <= 24`. Com a Hero atrás, o texto do headline
  "vazava" visualmente por trás dos links do menu. Corrigido trocando o
  painel para um fundo quase opaco (`bg-background/95` + `backdrop-blur-2xl`)
  e fazendo o `<header>` usar `glass-strong` sempre que o menu estiver aberto,
  independente do scroll. Verificado via screenshot mobile (375px) após a
  correção — menu 100% legível.

## Comportamento esperado
- `npm run dev` funcional, home page única (`/`) com todas as 11 seções do
  esqueleto, nessa ordem: Navbar, Hero, Prova/credibilidade, Serviços, Bento
  Grid, Como Funciona, Processo de Criação do Site, Tráfego Pago, Benefícios,
  CTA, Footer.
- Responsivo (mobile/tablet/desktop), sem overflow horizontal.
- Animações suaves (entrada por scroll, float, parallax por mouse), todas
  gateadas por `prefers-reduced-motion` (tanto a nível de CSS global quanto
  via `useReducedMotion()` nos componentes com Motion).
- `npm run build` sem erros.

## Pendências / próximos passos (não incluídos nesta task)
- Trocar dados de contato/CRP/localização placeholder em `src/config/site.ts`
  por dados reais da CeliDigital.
- Logo real (`public/logos/`) e imagem `public/images/og-cover.jpg` para
  Open Graph (`openGraph.images` foi deixado de fora da metadata até existir
  um arquivo real, para não referenciar um asset quebrado).
- Logos reais de clientes/parceiros em `src/data/logos.ts` quando existirem.
- Depoimentos/números reais assim que a CeliDigital tiver casos reais.
