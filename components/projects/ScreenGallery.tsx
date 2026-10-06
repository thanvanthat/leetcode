"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { cn, easeOutExpo } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "@/components/visuals/DeviceFrame";

interface ScreenGalleryProps {
  project: Project;
  className?: string;
  /** Show the drag hint and index counter above the rail. */
  showHeader?: boolean;
}

/**
 * Horizontal rail of real product captures in device frames.
 * Each frame opens a full-screen viewer with keyboard navigation.
 */
export function ScreenGallery({ project, className, showHeader = true }: ScreenGalleryProps) {
  const screens = project.screens ?? [];
  const [open, setOpen] = useState<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const phone = project.device === "phone";
  const live = project.links?.find((l) => l.kind === "live");

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + screens.length) % screens.length)),
    [screens.length],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const scrollBy = (dir: number) =>
    railRef.current?.scrollBy({ left: dir * railRef.current.clientWidth * 0.7, behavior: "smooth" });

  if (!screens.length) return null;
  const current = open !== null ? screens[open] : null;

  return (
    <div className={className}>
      {showHeader && (
        <div className="gutter mb-6 flex items-center justify-between gap-4">
          <p className="label text-ash">
            <span className="text-bone">{String(screens.length).padStart(2, "0")}</span> real screens · tap to enlarge
          </p>
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => scrollBy(d)}
                aria-label={d < 0 ? "Previous screens" : "Next screens"}
                className="grid size-11 place-items-center border border-bone/20 text-bone transition-colors hover-fine:border-bone"
              >
                {d < 0 ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
              </button>
            ))}
          </div>
        </div>
      )}

      <div
        ref={railRef}
        data-cursor="drag"
        className="no-scrollbar gutter flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-5 overflow-x-auto pb-4 lg:gap-8"
      >
        {screens.map((s, i) => (
          <motion.figure
            key={s.src}
            className={cn("shrink-0 snap-start", phone ? "w-[62vw] sm:w-[38vw] lg:w-[17rem]" : "w-[86vw] lg:w-[46rem]")}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: Math.min(i, 4) * 0.06 }}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              data-cursor="view"
              data-cursor-label="Open"
              aria-label={`Enlarge: ${s.caption}`}
              className="group block w-full text-left"
            >
              <div className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
                {phone ? (
                  <PhoneFrame screen={s} sizes="300px" />
                ) : (
                  <BrowserFrame screen={s} url={live?.href} sizes="(min-width:1024px) 736px, 86vw" />
                )}
              </div>
            </button>
            <figcaption className="label mt-4 flex justify-between gap-4 text-ash">
              <span>{s.caption}</span>
              <span className="text-bone/40">{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div className="gutter flex items-center justify-between py-5" onClick={(e) => e.stopPropagation()}>
              <p className="label text-ash">
                <span className="text-bone">{project.title}</span> — {current.caption}
              </p>
              <button
                type="button"
                onClick={close}
                autoFocus
                className="label flex items-center gap-2 border border-bone/20 px-4 py-2.5 text-bone hover-fine:border-bone"
              >
                Close <X className="size-3.5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center gutter pb-6">
              <motion.div
                key={current.src}
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
              {screens.length > 1 &&
                [-1, 1].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      step(d);
                    }}
                    aria-label={d < 0 ? "Previous screen" : "Next screen"}
                    className={cn(
                      "absolute top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-bone/20 bg-ink/70 text-bone hover-fine:border-bone",
                      d < 0 ? "left-4" : "right-4",
                    )}
                  >
                    {d < 0 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
                  </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
