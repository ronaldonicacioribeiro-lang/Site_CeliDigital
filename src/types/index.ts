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
}

export interface BentoCard {
  id: string;
  colSpan: 1 | 2 | 3;
  rowSpan: 1 | 2;
  variant: "metric" | "text" | "visual" | "toggle" | "chart" | "logo";
  title?: string;
  description?: string;
  metricValue?: string;
  metricLabel?: string;
  icon?: LucideIcon;
  isPlaceholder?: boolean;
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
