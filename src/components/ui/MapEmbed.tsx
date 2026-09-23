"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface MapEmbedProps {
  /** e.g. "Belo Horizonte, MG" */
  query: string;
  title: string;
}

/**
 * Click-to-load Google Maps embed. The iframe itself pulls in ~230 KiB of
 * Google's own JS — loading it unconditionally (even with `loading="lazy"`)
 * still counts against page weight once the card scrolls into view. This
 * shows a lightweight static facade first and only mounts the real iframe
 * on click, so the cost is paid only by visitors who actually want the map.
 */
export function MapEmbed({ query, title }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=9&output=embed`}
        className="h-full w-full contrast-[0.85] saturate-[0.7] brightness-[0.85]"
        style={{ border: 0 }}
        title={title}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="group flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-elevated to-surface text-muted transition-colors hover:text-foreground"
    >
      <MapPin className="size-6 text-accent transition-transform group-hover:scale-110" aria-hidden="true" />
      <span className="text-xs font-medium">Ver mapa interativo</span>
    </button>
  );
}
