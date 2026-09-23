# Task 005 — Performance: correções do PageSpeed Insights

## Status
Em andamento.

## Objetivo
Rodamos o PageSpeed Insights em `celidigital.netlify.app` (domínio próprio
`celidigital.com.br` ainda não resolve, DNS em transição no Registro.br).
Resultado mobile: **Desempenho 72**, Acessibilidade/Boas práticas/SEO 100.
Usuário pediu para corrigir tudo que o relatório apontou, iterando até
esgotar a lista.

## Achados do relatório (baseline)
- **LCP 10,1s** (ruim — ideal <2,5s). Maior problema, de longe.
- FCP 0,9s (bom), TBT 80ms (bom), CLS 0,003 (ótimo), Speed Index 4,5s.
- Solicitações que bloqueiam a renderização — 150ms (CSS global).
- Cache pouco eficiente — 19 KiB (script `hud` da própria Netlify + Google Maps).
- JavaScript legado (polyfills desnecessários) — 13 KiB.
- Sem preconnect para `maps.gstatic.com` — 300ms de LCP estimados.
- JavaScript não usado — Google Maps embed (228,6 KiB), GTM/gtag (138,6 KiB),
  chunks próprios da Netlify (77,4 KiB).

## Checklist
- [x] **Causa raiz do LCP**: `ScrollFrameSequence` só desenhava no canvas
      depois que **todos os 50 frames** terminavam de baixar (`isReady`
      exigia `loadedRef.current.size === frameCount`). Em 4G lento isso
      sozinho explica os 10s. Corrigido para desenhar assim que o frame
      necessário estiver pronto (`size > 0`), e o frame da posição de
      scroll atual agora é pedido primeiro com `fetchPriority: "high"`.
- [x] Preconnect para os domínios do Google Maps (`layout.tsx`).
- [x] Modernizado o `browserslist` do projeto (Chrome/Edge 93+, Firefox 92+,
      Safari 15.4+) pra eliminar os polyfills apontados (Array.prototype.at/
      flat/flatMap, Object.fromEntries/hasOwn, String.prototype.trimStart/
      trimEnd).
- [x] Mapa do Google (card "Alcance na sua região") virou clique-para-carregar
      (`MapEmbed.tsx`) — o iframe (e os ~228 KiB de JS do Google que vêm
      junto) só carrega se a pessoa clicar, não mais automaticamente.
- [x] Investigado o script `hud?variant=public` — não existe nenhuma
      referência a isso no nosso código/repo. É injetado pela própria
      Netlify (provavelmente toolbar/analytics da plataforma), fora do
      nosso controle via código. Não fixável neste repositório.
- [x] GTM/gtag (138 KiB): já carrega via `next/third-parties` com estratégia
      `afterInteractive` (não-bloqueante) — é o padrão recomendado pelo
      Next.js, não dá pra melhorar sem arriscar quebrar o tracking. Custo
      aceito, é o preço de ter analytics.
- [x] Build de produção local (`npm run build && npm run start`) testado —
      compilou limpo, lint/tsc sem erros, Hero e mapa (facade) verificados
      funcionando manualmente.
- [ ] **Pendente**: subir pro GitHub, deixar o Netlify re-deployar, e rodar
      o PageSpeed Insights de novo em `celidigital.netlify.app` pra
      confirmar o ganho real. Só fecha a task depois dessa confirmação.

## Arquivos alterados/criados
- `src/components/ui/ScrollFrameSequence.tsx` — correção do LCP (ver acima).
- `src/app/layout.tsx` — `<link rel="preconnect">` para os domínios do Maps.
- `package.json` — campo `browserslist` modernizado.
- `src/components/ui/MapEmbed.tsx` (novo) — facade clique-para-carregar do
  mapa, usado em `BentoGrid.tsx` no lugar do iframe direto.
- `src/components/sections/BentoGrid.tsx` — usa `MapEmbed` no lugar do
  `<iframe>` inline.
