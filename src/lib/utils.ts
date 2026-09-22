import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Builds a wa.me link from a digits-only phone number (config uses this format). */
export function buildWhatsappLink(phoneDigitsOnly: string, message?: string) {
  const base = `https://wa.me/${phoneDigitsOnly}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
