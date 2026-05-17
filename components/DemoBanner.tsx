"use client";

  import { useSearchParams } from "next/navigation";
  import { Suspense } from "react";

  function BannerContent() {
    const searchParams = useSearchParams();
    const isInternal = searchParams.get("ref") === "smws";
    const isArabic = searchParams.get("lang") === "ar";

    if (!isInternal) {
      return (
        <div className="demo-banner">
          <span className="banner-brand">
            Web Design by{" "}
            <a
              href="https://smwebdesign.studio/en"
              target="_blank"
              rel="noopener"
              className="shimmer ms-2 font-medium shadow-lg py-1.5 px-3 rounded-md bg-gradient-to-b from-[#f3c25c] to-[#b78f47] text-gray-900 tracking-normal"
            >
              SM Web Design Studio
            </a>
          </span>
        </div>
      );
    }

    return (
      <div className="demo-banner">
        <button
          className="banner-back"
          onClick={() => window.close()}
          aria-label="Back to SM Web Design Studio portfolio"
        >
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
            <path d="M12 6H2M6 1L2 6L6 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
          {isArabic ? " ةدوعلا" : " Back"}
        </button>

        <a
          className="banner-cta"
          href={`https://smwebdesign.studio/${isArabic ? "ar" : "en"}#contact`}
        >
          {isArabic ? "كعقوم ىلع لصحا" : "Get a Site Like This"}
        </a>
      </div>
    );
  }

  export function DemoBanner() {
    return (
      // Suspense required by useSearchParams in the App Router
      <Suspense fallback={null}>
        <BannerContent />
      </Suspense>
    );
  }