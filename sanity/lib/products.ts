/**
 * Server-side data layer: fetch products from Sanity and map to frontend Product shape.
 * Use these in pages/layouts; do not import in client components.
 */

import {
  allProductsQuery,
  productBySlugQuery,
  productSlugsQuery,
  productsByCategoryQuery,
} from "./queries";
import { client } from "./client";
import { urlFor } from "./image";

export interface Product {
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

interface SanityProduct {
  _id: string;
  slug: string;
  title: string;
  price: number;
  category: string;
  subcategory: string | null;
  image: { _type: string; asset: { _ref: string } } | null;
  description: string | null;
  inStock: boolean;
  brand: string | null;
}

function mapSanityProductToProduct(doc: SanityProduct | null): Product | null {
  if (!doc) return null;
  return {
    id: doc._id,
    slug: doc.slug,
    title: doc.title,
    price: doc.price,
    category: doc.category,
    subcategory: doc.subcategory ?? "",
    image: doc.image ? urlFor(doc.image).url() : "",
    description: doc.description ?? "",
    inStock: doc.inStock ?? true,
    brand: doc.brand ?? "",
  };
}

export async function getProducts(): Promise<Product[]> {
  const docs = await client.fetch<SanityProduct[]>(allProductsQuery);
  return docs.map((d) => mapSanityProductToProduct(d)!).filter(Boolean);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const doc = await client.fetch<SanityProduct | null>(productBySlugQuery, {
    slug,
  });
  return mapSanityProductToProduct(doc);
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  const docs = await client.fetch<SanityProduct[]>(productsByCategoryQuery, {
    category,
  });
  return docs.map((d) => mapSanityProductToProduct(d)!).filter(Boolean);
}

export async function getProductSlugs(): Promise<string[]> {
  const slugs = await client.fetch<string[]>(productSlugsQuery);
  return slugs ?? [];
}
