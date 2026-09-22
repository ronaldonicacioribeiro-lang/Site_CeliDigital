import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Adds a soft brand-colored glow behind the card. */
  glow?: boolean;
  /** Uses the stronger glass variant (more opaque, more blur). */
  strong?: boolean;
}

export function GlassCard({
  children,
  glow = false,
  strong = false,
  className,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-2xl",
        glow && "glow-primary",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
