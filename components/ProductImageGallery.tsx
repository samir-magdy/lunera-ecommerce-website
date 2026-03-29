"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: string[];
  title: string;
  category: string;
  inStock: boolean;
}

export default function ProductImageGallery({
  images,
  title,
  category,
  inStock,
}: ProductImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setCurrent(index);
  }, []);

  const scrollTo = useCallback((index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  }, []);

  return (
    <div className="relative aspect-square bg-leil-blush/30 overflow-hidden group">
      {/* CSS scroll-snap track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex h-full overflow-x-auto snap-x snap-mandatory gallery-track"
      >
        {images.map((src, i) => (
          <div key={i} className="relative w-full h-full flex-shrink-0 snap-start">
            <Image
              src={src}
              alt={`${title} — ${i + 1}`}
              fill
              className="object-cover"
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Desktop prev/next arrows — visible on hover */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => scrollTo(current - 1)}
            className={`absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-leil-cream/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${current === 0 ? "hidden" : ""}`}
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 text-leil-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo(current + 1)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-leil-cream/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${current === images.length - 1 ? "hidden" : ""}`}
            aria-label="Next image"
          >
            <svg className="w-4 h-4 text-leil-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Category pill */}
      <span className="absolute top-4 left-4 bg-leil-cream/90 backdrop-blur-sm font-body text-[0.6rem] tracking-[0.2em] uppercase text-leil-dark px-2.5 py-1">
        {category}
      </span>

      {/* Out of stock overlay */}
      {!inStock && (
        <div className="absolute inset-0 bg-leil-dark/50 flex items-center justify-center">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-leil-cream bg-leil-dark/80 px-6 py-3">
            Out of Stock
          </span>
        </div>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                i === current ? "bg-leil-dark" : "bg-leil-dark/25"
              }`}
              aria-label={`View image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
