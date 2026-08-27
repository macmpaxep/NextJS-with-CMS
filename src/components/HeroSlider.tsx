"use client";

import { useEffect, useState } from "react";
import { useRequestModal } from "@/components/RequestModalProvider";

const slides = [
  {
    eyebrow: "Наружные и фасадные решения",
    title: "LED-экраны, которые видно с любой точки города",
    text: "Яркость до 8 000 нит, защита IP65 и работа в диапазоне −40…+60°C — для рекламы, фасадов и стадионов.",
    image: "/works/work-07.jpg",
  },
  {
    eyebrow: "Аренда под ключ",
    title: "Модульные экраны для концертов и мероприятий",
    text: "Сборка за минуты, калиброванный цвет из коробки, доставка и монтаж в Астане и по Казахстану.",
    image: "/works/work-03.jpg",
  },
  {
    eyebrow: "Индивидуальные проекты",
    title: "От прозрачных витрин до креативных инсталляций",
    text: "Кубы, кольца, гибкие панели и напольные покрытия — рассчитаем экран под вашу задачу.",
    image: "/works/work-06.jpg",
  },
];

// Все цвета — явные hex, без var()
const C = {
  bg:       "#4a0e0e",   // самый тёмный красный — фон секции
  red:      "#c0392b",   // кнопка
  redHover: "#e74c3c",   // hover кнопки
  amber:    "#f39c12",   // надтекст eyebrow
};

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { open } = useRequestModal();

  useEffect(() => {
    const id = setInterval(() => setActive((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: C.bg }}
    >
      {/* Фоновые фото — переключаются через opacity */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.45 }}
          />
        </div>
      ))}

      {/* Градиент слева — тёмный фон для текста */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to right,
            ${C.bg}ee 0%,
            ${C.bg}cc 30%,
            ${C.bg}66 60%,
            transparent 100%
          )`,
        }}
      />

      {/* Нижний градиент — плавный переход к контенту под слайдером */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-[1]"
        style={{
          background: `linear-gradient(to bottom, transparent, ${C.bg})`,
        }}
      />

      {/* Пиксельная текстура поверх */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1.4px)",
          backgroundSize: "14px 14px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 90%)",
        }}
      />

      {/* Контент */}
      <div className="relative z-[3] max-w-7xl mx-auto px-4 lg:px-8 py-20 md:py-28 min-h-[420px] flex items-center">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-x-4 lg:inset-x-8 max-w-2xl transition-all duration-700"
            style={{
              opacity: i === active ? 1 : 0,
              transform: i === active ? "translateY(0)" : "translateY(16px)",
              pointerEvents: i === active ? "auto" : "none",
            }}
          >
            <p
              className="mono text-xs tracking-[0.25em] uppercase mb-4 font-semibold"
              style={{ color: C.amber }}
            >
              {s.eyebrow}
            </p>
            <h1
              className="display text-3xl md:text-5xl font-bold leading-[1.1] mb-5"
              style={{ color: "#ffffff" }}
            >
              {s.title}
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.72)" }}>
              {s.text}
            </p>
            <button
              onClick={() => open()}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full transition-all duration-200"
              style={{
                background: hovered ? C.redHover : C.red,
                color: "#ffffff",
              }}
            >
              Оставить заявку
              <span aria-hidden>→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Точки-навигация */}
      <div className="relative z-[3] flex justify-center gap-2 pb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Слайд ${i + 1}`}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: i === active ? "2rem" : "1rem",
              background: i === active ? "#ffffff" : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
