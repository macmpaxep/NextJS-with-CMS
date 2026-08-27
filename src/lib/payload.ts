import { getPayload } from 'payload'
import config from '@payload-config'

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
export async function getAllProducts() {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    depth: 2,
    limit: 200,
  })
  return result.docs
}

export async function getProductBySlug(slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return result.docs[0] ?? null
}

export async function getProductsByCategory(categoryId: number) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: { category: { equals: categoryId } },
    depth: 2,
    limit: 100,
  })
  return result.docs
}

export async function searchProducts(query: string) {
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
  return result.docs
}