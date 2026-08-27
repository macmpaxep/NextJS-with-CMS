import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { categories } from "@/data/categories";
import ProductCard from "@/components/ProductCard";

export default async function CategoryRows() {
  const payload = await getPayload({ config });

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-4 space-y-16">
      {await Promise.all(categories.map(async (c) => {
        const result = await payload.find({
          collection: "products",
          where: {
            "category.slug": { equals: c.slug },
          },
          limit: 5,
        });

        const items = result.docs;
        if (items.length === 0) return null;

        return (
          <div key={c.slug}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan-dim mb-1">
                  Каталог
                </p>
                <h2 className="display text-2xl font-bold">{c.title}</h2>
              </div>
              <Link
                href={`/category/${c.slug}`}
                className="hidden sm:inline-flex text-sm font-semibold text-cyan-dim hover:text-navy transition items-center gap-1"
              >
                Смотреть все
                <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {items.map((p, i) => (
                <div key={p.slug} className={i === 4 ? "hidden sm:block" : ""}>
                  <ProductCard product={p as any} />
                </div>
              ))}
            </div>
            <Link
              href={`/category/${c.slug}`}
              className="sm:hidden mt-4 inline-flex text-sm font-semibold text-cyan-dim items-center gap-1"
            >
              Смотреть все →
            </Link>
          </div>
        );
      }))}
    </section>
  );
}