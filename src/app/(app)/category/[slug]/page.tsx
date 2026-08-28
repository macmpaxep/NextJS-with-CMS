import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/payload";

// Убираем generateStaticParams — страницы рендерятся динамически из Payload
// Если хотите SSG — добавьте позже после наполнения данными

export const revalidate = 60; // ISR: обновление каждую минуту

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.title || category.label} — DOSLED`,
    description: category.intro ?? `Купить ${category.label} LED-экраны в Астане. Доставка и монтаж по Казахстану.`,
    openGraph: {
      title: `${category.title || category.label} — DOSLED`,
      description: category.intro ?? undefined,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

const items = await getProductsByCategory(Number(category.id))

  return (
    <>
      <PageHeader
        eyebrow="Категория"
        title={category.title || category.label}
        intro={category.intro ?? undefined}
      />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <p className="text-sm text-slate mb-6">
          Найдено моделей:{" "}
          <span className="font-semibold text-navy">{items.length}</span>
        </p>
        {items.length === 0 ? (
          <p className="text-slate">
            Товары не добавлены. Добавьте их в{" "}
            <a href="/admin" className="underline">/admin</a>.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
