import type { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
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
        <p className="truncate text-lg font-semibold text-foreground">{value}</p>
        <p className="truncate text-xs text-muted">{label}</p>
      </div>
      {isPlaceholder && (
        <span className="absolute -top-2 -right-2 rounded-full border border-border-strong bg-background px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted">
          exemplo
        </span>
      )}
    </GlassCard>
  );
}
