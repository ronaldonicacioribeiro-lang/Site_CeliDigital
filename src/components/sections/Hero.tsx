"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { Float } from "@/components/ui/Float";
import { MouseParallax } from "@/components/ui/MouseParallax";
import { ScrollFrameSequence } from "@/components/ui/ScrollFrameSequence";
import { siteConfig } from "@/config/site";
import { buildWhatsappLink, cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/hooks";
import { trackWhatsappClick } from "@/lib/analytics";

/** Frames live in public/images/hero/brain-sequence(-mobile) — see SKILL.md to swap this asset. */
const SEQUENCE_FRAME_COUNT = 50;
const DESKTOP_SEQUENCE = { basePath: "/images/hero/brain-sequence", width: 3840, height: 2160 };
const MOBILE_SEQUENCE = {
  basePath: "/images/hero/brain-sequence-mobile",
  width: 1280,
  height: 720,
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  // Below `lg` the hero's content is taller than one viewport, so a pinned/sticky
  // wrapper would trap part of it out of view — the pin + 3D tilt is desktop-only.
  // The frame sequence itself still scrubs on mobile, just tied to the section's
  // normal (non-pinned) scroll position instead of holding it in place.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const shouldPin = isDesktop && !prefersReducedMotion;
  const shouldScrub = !prefersReducedMotion;
  const sequence = isDesktop ? DESKTOP_SEQUENCE : MOBILE_SEQUENCE;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Pinned (desktop): progress spans the whole tall section while it's held in
    // place. Not pinned (mobile): progress spans the section's natural transit
    // through the viewport, so frames still advance as the page scrolls normally.
    offset: shouldPin ? ["start start", "end end"] : ["start end", "end start"],
  });
  // Background is drawn oversized (scale-110 base) so the slight rotateY never reveals an edge.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.16, 1.08]);
  const bgRotateY = useTransform(scrollYProgress, [0, 0.4], [-6, 0]);

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
    <section
      id="inicio"
      ref={sectionRef}
      className="relative"
      style={{ height: shouldPin ? "240vh" : "auto" }}
    >
      <div
        className={cn(
          "perspective-premium relative flex min-h-screen items-center overflow-hidden pt-28 pb-20 sm:pt-32",
          shouldPin && "sticky top-0"
        )}
      >
        {/* Full-bleed 3D illustration background, scroll-scrubbed on desktop */}
        <motion.div
          className="absolute inset-0 -z-30 scale-110"
          style={shouldPin ? { scale: bgScale, rotateY: bgRotateY } : undefined}
        >
          <ScrollFrameSequence
            progress={scrollYProgress}
            enabled={shouldScrub}
            fill
            framesBasePath={sequence.basePath}
            frameCount={SEQUENCE_FRAME_COUNT}
            width={sequence.width}
            height={sequence.height}
            alt="Ilustração 3D de uma mente clara e organizada, animada conforme a rolagem da página"
          />
        </motion.div>

        {/* Dark scrim — keeps the text legible and the hero inside the site's dark palette */}
        <div
          className="absolute inset-0 -z-20 bg-gradient-to-b from-background via-background/80 to-background/55 lg:bg-gradient-to-r lg:from-background lg:via-background/85 lg:to-background/45"
          aria-hidden="true"
        />

        {/* Ambient brand glow, kept subtle on top of the image for continuity with the rest of the site */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -top-40 left-1/4 size-[32rem] rounded-full bg-primary/15 blur-[140px]" />
          <div className="absolute top-1/3 -right-20 size-[28rem] rounded-full bg-secondary/10 blur-[140px]" />
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

            {shouldPin && (
              <motion.p
                {...fadeUp(0.4)}
                className="text-xs tracking-wide text-muted/70 uppercase"
              >
                Role para ver a experiência em 3D
              </motion.p>
            )}
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
