# Task 002 — Hero: sequência de imagens 3D controlada pelo scroll

## Status
Done.

## Objetivo
O usuário queria que a imagem da Hero fosse "em 3D" e reagisse ao scroll,
como uma forma de "ir explicando o site" conforme a pessoa rola a página
(técnica tipo scroll-scrub, do tipo usado em páginas de produto da Apple).

## Contexto/decisão sobre o asset
O usuário tinha reenviado um zip (`ezgif-7552d7655524bfb1-png-split.zip`)
com 50 frames de uma animação de uma ilustração de "cabeça com cérebro
brilhante e folhas" (tema mental health) — já sinalizado na Task 001 como
sem relação aparente com o mockup da CeliDigital. Perguntado diretamente,
o usuário confirmou que quer usar essa ilustração como o elemento 3D da
Hero (não foi anexada por engano).

## Arquivos alterados/criados
- `src/components/ui/ScrollFrameSequence.tsx` (novo) — componente
  reutilizável: desenha em um `<canvas>` o frame correspondente ao
  progresso de scroll recebido via prop `progress` (MotionValue 0→1).
  Props genéricas (`framesBasePath`, `frameCount`, `width`, `height`,
  `enabled`) para poder reaproveitar com qualquer outra sequência de
  imagens no futuro (não é específico do cérebro/CeliDigital).
- `src/lib/hooks.ts` (novo) — `useMediaQuery()`, via `useSyncExternalStore`
  (SSR-safe, sem a anti-pattern de `setState` dentro de `useEffect`).
