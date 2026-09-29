import type { ReactNode } from "react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProjectMetaProps {
  project: Project;
  className?: string;
  compact?: boolean;
}

/** Definition list of a project's metadata: role, engine, technologies, status, type. */
export function ProjectMeta({ project, className, compact = false }: ProjectMetaProps) {
  const rows: [string, ReactNode][] = [
    ["Role", project.role],
    ["Engine / Platform", project.engine],
    ["Type", project.type],
    [
      "Status",
      <span key="status" className="inline-flex items-center gap-2">
        <span className="size-1.5 rounded-full" style={{ background: project.atmosphere.accent }} />
        {project.status}
      </span>,
    ],
  ];

  return (
    <dl className={cn("grid gap-0", className)}>
      {rows.map(([k, v]) => (
        <div key={k} className={cn("grid grid-cols-[8.5rem_1fr] gap-4 border-t border-bone/10", compact ? "py-2.5" : "py-4")}>
          <dt className="label text-ash">{k}</dt>
          <dd className="text-sm text-bone">{v}</dd>
        </div>
      ))}
      <div className={cn("grid grid-cols-[8.5rem_1fr] gap-4 border-y border-bone/10", compact ? "py-2.5" : "py-4")}>
        <dt className="label text-ash">Technologies</dt>
        <dd className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-bone">
          {project.technologies.map((t, i) => (
            <span key={t}>
              {t}
              {i < project.technologies.length - 1 && <span className="pl-3 text-bone/30">/</span>}
            </span>
          ))}
        </dd>
      </div>
    </dl>
  );
}
