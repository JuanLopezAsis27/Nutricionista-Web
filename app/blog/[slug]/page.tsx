import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { getPost, getPosts } from "@/lib/queries";
import { formatDate } from "@/lib/format";
import { bookingTarget } from "@/lib/links";
import { getSiteContent } from "@/lib/queries";
import { SanityImage } from "@/components/ui/sanity-image";
import { PortableContent } from "@/components/blog/portable-content";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Nota no encontrada" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const [post, { settings }] = await Promise.all([
    getPost(slug),
    getSiteContent(),
  ]);

  if (!post) notFound();

  return (
    <article className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-coral"
        >
          <ArrowLeft size={16} />
          Volver al blog
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-muted">
              <CalendarDays size={14} />
              {formatDate(post.publishedAt)}
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-coral-soft px-3 py-1 font-semibold text-coral"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.coverImage && (
          <div className="mt-8 overflow-hidden rounded-3xl">
            <SanityImage
              source={post.coverImage}
              alt={post.title}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="mt-10">
          <PortableContent value={post.body} />
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-3xl bg-ink px-7 py-9 text-center">
          <h2 className="font-display text-2xl font-bold text-canvas">
            ¿Querés llevarlo a tu caso particular?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-canvas/70">
            Reservá una consulta y armamos juntos un plan a tu medida.
          </p>
          <a
            href={bookingTarget(settings)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-coral px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-coral-dark"
          >
            Reservar una consulta
          </a>
        </div>
      </div>
    </article>
  );
}
