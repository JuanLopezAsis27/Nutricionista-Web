import type { Metadata } from "next";

import { getPosts } from "@/lib/queries";
import { Reveal } from "@/components/ui/reveal";
import { PostCard } from "@/components/blog/post-card";
import { DottedGrid } from "@/components/ui/decorations";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notas sobre nutrición, hábitos saludables y bienestar escritas por el Lic. Nicolás López Asís.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <DottedGrid className="absolute right-8 top-16 hidden opacity-60 md:grid" />

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            <span className="h-px w-6 bg-coral" />
            Blog
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
            Notas para <span className="text-coral">nutrir</span> tu día a día
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            Consejos prácticos, evidencia y reflexiones sobre alimentación y
            bienestar, en un lenguaje claro y sin vueltas.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-16 text-ink-soft">
            Todavía no hay notas publicadas. ¡Pronto habrá novedades!
          </p>
        ) : (
          <ul className="mt-14 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
