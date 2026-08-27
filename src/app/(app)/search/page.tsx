import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { searchProducts } from "@/lib/payload";

export const revalidate = 0; // поиск всегда динамический

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  return {
    title: query
      ? `Поиск: «${query}» — DOSLED`
      : "Поиск по каталогу — DOSLED",
    // Страницы поиска не индексируем — дубли вредят SEO
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const results = query ? await searchProducts(query) : [];

  return (
    <>
      <PageHeader
        eyebrow="Поиск"
        title={query ? `Результаты по запросу «${query}»` : "Поиск по каталогу"}
        intro={`Найдено моделей: ${results.length}`}
      />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {results.length === 0 ? (
          <p className="text-slate">
            Ничего не найдено. Попробуйте название серии (например, «FA») или
            тип экрана (например, «наружные»).
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
