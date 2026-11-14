"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProductImage } from "@/lib/types";

export function ProductLightbox({
  images,
  initialIndex,
  alt,
  onClose,
}: {
  images: ProductImage[];
  initialIndex: number;
  alt: string;
  onClose: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: initialIndex * track.clientWidth, behavior: "auto" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function goTo(i: number) {
    const track = trackRef.current;
    if (!track || i < 0 || i >= images.length) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/97 backdrop-blur-sm">
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-background text-lg"
      >
        ×
      </button>

      <span className="absolute left-1/2 top-4 z-10 -translate-x-1/2 text-xs tracking-wider text-foreground-muted">
        {index + 1} / {images.length}
      </span>

      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Photo précédente"
            disabled={index === 0}
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background text-lg disabled:opacity-30 sm:left-5"
          >
            ‹
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Photo suivante"
            disabled={index === images.length - 1}
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background text-lg disabled:opacity-30 sm:right-5"
          >
            ›
          </button>
        </>
      )}

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-contain"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img) => (
          <div key={img.id} className="relative h-full w-full shrink-0 snap-start">
            <Image src={img.url} alt={alt} fill sizes="100vw" className="object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}
