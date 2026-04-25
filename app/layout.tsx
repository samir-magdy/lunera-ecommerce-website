import type { Metadata } from "next";
import "./globals.css";
import { CartProvider }   from "@/context/CartContext";
import { FilterProvider } from "@/context/FilterContext";
import Navbar  from "@/components/Navbar";
import Footer  from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Cormorant_Garamond, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"],
  style:    ["normal", "italic"],
  variable: "--font-cormorant",
  display:  "swap",
});

const jost = Jost({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"],
  variable: "--font-jost",
  display:  "swap",
});

// ─────────────────────────────────────────────
// SITE-WIDE CONSTANTS
// ─────────────────────────────────────────────

const SITE_URL="https://ecommerce.samirmagdy.com"
const SITE_NAME = "SM Web Studio";
const CONTACT_EMAIL = "studio@samirmagdy.com";
const PHONE_NUMBER = "+201274613331";
const TWITTER_HANDLE = "@SMWebStudioEG";

const META_DESCRIPTION = "High-end web design studio offering premium quality at competitive rates. We bridge the gap between agency-level professionalism & freelancer flexibility.";

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/smweb.studio",
  facebook: "https://www.facebook.com/SMWebStudioEG",
  x: "https://x.com/SMWebStudioEG",
} as const;

// ———————————————————————————————————————————
// SEO METADATA
// ———————————————————————————————————————————

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Own Your Online Store | SM Web Studio",
  description: META_DESCRIPTION,
  authors: [{ name: "Samir Magdy", url: SITE_URL }],
   icons: {
      icon: [
         {
          url: "/favicon.png",
          type: "image/png",
          sizes: "96x96",
        },
        {
          url: "/favicon.ico",
          type: "image/x-icon",
          sizes: "48x48",
        },
        {
          url: "/favicon-light.svg",
          type: "image/svg+xml",
          sizes: "any"
        },
        {
          url: "/favicon-dark.svg",
          type: "image/svg+xml",
          sizes: "any",
          media: "(prefers-color-scheme: dark)",
        },
      ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Expert Web Design in Egypt | SM Web Studio",
    description: META_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/open-graph.webp`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} logo`,
      },
    ],
    locale: "en_US",
    alternateLocale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Web Design in Egypt | SM Web Studio",
    description: META_DESCRIPTION,
    images: [`${SITE_URL}/open-graph.webp`],
    site: TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ———————————————————————————————————————————
// STRUCTURED DATA / JSON-LD
// ———————————————————————————————————————————

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      description: META_DESCRIPTION,
      url: SITE_URL,
      telephone: PHONE_NUMBER,
      email: CONTACT_EMAIL,
      image: `${SITE_URL}/open-graph.webp`,
      logo: `${SITE_URL}/business-logo.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressRegion: "Cairo Governorate",
        addressCountry: "EG",
      },
      areaServed: [
        { "@type": "Country", name: "Egypt" },
        { "@type": "City", name: "Cairo" },
        { "@type": "City", name: "Alexandria" },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: 30.0444,
        longitude: 31.2357,
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Design & Development Services in Egypt",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Website Design & Development",
              description:
                "Expert website design & development using modern technologies.",
            },
          },
        ],
      },
      sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram, SOCIAL_LINKS.x],
      founder: { "@id": `${SITE_URL}/#founder` },
      knowsLanguage: ["en", "ar"],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "11:00",
          closes: "19:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: ["en", "ar"],
      publisher: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Expert Web Design in Egypt | SM Web Studio",
      description: META_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#business` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Samir Magdy",
      jobTitle: "Founder, Web Designer & Developer",
      url: SITE_URL,
      worksFor: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen flex flex-col bg-leil-cream pb-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <CartProvider>
          <FilterProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </FilterProvider>
        </CartProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
