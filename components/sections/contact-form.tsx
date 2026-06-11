"use client";

import { useState } from "react";
import { Send } from "lucide-react";

import { whatsappLink } from "@/lib/links";

export function ContactForm({ whatsapp }: { whatsapp: string }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `¡Hola! Soy ${name || "una persona interesada"}. ${
      message || "Me gustaría reservar una consulta de nutrición."
    }`;
    window.open(whatsappLink(whatsapp, text), "_blank", "noopener,noreferrer");
  };

  const field =
    "w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-coral";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
          Tu nombre
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cómo te llamás"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Contame en qué puedo ayudarte…"
          className={`${field} resize-none`}
        />
      </div>
      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_-16px_rgba(240,82,77,0.95)] transition-transform hover:-translate-y-0.5 hover:bg-coral-dark"
      >
        Enviar por WhatsApp
        <Send size={17} className="transition-transform group-hover:translate-x-1" />
      </button>
      <p className="text-center text-xs text-muted">
        Se abrirá WhatsApp con tu mensaje listo para enviar.
      </p>
    </form>
  );
}