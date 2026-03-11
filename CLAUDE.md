# E-Commerce Frontend

## Project Overview
Next.js 16 App Router e-commerce frontend, formerly called "YallaShop" — renamed to "E-Commerce" across the entire codebase. Uses Tailwind CSS with custom color tokens (`ecommerce-navy`, `ecommerce-yellow`, etc.).

## Tech Stack
- **Framework**: Next.js 16 (App Router, async `params` — must be awaited)
- **React**: 19 (upgraded from 18 for Sanity 5 compatibility)
- **Styling**: Tailwind CSS 3.4 with custom tokens in `tailwind.config.ts` and `app/globals.css`
- **CMS**: Sanity v5 (in progress migration from static JSON)
- **State**: CartContext (localStorage key: `e-commerce-cart`), FilterContext
- **Filters**: URL-driven via `useSearchParams`

## Sanity Setup
- **Studio route**: `/manage` (via `app/manage/[[...tool]]/page.tsx`)
- **Config**: `sanity.config.ts` — imports schema from `./sanity/schemaTypes`
- **Env**: `sanity/env.ts` — exports `apiVersion`, `dataset`, `projectId` from env vars
- **Client**: `sanity/lib/client.ts` — CDN enabled
- **Image helper**: `sanity/lib/image.ts` — uses `imageUrlBuilder`
- **Schema**: `sanity/schemaTypes/product.ts` — product document type (no ratings/reviews)

## Product Schema Fields
title, slug, price (EGP), category (enum list), subcategory, image (with hotspot), description, inStock (boolean), brand

## Key Decisions
- **No ratings/reviews**: Stripped from entire codebase and schema. Only essential fields a small business owner would edit through Sanity Studio.
- **Minimal content**: User wants up to 5 products only to start.
- **Step-by-step migration**: User must be consulted before any content/data changes.

## Migration Progress (from static JSON to Sanity)
### Completed
- [x] Rename project from YallaShop to E-Commerce (all files)
- [x] Fix Next.js 16 async `params` in product detail page
- [x] Remove ratings/reviews from codebase (ProductCard, ProductFilters, FilterSidebar, product page, loading skeleton)
- [x] Upgrade React 18 -> 19
- [x] Install Sanity packages (sanity, next-sanity, @sanity/image-url, @sanity/vision)
- [x] Create product schema (`sanity/schemaTypes/product.ts`)
- [x] Fix `sanity/lib/image.ts` (broken import + deprecated API)
- [x] Sanity Studio mounted at `/manage`

### Next Steps
- [x] Create GROQ queries file (`sanity/lib/queries.ts`) — allProducts, productBySlug, productsByCategory, productSlugs
- [x] Add `cdn.sanity.io` to `next.config` image remote patterns
- [x] Update `app/page.tsx` to fetch from Sanity instead of `data/products.json`
- [x] Update `app/products/[slug]/page.tsx` to fetch from Sanity instead of JSON
- [x] Create revalidation API route (`app/api/revalidate/route.ts`)
- [ ] Import up to 5 products into Sanity (consult user on which ones)

## Data layer
- **Queries**: `sanity/lib/queries.ts` — GROQ strings only.
- **Products API**: `sanity/lib/products.ts` — `getProducts()`, `getProductBySlug(slug)`, `getProductsByCategory(category)`, `getProductSlugs()`. Maps Sanity documents to frontend `Product` shape (id, slug, image URL via `urlFor`, etc.).

## Revalidation
- **Route**: `app/api/revalidate/route.ts` — POST handler for Sanity webhooks. Set env `SANITY_REVALIDATE_SECRET` and configure webhook at sanity.io/manage with URL `https://YOUR_SITE_URL/api/revalidate`, projection `{_type, "slug": slug.current}`.

## Commands
- `npm run dev` — start dev server
- `npx sanity@latest schema deploy` — deploy schema to Sanity cloud

## Data Source (current)
Products are fetched from Sanity via `sanity/lib/products.ts`. Add products in Studio at `/manage`; optionally set up a webhook for on-demand revalidation.
