import { LayoutTemplate, Search, MapPin, ToggleRight, TrendingUp } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { BentoCard } from "@/types";

/**
 * Bento Grid content — structure inspired by the reference mockup
 * (asymmetric sizes: one tall card, two wide cards, three compact ones),
 * rebuilt with CeliDigital's own copy. Cards with a metric/number are
 * marked isPlaceholder — render a visible "exemplo" flag on them, never
 * present as a real client result.
 */
export const bentoCards: BentoCard[] = [
  {
    id: "site-profissional",
    colSpan: 1,
    rowSpan: 1,
    variant: "browser",
    icon: LayoutTemplate,
    title: "Site profissional",
    description: "Design responsivo e com identidade própria para o seu consultório.",
    cta: {
      label: "Quero um site assim",
      message: siteConfig.contact.whatsappDefaultMessage,
      trackLocation: "bento_site",
    },
  },
  {
    id: "presenca-google",
    colSpan: 1,
    rowSpan: 1,
    variant: "logo",
    icon: Search,
    title: "Presença no Google",
    description: "Apareça quando pacientes procuram por ajuda psicológica.",
  },
  {
    id: "alcance-local",
    colSpan: 1,
    rowSpan: 2,
    variant: "visual",
    icon: MapPin,
    title: "Alcance na sua região",
    description:
      "Campanhas segmentadas pra quem atende presencial, ou alcance nacional pra quem atende só online.",
    mapQuery: siteConfig.location
      ? `${siteConfig.location.city}, ${siteConfig.location.state}`
      : undefined,
  },
  {
    id: "resultado-real",
    colSpan: 2,
    rowSpan: 1,
    variant: "metric",
    metricValue: "149",
    metricLabel: "conversões em uma campanha real",
    title: "Resultado real de campanha",
    description:
      "Custo médio de R$ 5,00 por conversão — números de uma campanha de tráfego pago gerenciada pela CeliDigital.",
    proofImage: {
      src: "/images/proof/campanha-real-google-ads.png",
      width: 1279,
      height: 619,
      alt: "Print real do painel do Google Ads mostrando 149 conversões e R$ 5,00 de custo médio por conversão",
    },
  },
  {
    id: "ativar-trafego",
    colSpan: 1,
    rowSpan: 1,
    variant: "toggle",
    icon: ToggleRight,
    title: "Tráfego ativado",
    description: "Estrutura pronta para transformar cliques em agendamentos.",
    cta: {
      label: "Ativar tráfego pago",
      message: siteConfig.contact.whatsappDefaultMessage,
      trackLocation: "bento_trafego",
    },
  },
  {
    id: "alcance-campanha",
    colSpan: 2,
    rowSpan: 1,
    variant: "chart",
    icon: TrendingUp,
    metricValue: "5,19 mil",
    metricLabel: "impressões em uma campanha real",
    title: "Alcance da campanha",
    description: "R$ 2,73 de CPC médio no mesmo período — números reais, não projeção.",
    proofImage: {
      src: "/images/proof/campanha-real-google-ads.png",
      width: 1279,
      height: 619,
      alt: "Print real do painel do Google Ads mostrando 5,19 mil impressões e R$ 2,73 de CPC médio",
    },
  },
];
