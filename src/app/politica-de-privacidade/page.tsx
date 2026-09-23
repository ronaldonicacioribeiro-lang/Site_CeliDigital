import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${siteConfig.brandName} coleta, usa e protege seus dados pessoais.`,
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{title}</h2>
      <div className="flex flex-col gap-3 text-sm text-muted sm:text-base">{children}</div>
    </section>
  );
}

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="mb-12 flex flex-col gap-3">
            <p className="text-xs font-medium tracking-wide text-accent uppercase">
              {siteConfig.brandName}
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Política de Privacidade
            </h1>
            <p className="text-sm text-muted">Última atualização: 23 de setembro de 2026.</p>
          </div>

          <GlassCard className="flex flex-col gap-10 p-6 sm:p-10">
            <Section title="1. Quem somos">
              <p>
                Este site pertence à {siteConfig.brandName}, que cria sites e gerencia campanhas
                de tráfego pago para psicólogos. Esta política explica quais dados coletamos
                quando você visita {siteConfig.url.replace("https://", "")} ou entra em contato
                com a gente, e o que fazemos com eles.
              </p>
            </Section>

            <Section title="2. Quais dados coletamos">
              <p>Coletamos dados em dois momentos:</p>
              <ul className="list-disc pl-5">
                <li>
                  <strong className="text-foreground">Quando você preenche o formulário de contato</strong>:
                  seu nome e número de WhatsApp/telefone, que você mesmo digita.
                </li>
                <li>
                  <strong className="text-foreground">Enquanto você navega no site</strong>: dados
                  de uso e comportamento (páginas visitadas, cliques em botões de WhatsApp,
                  dispositivo e navegador), coletados automaticamente por ferramentas de
                  análise como o Google Analytics.
                </li>
              </ul>
              <p>
                Se você prefere não usar o formulário, pode falar com a gente diretamente pelo
                WhatsApp ou e-mail — nesse caso, os únicos dados que temos são os que você
                mesmo compartilha na conversa.
              </p>
            </Section>

            <Section title="3. Para que usamos esses dados">
              <ul className="list-disc pl-5">
                <li>Responder seu contato e conversar sobre nossos serviços.</li>
                <li>
                  Entender como as pessoas usam o site, pra melhorar a experiência e o
                  conteúdo (via Google Analytics).
                </li>
                <li>
                  Medir se nossas campanhas de anúncios (Google Ads) estão realmente gerando
                  contatos, pra investir de forma mais eficiente.
                </li>
              </ul>
              <p>Não usamos seus dados pra nenhuma outra finalidade, e não vendemos seus dados a terceiros.</p>
            </Section>

            <Section title="4. Com quem compartilhamos dados">
              <p>Usamos os seguintes serviços de terceiros pra operar o site:</p>
              <ul className="list-disc pl-5">
                <li>
                  <strong className="text-foreground">Netlify</strong> — hospeda o site e recebe as
                  submissões do formulário de contato.
                </li>
                <li>
                  <strong className="text-foreground">Google (Analytics, Tag Manager, Ads)</strong> —
                  coleta dados de navegação de forma agregada e mede a origem dos contatos que
                  vêm de anúncios.
                </li>
                <li>
                  <strong className="text-foreground">WhatsApp/Meta</strong> — quando você clica em
                  um botão de WhatsApp do site, a conversa passa a acontecer diretamente na
                  plataforma do WhatsApp, sujeita à política de privacidade deles.
                </li>
              </ul>
            </Section>

            <Section title="5. Cookies">
              <p>
                O site usa cookies e tecnologias parecidas (via Google Analytics/Tag Manager)
                pra entender como as páginas são usadas e medir a origem de quem chega através
                de anúncios. Você pode bloquear cookies nas configurações do seu navegador a
                qualquer momento — isso não impede o uso do site, só limita nossa capacidade de
                entender como ele está sendo usado.
              </p>
            </Section>

            <Section title="6. Por quanto tempo guardamos seus dados">
              <p>
                Os dados enviados pelo formulário de contato ficam armazenados enquanto
                fizerem sentido pra manter o histórico da nossa conversa comercial, ou até você
                pedir a exclusão. Dados de navegação (analytics) seguem os prazos padrão de
                retenção do Google Analytics.
              </p>
            </Section>

            <Section title="7. Seus direitos (LGPD)">
              <p>
                De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem
                direito a:
              </p>
              <ul className="list-disc pl-5">
                <li>Confirmar se tratamos algum dado seu, e acessar esse dado.</li>
                <li>Corrigir dados incompletos, desatualizados ou incorretos.</li>
                <li>Pedir a exclusão dos dados que você nos enviou.</li>
                <li>Revogar, a qualquer momento, o consentimento que você deu.</li>
              </ul>
              <p>
                Pra exercer qualquer um desses direitos, é só falar com a gente pelo e-mail{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-accent underline underline-offset-2 hover:text-foreground"
                >
                  {siteConfig.contact.email}
                </a>
                .
              </p>
            </Section>

            <Section title="8. Segurança">
              <p>
                Tomamos cuidados razoáveis pra proteger os dados que você compartilha conosco,
                usando os recursos de segurança oferecidos pelos serviços que utilizamos
                (Netlify e Google). Nenhum sistema é 100% infalível, mas não temos, nem
                pretendemos ter, acesso a dados sensíveis como informações de saúde de
                pacientes — esse tipo de dado nunca transita por este site.
              </p>
            </Section>

            <Section title="9. Mudanças nesta política">
              <p>
                Podemos atualizar esta política de vez em quando, principalmente se mudarmos
                alguma ferramenta ou processo. A data no topo da página sempre mostra a versão
                mais recente.
              </p>
            </Section>

            <Section title="10. Dúvidas">
              <p>
                Qualquer dúvida sobre esta política ou sobre como tratamos seus dados, fala com
                a gente pelo WhatsApp ({siteConfig.contact.whatsappDisplay}) ou pelo e-mail{" "}
                {siteConfig.contact.email}.
              </p>
            </Section>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </>
  );
}
