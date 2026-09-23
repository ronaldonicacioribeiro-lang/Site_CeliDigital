import { BentoCardLink } from "@/components/ui/BentoCardLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { ProofLightbox } from "@/components/ui/ProofLightbox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { bentoCards } from "@/data/bento";
import { cn } from "@/lib/utils";
import type { BentoCard } from "@/types";

const colSpanClasses: Record<BentoCard["colSpan"], string> = {
  1: "sm:col-span-1",
  2: "sm:col-span-2",
  3: "sm:col-span-3",
};

const rowSpanClasses: Record<BentoCard["rowSpan"], string> = {
  1: "sm:row-span-1",
  2: "sm:row-span-2",
};

function PlaceholderFlag() {
  return (
    <span className="absolute top-5 right-5 rounded-full border border-border-strong bg-background/80 px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted">
      exemplo
    </span>
  );
}

function BentoCardContent({ card }: { card: BentoCard }) {
  const Icon = card.icon;

  if (card.variant === "metric") {
    return (
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="text-4xl font-semibold text-gradient-brand sm:text-5xl">
            {card.metricValue}
          </p>
          <p className="mt-1 text-xs text-muted">{card.metricLabel}</p>
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
          <p className="mt-1 text-sm text-muted">{card.description}</p>
          {card.proofImage && (
            <div className="mt-3">
              <ProofLightbox
                src={card.proofImage.src}
                alt={card.proofImage.alt}
                width={card.proofImage.width}
                height={card.proofImage.height}
                triggerLabel="Ver comprovante"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (card.variant === "chart") {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
            <p className="mt-1 text-sm text-muted">{card.description}</p>
          </div>
          {Icon && (
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-accent">
              <Icon className="size-4.5" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            {card.metricValue && (
              <p className="text-2xl font-semibold text-gradient-brand sm:text-3xl">
                {card.metricValue}
              </p>
            )}
            {card.metricLabel && (
              <p className="mt-0.5 text-xs text-muted">{card.metricLabel}</p>
            )}
          </div>
          {card.proofImage && (
            <ProofLightbox
              src={card.proofImage.src}
              alt={card.proofImage.alt}
              width={card.proofImage.width}
              height={card.proofImage.height}
              triggerLabel="Ver comprovante"
              mode="thumbnail"
            />
          )}
        </div>
      </div>
    );
  }

  if (card.variant === "browser") {
    return (
      <div className="flex h-full flex-col justify-between">
        {Icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-accent">
            <Icon className="size-4.5" aria-hidden="true" />
          </div>
        )}
        <div className="my-2 flex-1 rounded-lg border border-border-strong bg-foreground/[0.03] p-2" aria-hidden="true">
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-foreground/15" />
            <span className="size-1.5 rounded-full bg-foreground/15" />
            <span className="size-1.5 rounded-full bg-foreground/15" />
          </div>
          <div className="mt-1.5 space-y-1">
            <div className="h-1.5 w-3/5 rounded-full bg-gradient-brand-soft" />
            <div className="h-1 w-full rounded-full bg-foreground/10" />
            <div className="h-1 w-4/5 rounded-full bg-foreground/10" />
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
          <p className="mt-1 text-sm text-muted">{card.description}</p>
          {card.cta && (
            <BentoCardLink
              label={card.cta.label}
              message={card.cta.message}
              trackLocation={card.cta.trackLocation}
            />
          )}
        </div>
      </div>
    );
  }

  if (card.variant === "toggle") {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          {Icon && (
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-accent">
              <Icon className="size-4.5" aria-hidden="true" />
            </div>
          )}
          <div
            className="flex h-6 w-11 items-center rounded-full bg-gradient-brand p-1"
            aria-hidden="true"
          >
            <span className="size-4 rounded-full bg-white shadow-sm" />
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
          <p className="mt-1 text-sm text-muted">{card.description}</p>
          {card.cta && (
            <BentoCardLink
              label={card.cta.label}
              message={card.cta.message}
              trackLocation={card.cta.trackLocation}
            />
          )}
        </div>
      </div>
    );
  }

  if (card.variant === "visual") {
    return (
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-4">
          {Icon && (
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-accent">
              <Icon className="size-4.5" aria-hidden="true" />
            </div>
          )}
        </div>

        {card.mapQuery ? (
          <div className="relative my-4 min-h-[140px] flex-1 overflow-hidden rounded-xl border border-border-strong">
            <MapEmbed
              query={card.mapQuery}
              title={`Mapa da região de atuação: ${card.mapQuery}`}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-primary/10"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="relative flex flex-1 items-center justify-center py-6" aria-hidden="true">
            <span className="absolute size-16 animate-ping rounded-full bg-primary/20" />
            <span className="absolute size-16 rounded-full bg-primary/10" />
            <span className="size-3 rounded-full bg-gradient-brand" />
          </div>
        )}

        <div>
          <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
          <p className="mt-1 text-sm text-muted">{card.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between">
      {Icon && (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-accent">
          <Icon className="size-4.5" aria-hidden="true" />
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
        <p className="mt-1 text-sm text-muted">{card.description}</p>
      </div>
    </div>
  );
}

export function BentoGrid() {
  return (
    <section id="resultados" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Estratégia"
          title="Site, tráfego e Google trabalhando"
          highlight="juntos pelo seu consultório"
          description="Estrutura, tecnologia e estratégia reunidas em um só lugar."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:[grid-auto-flow:dense] sm:auto-rows-[14rem]">
          {bentoCards.map((card, index) => (
            <Reveal
              key={card.id}
              delay={(index % 3) * 0.08}
              className={cn(colSpanClasses[card.colSpan], rowSpanClasses[card.rowSpan])}
            >
              <GlassCard
                className={cn(
                  "relative h-full min-h-[10.5rem] p-6 transition-colors hover:bg-surface-elevated/60"
                )}
              >
                {card.isPlaceholder && <PlaceholderFlag />}
                <BentoCardContent card={card} />
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
