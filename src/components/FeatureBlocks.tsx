"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categories } from "@/data/categories";
import { products, type Product } from "@/data/products";

export default function FeatureBlocks() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 grid md:grid-cols-3 gap-6">
      <QualityBlock />
      <HotDealsBlock />
      <EmotionsBlock />
    </section>
  );
}

function QualityBlock() {
  return (
    <div className="rounded-2xl bg-navy text-white p-7 flex flex-col">
      <div className="w-11 h-11 rounded-lg bg-cyan/15 flex items-center justify-center mb-5">
        <ShieldIcon />
      </div>
      <h3 className="display font-bold text-lg mb-2">Гарантия качества и лучший сервис</h3>
      <p className="text-white/65 text-sm leading-relaxed mb-5">
        Заводская калибровка цвета, входной контроль каждой партии модулей и гарантия
        на оборудование — от поставки до сервисного обслуживания после монтажа.
      </p>
      <ul className="mt-auto space-y-2 text-sm text-white/80">
        <li className="flex items-center gap-2">
          <Dot /> Гарантия на модули и контроллеры
        </li>
        <li className="flex items-center gap-2">
          <Dot /> Монтаж и пуско-наладка
        </li>
        <li className="flex items-center gap-2">
          <Dot /> Сервисная поддержка в Астане
        </li>
      </ul>
    </div>
  );
}

function HotDealsBlock() {
  const picks = useMemo(() => randomPicks(products, 3), []);
  const [items, setItems] = useState<Product[]>(picks);

  function reroll() {
    setItems(randomPicks(products, 3));
  }

  return (
    <div className="rounded-2xl border overflow-hidden relative" style={{ borderColor: "#c9a0a0" }}>
      
      {/* Фоновая картинка 40% прозрачности */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/works/work-04.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.4 }}
      />

      {/* Тёмный оверлей поверх фото */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(74,14,14,0.75)" }}
      />

      {/* Контент */}
      <div className="relative z-10 p-7 flex flex-col h-full">
        <div className="flex items-center justify-between mb-5">
          <div
            className="w-11 h-11 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(243,156,18,0.2)" }}
          >
            <FireIcon />
          </div>
          <button
            onClick={reroll}
            className="text-xs font-medium flex items-center gap-1 transition"
            style={{ color: "rgba(255,255,255,0.6)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            title="Обновить подборку"
          >
            <RefreshIcon />
            обновить
          </button>
        </div>
        <h3 className="font-bold text-lg mb-2" style={{ color: "#ffffff", fontFamily: "var(--font-display)" }}>
          Горячие предложения
        </h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
          Подборка обновляется — нажмите «обновить» или выберите товары вручную.
        </p>
        <ul className="space-y-3">
          {items.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/product/${p.slug}`}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >
                <span className="text-sm font-medium truncate" style={{ color: "#ffffff" }}>{p.name}</span>
                <span className="text-[11px] shrink-0" style={{ color: "#f39c12", fontFamily: "monospace" }}>{p.pixelPitch}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EmotionsBlock() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-panel to-navy text-white p-7 flex flex-col relative overflow-hidden">
      <div className="pixel-grid pixel-grid-fade absolute inset-0 opacity-60" />
      <div className="relative w-11 h-11 rounded-lg bg-cyan/15 flex items-center justify-center mb-5">
        <SparkIcon />
      </div>
      <h3 className="relative display font-bold text-lg mb-2">Вызывайте эмоции с LED</h3>
      <p className="relative text-white/65 text-sm leading-relaxed mb-5">
        Яркая картинка, динамичный контент и точная цветопередача — экран, который
        останавливает взгляд и работает на образ бренда.
      </p>
      <div className="relative mt-auto flex flex-wrap gap-2">
        {categories.slice(0, 4).map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className="text-xs bg-white/10 hover:bg-cyan hover:text-navy transition px-3 py-1.5 rounded-full"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function randomPicks<T>(arr: T[], n: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function Dot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />;
}
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-cyan">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FireIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber">
      <path
        d="M12 3s3 3 3 6a3 3 0 01-3 3 2 2 0 01-2-2c-2 1.5-3 3.5-3 5.5A5 5 0 0012 21a5 5 0 005-5c0-4-2-6-5-13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-cyan">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function RefreshIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 4v5h5M20 20v-5h-5M4.5 15a8 8 0 0014.9 2.5M19.5 9A8 8 0 004.6 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
