import { CheckCircle2, ArrowRight, Megaphone, Globe, CalendarCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const pillars = ["Site", "Estratégia", "Google", "Captação", "Acompanhamento"];

const checklist = [
  "Campanhas segmentadas para quem já busca por terapia",
  "Página de destino pensada para conversão",
  "Acompanhamento e otimização contínua dos anúncios",
  "Relatórios simples, sem jargão técnico",
];

const funnelStages = [
  { icon: Megaphone, label: "Anúncio no Google" },
  { icon: Globe, label: "Site otimizado" },
  { icon: CalendarCheck, label: "Agendamento" },
];

export function TrafficSection() {
  return (
    <section id="trafego-pago" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Tráfego pago"
          title="Tráfego pago não é só"
          highlight="“criar anúncios”"
          description="É construir uma estrutura completa entre o anúncio e o agendamento."
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar} delay={index * 0.06} className="flex items-center gap-3">
              <span className="glass-strong rounded-full px-5 py-2 text-sm font-medium text-foreground">
                {pillar}
              </span>
              {index < pillars.length - 1 && (
                <span className="text-lg text-muted" aria-hidden="true">
                  +
                </span>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ul className="flex flex-col gap-4">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-sm text-muted sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard strong className="relative p-6 sm:p-8">
              <span className="absolute top-5 right-5 rounded-full border border-border-strong bg-background/80 px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted">
                demonstração
              </span>
              <p className="mb-6 text-xs font-medium tracking-wide text-muted uppercase">
                Do clique ao agendamento
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                {funnelStages.map((stage, index) => {
                  const Icon = stage.icon;
                  return (
                    <div key={stage.label} className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-brand-soft text-accent">
                          <Icon className="size-6" aria-hidden="true" />
                        </div>
                        <span className="max-w-24 text-xs font-medium text-foreground">
                          {stage.label}
                        </span>
                      </div>
                      {index < funnelStages.length - 1 && (
                        <ArrowRight
                          className="size-4 shrink-0 rotate-90 text-muted sm:rotate-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
