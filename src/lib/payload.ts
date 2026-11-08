import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { PayloadProduct } from '@/types/product'

let cached: Awaited<ReturnType<typeof getPayload>> | null = null

export async function getPayloadClient() {
  if (!cached) {
    cached = await getPayload({ config })
  }
  return cached
}

// Категории
async function getAllCategoriesUncached() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 50,
  })
  return result.docs
}

async function getCategoryBySlugUncached(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

// Товары
async function getAllProductsUncached(): Promise<PayloadProduct[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 200,
  })
  return result.docs as unknown as PayloadProduct[]
}

async function getProductBySlugUncached(slug: string): Promise<PayloadProduct | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return (result.docs[0] ?? null) as unknown as PayloadProduct | null
}

async function getProductsByCategoryUncached(categoryId: number): Promise<PayloadProduct[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { category: { equals: categoryId } },
    depth: 2,
    limit: 100,
  })
  return result.docs as unknown as PayloadProduct[]
}

async function searchProductsUncached(query: string): Promise<PayloadProduct[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: {
      or: [
        { name: { contains: query } },
        { application: { contains: query } },
        { description: { contains: query } },
      ],
    },
    depth: 2,
    limit: 50,
  })
  return result.docs as unknown as PayloadProduct[]
}

// Кэш на 60 сек: запросы к удалённой БД медленные, а данные меняются редко.
const REVALIDATE = 60
const TAGS = ['payload']

export const getAllCategories = unstable_cache(getAllCategoriesUncached, ['all-categories'], { revalidate: REVALIDATE, tags: TAGS })
export const getCategoryBySlug = unstable_cache(getCategoryBySlugUncached, ['category-by-slug'], { revalidate: REVALIDATE, tags: TAGS })
export const getAllProducts = unstable_cache(getAllProductsUncached, ['all-products'], { revalidate: REVALIDATE, tags: TAGS })
export const getProductBySlug = unstable_cache(getProductBySlugUncached, ['product-by-slug'], { revalidate: REVALIDATE, tags: TAGS })
export const getProductsByCategory = unstable_cache(getProductsByCategoryUncached, ['products-by-category'], { revalidate: REVALIDATE, tags: TAGS })
export const searchProducts = unstable_cache(searchProductsUncached, ['search-products'], { revalidate: REVALIDATE, tags: TAGS })
