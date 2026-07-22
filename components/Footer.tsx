"use client";

import { useRouter } from "next/navigation";
import Image         from "next/image";

export default function Footer() {
  const router = useRouter();

  const handleCategoryClick = (e: React.MouseEvent<HTMLAnchorElement>, cat: string) => {
    e.preventDefault();
    router.push(`/?category=${cat}#collection`, { scroll: false });
    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer className="bg-leil-dark text-leil-cream mt-20 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Image
              src="/LUNERA.svg"
              alt="Lunera"
              width={496}
              height={161}
              className="h-10 w-auto mb-4"
            />
            <p className="font-body text-sm sm:text-base text-leil-cream/90 leading-relaxed max-w-[225px]">
              Curated fashion for the modern Egyptian woman. Lunera blends timeless
              elegance with everyday ease — thoughtfully designed pieces made to be
              worn, loved, and remembered.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-leil-rose-light mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 font-body text-sm">
              {["Dresses", "Abayas", "Tops", "Bottoms", "Accessories", "Outerwear"].map(cat => (
                <li key={cat}>
                  <a
                    href={`/?category=${cat}#collection`}
                    onClick={e => handleCategoryClick(e, cat)}
                    className="text-leil-cream hover:text-leil-rose transition-colors duration-200"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-leil-rose-light mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3 font-body text-sm">
              <li>
                <a
                  href="https://wa.me/201000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-leil-cream hover:text-leil-rose transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L0 24l6.335-1.51A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.017-1.382l-.36-.214-3.732.889.936-3.617-.235-.372A9.755 9.755 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
                  </svg>
                  WhatsApp
                </a>
              </li>
                 <li>
                <a
                  href="tel:01274613331"
                  className="flex items-center gap-2.5 text-leil-cream hover:text-leil-rose transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 shrink-0">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.28 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.19 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  01274613331
                </a>
              </li>
              <li>
                <a
                  href="mailto:studio@samirmagdy.com"
                  className="flex items-center gap-2.5 text-leil-cream hover:text-leil-rose transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4 shrink-0">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m2 7 10 7 10-7"/>
                  </svg>
                  studio@samirmagdy.com
                </a>
              </li>
           
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-[0.65rem] tracking-[0.3em] uppercase text-leil-rose-light mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/smweb.studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-leil-cream/90 hover:text-leil-rose transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/SMWebStudioEgypt"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-leil-cream/90 hover:text-leil-rose transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-leil-cream/8 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="font-body text-xs text-leil-cream/60 tracking-wide">
            © {new Date().getFullYear()} All rights reserved.&nbsp;
              <a
                href="https://smweb.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-leil-cream/80 underline underline-offset-2 decoration-leil-cream/25 hover:text-leil-rose hover:decoration-leil-rose transition-colors duration-200"
              >
                SM Web Studio
              </a>
          </p>
          
        </div>
      </div>
    </footer>
  );
}
