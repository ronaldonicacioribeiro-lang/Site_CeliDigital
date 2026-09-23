import type { LogoItem } from "@/types";

/**
 * Logo strip — real clients/partners. Add a matching file in public/logos/
 * instead of text once a client hands over a real logo mark. A new entry
 * with isPlaceholder: true renders as a reserved/example slot instead.
 */
export const logos: LogoItem[] = [
  { id: "ventura-odontologia", name: "Odontologia Ventura" },
  { id: "essencia-psicologia", name: "Essência Psicologia" },
  { id: "equilibrio-clinica-psicologica", name: "Equilíbrio Clínica Psicológica" },
  { id: "instituto-viver-bem", name: "Instituto Viver Bem" },
  { id: "espaco-acolher", name: "Espaço Acolher" },
  { id: "nucleo-ser", name: "Núcleo Ser" },
  { id: "clinica-mente-vida", name: "Clínica Mente & Vida" },
  { id: "instituto-horizonte", name: "Instituto Horizonte" },
];
