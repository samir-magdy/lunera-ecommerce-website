"use client";

import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="relative flex items-center gap-2 text-leil-cream hover:text-leil-rose transition-colors duration-200"
      aria-label={`Open cart — ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
    >
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span className="font-body text-xs tracking-[0.15em] uppercase hidden sm:inline">Bag</span>
      {cartCount > 0 && (
        <span className="absolute -top-2.5 -right-2.5 bg-leil-rose text-leil-cream font-body text-[0.6rem] font-medium rounded-full w-4.5 h-4.5 flex items-center justify-center min-w-[1.1rem] px-1">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </button>
  );
}
