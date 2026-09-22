import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteCreationSteps } from "@/data/process";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  return (
    <section id="processo-criacao" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Processo"
          title="Como criamos o seu"
          highlight="site do zero"
          description="Transparência em cada etapa, da identidade visual ao lançamento."
        />

        <ol className="relative mt-16 flex flex-col gap-6">
          <div
            className="pointer-events-none absolute top-2 bottom-2 left-6 w-px bg-gradient-to-b from-transparent via-border-strong to-transparent sm:left-1/2"
            aria-hidden="true"
          />
          {siteCreationSteps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <Reveal
                as="li"
                key={step.id}
                delay={index * 0.08}
                direction={isEven ? "up" : "down"}
                className={cn(
                  "relative flex items-start gap-5 sm:w-1/2",
                  isEven ? "sm:self-start" : "sm:flex-row-reverse sm:self-end sm:text-right"
                )}
              >
                <span className="glass-strong relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold text-gradient-brand">
                  {step.number}
                </span>
                <GlassCard className="flex-1 p-5">
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{step.description}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
