import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BrandIcon } from "@/components/ui/BrandIcon";

interface ProjectLinksProps {
  project: Project;
  className?: string;
  size?: "md" | "lg";
}

/** Live app + source code buttons for shipped projects. Renders nothing otherwise. */
export function ProjectLinks({ project, className, size = "md" }: ProjectLinksProps) {
  if (!project.links?.length) return null;
  const { accent } = project.atmosphere;

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {project.links.map((link) => {
        const live = link.kind === "live";
        return (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor="explore"
            data-cursor-label={live ? "Launch ↗" : "Code ↗"}
            className={cn(
              "group label inline-flex items-center gap-3 transition-colors duration-500",
              size === "lg" ? "min-h-14 px-7 py-4 text-[0.75rem]" : "min-h-12 px-5 py-3.5",
              live ? "text-ink" : "border border-bone/25 text-bone hover-fine:border-bone",
            )}
            style={live ? { background: accent } : undefined}
          >
            {live ? (
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-ink/40" />
                <span className="relative inline-flex size-2 rounded-full bg-ink" />
              </span>
            ) : (
              <BrandIcon name="GitHub" className="size-4" />
            )}
            {link.label}
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}
