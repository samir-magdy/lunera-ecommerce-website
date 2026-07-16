"use client";

  import { useSearchParams } from "next/navigation";
  import { Suspense, useEffect } from "react";

  const session = {
    get: (key: string) =>
      typeof window !== "undefined" ? sessionStorage.getItem(key) : null,
    set: (key: string, value: string) =>
      typeof window !== "undefined" && sessionStorage.setItem(key, value),
  };

  function BannerContent() {
    const searchParams = useSearchParams();

    const refParam = searchParams.get("ref");
    const langParam = searchParams.get("lang");

    // Persist ref/lang on first arrival so they survive client-side navigation
    useEffect(() => {
      if (refParam === "smws") session.set("smws_ref", "smws");
      if (langParam === "ar") session.set("smws_lang", "ar");
    }, [refParam, langParam]);

    const isInternal = refParam === "smws" || session.get("smws_ref") === "smws";
    const isArabic = langParam === "ar" || session.get("smws_lang") === "ar";

    if (!isInternal) {
      return (
        <div className="demo-banner demo-banner--center">
          <span className="banner-brand">Live Demo By
            <a
              href="https://smwebdesign.studio/en"
              target="_blank"
              rel="noopener"
              className="shimmer ms-2 font-medium shadow-lg py-1.5 px-3 rounded-md bg-gradient-to-b from-[#f3c25c] to-[#b78f47] text-gray-900 tracking-normal"
            >
              SM Web Studio
            </a>
          </span>
        </div>
      );
    }

    return (
      <div dir={isArabic ? "rtl" : "ltr"} className="demo-banner">
        <button
          className="banner-back"
          onClick={() => window.close()}
          aria-label="Back to SM Web Design Studio portfolio"
        >
          <svg className={isArabic ? "rotate-180" : ""} width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
            <path d="M12 6H2M6 1L2 6L6 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
          {isArabic ? " العودة" : " Back"}
        </button>

        <a
          className="banner-cta"
          href={`https://smwebdesign.studio/${isArabic ? "ar" : "en"}#contact`}
        >
          {isArabic ? "احصل على موقعك" : "Get Your Website"}
          <svg className={isArabic ? "rotate-180" : ""} width="14" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
            <path d="M2 6H12M8 1L12 6L8 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>
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