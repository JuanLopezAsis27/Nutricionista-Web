import { cn } from "@/lib/cn";

/** 5×5 grid of small dots — the motif from the top-left of the brand pieces. */
export function DottedGrid({
  className,
  rows = 5,
  cols = 5,
}: {
  className?: string;
  rows?: number;
  cols?: number;
}) {
  const dots = Array.from({ length: rows * cols });
  return (
    <div
      aria-hidden
      className={cn("grid w-fit gap-3", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {dots.map((_, i) => (
        <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/25" />
      ))}
    </div>
  );
}

/** Concentric outline circles — bottom-left motif. */
export function ConcentricCircles({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 120"
      className={cn("text-ink/20", className)}
      fill="none"
    >
      {[58, 44, 30].map((r) => (
        <circle
          key={r}
          cx="60"
          cy="60"
          r={r}
          stroke="currentColor"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

/** Solid coral blob used as a background accent. */
export function CoralBlob({
  className,
  soft = false,
}: {
  className?: string;
  soft?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "rounded-full",
        soft ? "bg-coral-soft" : "bg-coral",
        className,
      )}
    />
  );
}

/** Downward arrow inside a coral ring — the "scroll" cue from the brand. */
export function ArrowDownBadge({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      className={cn("text-coral", className)}
      fill="none"
    >
      <path
        d="M16 24c0 8.837 7.163 16 16 16s16-7.163 16-16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M32 22v16m0 0l-7-7m7 7l7-7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}