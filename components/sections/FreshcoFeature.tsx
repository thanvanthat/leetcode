import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getProject } from "@/data/projects";
import { FadeIn } from "@/components/ui/FadeIn";
import { Pipeline } from "@/components/ui/Pipeline";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FreshScanner } from "@/components/visuals/FreshScanner";

/** FreshcoAI feature: the project's own green-black atmosphere, scanner demo and CV pipeline. */
export function FreshcoFeature() {
  const project = getProject("freshco-ai");
  if (!project) return null;
  const { accent, base } = project.atmosphere;

  return (
    <section aria-labelledby="freshco-heading" className="relative overflow-clip py-32 lg:py-44" style={{ background: base }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: `radial-gradient(60% 50% at 80% 20%, ${project.atmosphere.glow}66, transparent 70%)` }}
      />
      <div className="relative gutter">
        <SectionLabel index="06.1" title="Feature — Computer Vision" />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealText
              id="freshco-heading"
              lines={[project.title]}
              className="display text-[clamp(4rem,15vw,15rem)] text-bone"
            />
            <p className="display-wide mt-4 text-2xl sm:text-3xl" style={{ color: accent }}>
              {project.statement}
            </p>
          </div>
          <FadeIn className="lg:col-span-4 lg:pb-3">
            <p className="text-bone/80">{project.description}</p>
          </FadeIn>
        </div>

        <FadeIn className="mt-16 lg:mt-24">
          <FreshScanner />
        </FadeIn>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label text-ash">Vision pipeline</p>
            <p className="mt-4 max-w-[36ch] text-bone/70">From a single camera frame to an inventory decision, in six steps.</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t} className="label border px-3 py-1.5 text-bone/80" style={{ borderColor: `${accent}40` }}>
                  {t}
                </li>
              ))}
            </ul>
            {project.note && (
              <p className="mt-10 border-l pl-4 text-sm leading-relaxed text-ash" style={{ borderColor: accent }}>
                {project.note}
              </p>
            )}
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="view"
              className="group label mt-10 inline-flex min-h-12 items-center gap-3 border-b pb-2 text-bone"
              style={{ borderColor: accent }}
            >
              Read the case study
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Pipeline vertical steps={project.system} accent={accent} ariaLabel="FreshcoAI vision pipeline" />
          </div>
        </div>
      </div>
    </section>
  );
}
