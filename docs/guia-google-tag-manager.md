# Guia: configurar Google Tag Manager + GA4 num site do template

Passo a passo pra ligar o Google Analytics 4 (GA4) através do Google Tag
Manager (GTM) em qualquer site clonado deste template. Confirmado contra a
documentação oficial do Google em 22/09/2026 — se a interface do Google
mudar no futuro, os nomes de botão abaixo podem já não bater exatamente.

## Antes de começar

Você precisa ter, na sua conta Google:

1. Uma **propriedade do GA4** já criada, com um **fluxo de dados da Web**
   configurado pro domínio do site (em analytics.google.com).
2. Um **container do Google Tag Manager** já criado pro site (em
   tagmanager.google.com).

Se ainda não tiver algum dos dois, crie primeiro — o resto do guia assume que
já existem.

## Parte 1 — Pegar os dois IDs que você vai precisar

- **Measurement ID do GA4** (formato `G-XXXXXXXXXX`): em
  analytics.google.com → ⚙️ **Administrador** → coluna da propriedade →
  **Fluxos de dados** → clique no seu fluxo da Web → o ID aparece no canto
  superior direito da tela.
- **Container ID do GTM** (formato `GTM-XXXXXXX`): em tagmanager.google.com,
  aparece ao lado do nome do container assim que você entra nele.

## Parte 2 — Ligar o GTM no código do site

Isso quem faz é o Claude (ou quem estiver mexendo no repositório):

1. Copie `.env.local.example` para um novo arquivo `.env.local` (esse
   arquivo não vai pro Git — é só local/do servidor de produção).
2. Preencha `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` com o Container ID real.
3. Ao publicar (Netlify/Vercel/etc.), adicione essa mesma variável de
   ambiente nas configurações do projeto na plataforma de hospedagem —
   `.env.local` não vai junto no deploy.

Só isso do lado do código. O resto é 100% dentro do painel do Google Tag
Manager, no navegador.

## Parte 3 — Criar a tag do GA4 dentro do GTM

1. Acesse **tagmanager.google.com** e faça login.
2. Clique na aba **Contas** (canto superior esquerdo) e selecione o
   container do site.
3. Na aba **Espaços de trabalho**, clique em **Tags** no menu da esquerda,
   depois em **Nova** (canto superior direito).
4. Clique em "Tag sem título" e renomeie para algo como **"Tag do Google —
   GA4"**.
5. Clique na área **Configuração da tag**:
   - Em **Escolher o tipo de tag**, selecione **Tag do Google**.
   - Em **ID da tag**, cole o **Measurement ID do GA4** (`G-XXXXXXXXXX`) —
     não é o ID do GTM aqui, é o do GA4 mesmo.
   - Pode deixar as configurações opcionais como estão (padrão).
6. Clique na área **Acionamento**:
   - Selecione **Inicialização: todos os eventos de inicialização** (isso
     faz a tag disparar em toda página do site).
7. Clique em **Salvar** (canto superior direito).

## Parte 4 — Testar antes de publicar

1. Ainda na aba **Espaços de trabalho**, clique em **Preview** (canto
   superior direito) — abre o Tag Assistant numa aba nova.
2. Digite a URL do site (em desenvolvimento pode ser `http://localhost:3000`
   se o GTM já estiver configurado lá, ou a URL de produção) e clique em
   **Connect**.
3. Navegue pelo site nessa aba — o Tag Assistant mostra em tempo real se a
   tag "Tag do Google — GA4" disparou.
4. Se disparou, pode seguir pra Parte 5. Se não, revise a Parte 3.

## Parte 5 — Publicar

1. De volta na aba **Espaços de trabalho** do GTM, clique em **Enviar**
   (Submit, canto superior direito).
2. Em **Configuração de envio**, escolha **Publicar e criar versão**.
3. Dê um nome pra versão (ex: "GA4 — configuração inicial") e uma descrição
   curta.
4. Clique em **Publicar** (canto superior direito).

A partir daqui, toda visita ao site (assim que o deploy com a variável de
ambiente estiver no ar) já cai no GA4.

## Parte 6 — Confirmar que está funcionando

1. Acesse o site publicado em uma aba anônima/privada.
2. Em analytics.google.com, vá em **Relatórios** → **Tempo real**.
3. Sua própria visita deve aparecer ali em poucos segundos. Se aparecer,
   está tudo certo.

## Adicionando outras tags no futuro (Meta Pixel, conversão do Google Ads, etc.)

Não mexe em código de novo — repete a Parte 3 dentro do mesmo container do
GTM, escolhendo o tipo de tag correspondente (ex: "Meta Pixel" via template
da galeria de tags, ou "Conversão do Google Ads"), e publica de novo
(Parte 5). É esse o motivo de centralizar tudo no GTM em vez de colar cada
script direto no código.
