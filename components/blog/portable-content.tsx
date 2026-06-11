import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { urlForImage } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-ink-soft">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-display text-2xl font-bold text-ink">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-display text-xl font-semibold text-ink">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-coral bg-coral-soft/40 px-5 py-3 text-base italic text-ink">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-5 list-disc space-y-2 text-ink-soft">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-ink-soft">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-coral underline underline-offset-2 hover:text-coral-dark"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1200).fit("max").url();
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={1200}
            height={800}
            sizes="(max-width: 768px) 100vw, 720px"
            className="w-full rounded-2xl"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableContent({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
