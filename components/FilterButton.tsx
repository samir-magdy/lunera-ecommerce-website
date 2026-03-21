"use client";

import { useFilter } from "@/context/FilterContext";

export default function FilterButton() {
  const { setIsFilterOpen } = useFilter();

  return (
    <button
      onClick={() => setIsFilterOpen(true)}
      className="md:hidden flex items-center gap-2 text-leil-cream hover:text-leil-rose transition-colors duration-200"
    >
      <svg
        className="w-7 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 4h18M3 12h12M3 20h6"
        />
      </svg>
    </button>
  );
}
