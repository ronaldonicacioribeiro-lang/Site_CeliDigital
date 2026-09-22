"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Search, Sparkles, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { CTAButton } from "@/components/ui/CTAButton";
import { Float } from "@/components/ui/Float";
import { MetricCard } from "@/components/ui/MetricCard";
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
    "Olá! Quero saber mais sobre site + tráfego pago para psicólogos."
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
              <Badge>Especialistas em marketing digital para psicólogos</Badge>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
            >
              Mais pacientes para o seu consultório com um site profissional e{" "}
              <span className="text-gradient-brand">tráfego pago</span>.
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)}
              className="max-w-lg text-balance text-base text-muted sm:text-lg"
            >
              Criamos sites profissionais e páginas estratégicas, e estruturamos
              campanhas de tráfego pago para gerar mais contatos qualificados
              para o seu consultório.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-col gap-3 sm:flex-row">
              <CTAButton
                href={whatsappHref}
                external
                size="lg"
                onClick={() => trackWhatsappClick("hero")}
              >
                Quero meu site + tráfego
              </CTAButton>
              <CTAButton href="#como-funciona" variant="secondary" size="lg" icon={false}>
                Ver como funciona
              </CTAButton>
            </motion.div>

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

        {/* Floating chips over the more visible (right) side of the image.
            Confined to the right portion of the hero (not inset-0) so this
            layer never sits on top of the text/CTAs on the left. */}
        <MouseParallax
          strength={8}
          className="absolute inset-y-0 right-0 hidden w-full sm:block lg:w-1/2"
        >
          <Float
            distance={10}
            duration={4.5}
            className="absolute top-32 right-8 lg:right-16"
          >
            <div className="glass-strong flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground">
              <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
              Site + Tráfego Pago
            </div>
          </Float>

          <Float
            distance={14}
            duration={5.5}
            delay={0.4}
            className="absolute bottom-32 right-8 w-44 lg:right-20 lg:w-48"
          >
            <MetricCard label="Novos contatos" value="Exemplo" icon={Users} isPlaceholder />
          </Float>

          <Float
            distance={9}
            duration={4.8}
            delay={0.2}
            className="absolute top-1/2 right-6 hidden -translate-y-1/2 lg:right-10 lg:block"
          >
            <div className="glass-strong flex size-12 items-center justify-center rounded-2xl text-accent">
              <Search className="size-5" aria-hidden="true" />
            </div>
          </Float>
        </MouseParallax>
      </div>
    </section>
  );
}
