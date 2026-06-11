import { Mail, MapPin, Phone } from "lucide-react";

import type { SiteSettings } from "@/lib/content";
import { NAV_ITEMS, mailLink, telLink } from "@/lib/links";
import { InstagramIcon } from "@/components/ui/social-icons";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-xl font-extrabold uppercase tracking-tight">
            {settings.brandName.split(" ")[0]}{" "}
            <span className="text-coral">
              {settings.brandName.split(" ").slice(1).join(" ")}
            </span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-canvas/60">
            {settings.role}
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-canvas/40">
            Navegación
          </p>
          <ul className="space-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-canvas/75 transition-colors hover:text-coral"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-canvas/40">
            Contacto
          </p>
          <ul className="space-y-3 text-sm text-canvas/75">
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-coral" />
              <a href={telLink(settings.phone)} className="hover:text-coral">
                {settings.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-coral" />
              <a href={mailLink(settings.email)} className="hover:text-coral">
                {settings.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 text-coral" />
              <span>{settings.address}</span>
            </li>
            {settings.instagramUrl && (
              <li className="flex items-center gap-2.5">
                <InstagramIcon size={16} className="text-coral" />
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral"
                >
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-canvas/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 text-xs text-canvas/40 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {year} {settings.brandName}. Todos los derechos reservados.
          </p>
          <p>
            Nutrir el cuerpo y la mente · Un acto fundamental en nuestras vidas.
          </p>
        </div>
      </div>
    </footer>
  );
}