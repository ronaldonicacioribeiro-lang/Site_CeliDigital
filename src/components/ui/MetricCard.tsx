import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  /** Omit together with isPlaceholder — renders a decorative skeleton bar instead of a real value. */
  value?: string;
  icon?: LucideIcon;
  /** Purely decorative UI chrome (no real number to show) — renders a skeleton bar instead of `value`. */
  isPlaceholder?: boolean;
  className?: string;
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  isPlaceholder = false,
  className,
}: MetricCardProps) {
  return (
    <GlassCard strong className={cn("relative flex items-center gap-3 p-4", className)}>
      {Icon && (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-accent">
          <Icon className="size-4.5" aria-hidden="true" />
        </div>
      )}
      <div className="min-w-0">
        {isPlaceholder ? (
          <div className="h-4 w-14 rounded-full bg-gradient-brand-soft" aria-hidden="true" />
        ) : (
          <p className="truncate text-lg font-semibold text-foreground">{value}</p>
        )}
        <p className="mt-1.5 truncate text-xs text-muted">{label}</p>
      </div>
    </GlassCard>
  );
}
