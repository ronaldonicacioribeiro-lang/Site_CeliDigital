import type { ProcessStep } from "@/types";

/**
 * Short overview used in the "Como Funciona" section, framed as the
 * "Método CELI" — each step's letter spells the brand name, same 4 real
 * steps as before (just relabeled, no new claims).
 */
export const howItWorksSteps: ProcessStep[] = [
  {
    id: "diagnostico",
    number: "01",
    letter: "C",
    keyword: "Conexão",
    title: "Diagnóstico gratuito",
    description:
      "Entendemos seu momento atual, sua especialidade e seus objetivos de captação.",
  },
  {
    id: "criacao",
    number: "02",
    letter: "E",
    keyword: "Estruturação",
    title: "Criação do site",
    description:
      "Desenvolvemos um site profissional, rápido e pensado para conversão.",
  },
  {
    id: "trafego",
    number: "03",
    letter: "L",
    keyword: "Lançamento",
    title: "Ativação do tráfego pago",
    description:
      "Estruturamos campanhas no Google para atrair pacientes qualificados.",
  },
  {
    id: "acompanhamento",
    number: "04",
    letter: "I",
    keyword: "Impulso",
    title: "Acompanhamento de 3 meses",
    description:
      "Reuniões semanais durante o período de teste pra ajustar a estratégia com você.",
  },
];

/** Detailed timeline used in the "Processo de Criação do Site" section. */
export const siteCreationSteps: ProcessStep[] = [
  {
    id: "briefing",
    number: "01",
    title: "Briefing e identidade",
    description:
      "Levantamos suas especialidades, público-alvo e identidade visual.",
  },
  {
    id: "estrutura",
    number: "02",
    title: "Estrutura e conteúdo",
    description:
      "Organizamos as seções e o copy do site com foco na jornada do paciente.",
  },
  {
    id: "design-dev",
    number: "03",
    title: "Design e desenvolvimento",
    description:
      "Construímos o site com um design premium, responsivo e otimizado.",
  },
  {
    id: "testes",
    number: "04",
    title: "Testes e otimização",
    description:
      "Validamos performance, SEO e responsividade em todos os dispositivos.",
  },
  {
    id: "lancamento",
    number: "05",
    title: "Lançamento",
    description:
      "Seu site vai ao ar pronto para receber tráfego e gerar contatos.",
  },
];
