"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeCine, easeOutExpo } from "@/lib/utils";

/**
 * Route entry transition: a panel wipes off the screen while content fades in.
 * Content only animates opacity so no transform breaks sticky/pinned descendants.
 * Used from app/template.tsx so it replays on every navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[110] bg-graphite"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          animate={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: easeCine, delay: 0.05 }}
        />
      )}
      <motion.div
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: easeOutExpo, delay: reduce ? 0 : 0.35 }}
      >
        {children}
      </motion.div>
    </>
  );
}
