import { Suspense }      from "react";
import ProductFilters   from "@/components/ProductFilters";
import HeroSection      from "@/components/HeroSection";
import productsData     from "@/data/products.json";

export default async function HomePage() {
  return (
    <div className="min-dvh-screen bg-leil-cream">
      <HeroSection />
      <div id="collection" className="pt-6">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20 font-body text-xs tracking-[0.2em] uppercase text-leil-dark/30">
              Loading collection…
            </div>
          }
        >
          <ProductFilters products={productsData} />
        </Suspense>
      </div>
    </div>
  );
}
