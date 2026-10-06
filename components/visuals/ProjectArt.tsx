import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./DeviceFrame";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectArtProps {
  project: Project;
  /** Rotates which captures lead the composition. */
  variant?: number;
  className?: string;
  animated?: boolean;
  priority?: boolean;
}

/**
 * Key art for a project. Shipped projects get a composition of their real
 * screens in device frames over the project's own atmosphere; everything
 * else falls back to the procedural artwork.
 */
export function ProjectArt({ project, variant = 0, className, animated, priority }: ProjectArtProps) {
  const screens = project.screens ?? [];
  if (!screens.length) {
    return <ProjectVisual project={project} variant={variant} className={className} animated={animated} />;
  }

  const pick = (offset: number) => screens[(variant + offset) % screens.length]!;
  const { base, glow, accent } = project.atmosphere;
  const live = project.links?.find((l) => l.kind === "live");

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{ background: `radial-gradient(70% 70% at 60% 40%, ${glow}cc, ${base} 70%)` }}
      role="img"
      aria-label={`${project.title} screens`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(${accent}14 1px, transparent 1px), linear-gradient(90deg, ${accent}14 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 75%)",
        }}
      />
      {project.device === "phone" ? (
        <div className="absolute inset-0 flex items-center justify-center [perspective:1600px]">
          <PhoneFrame
            screen={pick(1)}
            sizes="18vw"
            className="absolute w-[24%] -translate-x-[70%] translate-y-[6%] -rotate-[8deg] opacity-80"
          />
          <PhoneFrame
            screen={pick(2)}
            sizes="18vw"
            className="absolute w-[24%] translate-x-[70%] translate-y-[6%] rotate-[8deg] opacity-80"
          />
          <PhoneFrame screen={pick(0)} sizes="22vw" priority={priority} className="relative z-10 w-[28%] translate-y-[10%]" />
        </div>
      ) : (
        <div className="absolute inset-0 [perspective:1800px]">
          <BrowserFrame
            screen={pick(1)}
            sizes="40vw"
            className="absolute left-[30%] top-[8%] w-[66%] opacity-60 [transform:rotateY(-14deg)_rotateX(4deg)]"
          />
          <BrowserFrame
            screen={pick(0)}
            sizes="55vw"
            priority={priority}
            url={live?.href}
            className="absolute left-[6%] top-[20%] z-10 w-[72%] [transform:rotateY(-10deg)_rotateX(5deg)]"
          />
        </div>
      )}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
