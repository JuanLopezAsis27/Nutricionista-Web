import { Briefcase, GraduationCap } from "lucide-react";

import type { Credential, SiteContent } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

function Timeline({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: Credential[];
}) {
  return (
    <div>
      <div className="mb-7 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-coral text-white">
          {icon}
        </span>
        <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      </div>

      <ol className="relative space-y-7 border-l border-line pl-7">
        {items.map((item, i) => (
          <Reveal key={`${item.title}-${i}`} delay={i} as="li" className="relative block">
            <span className="absolute -left-[33px] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-coral bg-canvas" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h4 className="font-semibold text-ink">{item.title}</h4>
              {item.period && (
                <span className="text-xs font-medium uppercase tracking-wide text-coral">
                  {item.period}
                </span>
              )}
            </div>
            {item.institution && (
              <p className="mt-0.5 text-sm font-medium text-ink-soft">
                {item.institution}
              </p>
            )}
            {item.description && (
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            )}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function Experience({
  home,
  credentials,
}: {
  home: SiteContent["home"];
  credentials: SiteContent["credentials"];
}) {
  const education = credentials.filter((c) => c.kind === "education");
  const experience = credentials.filter((c) => c.kind === "experience");

  return (
    <section id="experiencia" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Trayectoria"
          title={home.experienceTitle}
          highlight="experiencia"
          intro={home.experienceIntro}
        />

        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
          {education.length > 0 && (
            <Timeline
              title="Formación"
              icon={<GraduationCap size={20} />}
              items={education}
            />
          )}
          {experience.length > 0 && (
            <Timeline
              title="Experiencia"
              icon={<Briefcase size={20} />}
              items={experience}
            />
          )}
        </div>
      </div>
    </section>
  );
}