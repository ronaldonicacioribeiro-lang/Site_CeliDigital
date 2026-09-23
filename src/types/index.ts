import type { LucideIcon } from "lucide-react";

/** Central brand/business configuration — see src/config/site.ts */
export interface SiteConfig {
  brandName: string;
  tagline: string;
  professionalName?: string;
  profession?: string;
  councilId?: string;
  description: string;
  url: string;
  contact: {
    whatsapp: string;
    whatsappDisplay: string;
    /** Pre-filled text for every WhatsApp CTA on the site — keep it one consistent opener. */
    whatsappDefaultMessage: string;
    email: string;
    /** Omit both until there's a real profile — don't link to one that doesn't exist. */
    instagram?: string;
    instagramHandle?: string;
  };
  location?: {
    /** Base city for in-person service. */
    city: string;
    state: string;
    /** True when remote service covers the whole country (common for a digital agency). */
    remoteNationwide?: boolean;
  };
  specialties?: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  logo: {
    src: string;
    alt: string;
  };
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  /** For a named-methodology layout (e.g. "Método CELI"): the single letter shown in the badge. */
  letter?: string;
  /** The word that letter stands for (e.g. "Conexão" for "C"). */
  keyword?: string;
}

export interface BentoCard {
  id: string;
  colSpan: 1 | 2 | 3;
  rowSpan: 1 | 2;
  variant: "metric" | "text" | "visual" | "toggle" | "chart" | "logo" | "browser";
  title?: string;
  description?: string;
  metricValue?: string;
  metricLabel?: string;
  icon?: LucideIcon;
  isPlaceholder?: boolean;
  /** For the "visual" variant: renders an embedded map for this query (e.g. "Belo Horizonte, MG") instead of the default ping animation. */
  mapQuery?: string;
  /** For the "metric" variant: shows a "ver comprovante" link opening this real screenshot in a lightbox. */
  proofImage?: { src: string; width: number; height: number; alt: string };
  /** Optional micro-CTA rendered inside the card — opens WhatsApp with a contextual message. */
  cta?: { label: string; message: string; trackLocation: string };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
}

export interface BenefitItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface LogoItem {
  id: string;
  name: string;
  isPlaceholder?: boolean;
}

export interface MetricCardData {
  id: string;
  label: string;
  value: string;
  isPlaceholder?: boolean;
}
