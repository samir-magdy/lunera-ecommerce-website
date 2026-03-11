import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  inStock: boolean;
  brand: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 uppercase">
            {product.brand}
          </span>
          <span className="text-xs text-ecommerce-navy font-medium">
            {product.subcategory}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 h-10">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-ecommerce-navy">
              EGP{" "}
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
