"use client";

import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildWhatsappLink } from "@/lib/utils";
import { trackWhatsappClick } from "@/lib/analytics";

interface BentoCardLinkProps {
  label: string;
  message: string;
  trackLocation: string;
}

/** Micro-CTA for a Bento Grid card — opens WhatsApp with a message tailored to that card's offer. */
export function BentoCardLink({ label, message, trackLocation }: BentoCardLinkProps) {
  return (
    <a
      href={buildWhatsappLink(siteConfig.contact.whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsappClick(trackLocation)}
      className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-foreground"
    >
      {label}
      <ArrowRight className="size-3.5" aria-hidden="true" />
    </a>
  );
}
