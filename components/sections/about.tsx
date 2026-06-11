import { UserRound } from "lucide-react";

import type { SiteContent } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SanityImage } from "@/components/ui/sanity-image";
import { ConcentricCircles, CoralBlob } from "@/components/ui/decorations";

export function About({
  home,
  settings,
}: {
  home: SiteContent["home"];
  settings: SiteContent["settings"];
}) {
  return (
    <section id="sobre-mi" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Portrait */}
        <Reveal className="relative">
          <ConcentricCircles className="absolute -bottom-8 -left-8 h-28 w-28" />
          <CoralBlob className="absolute -right-5 -top-5 h-24 w-24 animate-float" />
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-surface shadow-[var(--shadow-soft)]">
            {home.aboutImage ? (
              <SanityImage
                source={home.aboutImage}
                alt={settings.brandName}
                width={620}
                height={775}
                sizes="(max-width: 1024px) 90vw, 440px"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-coral-soft/50 to-surface text-coral">
                <UserRound size={88} strokeWidth={1.2} />
              </div>
            )}
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal>
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              <span className="h-px w-6 bg-coral" />
              Quién soy
            </span>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {home.aboutTitle}{" "}
              <span className="text-coral">{home.aboutHighlight}</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
            {home.aboutBody.map((para, i) => (
              <Reveal key={i} delay={i}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2}>
            <dl className="mt-9 grid grid-cols-3 gap-4 border-t border-line pt-7">
              {home.aboutStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-tight text-muted">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}