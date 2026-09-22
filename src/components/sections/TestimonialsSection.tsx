import { Quote } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Depoimentos"
          title="Quem já trabalha com a gente"
          highlight="recomenda"
          description="Relatos reais de psicólogas que já usam a estrutura da CeliDigital."
        />

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Reveal as="li" key={testimonial.id} delay={index * 0.1}>
              <GlassCard className="flex h-full flex-col gap-6 p-7">
                <Quote className="size-7 text-accent" aria-hidden="true" />
                <p className="flex-1 text-balance text-base text-foreground/90 sm:text-lg">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-white"
                    aria-hidden="true"
                  >
                    {testimonial.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
