import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";

import { urlForImage } from "@/sanity/lib/image";

/** Renders a Sanity image with next/image. Returns null when no source. */
export function SanityImage({
  source,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
}: {
  source: SanityImageSource | null | undefined;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!source) return null;
  const url = urlForImage(source).width(width).height(height).url();
  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}