"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { chapterProjects } from "@/data/projects";
import { useFinePointer } from "@/lib/hooks";
import { cn, easeOutExpo } from "@/lib/utils";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Selected work as a cinematic chapter index. On desktop a floating preview
 * follows the pointer; on touch devices every chapter carries its own frame.
 */
export function ProjectShowcase() {
  const fine = useFinePointer();
  const listRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 150, damping: 22, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const current = hovered !== null ? chapterProjects[hovered] : null;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative bg-ink py-32 lg:py-44">
      <div className="gutter grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SectionLabel index="03" title="Selected Work" />
          <RevealText
            id="projects-heading"
            lines={["Chapters of", "a digital", "experience."]}
            className="display mt-8 text-[clamp(3.25rem,10vw,10rem)] text-bone"
          />
        </div>
        <p className="max-w-[36ch] text-ash lg:col-span-4">
          Each project is a chapter — a question about play, intelligence or interaction, answered by building something.
        </p>
      </div>

      <div
        ref={listRef}
        onPointerMove={fine ? onMove : undefined}
        onPointerLeave={() => setHovered(null)}
        className="relative mt-20 lg:mt-28"
      >
        <ol className="border-t border-bone/10">
          {chapterProjects.map((p, i) => (
            <li key={p.slug} className="border-b border-bone/10">
              <Link
                href={`/projects/${p.slug}`}
                data-cursor="view"
                onPointerEnter={() => fine && setHovered(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                className="gutter group relative grid grid-cols-12 items-end gap-x-4 gap-y-4 py-8 lg:py-12"
              >
                {!fine && (
                  <div className="col-span-12 aspect-[16/9] overflow-hidden">
                    <ProjectArt project={p} />
                  </div>
                )}
                <span className="label col-span-2 self-start pt-3 text-ash lg:col-span-1">{p.number}</span>
                <div className="col-span-10 lg:col-span-7">
                  <h3
                    className={cn(
                      "display text-[clamp(2.75rem,8.5vw,8.5rem)] transition-[color,transform] duration-700 ease-[var(--ease-out-expo)]",
                      hovered === null || hovered === i ? "text-bone" : "text-bone/20",
                      "hover-fine:group-hover:translate-x-4",
                    )}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-3 text-base text-bone/70 sm:text-lg">{p.statement}</p>
                </div>
                <div className="label col-span-12 flex flex-wrap gap-x-6 gap-y-2 text-ash lg:col-span-4 lg:flex-col lg:items-end lg:text-right">
                  <span>{p.type}</span>
                  <span
                    className="flex items-center gap-2"
                    style={p.status === "Live" ? { color: p.atmosphere.accent } : undefined}
                  >
                    <span className="relative flex size-1.5">
                      {p.status === "Live" && (
                        <span
                          className="absolute inline-flex size-full animate-ping rounded-full"
                          style={{ background: p.atmosphere.accent }}
                        />
                      )}
                      <span className="relative inline-flex size-1.5 rounded-full" style={{ background: p.atmosphere.accent }} />
                    </span>
                    {p.status === "Live" ? "Live · try it" : p.status}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>

        {/* Floating hover preview (desktop) */}
        {fine && (
          <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none absolute left-0 top-0 z-10">
            <AnimatePresence>
              {current && (
                <motion.div
                  key={current.slug}
                  className="aspect-[4/3] w-[min(28vw,420px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                  initial={{ clipPath: "inset(50% 50% 50% 50%)", opacity: 0.6 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                  exit={{ clipPath: "inset(50% 50% 50% 50%)", opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                >
                  <motion.div
                    className="h-full w-full"
                    initial={{ scale: 1.25 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, ease: easeOutExpo }}
                  >
                    <ProjectArt project={current} animated />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
