import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="servicos" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Serviços"
          title="Tudo que o seu consultório precisa para"
          highlight="crescer no digital"
          description="Da criação do site à captação de pacientes, cuidamos de cada etapa da sua presença online."
        />

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal as="li" key={service.id} delay={(index % 3) * 0.08}>
                <GlassCard className="flex h-full flex-col gap-4 p-6 transition-colors hover:bg-surface-elevated/60">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-brand-soft text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted">{service.description}</p>
                </GlassCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
