export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-leil-cream py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex items-center gap-2">
          <div className="h-3 w-10 bg-leil-blush"></div>
          <div className="h-3 w-1 bg-leil-blush"></div>
          <div className="h-3 w-20 bg-leil-blush"></div>
          <div className="h-3 w-1 bg-leil-blush"></div>
          <div className="h-3 w-40 bg-leil-blush"></div>
        </div>

        {/* Product Detail Skeleton */}
        <div className="bg-leil-cream-dark overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 p-6 lg:p-10">

            {/* Image Skeleton */}
            <div className="aspect-square bg-leil-blush/60"></div>

            {/* Info Skeleton */}
            <div className="flex flex-col pt-6 lg:pt-0 space-y-4">

              {/* Title */}
              <div className="space-y-2">
                <div className="h-10 w-full bg-leil-blush"></div>
                <div className="h-10 w-3/4 bg-leil-blush"></div>
              </div>

              {/* Price */}
              <div className="pb-6 border-b border-leil-dark/10 space-y-2">
                <div className="h-8 w-44 bg-leil-blush"></div>
                <div className="h-3 w-28 bg-leil-blush"></div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-5 w-36 bg-leil-blush"></div>
                <div className="h-3 w-full bg-leil-blush"></div>
                <div className="h-3 w-full bg-leil-blush"></div>
                <div className="h-3 w-2/3 bg-leil-blush"></div>
              </div>

              {/* Stock Status */}
              <div className="h-4 w-48 bg-leil-blush"></div>

              {/* Button */}
              <div className="h-14 w-full bg-leil-blush"></div>

              {/* Features */}
              <div className="border-t border-leil-dark/10 pt-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-4 bg-leil-blush"></div>
                  <div className="h-4 bg-leil-blush"></div>
                  <div className="h-4 bg-leil-blush"></div>
                  <div className="h-4 bg-leil-blush"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-16">
          <div className="h-8 w-56 bg-leil-blush mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-leil-cream-dark overflow-hidden">
                <div className="h-56 bg-leil-blush/60"></div>
                <div className="p-4 border-t border-leil-dark/6 space-y-2">
                  <div className="h-5 w-full bg-leil-blush"></div>
                  <div className="h-3 w-2/3 bg-leil-blush"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
