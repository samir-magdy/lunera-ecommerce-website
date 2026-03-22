"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
      left: "1rem",
    } as React.CSSProperties,
    size: { w: 200, h: 290 },
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
    size: { w: 200, h: 300 },
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
      right: "1rem",
    } as React.CSSProperties,
    size: { w: 185, h: 260 },
    pos: "absolute",
    zIndex: 1,
  },
];

// Duplicate for seamless marquee loop
const MARQUEE_ITEMS = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

export default function HeroSection() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  const handleShopAbayas = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/?category=Dresses");
    // Scroll after client-side navigation settles (avoids full-page-reload timing race)
    setTimeout(() => {
      document.getElementById("collection")?.scrollIntoView();
    }, 250);
  };

  const handleShopCTA = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push("/?category=All");
    // Scroll after client-side navigation settles (avoids full-page-reload timing race)
    setTimeout(() => {
      document.getElementById("collection")?.scrollIntoView();
    }, 250);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(timer);
  }, []);


  return (
    <section className="relative min-h-[calc(100dvh-4rem)] bg-leil-cream overflow-hidden flex flex-col">
      {/* Grain texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.025] pointer-events-none" />

      {/* Mobile — full bleed background image */}
      {/* <div className="absolute inset-0 lg:hidden">
        <Image
          src={HERO_IMAGES[2].src}
          alt={HERO_IMAGES[2].alt}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div> */}

      {/* Mobile — cream gradient overlay (bottom → transparent) */}
      <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-leil-cream via-leil-cream/85 to-transparent" />

      {/* Ambient glow — desktop only */}
      <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] rounded-full bg-leil-blush/25 blur-3xl pointer-events-none" />
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-leil-rose/5 blur-3xl pointer-events-none" />

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex items-end lg:items-center px-6 sm:px-12 lg:px-20 pb-4 md:pb-000">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 pb-10 lg:py-0">
          {/* Left — Editorial text */}
          <div className="flex flex-col justify-center">
            <span className="font-body text-[0.7rem] tracking-[0.35em] uppercase text-leil-rose mb-8 block">
              New Collection — 2026
            </span>

            <h1 className="font-display font-light leading-[0.92] text-leil-dark mb-8 text-balance">
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
            </h1>

            <p className="font-body text-leil-dark/55 text-base lg:text-lg max-w-md leading-relaxed mb-10">
              Curated fashion for the modern Egyptian woman — from everyday
              elegance to statement pieces.
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
                href="/?category=Abayas#collection"
                onClick={handleShopAbayas}
                className="font-body font-medium text-xs tracking-[0.14em] uppercase border border-leil-dark text-leil-dark px-8 py-4 hover:bg-leil-dark hover:text-leil-cream transition-colors duration-300"
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
              />
            </div>

            {/* Decorative price badge */}
            <div
              className="absolute bottom-16 right-2 bg-leil-rose text-leil-cream font-body text-[0.65rem] tracking-[0.15em] uppercase px-4 py-2 shadow-md z-20"
              style={{ transform: "rotate(3deg)" }}
            >
              From EGP 299
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom category marquee ── */}
      <div className="relative z-10 border-t border-leil-dark/8 py-3.5 overflow-hidden bg-leil-cream/60 backdrop-blur-sm">
        <div className="flex animate-marquee-fast md:animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((cat, i) => (
            <div
              key={i}
              className="mx-5 font-body text-[0.65rem] tracking-[0.28em] uppercase text-leil-dark/35 hover:text-leil-rose transition-colors duration-200 flex items-center gap-5"
            >
              {cat}
              <span className="text-leil-blush text-[0.5rem]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
