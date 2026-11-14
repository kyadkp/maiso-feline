import Image from "next/image";
import { CatIcon } from "@/components/icons/CatIcon";
import { TONE_GRADIENTS, nextTone } from "@/lib/tone";
import type { Tone } from "@/lib/types";

export function CardMedia({
  tone,
  imageUrl,
  hoverImageUrl,
  alt = "",
}: {
  tone: Tone;
  imageUrl?: string | null;
  hoverImageUrl?: string | null;
  alt?: string;
}) {
  if (imageUrl) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden rounded-xs bg-surface">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className={`object-cover ${hoverImageUrl ? "transition-opacity duration-300 group-hover:opacity-0" : ""}`}
        />
        {hoverImageUrl && (
          <Image
            src={hoverImageUrl}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xs bg-surface">
      <div
        className="media-a absolute inset-0 flex items-center justify-center"
        style={{ background: TONE_GRADIENTS[tone] }}
      >
        <CatIcon className="h-[30%] w-[30%] text-foreground/20" />
      </div>
      <div
        className="media-b absolute inset-0 flex items-center justify-center"
        style={{ background: TONE_GRADIENTS[nextTone(tone)] }}
      >
        <CatIcon className="h-[30%] w-[30%] text-foreground/20" />
      </div>
    </div>
  );
}

export function GalleryMedia({
  tone,
  className = "",
  imageUrl,
  alt = "",
}: {
  tone: Tone;
  className?: string;
  imageUrl?: string | null;
  alt?: string;
}) {
  if (imageUrl) {
    return (
      <div className={`relative overflow-hidden rounded-xs ${className}`}>
        <Image src={imageUrl} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-xs ${className}`}
      style={{ background: TONE_GRADIENTS[tone] }}
    >
      <CatIcon className="h-[24%] w-[24%] text-foreground/20" />
    </div>
  );
}
