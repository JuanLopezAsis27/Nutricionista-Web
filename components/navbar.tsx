"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import type { SiteSettings } from "@/lib/content";
import { NAV_ITEMS, bookingTarget } from "@/lib/links";
import { cn } from "@/lib/cn";

export function Navbar({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const firstName = settings.brandName.split(" ")[0] ?? settings.brandName;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-canvas/85 shadow-[0_8px_30px_-20px_rgba(43,43,43,0.4)] backdrop-blur"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#inicio"
          className="font-display text-lg font-extrabold uppercase tracking-tight text-ink"
        >
          {firstName} <span className="text-coral">·</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-coral"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={bookingTarget(settings)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(240,82,77,0.9)] transition-transform hover:-translate-y-0.5 hover:bg-coral-dark md:inline-block"
        >
          Reservar turno
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full text-ink md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-canvas px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-ink-soft"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={bookingTarget(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-full bg-coral px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Reservar turno
          </a>
        </div>
      )}
    </header>
  );
}