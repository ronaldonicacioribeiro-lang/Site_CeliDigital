"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { type PointerEvent, type ReactNode, useRef } from "react";

interface MouseParallaxProps {
  children: ReactNode;
  className?: string;
  /** How strongly this layer reacts to the pointer; higher = more depth. */
  strength?: number;
}

/**
 * Wrap a hero visual (and its floating cards, each with its own `strength`)
 * in this to get a subtle depth-of-field effect as the cursor moves.
 * No-ops entirely under prefers-reduced-motion.
 */
export function MouseParallax({ children, className, strength = 20 }: MouseParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  const translateX = useTransform(springX, (v) => v * strength);
  const translateY = useTransform(springY, (v) => v * strength);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  }

  function handlePointerLeave() {
    x.set(0);
    y.set(0);
  }

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div style={{ x: translateX, y: translateY }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
