import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImageGallery from "@/components/ProductImageGallery";
import productsData from "@/data/products.json";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all products
export async function generateStaticParams() {
  return productsData.map((p) => ({ slug: p.slug }));
}

// Generate metadata for SEO
export async function generateMetadata() {

  return {
    title: `E-Commerce Website Demo | SM Web Design Studio | Egypt`,
    description:
    "Expert web design and development in Egypt. Discover how we can help your business grow.",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Get related products from same category
  const allProducts = productsData;
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-leil-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 font-body text-[0.65rem] tracking-[0.2em] uppercase text-leil-dark/40">
            <li>
              <Link href="/#collection" className="hover:text-leil-rose transition-colors duration-200">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/?category=${encodeURIComponent(product.category)}#collection`}
                className="hover:text-leil-rose transition-colors duration-200"
              >
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-leil-dark/70">{product.title}</li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="bg-leil-cream-dark overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 p-6 lg:p-10">

            {/* Product Image Gallery */}
            <ProductImageGallery
              images={(product as any).images ?? [product.image]}
              title={product.title}
              category={product.category}
              inStock={product.inStock}
            />

            {/* Product Info */}
            <div className="flex flex-col pt-6 lg:pt-0">

              {/* Title */}
              <h1 className="font-display text-4xl lg:text-5xl font-light text-leil-dark mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="mb-6 border-b border-leil-dark/10 pb-6">
                <span className="font-body text-2xl font-medium text-leil-dark">
                  EGP{" "}
                  {product.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <p className="font-body text-xs tracking-widest uppercase text-leil-dark/40 mt-1">
                  Inclusive of VAT
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-display text-xl font-light text-leil-dark mb-3">
                  About this piece
                </h2>
                <p className="font-body text-sm leading-relaxed text-leil-dark/70">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-leil-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-body text-xs tracking-[0.15em] uppercase text-leil-dark/60">
                      In Stock — Ready to Ship
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-leil-dark/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="font-body text-xs tracking-[0.15em] uppercase text-leil-dark/40">
                      Currently Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <div className="mb-8">
                <AddToCartButton product={product} variant="large" />
              </div>

              {/* Features */}
              <div className="border-t border-leil-dark/10 pt-6">
                <div className="grid grid-cols-2 gap-3">
                  {["Free Delivery", "Easy Returns", "Secure Payment", "Warranty Included"].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-leil-dark/60">
                      <svg className="w-3.5 h-3.5 text-leil-rose shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-body text-xs tracking-[0.1em] uppercase">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-light text-leil-dark mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group bg-leil-cream-dark overflow-hidden hover:shadow-lg transition-shadow duration-400"
                >
                  <div className="relative h-56 bg-leil-blush/30 overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={rel.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 border-t border-leil-dark/6">
                    <h3 className="font-display text-lg font-light text-leil-dark line-clamp-1 mb-1 group-hover:text-leil-rose transition-colors duration-200">
                      {rel.title}
                    </h3>
                    <p className="font-body text-sm font-medium text-leil-dark">
                      EGP{" "}
                      {rel.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
