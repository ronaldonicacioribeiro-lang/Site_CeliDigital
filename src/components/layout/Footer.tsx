"use client";

import { AtSign, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { buildWhatsappLink } from "@/lib/utils";
import { trackWhatsappClick } from "@/lib/analytics";

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = buildWhatsappLink(
    siteConfig.contact.whatsapp,
    "Olá! Quero saber mais sobre site + tráfego pago para psicólogos."
  );

  return (
    <footer id="contato" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <Logo />
            <p className="max-w-sm text-sm text-muted">{siteConfig.description}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Navegação</h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Contato</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsappClick("footer")}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              </li>
              {siteConfig.contact.instagram && (
                <li>
                  <a
                    href={siteConfig.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    <AtSign className="size-4" aria-hidden="true" />
                    {siteConfig.contact.instagramHandle}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row">
          <p>
            © {year} {siteConfig.brandName}. Todos os direitos reservados.
          </p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
