import Link from "next/link";
import { categories } from "@/data/categories";
import { productsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function CategoryRows() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-4 space-y-16">
      {categories.map((c) => {
        const items = productsByCategory(c.slug).slice(0, 5);
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
              <ProductCard product={p} />
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
      })}
    </section>
  );
}
