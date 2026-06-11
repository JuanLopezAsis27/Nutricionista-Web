import { Clock, Mail, MapPin, Phone } from "lucide-react";

import type { SiteContent } from "@/lib/content";
import { mailLink, telLink } from "@/lib/links";
import { InstagramIcon } from "@/components/ui/social-icons";
import { Reveal } from "@/components/ui/reveal";
import { CoralBlob, DottedGrid } from "@/components/ui/decorations";
import { ContactForm } from "./contact-form";

export function Contact({
  home,
  settings,
}: {
  home: SiteContent["home"];
  settings: SiteContent["settings"];
}) {
  const details = [
    {
      icon: Phone,
      label: "Teléfono",
      value: settings.phone,
      href: telLink(settings.phone),
    },
    {
      icon: Mail,
      label: "Email",
      value: settings.email,
      href: mailLink(settings.email),
    },
    {
      icon: MapPin,
      label: "Consultorio",
      value: settings.address,
    },
    ...(settings.instagramUrl
      ? [
          {
            icon: InstagramIcon,
            label: "Instagram",
            value: "Seguime",
            href: settings.instagramUrl,
          },
        ]
      : []),
  ];

  return (
    <section
      id="contacto"
      className="relative scroll-mt-24 overflow-hidden bg-surface py-20 md:py-28"
    >
      <CoralBlob
        soft
        className="absolute -left-20 bottom-0 h-64 w-64 opacity-60 blur-[2px]"
      />
      <DottedGrid className="absolute bottom-12 right-10 hidden opacity-60 lg:grid" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Info */}
          <div>
            <Reveal>
              <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
                <span className="h-px w-6 bg-coral" />
                Contacto
              </span>
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
                {home.contactTitle}{" "}
                <span className="text-coral">a cuidarte</span>
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                {home.contactIntro}
              </p>
            </Reveal>

            <Reveal delay={1}>
              <ul className="mt-9 space-y-4">
                {details.map((d) => {
                  const Icon = d.icon;
                  const content = (
                    <span className="flex items-center gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-coral-soft text-coral">
                        <Icon size={20} />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wide text-muted">
                          {d.label}
                        </span>
                        <span className="block text-sm font-medium text-ink">
                          {d.value}
                        </span>
                      </span>
                    </span>
                  );
                  return (
                    <li key={d.label}>
                      {d.href ? (
                        <a
                          href={d.href}
                          target={d.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="transition-opacity hover:opacity-80"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={2}>
              <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-canvas px-4 py-2 text-sm text-ink-soft">
                <Clock size={16} className="text-coral" />
                Lunes a viernes · 9 a 19 h · Presencial y online
              </p>
            </Reveal>
          </div>

          {/* Form card */}
          <Reveal delay={1}>
            <div className="rounded-[2rem] border border-line bg-canvas p-7 shadow-[var(--shadow-card)] sm:p-9">
              <h3 className="font-display text-xl font-bold text-ink">
                Escribime
              </h3>
              <p className="mb-6 mt-1 text-sm text-ink-soft">
                Completá tus datos y empecemos a trabajar juntos.
              </p>
              <ContactForm whatsapp={settings.whatsapp} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}