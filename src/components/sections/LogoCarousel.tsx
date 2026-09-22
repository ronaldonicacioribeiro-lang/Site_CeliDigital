import { SectionHeader } from "@/components/ui/SectionHeader";
import { logos } from "@/data/logos";
import { cn } from "@/lib/utils";
import type { LogoItem } from "@/types";

function LogoPill({ name, isPlaceholder }: { name: string; isPlaceholder?: boolean }) {
  return (
    <div
      className={cn(
        "glass flex h-14 shrink-0 items-center justify-center rounded-xl px-8 text-sm font-medium",
        isPlaceholder ? "text-muted" : "border-border-strong text-foreground"
      )}
    >
      {name}
    </div>
  );
}

function MarqueeRow({
  direction,
  items,
}: {
  direction: "left" | "right";
  items: LogoItem[];
}) {
  return (
    <div className="fade-edges-x overflow-hidden">
      <div
        className={
          "flex w-max gap-4 " +
          (direction === "left" ? "animate-marquee-left" : "animate-marquee-right")
        }
      >
        {[...items, ...items].map((logo, index) => (
          <LogoPill key={`${logo.id}-${index}`} name={logo.name} isPlaceholder={logo.isPlaceholder} />
        ))}
      </div>
    </div>
  );
}

export function LogoCarousel() {
  const half = Math.ceil(logos.length / 2);
  const rowOne = logos.slice(0, half);
  const rowTwo = logos.slice(half);

  return (
    <section id="credibilidade" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Confiança"
          title="Estrutura pensada para"
          highlight="gerar credibilidade"
          description="Consultórios e parceiros que já confiam na CeliDigital — e o espaço reservado pros próximos."
        />
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <MarqueeRow direction="left" items={rowOne} />
        <MarqueeRow direction="right" items={rowTwo} />
      </div>
    </section>
  );
}
