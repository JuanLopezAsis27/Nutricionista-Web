import "server-only";

import { client } from "@/sanity/lib/client";
import { sanityEnabled } from "@/sanity/env";
import {
  fallbackContent,
  fallbackPosts,
  type Credential,
  type Post,
  type PostListItem,
  type Service,
  type ServiceIcon,
  type SiteContent,
} from "./content";

// Pull every piece of content the landing page needs in a single round-trip.
const CONTENT_QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    brandName, role, logoWord, phone, email, address, address2, whatsapp, instagramUrl, bookingUrl
  },
  "home": *[_type == "homePage"][0]{
    heroEyebrow, heroTitle, heroHighlight, heroSubtitle, heroBullets, heroImage,
    aboutTitle, aboutHighlight, aboutBody, aboutImage, aboutStats,
    servicesTitle, servicesIntro, experienceTitle, experienceIntro, contactTitle, contactIntro
  },
  "services": *[_type == "service"] | order(order asc){ title, description, icon },
  "credentials": *[_type == "credential"] | order(order asc){ kind, title, institution, period, description }
}`;

type PortableChild = { text?: string };
type PortableBlock = { _type?: string; children?: PortableChild[] };

function blocksToParagraphs(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  return (blocks as PortableBlock[])
    .filter((b) => b?._type === "block")
    .map((b) => (b.children ?? []).map((c) => c.text ?? "").join(""))
    .filter((text) => text.trim().length > 0);
}

// Keep configured values, fall back to the example copy for anything empty.
function pick<T>(value: T | null | undefined, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!sanityEnabled) return fallbackContent;

  try {
    const data = await client.fetch<{
      settings: Record<string, unknown> | null;
      home: Record<string, unknown> | null;
      services: Service[] | null;
      credentials: Credential[] | null;
    }>(CONTENT_QUERY, {}, { next: { revalidate: 60 } });

    const fb = fallbackContent;
    const s = data.settings ?? {};
    const h = data.home ?? {};

    const aboutBody = blocksToParagraphs(h.aboutBody);

    return {
      settings: {
        brandName: pick(s.brandName as string, fb.settings.brandName),
        role: pick(s.role as string, fb.settings.role),
        logoWord: pick(s.logoWord as string, fb.settings.logoWord),
        phone: pick(s.phone as string, fb.settings.phone),
        email: pick(s.email as string, fb.settings.email),
        address: pick(s.address as string, fb.settings.address),
        address2: pick(s.address2 as string, fb.settings.address2),
        whatsapp: pick(s.whatsapp as string, fb.settings.whatsapp),
        instagramUrl: pick(s.instagramUrl as string, fb.settings.instagramUrl),
        bookingUrl: pick(s.bookingUrl as string, fb.settings.bookingUrl),
      },
      home: {
        heroEyebrow: pick(h.heroEyebrow as string, fb.home.heroEyebrow),
        heroTitle: pick(h.heroTitle as string, fb.home.heroTitle),
        heroHighlight: pick(h.heroHighlight as string, fb.home.heroHighlight),
        heroSubtitle: pick(h.heroSubtitle as string, fb.home.heroSubtitle),
        heroBullets: pick(h.heroBullets as string[], fb.home.heroBullets),
        heroImage: (h.heroImage as SiteContent["home"]["heroImage"]) ?? null,
        aboutTitle: pick(h.aboutTitle as string, fb.home.aboutTitle),
        aboutHighlight: pick(h.aboutHighlight as string, fb.home.aboutHighlight),
        aboutBody: pick(aboutBody, fb.home.aboutBody),
        aboutImage: (h.aboutImage as SiteContent["home"]["aboutImage"]) ?? null,
        aboutStats: pick(h.aboutStats as SiteContent["home"]["aboutStats"], fb.home.aboutStats),
        servicesTitle: pick(h.servicesTitle as string, fb.home.servicesTitle),
        servicesIntro: pick(h.servicesIntro as string, fb.home.servicesIntro),
        experienceTitle: pick(h.experienceTitle as string, fb.home.experienceTitle),
        experienceIntro: pick(h.experienceIntro as string, fb.home.experienceIntro),
        contactTitle: pick(h.contactTitle as string, fb.home.contactTitle),
        contactIntro: pick(h.contactIntro as string, fb.home.contactIntro),
      },
      services: pick(
        (data.services ?? []).map((sv) => ({
          title: sv.title,
          description: sv.description,
          icon: (sv.icon ?? "leaf") as ServiceIcon,
        })),
        fb.services,
      ),
      credentials: pick(data.credentials ?? [], fb.credentials),
    };
  } catch {
    // Network/config issues should never take the site down.
    return fallbackContent;
  }
}

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  title, "slug": slug.current, excerpt, coverImage, tags, publishedAt
}`;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title, "slug": slug.current, excerpt, coverImage, tags, publishedAt, body
}`;

function normalizeList(posts: PostListItem[] | null): PostListItem[] {
  return (posts ?? []).map((p) => ({
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? "",
    coverImage: p.coverImage ?? null,
    tags: p.tags ?? [],
    publishedAt: p.publishedAt,
  }));
}

export async function getPosts(): Promise<PostListItem[]> {
  if (!sanityEnabled) return fallbackPosts;
  try {
    const posts = await client.fetch<PostListItem[]>(
      POSTS_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
    const list = normalizeList(posts);
    return list.length > 0 ? list : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const fromFallback = fallbackPosts.find((p) => p.slug === slug) ?? null;
  if (!sanityEnabled) return fromFallback;
  try {
    const post = await client.fetch<Post | null>(
      POST_QUERY,
      { slug },
      { next: { revalidate: 60 } },
    );
    return post ?? fromFallback;
  } catch {
    return fromFallback;
  }
}