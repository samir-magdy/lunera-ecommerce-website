"use client";

// For Re-deploy

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CYCLING_WORDS = ["Style", "Grace", "Story", "Presence"];
const CATEGORIES = [
  "Dresses",
  "Abayas",
  "Tops",
  "Bottoms",
  "Accessories",
  "Outerwear",
  "New In",
  "Sale",
];

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
    alt: "Fashion lookbook",
    style: {
      transform: "rotate(-3deg)",
      bottom: "2rem",
      left: "-2rem",
    } as React.CSSProperties,
    size: { w: 250, h: 340 },
    pos: "absolute",
    zIndex: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
    alt: "Editorial fashion",
    style: {
      transform: "rotate(2deg)",
      marginTop: "-24px",
    } as React.CSSProperties,
    size: { w: 230, h: 350 },
    pos: "relative",
    zIndex: 10,
    label: "New Arrivals",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
    alt: "Style portrait",
    style: {
      transform: "rotate(-1.5deg)",
      top: "2rem",
      right: "-2rem",
    } as React.CSSProperties,
    size: { w: 235, h: 310 },
    pos: "absolute",
    zIndex: 1,
  },
];

// Repeat enough times so one track always exceeds the widest viewport
const TRACK_ITEMS = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

function MarqueeTrack() {
  return (
    <div className="flex shrink-0">
      {TRACK_ITEMS.map((cat, i) => (
        <div
          key={i}
          className="mx-5 font-body text-[0.65rem] tracking-[0.28em] uppercase text-leil-dark/60 hover:text-leil-rose transition-colors duration-200 flex items-center gap-5 whitespace-nowrap"
        >
          {cat}
          <span className="text-[#ba9987b0] text-[0.5rem]">✦</span>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  const handleShopDresses = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/?category=Dresses#collection");
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleShopCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/?category=All#collection");
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[calc(100dvh-4rem-env(safe-area-inset-bottom,0px))] bg-leil-cream overflow-hidden flex flex-col">
      {/* Grain texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.025] pointer-events-none" />

      {/* Ambient glow — desktop only */}
      <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-leil-blush/25 blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-leil-rose/5 blur-3xl pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-end lg:items-center px-6 sm:px-12 lg:px-20 pt-8 lg:pt-0 pb-4 md:pb-0">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 pb-10 lg:py-0">
          {/* Left — Editorial text */}
          <div className="flex flex-col justify-center">
            <h1 className="font-body text-[0.6rem] sm:text-xs tracking-[0.12em] sm:tracking-[0.2em] uppercase text-leil-rose mb-8 block">
              Fashion E-Commerce Website Design in Egypt
            </h1>
            
            <h2 className="font-display font-light leading-[0.92] text-leil-dark mb-8 text-balance">
              <span className="block text-[clamp(3.2rem,7.5vw,6.5rem)]">
                Discover
              </span>
              <span className="block text-[clamp(3.2rem,7.5vw,6.5rem)]">
                Your{" "}
                <span
                  className="italic text-leil-rose inline-block"
                  style={{
                    opacity: wordVisible ? 1 : 0,
                    transform: wordVisible
                      ? "translateY(0)"
                      : "translateY(10px)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                  }}
                >
                  {CYCLING_WORDS[wordIndex]}
                </span>
              </span>
            </h2>

            <p className="font-body text-leil-dark/55 text-base lg:text-lg max-w-md leading-relaxed mb-10">
              Curated fashion for the modern Egyptian woman
              <span className="block">From everyday elegance to statement pieces.</span>
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                onClick={handleShopCTA}
                href="/?category=All#collection"
                className="font-body font-medium text-xs tracking-[0.14em] uppercase bg-leil-dark text-leil-cream px-8 py-4 hover:bg-leil-rose transition-colors duration-300"
              >
                Shop Collection
              </a>
              <a
                href="/?category=Dresses#collection"
                onClick={handleShopDresses}
                className="font-body font-medium text-xs tracking-[0.14em] uppercase border border-leil-dark text-leil-dark px-8 py-3.5 hover:bg-leil-dark hover:text-leil-cream transition-colors duration-300"
              >
                Shop Dresses
              </a>
            </div>

            <div className="flex gap-6 mt-12 font-body text-[0.65rem] text-leil-dark/35 tracking-[0.2em] uppercase">
              <span>Free Delivery</span>
              <span className="text-leil-blush">·</span>
              <span>Easy Returns</span>
              <span className="text-leil-blush">·</span>
              <span>Cash on Delivery</span>
            </div>
          </div>

          {/* Right — Floating editorial collage */}
          <div className="relative hidden lg:flex items-center justify-center h-[520px]">
            {/* Image 1 — bottom left */}
            <div
              className="absolute overflow-hidden shadow-xl"
              style={{
                ...HERO_IMAGES[0].style,
                width: HERO_IMAGES[0].size.w,
                height: HERO_IMAGES[0].size.h,
                zIndex: HERO_IMAGES[0].zIndex,
              }}
            >
              <Image
                src={HERO_IMAGES[0].src}
                alt={HERO_IMAGES[0].alt}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Image 2 — center, front */}
            <div
              className="relative overflow-hidden shadow-2xl"
              style={{
                ...HERO_IMAGES[1].style,
                width: HERO_IMAGES[1].size.w,
                height: HERO_IMAGES[1].size.h,
                zIndex: HERO_IMAGES[1].zIndex,
              }}
            >
              <Image
                src={HERO_IMAGES[1].src}
                alt={HERO_IMAGES[1].alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-3 left-3 right-3 bg-leil-cream/95 px-3 py-2">
                <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-leil-dark">
                  New Arrivals
                </p>
              </div>
            </div>

            {/* Image 3 — top right */}
            <div
              className="absolute overflow-hidden shadow-lg"
              style={{
                ...HERO_IMAGES[2].style,
                width: HERO_IMAGES[2].size.w,
                height: HERO_IMAGES[2].size.h,
                zIndex: HERO_IMAGES[2].zIndex,
              }}
            >
              <Image
                src={HERO_IMAGES[2].src}
                alt={HERO_IMAGES[2].alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom category marquee ── */}
      <div className="relative z-10 border-t border-leil-dark/20 pt-3.5 overflow-hidden bg-leil-cream/60 backdrop-blur-sm pb-16">
        <div className="flex w-max animate-marquee-fast md:animate-marquee will-change-transform">
          <MarqueeTrack />
          <MarqueeTrack />
        </div>
      </div>
    </section>
  );
}
