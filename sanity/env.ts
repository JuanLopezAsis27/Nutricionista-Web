export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * Whether a real Sanity project is configured. When false the site renders
 * with the built-in fallback content (see lib/content.ts) so the landing page
 * works out of the box, before the CMS is connected.
 */
export const sanityEnabled = projectId.length > 0;