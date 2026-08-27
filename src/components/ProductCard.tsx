"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  // Try webp first, then jpg, then show placeholder
  const imgSrc = `/products/${product.slug}.webp`;

  return (
    <div className="group flex flex-col rounded-xl border border-line/15 bg-white overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-navy overflow-hidden">
          {!imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            /* fallback placeholder */
            <div className="pixel-grid w-full h-full flex items-end p-3">
              <div className="absolute inset-0 bg-gradient-to-br from-navy/10 via-transparent to-navy/60" />
            </div>
          )}
          <div className="absolute bottom-3 left-3 mono text-[10px] text-cyan/90 bg-navy/70 rounded px-2 py-1">
            {product.pixelPitch}
          </div>
        </div>
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="display font-semibold text-[15px] leading-snug">
          <Link href={`/product/${product.slug}`} className="hover:text-cyan-dim transition">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-slate line-clamp-2">{product.application}</p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="mono text-[11px] text-slate">{product.brightness.split("–")[0]}</span>
          <Link
            href={`/product/${product.slug}`}
            className="text-xs font-semibold text-cyan-dim hover:text-navy transition inline-flex items-center gap-1"
          >
            Подробнее
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
