import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { getAllCategories, getAllProducts } from "@/lib/payload";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Все категории LED-экранов — DOSLED",
  description:
    "Полный каталог светодиодных экранов: наружные, внутренние, арендные, COB, напольные, спортивные, прозрачные и креативные. Продажа и монтаж в Астане.",
  openGraph: {
    title: "Все категории LED-экранов — DOSLED",
    description: "Полный каталог светодиодных экранов. Продажа и монтаж в Астане.",
    type: "website",
  },
};

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Полный каталог"
        title="Категории LED-экранов"
        intro="Все линейки светодиодных экранов в одном месте. Выберите категорию, чтобы увидеть подробные характеристики и описания."
      />

      {/* Быстрая навигация по якорям */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`#${c.slug}`}
            className="text-sm px-4 py-2 rounded-full border border-line/20 hover:border-cyan hover:text-cyan-dim transition"
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 space-y-16">
        {categories.map((cat) => {
          const items = products.filter((p) => {
            const c = p.category;
            const catId =
              typeof c === "object" ? (c as { id: number }).id : c;
            return catId === cat.id;
          });

          return (
            <section key={cat.slug} id={cat.slug} className="scroll-mt-40">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="display text-2xl font-bold">
                    {cat.title || cat.label}
                  </h2>
                  {cat.intro && (
                    <p className="text-slate text-sm mt-1 max-w-xl">
                      {cat.intro}
                    </p>
                  )}
                </div>
                <Link
                  href={`/category/${cat.slug}`}
                  className="hidden sm:inline-flex text-sm font-semibold text-cyan-dim hover:text-navy transition items-center gap-1 shrink-0"
                >
                  Открыть раздел →
                </Link>
              </div>

              {items.length === 0 ? (
                <p className="text-slate text-sm">
                  Товары не добавлены. Добавьте в{" "}
                  <a href="/admin" className="underline">/admin</a>.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
