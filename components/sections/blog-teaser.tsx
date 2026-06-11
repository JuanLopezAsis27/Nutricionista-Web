import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { PostListItem } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { PostCard } from "@/components/blog/post-card";

export function BlogTeaser({ posts }: { posts: PostListItem[] }) {
  if (posts.length === 0) return null;
  const latest = posts.slice(0, 3);

  return (
    <section id="blog" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Blog"
            title="Últimas"
            highlight="notas"
            intro="Contenido para cuidarte mejor, basado en evidencia."
          />
          <Reveal>
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-coral hover:text-coral"
            >
              Ver todas
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
