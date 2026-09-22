"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";
import { buildWhatsappLink } from "@/lib/utils";
import { trackWhatsappClick } from "@/lib/analytics";

export function CTASection() {
  const whatsappHref = buildWhatsappLink(
    siteConfig.contact.whatsapp,
    "Olá! Quero saber mais sobre site + tráfego pago para psicólogos."
  );

  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <GlassCard strong glow className="relative overflow-hidden px-6 py-16 text-center sm:px-16">
            <div
              className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
              aria-hidden="true"
            />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="text-balance max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Pronto para atrair{" "}
                <span className="text-gradient-brand">mais pacientes</span> com um
                site profissional?
              </h2>
              <p className="max-w-xl text-balance text-base text-muted sm:text-lg">
                Fale com a CeliDigital e descubra como um site + tráfego pago
                estratégico pode transformar a presença digital do seu
                consultório.
              </p>
              <CTAButton
                href={whatsappHref}
                external
                size="lg"
                onClick={() => trackWhatsappClick("cta_section")}
              >
                Quero meu site + tráfego
              </CTAButton>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
