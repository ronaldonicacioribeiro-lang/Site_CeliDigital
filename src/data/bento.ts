import { LayoutTemplate, Search, MapPin, ToggleRight, TrendingUp } from "lucide-react";
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
    variant: "text",
    icon: LayoutTemplate,
    title: "Site profissional",
    description: "Design responsivo e com identidade própria para o seu consultório.",
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
    description: "Campanhas segmentadas para pacientes perto do seu consultório.",
  },
  {
    id: "confianca-conversao",
    colSpan: 2,
    rowSpan: 1,
    variant: "metric",
    metricValue: "88%",
    metricLabel: "Resultado demonstrativo de conversão",
    title: "Confiança que converte",
    description: "Um site profissional muda a forma como o paciente decide agendar.",
    isPlaceholder: true,
  },
  {
    id: "ativar-trafego",
    colSpan: 1,
    rowSpan: 1,
    variant: "toggle",
    icon: ToggleRight,
    title: "Tráfego ativado",
    description: "Estrutura pronta para transformar cliques em agendamentos.",
  },
  {
    id: "crescimento-organico",
    colSpan: 2,
    rowSpan: 1,
    variant: "chart",
    icon: TrendingUp,
    metricValue: "Dado de exemplo",
    metricLabel: "Crescimento de audiência",
    title: "Crescimento orgânico",
    description: "Ilustração de como sua presença digital pode evoluir com o tempo.",
    isPlaceholder: true,
  },
];
