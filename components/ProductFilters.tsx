"use client";

import { useMemo, useEffect, useRef }                   from "react";
import { useRouter, useSearchParams }                 from "next/navigation";
import { useFilter }                                  from "@/context/FilterContext";
import ProductCard                                    from "./ProductCard";
import FilterSidebar                                  from "./FilterSidebar";

const ITEMS_PER_PAGE = 12;
const CATEGORY_ORDER = ["Dresses", "Abayas", "Tops", "Bottoms", "Outerwear", "Accessories"];

interface Product {
  id:          string;
  slug:        string;
  title:       string;
  price:       number;
  category:    string;
  image:       string;
  description: string;
  inStock:     boolean;
}

export default function ProductFilters({ products }: { products: Product[] }) {
  const router       = useRouter();
  const searchParams = useSearchParams();

  // State from URL params
  const selectedCategory = searchParams.get("category") ?? "All";
  const sortBy           = searchParams.get("sort")     ?? "featured";
  const priceRange       = searchParams.get("price")    ?? "all";
  const currentPage      = Number(searchParams.get("page") ?? "1");

  const { isFilterOpen, setIsFilterOpen } = useFilter();
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);


  // All unique categories from data
  const categories = useMemo(
    () => CATEGORY_ORDER.filter(c => products.some(p => p.category === c)),
    [products]
  );

  // Filtered + sorted products
  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price filter
    switch (priceRange) {
      case "under-500":  result = result.filter(p => p.price < 500);                         break;
      case "500-1500":   result = result.filter(p => p.price >= 500  && p.price <= 1500);    break;
      case "1500-3000":  result = result.filter(p => p.price >= 1500 && p.price <= 3000);    break;
      case "over-3000":  result = result.filter(p => p.price > 3000);                        break;
    }

    switch (sortBy) {
      case "price-low":  result.sort((a, b) => a.price - b.price);        break;
      case "price-high": result.sort((a, b) => b.price - a.price);        break;
    }

    return result;
  }, [products, selectedCategory, sortBy, priceRange]);

  // Pagination
  const totalPages   = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated    = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "" || value === "All" || value === "all" || value === "featured") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(params.toString() ? `/?${params.toString()}` : "/", { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) params.delete("page");
    else            params.set("page", String(page));
    router.push(params.toString() ? `/?${params.toString()}` : "/", { scroll: false });
  };

  const handleReset = () => {
    router.push("/", { scroll: false });
  };

  const hasActiveFilters =
    selectedCategory !== "All" || priceRange !== "all" || sortBy !== "featured";

  return (
    <>
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={v => updateParam("category", v)}
        sortBy={sortBy}
        onSortChange={v => updateParam("sort", v)}
        priceRange={priceRange}
        onPriceChange={v => { updateParam("price", v); }}
        onReset={handleReset}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Section header */}
        <div className="mb-10">
          <h2 className="font-display text-4xl font-light text-leil-dark mb-1">
            {selectedCategory === "All" ? "All Pieces" : selectedCategory}
          </h2>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-leil-dark/35">
            {filtered.length} {filtered.length === 1 ? "result" : "results"}
          </p>
        </div>

        {/* Desktop filter bar */}
        <div className="hidden md:flex items-center gap-3 mb-8 flex-wrap">
          {["All", ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => updateParam("category", cat)}
              className={`font-body text-xs tracking-[0.15em] uppercase px-4 py-2 transition-colors duration-200 ${
                selectedCategory === cat
                  ? "bg-leil-dark text-leil-cream"
                  : "border border-leil-dark/20 text-leil-dark hover:border-leil-dark"
              }`}
            >
              {cat}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-3">
            <select
              value={sortBy}
              onChange={e => updateParam("sort", e.target.value)}
              className="font-body text-xs tracking-[0.1em] uppercase border border-leil-dark/20 px-3 py-2 bg-transparent text-leil-dark focus:outline-none focus:border-leil-rose cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low – High</option>
              <option value="price-high">Price: High – Low</option>
            </select>
          </div>
        </div>

        {/* Active filters — mobile */}
        {hasActiveFilters && (
          <div className="md:hidden flex items-center gap-2 mb-6 flex-wrap">
            {selectedCategory !== "All" && (
              <span className="font-body text-xs bg-leil-rose text-leil-cream px-3 py-1">
                {selectedCategory}
              </span>
            )}
            {priceRange !== "all" && (
              <span className="font-body text-xs bg-leil-blush text-leil-dark px-3 py-1">
                Price filter active
              </span>
            )}
            {sortBy !== "featured" && (
              <span className="font-body text-xs bg-leil-blush text-leil-dark px-3 py-1">
                {sortBy === "price-low" ? "Price: Low–High"
                 : sortBy === "price-high" ? "Price: High–Low"
                 : sortBy}
              </span>
            )}
            <button
              onClick={handleReset}
              className="font-body text-xs tracking-[0.15em] uppercase text-leil-rose hover:text-leil-rose-dark ml-auto"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Grid */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-display text-3xl font-light text-leil-dark/30 mb-3">No pieces found</p>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-leil-dark/25 mb-6">
              Try adjusting your filters
            </p>
            <button
              onClick={handleReset}
              className="font-body text-xs tracking-[0.15em] uppercase text-leil-rose hover:text-leil-rose-dark transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginated.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 font-body text-sm transition-colors duration-200 ${
                  page === currentPage
                    ? "bg-leil-dark text-leil-cream"
                    : "border border-leil-dark/20 text-leil-dark hover:border-leil-dark"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
