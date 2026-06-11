import { ArrowUpRight } from "lucide-react";

import type { SiteContent } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/ui/service-icon";
import { DottedGrid } from "@/components/ui/decorations";

export function Services({ home, services }: {
  home: SiteContent["home"];
  services: SiteContent["services"];
}) {
  return (
    <section
      id="servicios"
      className="relative scroll-mt-24 overflow-hidden bg-surface py-20 md:py-28"
    >
      <DottedGrid className="absolute right-8 top-12 hidden opacity-60 md:grid" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Servicios"
          title={home.servicesTitle}
          highlight="acompañarte"
          intro={home.servicesIntro}
        />

        <ul className="mt-14 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i % 3} as="li">
              <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-canvas p-7 transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-[var(--shadow-card)]">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-coral-soft text-coral transition-colors group-hover:bg-coral group-hover:text-white">
                  <ServiceIcon name={service.icon} className="h-7 w-7" />
                </div>
                <h3 className="font-display text-lg font-bold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {service.description}
                </p>
                <ArrowUpRight
                  className="absolute right-6 top-6 h-5 w-5 text-line transition-colors group-hover:text-coral"
                  aria-hidden
                />
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}