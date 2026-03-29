"use client";

import { useState, useEffect } from "react";
import { useSwipeToDismiss } from "@/hooks/useSwipeToDismiss";

const PRICE_PRESETS = [
  { value: "all",       label: "All Prices"      },
  { value: "under-500", label: "Under EGP 500"   },
  { value: "500-1500",  label: "EGP 500 – 1,500" },
  { value: "1500-3000", label: "EGP 1,500 – 3,000"},
  { value: "over-3000", label: "Over EGP 3,000"  },
];

interface FilterSidebarProps {
  isOpen:           boolean;
  onClose:          () => void;
  categories:       string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  sortBy:           string;
  onSortChange:     (sort: string) => void;
  priceRange:       string;
  onPriceChange:    (price: string) => void;
  onReset:          () => void;
}

export default function FilterSidebar({
  isOpen, onClose,
  categories, selectedCategory, onCategoryChange,
  sortBy, onSortChange,
  priceRange, onPriceChange,
  onReset,
}: FilterSidebarProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 280);
  };

  const { offset, swipeOut, handlers } = useSwipeToDismiss({
    direction: "left",
    onClose,
  });

  if (!isOpen && !isClosing && !swipeOut) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-leil-dark/40 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        {...handlers}
        className={`fixed left-0 top-0 h-full w-full sm:w-80 bg-leil-cream shadow-2xl z-50 flex flex-col${isClosing && !swipeOut ? " animate-slide-out-left" : ""}`}
        style={{
          ...(isClosing || swipeOut ? {} : { animation: "slideInLeft 0.3s ease-out" }),
          transform: swipeOut
            ? "translateX(-100%)"
            : offset
              ? `translateX(${offset}px)`
              : undefined,
          transition: swipeOut
            ? "transform 0.25s ease-in"
            : offset
              ? "none"
              : "transform 0.2s ease-out",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-leil-dark/8">
          <h2 className="font-body text-xs tracking-[0.3em] uppercase text-leil-dark">Filter & Sort</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={onReset}
              className="font-body text-[0.65rem] tracking-[0.15em] uppercase text-leil-rose hover:text-leil-rose-dark transition-colors"
            >
              Reset
            </button>
            <button onClick={handleClose} className="text-leil-dark/40 hover:text-leil-dark transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* Category */}
          <div>
            <h3 className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-leil-dark/40 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {["All", ...categories].map(cat => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-3 py-1.5 font-body text-xs tracking-wide transition-colors duration-200 ${
                    selectedCategory === cat
                      ? "bg-leil-dark text-leil-cream"
                      : "bg-leil-cream-dark text-leil-dark hover:bg-leil-blush"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-leil-dark/40 mb-3">Price Range</h3>
            <div className="space-y-2">
              {PRICE_PRESETS.map(preset => (
                <button
                  key={preset.value}
                  onClick={() => onPriceChange(preset.value)}
                  className={`w-full text-left px-3 py-2 font-body text-sm transition-colors duration-200 ${
                    priceRange === preset.value
                      ? "bg-leil-rose text-leil-cream"
                      : "text-leil-dark/70 hover:text-leil-dark hover:bg-leil-blush/40"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <h3 className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-leil-dark/40 mb-3">Sort By</h3>
            <div className="space-y-2">
              {[
                { value: "featured",   label: "Featured"           },
                { value: "price-low",  label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => onSortChange(opt.value)}
                  className={`w-full text-left px-3 py-2 font-body text-sm transition-colors duration-200 ${
                    sortBy === opt.value
                      ? "bg-leil-rose text-leil-cream"
                      : "text-leil-dark/70 hover:text-leil-dark hover:bg-leil-blush/40"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply */}
        <div className="px-6 py-4 border-t border-leil-dark/8">
          <button
            onClick={handleClose}
            className="w-full bg-leil-dark text-leil-cream font-body text-xs tracking-[0.15em] uppercase py-4 hover:bg-leil-rose transition-colors duration-200"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
