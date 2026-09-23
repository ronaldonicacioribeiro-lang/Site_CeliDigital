"use client";

import { useEffect, useState } from "react";
import { X, Eye } from "lucide-react";
import Image from "next/image";

interface ProofLightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Label for the trigger, e.g. "Ver comprovante". Used as visible text in "link" mode and as the aria-label in "thumbnail" mode. */
  triggerLabel: string;
  /** "link" (default): small text trigger. "thumbnail": a clickable preview crop of the screenshot itself. */
  mode?: "link" | "thumbnail";
}

/** A small "see the real evidence" trigger that opens the source screenshot full-size, dismissible via backdrop click or Escape. */
export function ProofLightbox({ src, alt, width, height, triggerLabel, mode = "link" }: ProofLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {mode === "thumbnail" ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={triggerLabel}
          className="group relative block shrink-0 overflow-hidden rounded-lg border border-border-strong"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-20 w-auto object-cover transition-transform duration-300 group-hover:scale-105 sm:h-24"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity group-hover:opacity-100">
            <Eye className="size-4 text-foreground" aria-hidden="true" />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors hover:text-foreground"
        >
          <Eye className="size-3.5" aria-hidden="true" />
          {triggerLabel}
        </button>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-100 flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar"
            className="glass absolute top-6 right-6 flex size-10 items-center justify-center rounded-full text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="max-h-[85vh] w-auto max-w-full rounded-xl border border-border-strong object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
