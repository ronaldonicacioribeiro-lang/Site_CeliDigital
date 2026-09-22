# Task 003 — Hero: sequência 3D também reage ao scroll no mobile

## Status
Done.

## Objetivo
Na Task 002, o mobile ficou com a ilustração como imagem estática de fundo
(sem nenhuma ligação com o scroll), porque o pin (`position: sticky` +
seção alta) usado no desktop prendia parte do conteúdo fora da área
visível em telas pequenas. O usuário perguntou se o efeito 3D era só
desktop e pediu uma versão mais leve para mobile: os frames avançando
conforme a página rola normalmente, **sem** travar a tela.

## Arquivos alterados/criados
- `public/images/hero/brain-sequence-mobile/frame-001..050.webp` (novo) —
  segunda passada de otimização com `sharp`, 1280px de largura (vs 3840px
  da versão desktop) e qualidade 75. ~0,65MB para os 50 frames — o
  suficiente pra ficar nítido em qualquer celular (a maioria não passa de
  ~1300px físicos de largura mesmo em 3x DPR) sem repetir o custo de
  ~3,5MB da versão 4K.
- `src/components/sections/Hero.tsx`:
  - Duas flags agora, com propósitos diferentes:
    - `shouldPin` (`isDesktop && !prefersReducedMotion`) — controla a
      seção alta/`sticky` e o giro 3D (`rotateY`/`scale`) do fundo. Só
      desktop, pelo motivo já registrado na Task 002.
    - `shouldScrub` (`!prefersReducedMotion`) — controla se a
      `ScrollFrameSequence` está ligada ao scroll. Agora **true em
      qualquer largura de tela**, só desliga em `prefers-reduced-motion`.
  - `useScroll(...)` usa um `offset` diferente dependendo do pin:
    `["start start", "end end"]` quando pinado (progresso ao longo do
    "segurar" a seção); `["start end", "end start"]` quando não pinado
    (progresso ao longo da passagem natural da seção pela viewport,
    puramente por causa do scroll normal da página — sem prender nada).
  - `sequence` (objeto com `basePath`/`width`/`height`) escolhido por
    `isDesktop ? DESKTOP_SEQUENCE : MOBILE_SEQUENCE`, passado pra
    `ScrollFrameSequence`.
  - O giro 3D (`rotateY`/`scale`) continua condicionado só a `shouldPin` —
    no mobile só os frames mudam, sem inclinação 3D (efeito mais sutil, de
    propósito, já que sem o "segurar" da tela o giro ficaria brusco demais
    num scroll rápido de celular).

## Comportamento esperado
- **Desktop (≥1024px)**: inalterado — pin + giro 3D + frames de 3840px.
- **Mobile/tablet (<1024px)**: a seção **não** trava mais a tela (fluxo
  normal, sempre 100% navegável), mas a ilustração de fundo muda de frame
  conforme a página rola pela seção — sem giro 3D, usando os frames de
  1280px (mais leves).
- **`prefers-reduced-motion`**: continua sem nenhuma ligação com o scroll
  em nenhuma largura — só um frame estático.
- Verificado: no mobile, a altura da seção volta a ser `auto`/`position:
  static` (não prende mais nada); o conteúdo do `<canvas>` muda de fato
  entre diferentes posições de scroll (confirmado por fingerprint de
  pixels via `getImageData`, não só por reposicionamento de layout).
- `npm run build` e lint sem erros.
