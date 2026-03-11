/**
 * GROQ queries for product documents.
 * Slug and image are selected in the shape the frontend expects after mapping.
 */

const productProjection = `{
  _id,
  "slug": slug.current,
  title,
  price,
  category,
  subcategory,
  image,
  description,
  inStock,
  brand
}`;

export const allProductsQuery = `*[_type == "product"]${productProjection}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0]${productProjection}`;

export const productsByCategoryQuery = `*[_type == "product" && category == $category]${productProjection}`;

export const productSlugsQuery = `*[_type == "product"].slug.current`;
