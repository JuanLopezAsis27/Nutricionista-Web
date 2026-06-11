/** Formats an ISO date string as a Spanish (es-AR) long date. */
export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/** Rough reading-time estimate from plain text length. */
export function readingMinutes(words: number) {
  return Math.max(1, Math.round(words / 200));
}
