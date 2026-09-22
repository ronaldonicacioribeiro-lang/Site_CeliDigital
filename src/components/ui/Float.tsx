"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface FloatProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel distance in pixels. */
  distance?: number;
  /** Full loop duration in seconds. */
  duration?: number;
  delay?: number;
}

/** Gentle, infinite up/down idle motion for floating cards and shapes. */
export function Float({
  children,
  className,
  distance = 12,
  duration = 5,
  delay = 0,
}: FloatProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -distance, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
