"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/types";
import { easeCine, easeOutExpo } from "@/lib/utils";
import { Pipeline } from "@/components/ui/Pipeline";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import { ProjectMeta } from "./ProjectMeta";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

/** Expandable project details, opened in place before the full case study. */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      // Keep focus inside the dialog
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.slug}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-${project.slug}`}
          className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain"
          style={{ background: project.atmosphere.base }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: easeCine }}
        >
          <div
            className="sticky top-0 z-10 flex items-center justify-between gutter py-5"
            style={{ background: `${project.atmosphere.base}e6` }}
          >
            <span className="label text-ash">
              <span className="text-bone">{project.number}</span> — {project.type}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="label flex items-center gap-2 border border-bone/20 px-4 py-2.5 text-bone transition-colors hover-fine:border-bone"
            >
              Close <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>

          <motion.div
            className="gutter pb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOutExpo, delay: 0.4 }}
          >
            <h2 id={`modal-${project.slug}`} className="display mt-6 text-[clamp(3rem,11vw,11rem)] text-bone">
              {project.title}
            </h2>
            <p className="mt-4 max-w-[40ch] text-lg text-bone/75 sm:text-xl">{project.statement}</p>

            <div className="mt-10 aspect-[16/9] overflow-hidden lg:aspect-[21/9]">
              <ProjectArt project={project} animated />
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-12">
              <div className="space-y-8 lg:col-span-7">
                {[
                  ["Overview", project.overview],
                  ["Problem", project.problem],
                  ["Concept", project.concept],
                ].map(([h, body]) => (
                  <div key={h} className="grid gap-3 border-t border-bone/10 pt-6 sm:grid-cols-[10rem_1fr]">
                    <h3 className="label text-ash">{h}</h3>
                    <p className="text-lg leading-relaxed text-bone/85">{body}</p>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <ProjectMeta project={project} />
              </div>
            </div>

            <div className="mt-20">
              <h3 className="label text-ash">System</h3>
              <Pipeline
                className="mt-8"
                steps={project.system}
                accent={project.atmosphere.accent}
                ariaLabel={`${project.title} system flow`}
              />
            </div>

            <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-bone/10 pt-10">
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="view"
                className="group label inline-flex min-h-12 items-center gap-3 bg-bone px-6 py-4 text-ink"
              >
                Open full case study
                <ArrowUpRight
                  className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
