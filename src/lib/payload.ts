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
export async function getAllCategories() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 50,
  })
  return result.docs
}

export async function getCategoryBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return result.docs[0] ?? null
}

// Товары
export async function getAllProducts(): Promise<PayloadProduct[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 200,
  })
  return result.docs as unknown as PayloadProduct[]
}

export async function getProductBySlug(slug: string): Promise<PayloadProduct | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return (result.docs[0] ?? null) as unknown as PayloadProduct | null
}

export async function getProductsByCategory(categoryId: number): Promise<PayloadProduct[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { category: { equals: categoryId } },
    depth: 2,
    limit: 100,
  })
  return result.docs as unknown as PayloadProduct[]
}

export async function searchProducts(query: string): Promise<PayloadProduct[]> {
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