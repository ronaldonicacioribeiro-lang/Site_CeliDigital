import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { howItWorksSteps } from "@/data/process";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Método CELI"
          title="Do primeiro contato até os"
          highlight="primeiros pacientes"
          description="Um processo em 4 etapas — cada uma carrega uma letra do nosso nome."
        />

        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute top-6 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
            aria-hidden="true"
          />
          <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, index) => (
              <Reveal as="li" key={step.id} delay={index * 0.1} className="relative flex flex-col gap-4">
                <span className="glass-strong relative z-10 flex size-12 items-center justify-center rounded-2xl text-lg font-semibold text-gradient-brand">
                  {step.letter ?? step.number}
                </span>
                <div>
                  {step.keyword && (
                    <p className="text-xs font-semibold tracking-wide text-accent uppercase">
                      {step.keyword}
                    </p>
                  )}
                  <h3 className="mt-1 text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
