"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";

const inputClass =
  "w-full bg-leil-cream border border-leil-dark/20 focus:border-leil-rose outline-none px-4 py-3 font-body text-sm text-leil-dark placeholder:text-leil-dark/30 rounded-none transition-colors duration-200";

const labelClass =
  "font-body text-[0.65rem] tracking-[0.25em] uppercase text-leil-dark/50 block mb-2";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");

  const shipping = useMemo(() => (cart.length > 0 ? 0 : 0), [cart.length]);
  const total = cartTotal + shipping;

  const canComplete =
    cart.length > 0 &&
    firstName.trim() &&
    lastName.trim() &&
    phone.trim() &&
    addressLine.trim() &&
    city.trim();

  const handleCompletePurchase = () => {
    if (!canComplete) return;

    const itemLines = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.title}  ×${item.quantity}  —  EGP ${(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      )
      .join("\n");

    const message = [
      `🛍️ *New Order*`,
      ``,
      `*Customer*`,
      `Name: ${firstName.trim()} ${lastName.trim()}`,
      `Phone: ${phone.trim()}`,
      `City: ${city.trim()}`,
      `Address: ${addressLine.trim()}`,
      ``,
      `*Items*`,
      itemLines,
      ``,
      `Subtotal: EGP ${cartTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      `Shipping: ${shipping === 0 ? "Free" : `EGP ${shipping.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}`,
      `*Total: EGP ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}*`,
      ``,
      `Payment: Cash on Delivery`,
    ].join("\n");

    const waURL = `https://wa.me/201274613331?text=${encodeURIComponent(message)}`;
    window.open(waURL, "_blank");
    clearCart();
  };

  return (
    <div className="min-h-screen bg-leil-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-20 py-8">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20">
          {/* ── Left: Form ── */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // handleCompletePurchase();
            }}
            className="space-y-6 md:space-y-10"
          >
            {/* Delivery Details */}
            <div>
              {/* Page header */}
              <div className="border-b border-leil-dark/8  py-10">
                <p className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-leil-rose mb-2">
                  Secure Checkout
                </p>
                <h1 className="font-display text-4xl font-light text-leil-dark">
                  Complete Your Order
                </h1>
              </div>
              <h2 className="font-display text-2xl font-light text-leil-dark my-6">
                Delivery Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input
                    type="text"
                    placeholder="Nour"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input
                    type="text"
                    placeholder="Ahmed"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClass}
                    autoComplete="family-name"
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    placeholder="+20 1XX XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    type="text"
                    placeholder="Cairo"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputClass}
                    autoComplete="address-level2"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Address</label>
                  <input
                    type="text"
                    placeholder="Street, building, apartment…"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    className={inputClass}
                    autoComplete="address-line1"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="font-display text-2xl font-light text-leil-dark mb-6">
                Payment
              </h2>
              <div className="border border-leil-dark/12 bg-leil-cream-dark px-5 py-4 flex items-start gap-4">
                <div className="w-4 h-4 mt-0.5 rounded-full border-2 border-leil-rose bg-leil-rose flex-shrink-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-leil-cream" />
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-leil-dark">
                    Payment on Delivery
                  </p>
                  <p className="font-body text-xs text-leil-dark/45 mt-1 tracking-wide">
                    Cash · InstaPay · E-Wallet — pay when your order arrives
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => router.push("/#collection")}
                className="flex-1 font-body text-xs tracking-[0.15em] uppercase border border-leil-dark text-leil-dark px-6 py-4 hover:bg-leil-dark hover:text-leil-cream transition-colors duration-200"
              >
                Continue Shopping
              </button>
              <button
                type="submit"
                disabled={!canComplete}
                className="flex-1 font-body text-xs tracking-[0.15em] uppercase bg-leil-dark text-leil-cream px-6 py-4 hover:bg-leil-rose transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-leil-dark"
              >
                Complete Purchase
              </button>
            </div>
          </form>

          {/* ── Right: Order Summary ── */}
          <div className="lg:-order-none -order-1 py-0 md:pt-20">
            <h2 className="font-display text-2xl font-light text-leil-dark mb-6">
              Order Summary
            </h2>

            <div className="bg-leil-cream-dark border border-leil-dark/8">
              {cart.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-leil-dark/35 mb-4">
                    Your bag is empty
                  </p>
                  <button
                    onClick={() => router.push("/")}
                    className="font-body text-xs tracking-[0.15em] uppercase text-leil-rose hover:text-leil-rose-dark transition-colors"
                  >
                    Browse Collection
                  </button>
                </div>
              ) : (
                <>
                  {/* Items */}
                  <div className="px-6 py-6 space-y-5">
                    {cart.map((item, idx) => (
                      <div key={item.id}>
                        <div className="flex gap-4">
                          <Link
                            href={`/products/${item.slug}`}
                            className="relative w-16 h-20 flex-shrink-0 overflow-hidden bg-leil-blush/30"
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </Link>
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                              <Link
                                href={`/products/${item.slug}`}
                                className="font-display text-base font-light text-leil-dark hover:text-leil-rose transition-colors line-clamp-2 leading-snug"
                              >
                                {item.title}
                              </Link>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-leil-dark/25 hover:text-leil-rose transition-colors flex-shrink-0 mt-0.5"
                                aria-label={`Remove ${item.title}`}
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-body text-sm text-leil-dark/60">
                                EGP{" "}
                                {item.price.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </span>
                              {/* Qty controls */}
                              <div className="flex items-center border border-leil-dark/15">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="px-2.5 py-1 font-body text-sm text-leil-dark/60 hover:text-leil-dark hover:bg-leil-blush/30 transition-colors"
                                  aria-label="Decrease"
                                >
                                  −
                                </button>
                                <span className="px-3 py-1 font-body text-sm text-leil-dark border-x border-leil-dark/15 min-w-[2rem] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="px-2.5 py-1 font-body text-sm text-leil-dark/60 hover:text-leil-dark hover:bg-leil-blush/30 transition-colors"
                                  aria-label="Increase"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {idx !== cart.length - 1 && (
                          <div className="border-b border-leil-dark/6 mt-5" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-leil-dark/8 px-6 py-5 space-y-3">
                    <div className="flex justify-between font-body text-sm text-leil-dark/50">
                      <span>Subtotal</span>
                      <span className="text-leil-dark">
                        EGP{" "}
                        {cartTotal.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between font-body text-sm text-leil-dark/50">
                      <span>Shipping</span>
                      <span className="text-leil-dark">
                        {shipping === 0
                          ? "Free"
                          : `EGP ${shipping.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                      </span>
                    </div>
                    <div className="border-t border-leil-dark/8 pt-3 flex justify-between items-baseline">
                      <span className="font-body text-xs tracking-[0.2em] uppercase text-leil-dark/50">
                        Total
                      </span>
                      <span className="text-2xl font-light text-leil-dark">
                        EGP{" "}
                        {total.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
