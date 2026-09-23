# Guia: configurar conversões do Google Ads via GTM

Passo a passo de como ligamos o rastreamento de conversão do Google Ads
(WhatsApp + formulário de contato) no GTM já existente da CeliDigital.
Documentado em 23/09/2026, direto do processo real (a interface do Google
pode mudar no futuro). Serve como referência pra repetir em qualquer outro
site clonado do template — só troca os IDs pelos da conta nova.

## Por que 2 tags, não 1

- **Tag de conversão** ("Acompanhamento de conversões do Google Ads"): avisa
  o Google Ads que uma conversão aconteceu.
- **Vinculador de conversões** (Conversion Linker): guarda em um cookie
  próprio do site o `gclid` (Google Click ID) de quem chegou clicando num
  anúncio, pra depois a conversão poder ser corretamente atribuída àquele
  clique/campanha/palavra-chave específica. Sem ela, o Google Ads pode
  registrar a conversão mas não saber de qual anúncio ela veio.
  Precisa das duas, sempre.

## Pré-requisito: já ter o evento no `dataLayer`

Antes de mexer no Google Ads, o site precisa já estar disparando um evento
customizado no `dataLayer` na ação que você quer medir. No nosso caso
(`src/lib/analytics.ts`):

```ts
export function trackWhatsappClick(location: string) {
  sendGTMEvent({ event: "whatsapp_click", cta_location: location });
}

export function trackContactFormSubmit() {
  sendGTMEvent({ event: "contact_form_submit" });
}
```

`trackWhatsappClick` é chamado no `onClick` de todo botão de WhatsApp do
site. `trackContactFormSubmit` só é chamado **depois** que o `fetch()` do
formulário confirma sucesso (`response.ok`) — nunca no clique do botão
"enviar" isoladamente, pra não contar conversão falsa se o envio falhar.

## Parte 1 — Criar as ações de conversão no Google Ads

Em ads.google.com → **Ferramentas** → **Conversões** → **+ Nova ação de conversão**.

Pra cada conversão (repita pra cada uma que quiser rastrear):

1. Escolhe a fonte **"Conversões em um site"** → informa a URL do site
   (`celidigital.com.br`).
2. Escolhe a **categoria** mais parecida com o que está medindo:
   - Clique no WhatsApp → categoria **"Contato"**
   - Envio de formulário → categoria **"Enviar formulário de lead"**
3. **Otimização de ações**: a primeira conversão criada numa categoria nova
   é sempre forçada como "Ação primária" pelo próprio Google (não dá pra
   mudar) — não tem problema ter mais de uma primária.
4. **Valor**: escolhe "Usar o mesmo valor para todas as conversões" → `0`
   (não são vendas com valor monetário, são leads).
5. **Contagem**: "Uma" (conta só a primeira interação da pessoa, recomendado
   pra leads — "Todas" é pra e-commerce).
6. Deixa as janelas de conversão e o modelo de atribuição no padrão
   (90 dias / 3 dias / 1 dia / atribuição baseada em dados).
7. Na tela de instalação ("Configurar a tag do Google e as tags de
   eventos"), clica na aba **"Usar o Google Tag Manager"** — **nunca** na
   aba "Configurar com uma tag do Google" (isso te leva pro sistema de "Tag
   do Google" automático, diferente do GTM clássico, e nem no botão azul
   "Configurar no Google Tag Manager" dessa tela — ele também abre o painel
   errado). Anota os dois valores que aparecem na tabela:
   - **ID de conversão** (ex: `18469012383` — igual pra todas as conversões
     da mesma conta, é o número da conta de Ads)
   - **Rótulo de conversão** (ex: `9woSCPrZ2YIdEJ-H2-ZE` — diferente pra
     cada ação de conversão)

## Parte 2 — Criar a tag no GTM (tagmanager.google.com, não confundir com a
tela de "Tag do Google" do Ads)

Pra cada conversão criada na Parte 1:

1. **Tags** → **Nova**
2. Tipo: **Google Ads → Acompanhamento de conversões do Google Ads**
3. **Código de conversão**: só o número, **sem o prefixo "AW-"**
   (ex: `18469012383`, não `AW-18469012383` — colocar o prefixo dá erro de
   validação "O valor precisa ser um número inteiro positivo").
4. **Rótulo de conversão**: cola o rótulo específico dessa conversão.
5. **Valor da conversão**: `0`.
6. **Acionamento** → cria um acionador novo:
   - Tipo: **Evento personalizado**
   - Nome do evento: o nome exato do evento no `dataLayer`
     (`whatsapp_click` ou `contact_form_submit`)
   - "Esse acionador dispara em: Todos os eventos personalizados"
7. Nomeia a tag e o acionador de forma reconhecível e salva.

Repete pra cada conversão. Além dessas, cria **uma única vez**:

8. **Tags** → **Nova** → tipo **Vinculador de conversões** → não precisa
   configurar nada → acionador **"All Pages"** → salva.

## Parte 3 — Publicar

Volta pra **Visão geral** do workspace → confere as "Alterações pendentes"
(deve listar as tags e acionadores novos como "Adicionado") → clica em
**"Enviar"** (canto superior direito). Sem isso, tudo fica só rascunho —
o site não recebe as tags de verdade.

## Parte 4 — Testar de verdade (não confiar só na configuração)

O painel do Google Ads demora horas pra mostrar que uma conversão está
"recebendo dados" — não dá pra usar isso como teste imediato. O jeito
rápido de confirmar que a corrente inteira funciona é checar o
`dataLayer` do site direto no navegador, depois de realizar a ação de
verdade (clicar no botão, enviar o formulário):

```js
window.dataLayer.map(e => e.event)
// deve conter "whatsapp_click" depois do clique
// e "contact_form_submit" depois do envio do formulário
```

Se o evento aparece no `dataLayer`, o site está fazendo a parte dele
corretamente — e como a tag já foi confirmada publicada sem erro no GTM, a
cadeia completa (clique/envio → evento → tag → conversão no Ads) está
funcionando. Confirmado assim em 23/09/2026 pro `whatsapp_click` e pro
`contact_form_submit`, ambos direto em `celidigital.com.br`.

## Referência rápida — o que existe hoje na CeliDigital

| Conversão | Categoria | Rótulo | Evento (dataLayer) | Trigger no GTM | Tag no GTM |
|---|---|---|---|---|---|
| WhatsApp - Contato | Contato | `9woSCPrZ2YIdEJ-H2-ZE` | `whatsapp_click` | Clique no WhatsApp | Google Ads - Conversão WhatsApp |
| Enviar formulário de lead | Enviar formulário de lead | `AOAnCID624IdEJ-H2-ZE` | `contact_form_submit` | Envio de Formulário | Google Ads - Conversão Formulário |

ID de conversão da conta: `18469012383` (conta Google Ads da CeliDigital,
`378-033-9823`). Container GTM: `GTM-5NXLR29T`.

## Erros que já apanhamos configurando isso (pra não repetir)

- **Botão "Configurar no Google Tag Manager" do Google Ads não vai pro GTM
  clássico** — ele abre o painel de "Tag do Google" (gtag, container
  `GT-...`), um produto diferente. Sempre entrar direto em
  tagmanager.google.com.
- **Campo "Código de conversão" no GTM não aceita o prefixo "AW-"** — só o
  número.
- **Acionador "All Pages" conta toda visita como conversão** — só serve pro
  Vinculador de conversões, nunca pra uma tag de conversão de verdade (essa
  precisa de evento personalizado específico da ação).
