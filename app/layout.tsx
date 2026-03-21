import type { Metadata } from "next";
import "./globals.css";
import { CartProvider }   from "@/context/CartContext";
import { FilterProvider } from "@/context/FilterContext";
import Navbar  from "@/components/Navbar";
import Footer  from "@/components/Footer";
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

export const metadata: Metadata = {
  title:       "Leil — Egyptian Fashion & Apparel",
  description: "Curated fashion for the modern Egyptian woman. Discover dresses, abayas, tops, and accessories at Leil.",
  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: "/favicon-v3-on-dark.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-v3-on-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen flex flex-col bg-leil-cream">
        <CartProvider>
          <FilterProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </FilterProvider>
        </CartProvider>
      </body>
    </html>
  );
}
