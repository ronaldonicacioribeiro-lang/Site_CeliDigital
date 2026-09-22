import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
