import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { benefits } from "@/data/benefits";

export function BenefitsSection() {
  return (
    <section id="beneficios" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Benefícios"
          title="Por que investir em uma"
          highlight="presença digital profissional"
        />

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal as="li" key={benefit.id} delay={(index % 3) * 0.08} className="flex gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-accent">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{benefit.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
