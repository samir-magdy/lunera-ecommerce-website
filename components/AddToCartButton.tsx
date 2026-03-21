"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface Product {
  id:       string;
  slug:     string;
  title:    string;
  price:    number;
  image:    string;
  inStock?: boolean;
}

export default function AddToCartButton({
  product,
  variant = "default",
}: {
  product: Product;
  variant?: "default" | "large";
}) {
  const { addToCart, cart, setIsCartOpen } = useCart();
  const [justAdded, setJustAdded]          = useState(false);

  const isInCart    = cart.some(item => item.id === product.id);
  const isOutOfStock = product.inStock === false;

  const sizeClass = variant === "large"
    ? "py-4 text-base"
    : "py-2.5 text-xs";

  const base = `w-full font-body font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${sizeClass}`;

  const handleAdd = () => {
    if (isOutOfStock) return;
    addToCart({
      id:    product.id,
      slug:  product.slug,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  };

  if (isOutOfStock) {
    return (
      <button disabled className={`${base} bg-leil-blush/40 text-leil-dark/30 cursor-not-allowed`}>
        Out of Stock
      </button>
    );
  }

  if (justAdded) {
    return (
      <button className={`${base} bg-leil-rose text-leil-cream flex items-center justify-center gap-2`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Added
      </button>
    );
  }

  if (isInCart) {
    return (
      <button
        onClick={() => setIsCartOpen(true)}
        className={`${base} border border-leil-dark text-leil-dark hover:bg-leil-dark hover:text-leil-cream`}
      >
        View in Cart
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`${base} bg-leil-dark text-leil-cream hover:bg-leil-rose`}
    >
      Add to Cart
    </button>
  );
}
