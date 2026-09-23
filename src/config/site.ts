import type { SiteConfig } from "@/types";

/**
 * CENTRAL BRAND CONFIGURATION
 * ---------------------------------------------------------------------------
 * This is the ONE file to edit when cloning this template for a new client
 * (a psychologist's individual site) or updating CeliDigital's own info.
 * Components must read from here — never hardcode brand copy/contact data
 * inside a component. See .claude/skills/psychologist-site-template/SKILL.md
 * for the full "how to spin up a new site" checklist.
 */
export const siteConfig: SiteConfig = {
  brandName: "CeliDigital",
  tagline: "Sites • Tráfego • Resultados",
  description:
    "Criamos sites modernos e estratégicos para psicólogos e cuidamos de todo o processo de divulgação com tráfego pago, para que você possa focar no que realmente importa: o bem-estar dos seus pacientes.",
  url: "https://celidigital.com.br",

  contact: {
    whatsapp: "5531998806237",
    whatsappDisplay: "(31) 99880-6237",
    whatsappDefaultMessage:
      "Olá! Vim através do seu site e gostaria de conhecer melhor o seu trabalho.",
    email: "suportecelidigital@gmail.com",
    // Sem Instagram ainda — não adicionar link até existir um perfil real.
  },

  location: {
    city: "Belo Horizonte",
    state: "MG",
    remoteNationwide: true,
  },

  seo: {
    title: "CeliDigital — Sites e Tráfego Pago para Psicólogos",
    description:
      "Sites profissionais e tráfego pago estratégico para psicólogos que querem mais visibilidade no Google e mais pacientes no consultório.",
    keywords: [
      "site para psicólogo",
      "criação de site para psicólogo",
      "marketing digital para psicólogos",
      "tráfego pago para psicólogos",
      "google ads para psicólogos",
    ],
  },

  logo: {
    src: "/logos/celidigital-logo.svg",
    alt: "CeliDigital",
  },
};
