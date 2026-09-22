import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * CeliDigital's chosen mark: a pure wordmark, "Celi" in the brand gradient
 * + the rest in foreground white — no icon. This split is specific to the
 * word "CeliDigital"; a future site cloned from this template will likely
 * swap in a real logo image via siteConfig.logo instead of reusing this
 * split logic for a different brand name.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline text-lg font-bold tracking-tight",
        className
      )}
      aria-label={siteConfig.logo.alt}
    >
      <span className="text-gradient-brand">Celi</span>
      <span className="font-normal text-foreground">Digital</span>
    </span>
  );
}
