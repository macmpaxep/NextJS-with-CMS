import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductsByCategory } from "@/lib/payload";
import { getImageUrl } from "@/lib/media";
import ProductCard from "@/components/ProductCard";
import ProductRequestButton from "@/components/ProductRequestButton";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};

  const title = `${product.name} — DOSLED`;
  const description =
    product.description ??
    `${product.name} — LED-экран с шагом пикселя ${product.pixelPitch ?? ""}. Купить в Астане, доставка по Казахстану.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      // Если есть фото — добавляем в OG
      images: getImageUrl(product.image, "full")
        ? [{ url: getImageUrl(product.image, "full")! }]
        : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Категория приходит как объект (depth: 2 в getProductBySlug)
  const cat =
    typeof product.category === "object"
      ? (product.category as { id: number; label?: string; slug?: string })
      : null;

  const related = cat
    ? (await getProductsByCategory(cat.id))
        .filter((p) => p.slug !== product.slug)
        .slice(0, 4)
    : [];

  const imgUrl = getImageUrl(product.image, "full");

  // Стандартные характеристики LED-экрана
  const defaultSpecs = [
    { label: "Шаг пикселя",        value: product.pixelPitch },
    { label: "Яркость",            value: product.brightness },
    { label: "Частота обновления", value: product.refreshRate },
    { label: "Класс защиты",       value: product.ipRating },
    { label: "Размер кабинета",    value: product.cabinetSize },
    { label: "Вес конструкции",    value: product.weight },
  ].filter((s) => s.value) as { label: string; value: string }[];

  // Если заданы кастомные (cPoster и т.д.) — используем их вместо стандартных
  const customSpecs =
    (product.customSpecs as { label: string; value: string }[] | null) ?? [];
  const specs = customSpecs.length > 0 ? customSpecs : defaultSpecs;

  return (
    <div className="bg-mist">
      {/* Хлебные крошки — важны для SEO */}
      <nav
        aria-label="Breadcrumb"
        className="max-w-7xl mx-auto px-4 lg:px-8 py-6 text-sm text-slate flex items-center gap-2"
      >
        <Link href="/" className="hover:text-cyan-dim">Главная</Link>
        <span aria-hidden>/</span>
        {cat?.slug && (
          <>
            <Link href={`/category/${cat.slug}`} className="hover:text-cyan-dim">
              {cat.label}
            </Link>
            <span aria-hidden>/</span>
          </>
        )}
        <span className="text-navy font-medium">{product.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 grid lg:grid-cols-2 gap-10">
        {/* Фото */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-navy">
          {imgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="pixel-grid w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-navy/10 via-transparent to-navy/70" />
            </div>
          )}
          {product.pixelPitch && (
            <div className="absolute bottom-4 left-4 mono text-xs text-cyan bg-navy/70 rounded px-2.5 py-1.5">
              {product.pixelPitch}
            </div>
          )}
        </div>

        {/* Инфо */}
        <div>
          {cat?.label && (
            <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan-dim mb-2">
              {cat.label}
            </p>
          )}
          <h1 className="display text-3xl font-bold mb-4">{product.name}</h1>
          {product.description && (
            <p className="text-slate leading-relaxed mb-6">{product.description}</p>
          )}

          {/* Характеристики */}
          {specs.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-8">
              {specs.map((s) => (
                <Spec key={s.label} label={s.label} value={s.value} />
              ))}
            </div>
          )}

          {/* Применение */}
          {product.application && (
            <div className="rounded-xl border border-line/15 bg-white p-5 mb-8">
              <p className="text-xs font-semibold text-slate uppercase tracking-wide mb-2">
                Применение
              </p>
              <p className="text-sm">{product.application}</p>
            </div>
          )}

          <ProductRequestButton productName={product.name} />
        </div>
      </div>

      {/* Похожие модели */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-16">
          <h2 className="display text-xl font-bold mb-5">Похожие модели</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line/15 bg-white px-4 py-3">
      <p className="text-[11px] text-slate uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-semibold mono">{value}</p>
    </div>
  );
}
