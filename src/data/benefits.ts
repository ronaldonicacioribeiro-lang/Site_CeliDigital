import { ShieldCheck, Zap, Smartphone, Gauge, Palette, LifeBuoy } from "lucide-react";
import type { BenefitItem } from "@/types";

export const benefits: BenefitItem[] = [
  {
    id: "credibilidade",
    icon: ShieldCheck,
    title: "Mais credibilidade",
    description: "Um site profissional transmite confiança antes do primeiro contato.",
  },
  {
    id: "velocidade",
    icon: Zap,
    title: "Carregamento rápido",
    description: "Performance otimizada para não perder pacientes por lentidão.",
  },
  {
    id: "responsivo",
    icon: Smartphone,
    title: "100% responsivo",
    description: "Perfeito em qualquer tela: celular, tablet ou computador.",
  },
  {
    id: "seo",
    icon: Gauge,
    title: "Otimizado para o Google",
    description: "Estrutura pensada para ranquear melhor nas buscas.",
  },
  {
    id: "identidade",
    icon: Palette,
    title: "Identidade visual própria",
    description: "Um design que reflete a sua forma de trabalhar.",
  },
  {
    id: "suporte",
    icon: LifeBuoy,
    title: "Suporte contínuo",
    description: "Acompanhamento próximo em cada etapa da sua presença digital.",
  },
];
