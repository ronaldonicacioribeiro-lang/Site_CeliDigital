import {
  LayoutTemplate,
  Target,
  CalendarCheck,
  Headset,
  Search,
  Gift,
} from "lucide-react";
import type { ServiceItem } from "@/types";

export const services: ServiceItem[] = [
  {
    id: "sites-personalizados",
    icon: LayoutTemplate,
    title: "Sites 100% personalizados",
    description:
      "Cada site é pensado pra você: sua identidade, suas cores, sua forma de atender — e em 3D, se você quiser.",
  },
  {
    id: "trafego-pago",
    icon: Target,
    title: "Tráfego pago estratégico",
    description: "Anúncios no Google para atrair pacientes reais e qualificados.",
  },
  {
    id: "acompanhamento-3-meses",
    icon: CalendarCheck,
    title: "Acompanhamento de 3 meses",
    description:
      "Reuniões semanais nos primeiros 3 meses pra ajustar tudo junto com você.",
  },
  {
    id: "suporte-especializado",
    icon: Headset,
    title: "Suporte especializado",
    description: "Estamos ao seu lado em todas as etapas do processo.",
  },
  {
    id: "otimizacao-google",
    icon: Search,
    title: "Otimização para o Google",
    description: "Presença profissional que aparece quando pacientes buscam ajuda.",
  },
  {
    id: "psiconecta-gratis",
    icon: Gift,
    title: "5 dias grátis no PsiConecta",
    description: "Acesso gratuito ao app PsiConecta, feito para psicólogos e pacientes.",
  },
];
