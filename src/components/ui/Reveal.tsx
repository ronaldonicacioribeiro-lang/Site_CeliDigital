"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds, useful when revealing a list of siblings. */
  delay?: number;
  /** Direction the content enters from. */
  direction?: "up" | "down" | "none";
  as?: "div" | "li";
}

const DISTANCE = 28;

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const offsetY = direction === "up" ? DISTANCE : direction === "down" ? -DISTANCE : 0;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : offsetY,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.7,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
