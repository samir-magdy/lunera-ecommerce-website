import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-leil-cream flex items-center justify-center px-4">
      <div className="text-center">
        <p className="font-body text-[0.65rem] tracking-[0.4em] uppercase text-leil-dark/30 mb-6">
          404
        </p>
        <h1 className="font-display text-4xl font-light text-leil-dark mb-4">
          Page Not Found
        </h1>
        <p className="font-body text-sm text-leil-dark/50 mb-10 max-w-xs mx-auto leading-relaxed">
          The page you&apos;re looking for may have moved or no longer exists.
        </p>
        <Link
          href="/#collection"
          className="inline-block font-body text-xs tracking-[0.2em] uppercase bg-leil-dark text-leil-cream px-8 py-4 hover:bg-leil-rose transition-colors duration-200"
        >
          Back to Collection
        </Link>
      </div>
    </div>
  )
}