- `src/components/sections/Hero.tsx` — reestruturado duas vezes:
  1. Primeira versão: sequência dentro de um card "portal" claro ao lado do
     texto (layout 2 colunas).
  2. **Versão final** (a pedido do usuário — "usar ela na hero section
     toda"): a sequência virou o **fundo full-bleed de toda a Hero**
     (`fill` mode do `ScrollFrameSequence`, `object-cover`), atrás do
     texto, sem o card/moldura. Como os frames têm fundo quase-branco
     sólido (não transparente) e cobrir a tela inteira com isso quebraria
     a identidade escura do site, foi adicionado um véu (`scrim`) em
     gradiente escuro por cima da imagem — vertical no mobile
     (`bg-gradient-to-b`, mais escuro em cima onde fica o texto), horizontal
     da esquerda pra direita no desktop (`lg:bg-gradient-to-r`, mais escuro
     onde o texto fica, mais visível a ilustração à direita). O fundo de
     glow (blobs roxo/azul) foi mantido, só reduzido de opacidade por já
     haver bastante informação visual na imagem.
  - Seção continua com `height: 240vh` + `sticky top-0` só no desktop
    (`shouldPin`). `useScroll` gera o `scrollYProgress` usado nos frames e
    num leve `scale`/`rotateY` 3D aplicado à imagem de fundo (que é
    renderizada com `scale-110` de base — necessário pra girar levemente em
    3D sem revelar bordas vazias).
  - Cards flutuantes (chip "Site + Tráfego Pago", MetricCard "Novos
    contatos", chip de busca) ficaram confinados à metade direita da tela
    (`inset-y-0 right-0 w-1/2`, não `inset-0`) — importante: assim eles
    nunca sobrepõem o bloco de texto/CTA à esquerda, então não precisam de
    `pointer-events-none` (que quebraria o próprio `MouseParallax`, que
    depende de receber eventos de ponteiro no elemento).
- `public/images/hero/brain-sequence/frame-001..050.webp` (novos assets) —
  os 50 frames originais (1280×720 PNG, ~14,5MB no total) foram
  redimensionados e convertidos para WebP via `sharp` (novo dependency,
  também recomendada pelo próprio Next.js para otimização de imagem em
  produção). Três passadas, na medida em que o uso do asset mudou: 800px
  (~0,35MB), depois 1280px/original sem upscale (~0,62MB) quando virou
  full-bleed, e por fim **3840px** (upscale via `kernel: lanczos3`,
  qualidade WebP 82) a pedido do usuário por "qualidade ultra HD" —
  resultado ~3,5MB para os 50 frames juntos (~70KB/frame). Upscalar não
  cria detalhe novo (a fonte real é 1280×720), mas evita que o navegador
  tenha que esticar um buffer pequeno na tela toda, que é onde a perda de
  nitidez era mais visível.

## Bugs encontrados e corrigidos durante a verificação
- **Conteúdo inacessível no mobile**: abaixo do breakpoint `lg` (1024px),
  o conteúdo do Hero (badge + headline + texto + CTAs + card) é mais alto
  que uma tela de celular. Como a seção pinada usa `position: sticky` +
  altura fixa de viewport, a parte de baixo do card nunca entrava na área
  visível durante o scroll "pinado" — ficava inacessível até o fim da
  seção. Corrigido: o efeito de pin/scroll-scrub agora só é ativado em
  `lg` e acima (`useMediaQuery("(min-width: 1024px)")` combinado com
  `!prefersReducedMotion`, ambos como `shouldPin`). Em telas menores (e em
  `prefers-reduced-motion: reduce`), a seção volta ao fluxo normal
  (`height: auto`, sem `sticky`) e a `ScrollFrameSequence` renderiza um
  frame estático (o do meio da sequência), sem nenhum "scroll roubado".
  Verificado via inspeção do DOM (`position: static` vs `sticky`,
  `heroHeight` vs `viewportHeight`) e visualmente em 375px e 1440px.
- **Canvas borrado em telas de alta densidade (retina/4K)**: o buffer do
  `<canvas>` era fixo no tamanho intrínseco dos frames-fonte, então em
  telas com `devicePixelRatio` > 1 o navegador precisava esticar esse
  buffer — ficava visivelmente borrado justo por cobrir a tela toda.
  Corrigido: o buffer agora é redimensionado (via `ResizeObserver`) para
  `tamanho exibido em CSS × devicePixelRatio` (limitado a 2x), com
  `imageSmoothingQuality: "high"`; o "cover" (recorte pra preencher
  qualquer proporção de tela) passou a ser feito manualmente no
  `drawImage`, já que o CSS `object-fit: cover` só ajudava enquanto o
  buffer mantinha a proporção da imagem-fonte.
- **Sequência inteira baixada no mobile mesmo sem uso**: o carregamento dos
  50 frames não verificava se o scroll-scrub estava ativo — rodava sempre,
  mesmo quando só 1 frame estático seria exibido (grave depois do upscale
  pra 3840px: ~3,5MB desperdiçados em qualquer visita mobile). Corrigido:
  `ScrollFrameSequence` agora só baixa a sequência completa quando
  `enabled` é `true` (desktop); caso contrário baixa só o frame estático
  usado. Verificado via `read_network_requests` — mobile faz exatamente 1
  requisição a esse asset.

## Comportamento esperado
- **Desktop (≥1024px)**: ao rolar a página a partir do topo, a Hero fica
  "grudada" na tela por ~140vh de scroll enquanto a ilustração (fundo cheio
  da seção) passa pelos 50 frames e recebe um leve giro 3D (`rotateY` de
  -6° a 0°) e zoom de entrada (`scale` 1.16→1.08); depois disso a página
  segue o fluxo normal para as próximas seções. Texto sempre legível por
  cima, graças ao véu escuro em gradiente.
- **Mobile/tablet (<1024px) e `prefers-reduced-motion`**: sem pin, sem
  scroll-scrub — a ilustração aparece como imagem estática de fundo (um
  frame do meio da sequência), e a página rola normalmente.
- `npm run build` e lint sem erros.

## Nota para reuso do template
Se um futuro site de psicólogo não quiser esse efeito (ou não tiver uma
sequência de frames própria), basta remover o bloco `ScrollFrameSequence`
do `Hero.tsx` e voltar a um visual estático — o componente é opcional e
isolado, não acoplado ao resto da seção.
