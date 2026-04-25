"use client";

import { usePathname } from "next/navigation";
import Link            from "next/link";
import CartButton      from "./CartButton";
import FilterButton    from "./FilterButton";
import MiniCart        from "./MiniCart";

export default function Navbar() {
  const pathname      = usePathname();
  const isHomePage = pathname === "/";
  return (
    <>
      <nav className="bg-leil-dark text-leil-cream sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:ps-0">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* Logo */}
            <Link
              href="/#collection"
              className="font-display text-4xl font-light  text-leil-cream flex-shrink-0"
            >SM
            </Link>

            {/* Right controls */}
            <div className="flex items-center gap-5">
              {isHomePage && <FilterButton />}
              <CartButton />
            </div>
          </div>
        </div>

       
      </nav>

      <MiniCart />
    </>
  );
}
