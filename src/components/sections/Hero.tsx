"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { Float } from "@/components/ui/Float";
import { MouseParallax } from "@/components/ui/MouseParallax";
import { siteConfig } from "@/config/site";
import { buildWhatsappLink } from "@/lib/utils";
import { trackWhatsappClick } from "@/lib/analytics";

// Looping background video, replacing the old scroll-scrubbed 3D frame
// sequence (ScrollFrameSequence, kept in ui/ for other clones of this
// template). Two encodes so phones don't pay for 1280x720: mobile is a
// narrower center-crop (matches how object-cover fills a portrait screen
// anyway) downscaled to 480x540, desktop keeps the full 1280x720 frame at a
// lower bitrate than the original source export.
const HERO_VIDEO_MOBILE_SRC = "/videos/hero-loop-mobile.mp4";
const HERO_VIDEO_DESKTOP_SRC = "/videos/hero-loop-desktop.mp4";
const HERO_VIDEO_POSTER = "/images/hero/hero-loop-poster.jpg";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const whatsappHref = buildWhatsappLink(
    siteConfig.contact.whatsapp,
    siteConfig.contact.whatsappDefaultMessage
  );

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="inicio" className="relative">
      <div className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20 sm:pt-32">
        {/* Full-bleed looping background video (local test — see note above) */}
        <div className="absolute inset-0 -z-30">
          {prefersReducedMotion ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={HERO_VIDEO_POSTER}
              alt="Ilustração de uma mente clara e organizada"
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={HERO_VIDEO_POSTER}
              className="h-full w-full object-cover"
              aria-label="Ilustração animada de uma mente clara e organizada"
            >
              <source src={HERO_VIDEO_MOBILE_SRC} media="(max-width: 1023px)" type="video/mp4" />
              <source src={HERO_VIDEO_DESKTOP_SRC} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Dark scrim — keeps the text legible and the hero inside the site's dark palette */}
        <div
          className="absolute inset-0 -z-20 bg-gradient-to-b from-background via-background/80 to-background/55 lg:bg-gradient-to-r lg:from-background lg:via-background/85 lg:to-background/45"
          aria-hidden="true"
        />

        {/* Ambient brand glow, kept subtle on top of the image for continuity with the rest of the site */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="glow-orb-primary absolute -top-40 left-1/4 size-[32rem] rounded-full" />
          <div className="glow-orb-secondary absolute top-1/3 -right-20 size-[28rem] rounded-full" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex max-w-xl flex-col items-start gap-6">
            <motion.div {...fadeUp(0)}>
              <Badge>Marketing digital especializado para psicólogos</Badge>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
            >
              Seu{" "}
              <span className="text-gradient-brand">próximo nível profissional</span>{" "}
              pode começar no digital.
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="max-w-lg text-balance text-base text-muted sm:text-lg"
            >
              Estratégias digitais para psicólogos que querem aumentar sua
              visibilidade, atrair novas oportunidades e transformar sua
              presença online em crescimento.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href={whatsappHref}
                external
                size="lg"
                onClick={() => trackWhatsappClick("hero")}
              >
                Quero descobrir como
              </CTAButton>
              <CTAButton href="#como-funciona" variant="secondary" size="lg" icon={false}>
                Ver como funciona
              </CTAButton>
            </motion.div>

            <motion.p {...fadeUp(0.35)} className="max-w-md text-sm text-muted/70">
              Site, Google Ads e estratégias pensadas para profissionais da
              psicologia.
            </motion.p>
          </div>
        </div>

        {/* Floating chip over the more visible (right) side of the image.
            Confined to the right portion of the hero (not inset-0) so this
            layer never sits on top of the text/CTAs on the left. A real
            WhatsApp CTA, not just decoration. */}
        <MouseParallax
          strength={8}
          className="absolute inset-y-0 right-0 hidden w-full sm:block lg:w-1/2"
        >
          <Float
            distance={10}
            duration={4.5}
            className="absolute top-32 right-8 lg:right-16"
          >
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick("hero_chip")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass-strong flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface-elevated"
            >
              <Sparkle className="size-3.5 text-accent" aria-hidden="true" />
              Estratégia digital para psicólogos
            </motion.a>
          </Float>
        </MouseParallax>
      </div>
    </section>
  );
}
