import type { MetadataRoute } from "next";
import { getAllCategories, getAllProducts } from "@/lib/payload";

export const dynamic = "force-dynamic";

const BASE = "https://dosled.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  try {
    const [categories, products] = await Promise.all([getAllCategories(), getAllProducts()]);
    for (const c of categories) {
      entries.push({
        url: `${BASE}/category/${c.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
    for (const p of products) {
      entries.push({
        url: `${BASE}/product/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt as string) : now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // БД недоступна — отдаём хотя бы статические страницы
  }

  return entries;
}
