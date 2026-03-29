"use client";

import { useState, useEffect } from "react";
import { useSwipeToDismiss } from "@/hooks/useSwipeToDismiss";
import { useCart }  from "@/context/CartContext";
import Image        from "next/image";
import Link         from "next/link";
import { useRouter } from "next/navigation";

export default function MiniCart() {
  const router = useRouter();
  const {
    cart, cartTotal, cartCount,
    isCartOpen, setIsCartOpen,
    updateQuantity, removeFromCart,
  } = useCart();

  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isCartOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsCartOpen(false);
    }, 280);
  };

  const { offset, swipeOut, handlers } = useSwipeToDismiss({
    direction: "right",
    onClose: () => setIsCartOpen(false),
  });

  if (!isCartOpen && !isClosing && !swipeOut) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-leil-dark/40 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div
        {...handlers}
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-leil-cream shadow-2xl z-50 flex flex-col ${swipeOut ? "" : isClosing ? "animate-slide-out" : "animate-slide-in"}`}
        style={{
          transform: swipeOut
            ? "translateX(100%)"
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
        <div className="bg-leil-dark text-leil-cream px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-light tracking-wide">Your Bag</h2>
            <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase text-leil-cream/40 mt-0.5 ps-0.5">
              {cartCount} {cartCount === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-leil-cream/50 hover:text-leil-rose transition-colors duration-200"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg className="w-10 h-10 text-leil-blush" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-leil-dark/35">Your bag is empty</p>
              <button
                onClick={handleClose}
                className="font-body text-xs tracking-[0.15em] uppercase text-leil-rose hover:text-leil-rose-dark transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 pb-5 border-b border-leil-dark/6 last:border-0">
                  {/* Image */}
                  <Link href={`/products/${item.slug}`} onClick={handleClose}>
                    <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden bg-leil-blush/30">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={handleClose}
                      className="font-display text-base font-light text-leil-dark hover:text-leil-rose transition-colors line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <p className="font-body text-sm text-leil-dark/60 mt-0.5">
                      EGP {item.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>

                    {/* Quantity + remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-leil-dark/15">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 font-body text-sm text-leil-dark/60 hover:text-leil-dark hover:bg-leil-blush/30 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 font-body text-sm text-leil-dark border-x border-leil-dark/15">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 font-body text-sm text-leil-dark/60 hover:text-leil-dark hover:bg-leil-blush/30 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-700 text-[0.65rem] tracking-[0.15em] uppercase text-leil-dark/30 hover:text-leil-rose transition-colors"
                      >
                        Remove X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-leil-dark/8 px-6 py-5 bg-leil-cream-dark">
            <div className="flex items-baseline justify-between mb-5">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-leil-dark/50">Subtotal</span>
              <span className="text-2xl font-light text-leil-dark">
                EGP {cartTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <button
              onClick={() => { handleClose(); router.push("/checkout"); }}
              className="w-full bg-leil-dark text-leil-cream font-body text-xs tracking-[0.15em] uppercase py-4 hover:bg-leil-rose transition-colors duration-200 mb-3"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={handleClose}
              className="w-full border border-leil-dark text-leil-dark font-body text-xs tracking-[0.15em] uppercase py-4 hover:bg-leil-dark hover:text-leil-cream transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
