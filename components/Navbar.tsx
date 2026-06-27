"use client";

import { usePathname } from "next/navigation";
import Link            from "next/link";
import Image           from "next/image";
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
              className="flex-shrink-0"
            >
              <Image
                src="/LUNERA.svg"
                alt="Lunera"
                width={496}
                height={161}
                priority
                className="h-9 w-auto"
              />
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
