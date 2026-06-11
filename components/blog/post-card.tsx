import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import type { PostListItem } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { Reveal } from "@/components/ui/reveal";
import { SanityImage } from "@/components/ui/sanity-image";

export function PostCard({ post, index = 0 }: { post: PostListItem; index?: number }) {
  return (
    <Reveal delay={index % 3} as="li">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-coral/40 hover:shadow-[var(--shadow-card)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-coral-soft/40">
          {post.coverImage ? (
            <SanityImage
              source={post.coverImage}
              alt={post.title}
              width={720}
              height={450}
              sizes="(max-width: 768px) 100vw, 380px"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-5xl">
              🥗
            </div>
          )}
          {post.tags[0] && (
            <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-coral backdrop-blur">
              {post.tags[0]}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <span className="mb-2 inline-flex items-center gap-1.5 text-xs text-muted">
            <CalendarDays size={14} />
            {formatDate(post.publishedAt)}
          </span>
          <h3 className="font-display text-lg font-bold leading-snug text-ink">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
            {post.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-coral">
            Leer nota
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
