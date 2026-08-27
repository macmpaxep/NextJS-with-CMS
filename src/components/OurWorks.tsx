"use client";

import { useState, useEffect, useCallback } from "react";

type Work = {
  src: string;
  title: string;
  description: string;
  tags?: string[];
};

const works: Work[] = [
  {
    src: "/works/work-01.jpg",
    title: "Renzo Rinaldi",
    description: "LED-экран для магазина монобрендовой мужской одежды Renzo Rinaldi",
    tags: ["Шаг пикселя P2.5", "1280 × 2080 мм"],
  },
  {
    src: "/works/work-02.jpg",
    title: "Adidas — ТРЦ Хан Шатыр",
    description: "LED-экран для магазина Adidas в ТРЦ Хан Шатыр, г. Астана",
    tags: ["Шаг пикселя P1.8", "960 × 1920 мм"],
  },
  {
    src: "/works/work-03.jpg",
    title: "Театр Алатау — Алматы",
    description: "LED-экраны для Театра традиционного искусства Алатау, г. Алматы",
    tags: ["Площадь 140 м²", "Аренда под ключ"],
  },
  {
    src: "/works/work-04.jpg",
    title: "Театр Алатау — Алматы (2)",
    description: "LED-экраны для Театра традиционного искусства Алатау, г. Алматы",
    tags: ["Сценическое решение", "Высокая яркость"],
  },
  {
    src: "/works/work-05.jpg",
    title: "Театр Алатау — Алматы (3)",
    description: "LED-экраны для Театра традиционного искусства Алатау, г. Алматы",
    tags: ["Вертикальные боковые экраны"],
  },
  {
    src: "/works/work-06.jpg",
    title: "KHS HUB — бегущая строка",
    description: "Белая бегущая строка для KHS HUB",
    tags: ["Вертикальный формат", "Креативная конструкция"],
  },
  {
    src: "/works/work-07.jpg",
    title: "Қазмедиа орталығы / Телеканал Хабар",
    description: "Экран для Қазмедиа орталығы — телеканал Хабар. П-образная форма без прямых углов",
    tags: ["Шаг пикселя P2.5", "29 760 × 5 920 мм"],
  },
  {
    src: "/works/work-08.jpg",
    title: "СОШ №106 — Астана",
    description: "LED-экран для средней общеобразовательной школы №106, г. Астана",
    tags: ["Шаг пикселя P2", "4160 × 2560 мм"],
  },
  {
    src: "/works/work-09.jpg",
    title: "Аэропорт Костанай",
    description: "LED-экран для аэропорта г. Костанай",
    tags: ["Шаг пикселя P1.8", "1920 × 1600 мм"],
  },
  {
    src: "/works/work-11.jpg",
    title: "КТЖ — Конференц-зал",
    description: "LED-экран и комплекс систем для конференций — Қазақстан Темір Жолы (КТЖ)",
    tags: ["Шаг пикселя P1.8", "6080 × 4000 мм", "Конференц-система"],
  },
];

