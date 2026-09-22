# Task 004 — Definições de negócio, identidade final e lançamento

## Status
Done (exceto propagação de DNS, que é automática).

## Objetivo
Depois do esqueleto do site pronto (Tasks 001-003), essa task percorreu a
lista de definições reais de negócio que faltavam pra sair do "template
genérico" pro site de verdade da CeliDigital, e concluiu o lançamento
(GitHub → Netlify → domínio próprio).

## Definições de negócio (viram `src/config/site.ts`)
- WhatsApp real: `5531998806237` / `(31) 99880-6237`
- E-mail real: `suportecelidigital@gmail.com`
- Instagram: **ainda não existe** — campo ficou opcional no tipo
  (`SiteConfig["contact"]`), Footer só renderiza o link `if` existir. Não
  colocar link nenhum até ter um perfil real.
- Região de atuação: remoto em todo o Brasil + presencial em Belo
  Horizonte/MG (`siteConfig.location`, ainda não exibido em nenhum texto do
  site — só estrutura de dados por enquanto).
- Domínio final: `celidigital.com.br` — **comprado no Registro.br** durante
  essa task.
- Nicho: **100% fechado em psicólogos**, decisão explícita do usuário (não
  criar copy genérica pra "outras áreas" por enquanto — é um teste).
- Sem seção de preços/planos, sem formulário de contato — só WhatsApp/e-mail
  por enquanto (decisão explícita).

## Conteúdo real (não mais placeholder)
- **Serviços** (`src/data/services.ts`) reescritos com a oferta real: sites
  100% personalizados (inclusive em 3D, se o cliente quiser), tráfego pago,
  acompanhamento de 3 meses com reunião semanal, 5 dias grátis no app
  PsiConecta (cross-sell com o outro produto do usuário).
- **Logos de clientes** (`src/data/logos.ts`): "Odontologia Ventura" (site
  real que o usuário já entregou) é o primeiro logo não-placeholder do
  carrossel — `LogoCarousel.tsx` agora estiliza entradas reais
  (`text-foreground`) diferente das reservadas (`text-muted`).
- **Depoimentos** (nova seção, `src/data/testimonials.ts` +
  `TestimonialsSection.tsx`, entre Benefícios e CTA): dois depoimentos reais
  recebidos via WhatsApp (Juliana Ribeiro e Camila Santos, psicólogas
  clientes de tráfego pago) — texto extraído dos prints, não reescrito, sem
  foto real (avatar = inicial do nome, mesmo padrão do resto do site).
- Números demonstrativos (ex: "88%" no Bento Grid) **continuam
  placeholder** — nenhuma cliente deu número específico ainda.

## Identidade visual final
- **Paleta de cores**: aprovada como definitiva (preto/escuro + roxo + azul
  + lavanda).
- **Ilustração do Hero** (sequência 3D do cérebro/folhas): aprovada como
  definitiva pra marca da CeliDigital — não é mais placeholder de teste.
- **Logo**: usuário escolheu o conceito "Wordmark Puro" (dos 5 conceitos
  gerados em Artifact) — "Celi" em gradiente da marca + "Digital" em branco,
  sem ícone. Implementado em `src/components/ui/Logo.tsx`.
- **Favicon**: gerado via `src/app/icon.tsx` (convenção do Next.js,
  `ImageResponse`) — um "C" isolado, já que a marca escolhida não tem ícone
  próprio pra versão minúscula.
- **Imagem de Open Graph** (`src/app/opengraph-image.tsx`): atualizada pra
  usar o mesmo wordmark, no lugar do círculo com inicial antigo.

## Analytics (Google Tag Manager + GA4)
- Container GTM criado: `GTM-5NXLR29T` (conta "Celidigital" nova, separada
  de outras contas do usuário na mesma organização do Google Tag Manager).
- Propriedade GA4 criada: Measurement ID `G-DNLB5HF9P9`, configurado como
  tag "Tag do Google" dentro do container GTM (não direto no código — ver
  `docs/guia-google-tag-manager.md` pro porquê e o passo a passo completo,
  reutilizável pros próximos sites).
- `NEXT_PUBLIC_GTM_ID` configurado em `.env.local` (dev) e nas variáveis de
  ambiente do site na Netlify (produção).
- **Rastreamento de clique no WhatsApp** implementado
  (`src/lib/analytics.ts`, `trackWhatsappClick()`): todo CTA de WhatsApp
  (Navbar desktop/mobile, Hero, Footer, CTA final) dispara um evento
  `whatsapp_click` no dataLayer com `cta_location` dizendo qual botão foi
  clicado. Isso prepara o terreno pra virar conversão de verdade assim que
  o usuário tiver uma conta de Google Ads ativa rodando campanha (aí sim
  criamos uma tag de conversão no mesmo container, com acionador de evento
  personalizado `whatsapp_click`) — mesmo padrão observado na conta de
  Google Ads da Odontologia Ventura (tag `AW-` + tag `G-` no mesmo
  container).
- **Decisão**: não rodar Google Ads ainda — o site não estava no ar quando
  a pergunta surgiu (sem sentido gastar em anúncio pra um domínio que não
  existia). Revisar depois que o site estiver 100% publicado.

## Lançamento
- Repositório GitHub criado: `github.com/ronaldonicacioribeiro-lang/Site_CeliDigital`
  (o primeiro criado com README automático foi excluído pelo usuário e
  recriado vazio, pra evitar o conflito de merge do README).
- Código publicado via `git add -A && git commit && git push` (manual, feito
  pelo usuário).
- Site publicado na **Netlify** (`celidigital.netlify.app`), detectado
  automaticamente como projeto Next.js (Next.js Runtime da Netlify, sem
  configuração manual de build).
- Domínio customizado `celidigital.com.br` adicionado no gerenciamento de
  domínio da Netlify, como domínio primário (+ `www` como alias/redirect).
- **Pendente**: propagação de DNS. Registro do domínio ainda estava em
  transição inicial no Registro.br (mensagem "domínio em transição,
  aguarde") — os registros DNS necessários (documentados abaixo) ainda
  precisam ser cadastrados assim que a zona DNS liberar.

### Registros DNS a configurar no Registro.br (Configurar zona DNS → Modo Avançado)
```
Tipo: A      Nome: (vazio/@)   Dados: 75.2.60.5
Tipo: CNAME  Nome: www         Dados: celidigital.netlify.app
```
(Netlify recomendou ALIAS/ANAME pro domínio raiz, mas o Registro.br não
suporta esse tipo de registro — por isso o fallback com A direto no IP do
load balancer da Netlify.)

## O que ainda fica aberto (não bloqueia o lançamento)
- Item 11: números reais (aguardando dados reais de clientes)
- Painel do cliente pra acompanhar campanha — ideia validada, registrada
  como possível v2 (área separada, com login e dados reais de campanha),
  não faz parte deste site institucional
- Ativar Google Ads — só depois do domínio propagar e o site estar 100% no
  ar publicamente
