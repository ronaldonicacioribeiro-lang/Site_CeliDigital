"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  icon?: boolean;
  external?: boolean;
  className?: string;
  /** e.g. wire to trackWhatsappClick() from lib/analytics — fires before the link navigates. */
  onClick?: () => void;
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  size = "md",
  icon = true,
  external = false,
  className,
  onClick,
}: CTAButtonProps) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm",
        variant === "primary"
          ? "bg-gradient-brand text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset] hover:brightness-110"
          : "glass text-foreground hover:bg-surface-elevated",
        className
      )}
    >
      {children}
      {icon && (
        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </motion.a>
  );
}
