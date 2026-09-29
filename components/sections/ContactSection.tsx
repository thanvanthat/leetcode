import { ArrowUpRight } from "lucide-react";
import { getSocial, site } from "@/data/site";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function ContactSection() {
  const github = getSocial("GitHub");
  const linkedin = getSocial("LinkedIn");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="gutter relative overflow-clip bg-ink pb-24 pt-32 lg:pb-32 lg:pt-48"
    >
      <div
        aria-hidden="true"
        className="scan-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />
      <div className="relative">
        <SectionLabel index="09" title="Contact" />
        <RevealText
          id="contact-heading"
          lines={["Let's build", "something", "interactive."]}
          className="display mt-10 text-[clamp(3.75rem,14vw,15rem)] text-bone"
          stagger={0.1}
        />

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-[40ch] text-lg text-bone/75">
              Open to collaborations, internships and conversations about games, AI and interactive work.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group display-wide mt-8 inline-flex items-center gap-3 break-all text-[clamp(1.5rem,4vw,3rem)] text-bone"
              data-cursor="hover"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 group-hover:bg-[length:100%_1px]">
                {site.email}
              </span>
              <ArrowUpRight
                className="size-[0.8em] shrink-0 transition-transform duration-500 group-hover:rotate-45"
                aria-hidden="true"
              />
            </a>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-6 lg:justify-end">
            <MagneticButton href={`mailto:${site.email}`}>
              Start a conversation <span aria-hidden="true">→</span>
            </MagneticButton>
            {github && (
              <MagneticButton href={github.href} external variant="ghost">
                <BrandIcon name="GitHub" /> View GitHub
              </MagneticButton>
            )}
            {linkedin && (
              <MagneticButton href={linkedin.href} external variant="ghost">
                <BrandIcon name="LinkedIn" /> LinkedIn
              </MagneticButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
