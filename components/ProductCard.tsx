import Link         from "next/link";
import Image        from "next/image";
import AddToCartButton from "./AddToCartButton";

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

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-leil-cream-dark overflow-hidden hover:shadow-lg transition-shadow duration-400">

      {/* Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-72 overflow-hidden bg-leil-blush/30">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-leil-dark/50 flex items-center justify-center">
              <span className="font-body text-xs tracking-[0.2em] uppercase text-leil-cream bg-leil-dark/80 px-4 py-2">
                Out of Stock
              </span>
            </div>
          )}
          {/* Category pill on image */}
          <span className="absolute top-3 left-3 bg-leil-cream/90 backdrop-blur-sm font-body text-[0.6rem] tracking-[0.2em] uppercase text-leil-dark px-2.5 py-1">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 border-t border-leil-dark/6">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-display text-xl font-light text-leil-dark line-clamp-1 mb-1 hover:text-leil-rose transition-colors duration-200">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-4">
          <span className="font-body text-sm font-medium text-leil-dark">
            EGP{" "}
            {product.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
