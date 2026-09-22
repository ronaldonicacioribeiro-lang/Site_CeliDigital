import type { LogoItem } from "@/types";

/**
 * Logo strip. Real clients/partners first (isPlaceholder omitted/false —
 * these render with more visual weight), then reserved slots for what's
 * coming. Add a matching file in public/logos/ instead of text once a
 * client hands over a real logo mark.
 */
export const logos: LogoItem[] = [
  { id: "ventura-odontologia", name: "Odontologia Ventura" },
  { id: "logo-2", name: "Consultório Exemplo 2", isPlaceholder: true },
  { id: "logo-3", name: "Consultório Exemplo 3", isPlaceholder: true },
  { id: "logo-4", name: "Consultório Exemplo 4", isPlaceholder: true },
  { id: "logo-5", name: "Consultório Exemplo 5", isPlaceholder: true },
  { id: "logo-6", name: "Consultório Exemplo 6", isPlaceholder: true },
  { id: "logo-7", name: "Consultório Exemplo 7", isPlaceholder: true },
  { id: "logo-8", name: "Consultório Exemplo 8", isPlaceholder: true },
];
