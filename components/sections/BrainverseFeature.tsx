import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getProject } from "@/data/projects";
import { AdaptiveLoop } from "@/components/visuals/AdaptiveLoop";
import { AdaptiveMemoryGame } from "@/components/visuals/AdaptiveMemoryGame";
import { FadeIn } from "@/components/ui/FadeIn";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** BrainVerse AI feature: adaptive loop diagram + a playable adaptive challenge. */
export function BrainverseFeature() {
  const project = getProject("brainverse-ai");
  if (!project) return null;
  const { accent, base, glow } = project.atmosphere;

  return (
    <section aria-labelledby="brainverse-heading" className="relative overflow-clip py-32 lg:py-44" style={{ background: base }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(50% 40% at 15% 30%, ${glow}55, transparent 70%)` }}
      />
      <div className="relative gutter">
        <SectionLabel index="06.3" title="Feature — Adaptive Play" />
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <RevealText
              id="brainverse-heading"
              lines={["BrainVerse", "AI"]}
              className="display text-[clamp(4rem,15vw,15rem)] text-bone"
            />
          </div>
          <FadeIn className="lg:col-span-4 lg:pb-3">
            <p className="display-wide text-2xl sm:text-3xl" style={{ color: accent }}>
              {project.statement}
            </p>
            <p className="mt-4 text-bone/75">{project.description}</p>
          </FadeIn>
        </div>

        <div className="mt-20 grid gap-14 lg:mt-28 lg:grid-cols-12 lg:items-center">
          <FadeIn className="lg:col-span-5">
            <p className="label text-ash">The adaptive loop</p>
            <div className="mx-auto mt-6 max-w-xl">
              <AdaptiveLoop steps={project.system.map((s) => s.label)} accent={accent} />
            </div>
          </FadeIn>
          <FadeIn className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <ol className="space-y-0">
              {project.system.map((s, i) => (
                <li key={s.label} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-bone/10 py-5">
                  <span className="label pt-1 text-ash">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="display-wide text-xl text-bone sm:text-2xl">{s.label}</h3>
                    <p className="mt-1 text-sm text-ash sm:text-base">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeIn>
        </div>

        <FadeIn className="mt-24 lg:mt-32">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <p className="display-wide text-2xl text-bone sm:text-3xl">Try the loop.</p>
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="view"
              className="group label inline-flex min-h-12 items-center gap-3 border-b pb-2 text-bone"
              style={{ borderColor: accent }}
            >
              Read the case study
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
            </Link>
          </div>
          <AdaptiveMemoryGame />
        </FadeIn>
      </div>
    </section>
  );
}
