import { ArrowRight, Sparkles } from "lucide-react";

import type { SiteContent } from "@/lib/content";
import { bookingTarget } from "@/lib/links";
import { Reveal } from "@/components/ui/reveal";
import { SanityImage } from "@/components/ui/sanity-image";
import {
  ArrowDownBadge,
  CoralBlob,
  DottedGrid,
} from "@/components/ui/decorations";

export function Hero({
  home,
  settings,
}: {
  home: SiteContent["home"];
  settings: SiteContent["settings"];
}) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Background decorations */}
      <DottedGrid className="absolute left-6 top-28 hidden opacity-70 lg:grid" />
      <CoralBlob
        soft
        className="absolute -right-24 top-10 h-72 w-72 opacity-60 blur-[2px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="relative z-10">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
              <Sparkles size={14} className="text-coral" />
              {home.heroEyebrow}
            </span>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              {home.heroTitle}{" "}
              <span className="text-coral">{home.heroHighlight}</span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {home.heroSubtitle}
            </p>
          </Reveal>

          <Reveal delay={3}>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
              {home.heroBullets.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-2 text-sm font-medium text-ink"
                >
                  <span className="h-2 w-2 rounded-full bg-coral" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={bookingTarget(settings)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(240,82,77,0.95)] transition-transform hover:-translate-y-0.5 hover:bg-coral-dark"
              >
                Reservar una consulta
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-coral hover:text-coral"
              >
                Conocé más
              </a>
            </div>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={2} className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <CoralBlob className="absolute right-2 top-2 h-40 w-40 animate-float-slow" />
            <div className="absolute inset-4 grid place-items-center overflow-hidden rounded-full bg-surface shadow-[var(--shadow-soft)]">
              {home.heroImage ? (
                <SanityImage
                  source={home.heroImage}
                  alt={settings.brandName}
                  width={520}
                  height={520}
                  priority
                  sizes="(max-width: 768px) 80vw, 420px"
                  className="h-full w-full object-cover"
                />
              ) : (
                <HeroPlaceholder />
              )}
            </div>

            {/* Floating stat badge */}
            {/* <div className="absolute -left-2 bottom-10 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-card)]">
              <span className="font-display text-2xl font-extrabold text-coral">
                {home.aboutStats[0]?.value ?? "+10"}
              </span>
              <span className="max-w-[7rem] text-xs leading-tight text-ink-soft">
                {home.aboutStats[0]?.label ?? "años de experiencia"}
              </span>
            </div> */}

            <ArrowDownBadge className="animate-float absolute -bottom-3 right-12 h-12 w-12" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Graphic stand-in shown until a real hero photo is uploaded in Sanity. */
function HeroPlaceholder() {
  const items = ["🥦", "🍎", "🥕", "🥝", "🥑", "🍊"];
  return (
    <div className="relative grid h-full w-full place-items-center bg-gradient-to-br from-coral-soft/60 to-surface">
      <div className="grid grid-cols-3 gap-5 text-4xl">
        {items.map((emoji, i) => (
          <span
            key={i}
            className="grid h-16 w-16 place-items-center rounded-2xl bg-surface/80 shadow-sm"
            style={{ animation: `float ${6 + i}s ease-in-out infinite` }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
}
