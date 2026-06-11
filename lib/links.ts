import type { SiteSettings } from "./content";

export const NAV_ITEMS = [
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#experiencia", label: "Experiencia" },
  { href: "/blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];

export function whatsappLink(whatsapp: string, message?: string) {
  const digits = whatsapp.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}

export function telLink(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mailLink(email: string) {
  return `mailto:${email}`;
}

/** Primary CTA target: booking link if set, otherwise WhatsApp. */
export function bookingTarget(settings: SiteSettings) {
  if (settings.bookingUrl) return settings.bookingUrl;
  return whatsappLink(
    settings.whatsapp,
    "¡Hola! Quisiera reservar una consulta de nutrición.",
  );
}