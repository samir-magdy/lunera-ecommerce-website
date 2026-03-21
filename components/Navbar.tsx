"use client";

import { usePathname } from "next/navigation";
import Link            from "next/link";
import CartButton      from "./CartButton";
import FilterButton    from "./FilterButton";
import MiniCart        from "./MiniCart";

export default function Navbar() {
  const pathname      = usePathname();
  const isProductPage = pathname.startsWith("/products/");

  return (
    <>
      <nav className="bg-leil-dark text-leil-cream sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Logo */}
            <a
              href="/"
              className="font-display text-2xl font-light tracking-[0.12em] text-leil-cream hover:text-leil-rose transition-colors duration-200 flex-shrink-0"
            >
              Leil
            </a>

            {/* Right controls */}
            <div className="flex items-center gap-5">
              {!isProductPage && <FilterButton />}
              <CartButton />
            </div>
          </div>
        </div>
      </nav>

      <MiniCart />
    </>
  );
}