export default function OurWorks() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prevSlide = useCallback(() => {
    setActive((v) => (v - 1 + works.length) % works.length);
  }, []);

  const nextSlide = useCallback(() => {
    setActive((v) => (v + 1) % works.length);
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightbox !== null) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") setLightbox((v) => v !== null ? (v - 1 + works.length) % works.length : null);
        if (e.key === "ArrowRight") setLightbox((v) => v !== null ? (v + 1) % works.length : null);
      } else {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, prevSlide, nextSlide, closeLightbox]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const current = works[active];
  const prev = works[(active - 1 + works.length) % works.length];
  const next = works[(active + 1) % works.length];

  return (
    <section className="bg-navy scanline relative overflow-hidden">
      <div className="pixel-grid pixel-grid-fade absolute inset-0 opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan mb-2">Портфолио</p>
            <h2 className="display text-white text-2xl md:text-3xl font-bold">Наши работы</h2>
          </div>
          <p className="mono text-white/40 text-sm hidden sm:block">
            {active + 1} / {works.length}
          </p>
        </div>

        {/* Main slider layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">

          {/* Prev thumbnail */}
          <button
            onClick={prevSlide}
            aria-label="Предыдущая работа"
            className="hidden lg:block w-40 xl:w-48 shrink-0 group"
          >
            <div className="aspect-square w-full rounded-xl overflow-hidden border-2 border-white/10 group-hover:border-cyan/50 transition opacity-50 group-hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={prev.src} alt={prev.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
          </button>

          {/* Active slide */}
          <div className="flex-1 w-full">
            <button
              onClick={() => setLightbox(active)}
              aria-label="Открыть фото"
              className="group w-full block relative"
            >
              {/* 1:1 container */}
              <div className="aspect-square w-full max-w-lg mx-auto rounded-2xl overflow-hidden border-2 border-cyan/30 shadow-[0_0_40px_rgba(0,194,255,0.15)] relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.src}
                  alt={current.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Zoom hint overlay */}
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 text-navy rounded-full p-3 shadow-lg">
                    <ZoomIcon />
                  </span>
                </div>
              </div>
            </button>

            {/* Description card */}
            <div className="max-w-lg mx-auto mt-5 rounded-xl bg-white/[0.06] border border-white/10 px-5 py-4 backdrop-blur">
              <h3 className="display font-bold text-white text-base mb-1">{current.title}</h3>
              <p className="text-white/65 text-sm leading-relaxed mb-3">{current.description}</p>
              {current.tags && (
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((tag) => (
                    <span key={tag} className="mono text-[11px] bg-cyan/15 text-cyan px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile nav buttons */}
            <div className="flex items-center justify-center gap-4 mt-5 lg:hidden">
              <NavBtn onClick={prevSlide} dir="left" />
              <span className="mono text-white/40 text-sm">{active + 1} / {works.length}</span>
              <NavBtn onClick={nextSlide} dir="right" />
            </div>
          </div>

          {/* Next thumbnail */}
          <button
            onClick={nextSlide}
            aria-label="Следующая работа"
            className="hidden lg:block w-40 xl:w-48 shrink-0 group"
          >
            <div className="aspect-square w-full rounded-xl overflow-hidden border-2 border-white/10 group-hover:border-cyan/50 transition opacity-50 group-hover:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={next.src} alt={next.title} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
          </button>
        </div>

        {/* Desktop arrow nav */}
        <div className="hidden lg:flex justify-center gap-4 mt-8">
          <NavBtn onClick={prevSlide} dir="left" />
          <div className="flex items-center gap-1.5">
            {works.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Работа ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-8 bg-cyan" : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <NavBtn onClick={nextSlide} dir="right" />
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            aria-label="Закрыть"
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition z-10"
          >
            ×
          </button>

          {/* Prev */}
          <button
            onClick={() => setLightbox((v) => v !== null ? (v - 1 + works.length) % works.length : null)}
            aria-label="Назад"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
          >
            <LbNav dir="left" />
          </button>

          {/* Image + info */}
          <div className="flex flex-col items-center max-w-3xl w-full">
            <div className="aspect-square w-full max-h-[70vh] rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={works[lightbox].src}
                alt={works[lightbox].title}
                className="w-full h-full object-contain bg-black"
              />
            </div>
            <div className="mt-4 text-center px-4">
              <p className="display text-white font-bold text-lg">{works[lightbox].title}</p>
              <p className="text-white/60 text-sm mt-1">{works[lightbox].description}</p>
              {works[lightbox].tags && (
                <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {works[lightbox].tags!.map((tag) => (
                    <span key={tag} className="mono text-[11px] bg-cyan/20 text-cyan px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <p className="mono text-white/30 text-xs mt-4">{lightbox + 1} / {works.length} — клик по стрелкам или ← → на клавиатуре</p>
          </div>

          {/* Next */}
          <button
            onClick={() => setLightbox((v) => v !== null ? (v + 1) % works.length : null)}
            aria-label="Вперёд"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
          >
            <LbNav dir="right" />
          </button>
        </div>
      )}
    </section>
  );
}

function NavBtn({ onClick, dir }: { onClick: () => void; dir: "left" | "right" }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Назад" : "Вперёд"}
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan/20 border border-white/20 hover:border-cyan/50 flex items-center justify-center text-white/80 hover:text-cyan transition"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        {dir === "left" ? (
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

function LbNav({ dir }: { dir: "left" | "right" }) {
  return (
    <span className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        {dir === "left" ? (
          <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </span>
  );
}

function ZoomIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
