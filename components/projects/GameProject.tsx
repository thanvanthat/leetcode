"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "@/components/visuals/ProjectVisual";
import { ProjectMeta } from "./ProjectMeta";

interface GameProjectProps {
  project: Project;
  index: number;
  total: number;
  onOpen: (project: Project) => void;
  className?: string;
}

/** One chapter of the Game Development sequence: a full-bleed visual story with metadata. */
export function GameProject({ project, index, total, onOpen, className }: GameProjectProps) {
  return (
    <article
      aria-labelledby={`game-${project.slug}`}
      className={cn("game-panel relative flex shrink-0 flex-col overflow-hidden", className)}
      style={{ background: project.atmosphere.base }}
    >
      {/* Visual layer with inner parallax target */}
      <div className="relative h-[52vh] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
        <div className="game-visual absolute inset-0 lg:-inset-x-[8%]">
          <ProjectVisual project={project} animated />
        </div>
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/80 via-black/30 to-transparent lg:block" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-between gap-10 gutter py-10 lg:w-[62%] lg:py-14">
        <div className="label flex items-center gap-4 text-ash">
          <span className="whitespace-nowrap text-bone">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="h-px w-10 shrink-0 bg-bone/30" />
          <span>{project.type}</span>
        </div>

        <div>
          <h3 id={`game-${project.slug}`} className="game-title display text-[clamp(3.25rem,9vw,10rem)] text-bone">
            {project.title}
          </h3>
          <p className="mt-5 max-w-[44ch] text-base leading-relaxed text-bone/80 sm:text-lg">{project.description}</p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <ProjectMeta project={project} compact className="max-w-xl" />
          <button
            type="button"
            onClick={() => onOpen(project)}
            data-cursor="view"
            className="group label inline-flex min-h-12 items-center gap-3 self-start border border-bone/30 px-5 py-4 text-bone transition-colors duration-500 hover-fine:bg-bone hover-fine:text-ink xl:self-end"
            style={{ borderColor: `${project.atmosphere.accent}80` }}
          >
            View Project
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
