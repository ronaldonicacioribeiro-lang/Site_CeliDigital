"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollFrameSequenceProps {
  /** 0→1 scroll progress driving which frame is drawn. */
  progress: MotionValue<number>;
  /** Public path to the frame folder, e.g. "/images/hero/brain-sequence". */
  framesBasePath: string;
  frameCount: number;
  /** Intrinsic frame aspect ratio reference (source assets) — not the render resolution, that's DPR-aware (see below). */
  width: number;
  height: number;
  alt: string;
  className?: string;
  /** Set false to always render a single static middle frame — and only ever download that one frame, not the full sequence. */
  enabled?: boolean;
  /** Fill the parent (absolute inset-0, object-cover) instead of sizing to the frame's own aspect ratio. Parent needs `position: relative`. */
  fill?: boolean;
}

function frameSrc(basePath: string, index: number) {
  return `${basePath}/frame-${String(index + 1).padStart(3, "0")}.webp`;
}

/**
 * Scroll-scrubbed image sequence: draws one frame per scroll-progress tick
 * onto a canvas. Pair with a tall pinned wrapper (see Hero.tsx) and feed it
 * that wrapper's useScroll() progress. Falls back to a single static frame
 * under prefers-reduced-motion (or `enabled={false}`) — no scroll-linked
 * animation, and critically, only that one frame is ever downloaded (the
 * full sequence is only fetched when actually needed for scrubbing).
 *
 * The canvas backing buffer is sized to the element's displayed CSS size ×
 * devicePixelRatio (capped at 2x), not the source frame's own resolution —
 * this is what keeps it crisp on retina/4K screens instead of relying on
 * the browser to upscale a fixed-resolution buffer.
 */
export function ScrollFrameSequence({
  progress,
  framesBasePath,
  frameCount,
  width,
  height,
  alt,
  className,
  enabled = true,
  fill = false,
}: ScrollFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: frameCount }, () => null)
  );
  const loadedRef = useRef<Set<number>>(new Set());
  const currentIndexRef = useRef(0);
  const [loadTick, setLoadTick] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isScrubbing = enabled && !prefersReducedMotion;
  const staticIndex = Math.floor(frameCount / 2);

  // Ref reads belong in effects, not render — recompute readiness here
  // whenever a new frame finishes loading. Paint as soon as ANY frame is
  // available (not the whole sequence) — waiting for all 50 frames before
  // the first paint is what was pushing LCP past 10s on slow connections.
  // drawFrame() already no-ops for a frame that isn't loaded yet, so this
  // just lets the canvas show whatever's ready and catch up as more arrive.
  useEffect(() => {
    setIsReady(loadedRef.current.size > 0);
  }, [loadTick]);

  function drawFrame(index: number) {
    currentIndexRef.current = index;
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const canvasW = canvas.width;
    const canvasH = canvas.height;
    ctx.clearRect(0, 0, canvasW, canvasH);

    if (fill) {
      // Backing buffer matches the CONTAINER's aspect ratio (see resize
      // effect below), not the source image's — replicate object-fit:
      // cover manually by cropping the source to match before drawing.
      const canvasRatio = canvasW / canvasH;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let sx = 0;
      let sy = 0;
      let sw = img.naturalWidth;
      let sh = img.naturalHeight;
      if (imgRatio > canvasRatio) {
        sw = img.naturalHeight * canvasRatio;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasRatio;
        sy = (img.naturalHeight - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
    } else {
      // Non-fill: CSS already forces the canvas's own aspect-ratio to
      // match the source, so a plain stretch-to-buffer is correct.
      ctx.drawImage(img, 0, 0, canvasW, canvasH);
    }
  }

  // Only fetch what's actually needed: the whole sequence when scrubbing,
  // otherwise just the one static frame that will ever be shown. The frame
  // matching the current scroll position is requested first and flagged
  // high-priority so it wins the race against the other 49 concurrent
  // requests — that's the one the canvas actually needs to paint LCP.
  useEffect(() => {
    function ensureLoaded(index: number, priority: boolean) {
      if (imagesRef.current[index]) return;
      const img = new Image();
      img.decoding = "async";
      if (priority && "fetchPriority" in img) {
        (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = "high";
      }
      img.onload = () => {
        loadedRef.current.add(index);
        setLoadTick((tick) => tick + 1);
      };
      img.src = frameSrc(framesBasePath, index);
      imagesRef.current[index] = img;
    }

    if (isScrubbing) {
      const priorityIndex = Math.min(
        frameCount - 1,
        Math.max(0, Math.round(progress.get() * (frameCount - 1)))
      );
      ensureLoaded(priorityIndex, true);
      for (let i = 0; i < frameCount; i++) {
        if (i !== priorityIndex) ensureLoaded(i, false);
      }
    } else {
      ensureLoaded(staticIndex, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrubbing, framesBasePath, frameCount, staticIndex]);

  // Keep the canvas backing buffer matched to its displayed size × DPR.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function handleResize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width * dpr));
      const nextHeight = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
        drawFrame(currentIndexRef.current);
      }
    }

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const initialIndex = isScrubbing
      ? Math.round(progress.get() * (frameCount - 1))
      : staticIndex;
    drawFrame(initialIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, isScrubbing, loadTick]);

  useMotionValueEvent(progress, "change", (value) => {
    if (!isReady || !isScrubbing) return;
    const index = Math.min(frameCount - 1, Math.max(0, Math.round(value * (frameCount - 1))));
    drawFrame(index);
  });

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      width={width}
      height={height}
      className={cn(
        fill ? "absolute inset-0 h-full w-full object-cover" : "h-auto w-full",
        className
      )}
      style={fill ? undefined : { aspectRatio: `${width} / ${height}` }}
    />
  );
}
