import { Reveal } from "./reveal";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  intro,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  intro?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
          <span className="h-px w-6 bg-coral" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl",
          invert ? "text-canvas" : "text-ink",
        )}
      >
        {title} {highlight && <span className="text-coral">{highlight}</span>}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            invert ? "text-canvas/70" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}