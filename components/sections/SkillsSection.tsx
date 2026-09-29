import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechStack } from "./TechStack";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="gutter relative overflow-x-clip bg-ink py-32 lg:py-44">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <SectionLabel index="07" title="Skills & Stack" />
          <RevealText
            id="skills-heading"
            lines={["An ecosystem,", "not a checklist."]}
            className="display mt-8 text-[clamp(3rem,9vw,9rem)] text-bone"
          />
        </div>
        <p className="max-w-[38ch] text-ash lg:col-span-4">
          The tools I use across games, AI and the web — chosen because the projects needed them, and still growing.
        </p>
      </div>
      <div className="mt-20 lg:mt-28">
        <TechStack />
      </div>
    </section>
  );
}
