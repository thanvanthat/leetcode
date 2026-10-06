import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/lib/types";
import { ProjectLinks } from "@/components/projects/ProjectLinks";
import { ScreenGallery } from "@/components/projects/ScreenGallery";
import { FadeIn } from "@/components/ui/FadeIn";
import { Pipeline } from "@/components/ui/Pipeline";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DeviceStage } from "@/components/visuals/DeviceStage";

interface LiveProjectFeatureProps {
  project: Project;
  index: string;
  kicker: string;
  /** Multi-line display title; defaults to the project title. */
  titleLines?: string[];
  pipelineLabel: string;
  /** Project-specific block that shows how the product thinks. */
  signature?: ReactNode;
}

/**
 * Full feature chapter for a shipped product: its own atmosphere, real
 * screens staged in depth, headline numbers, the system, a scrollable
 * gallery and links to the live app and source.
 */
export function LiveProjectFeature({ project, index, kicker, titleLines, pipelineLabel, signature }: LiveProjectFeatureProps) {
  const { accent, base, glow } = project.atmosphere;
  const headingId = `${project.slug}-heading`;

  return (
    <section
      id={project.slug}
      aria-labelledby={headingId}
      className="relative overflow-clip py-32 lg:py-44"
      style={{ background: base }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(60% 45% at 85% 10%, ${glow}77, transparent 70%)` }}
      />

      <div className="relative gutter">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionLabel index={index} title={kicker} />
          <span
            className="label inline-flex items-center gap-2 border px-3 py-1.5"
            style={{ borderColor: `${accent}55`, color: accent }}
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full" style={{ background: accent }} />
              <span className="relative inline-flex size-1.5 rounded-full" style={{ background: accent }} />
            </span>
            {project.status} · {project.type}
          </span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealText
              id={headingId}
              lines={titleLines ?? [project.title]}
              className="display text-[clamp(4rem,14vw,14rem)] text-bone"
            />
            <p className="display-wide mt-5 max-w-[22ch] text-2xl sm:text-3xl" style={{ color: accent }}>
              {project.statement}
            </p>
          </div>
          <FadeIn className="lg:col-span-4 lg:pb-3">
            <p className="text-lg leading-relaxed text-bone/80">{project.description}</p>
            <ProjectLinks project={project} className="mt-8" />
          </FadeIn>
        </div>
      </div>

      <DeviceStage project={project} className="relative mt-20 px-4 lg:mt-28" />

      {project.highlights && (
        <div className="relative gutter mt-24 lg:mt-32">
          <dl className="grid grid-cols-2 border-t border-bone/10 lg:grid-cols-4">
            {project.highlights.map((h, i) => (
              <FadeIn
                key={h.label}
                delay={i * 0.08}
                className="border-b border-bone/10 py-8 pr-6 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:pl-6 lg:first:pl-0"
              >
                <dt className="label text-ash">{h.label}</dt>
                <dd className="display mt-3 text-[clamp(3rem,6vw,5.5rem)]" style={{ color: i === 0 ? accent : undefined }}>
                  {h.value}
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      )}

      {signature && <div className="relative gutter mt-24 lg:mt-32">{signature}</div>}

      <div className="relative gutter mt-24 grid gap-14 lg:mt-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label text-ash">{pipelineLabel}</p>
          <p className="mt-4 max-w-[38ch] text-bone/75">{project.concept}</p>
          <p className="label mt-10 text-ash">Role</p>
          <p className="mt-2 text-bone">{project.role}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li key={t} className="label border px-3 py-1.5 text-bone/80" style={{ borderColor: `${accent}40` }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <Pipeline vertical steps={project.system} accent={accent} ariaLabel={`${project.title} system`} />
        </div>
      </div>

      <div className="relative mt-24 lg:mt-32">
        <ScreenGallery project={project} />
      </div>

      <div className="relative gutter mt-16 flex flex-col gap-10 border-t border-bone/10 pt-10 lg:flex-row lg:items-end lg:justify-between">
        {project.note && (
          <p className="max-w-[60ch] border-l pl-4 text-sm leading-relaxed text-ash" style={{ borderColor: accent }}>
            {project.note}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-6">
          <ProjectLinks project={project} />
          <Link
            href={`/projects/${project.slug}`}
            data-cursor="view"
            className="group label inline-flex min-h-12 items-center gap-3 border-b pb-2 text-bone"
            style={{ borderColor: accent }}
          >
            Full case study
            <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
