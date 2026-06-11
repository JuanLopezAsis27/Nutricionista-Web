import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/lib/links";

/** Floating WhatsApp action button, bottom-right. */
export function WhatsAppFab({ whatsapp }: { whatsapp: string }) {
  if (!whatsapp) return null;
  return (
    <a
      href={whatsappLink(
        whatsapp,
        "¡Hola! Quisiera consultar sobre los servicios de nutrición.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-coral text-white shadow-[0_18px_40px_-12px_rgba(240,82,77,0.9)] transition-transform hover:-translate-y-1 hover:bg-coral-dark"
    >
      <MessageCircle size={26} />
    </a>
  );
}