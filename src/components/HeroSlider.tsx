"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRequestModal } from "@/components/RequestModalProvider";

type Slide = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  link?: { href: string; label: string };
};

const slides: Slide[] = [
  {
    eyebrow: "Партнёр Leyard",
    title: "DOSLED — официальный дистрибьютор Leyard в СНГ",
    text: "Поставляем светодиодные экраны Leyard — мирового лидера LED-индустрии — с гарантией, монтажом и сервисом.",
    image: "/works/leyard-office.jpg",
  },
  {
    eyebrow: "Leyard Group · с 1995 года",
    title: "№1 на мировом рынке LED-экранов",
    text: "Сеть продаж в 100+ странах, 10 производственных баз по всему миру, компания торгуется на бирже с 2012 года.",
    image: "/works/leyard-hq.jpg",
  },
  {
    eyebrow: "Знаковые проекты",
    title: "Экраны Leyard на Олимпиаде, ЧМ и в ООН",
    text: "Зимние Олимпийские игры 2022, ЧМ-2018, штаб-квартира ООН, CNN, «Зенит Арена» и Сбербанк — выбор лидеров отрасли.",
    image: "/works/leyard-olymp.jpg",
  },
  {
    eyebrow: "Технологии",
    title: "Micro LED и экраны с малым шагом пикселя",
    text: "Первый в мире серийный Micro LED с шагом 0,6 мм, 245 международных патентов и контроль качества на каждом этапе.",
    image: "/works/leyard-robot.jpg",
  },
  {
    eyebrow: "DOSLED в Казахстане и СНГ",
    title: "Подберём, поставим и смонтируем экран под ваш проект",
    text: "Гарантия, монтаж и сервисное обслуживание — от выбора модели Leyard до запуска на объекте.",
    image: "/works/work-07.jpg",
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

  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setActive((v) => (v + dir + slides.length) % slides.length),
    [],
  );

  // Автопрокрутка; таймер сбрасывается при ручном переключении (active в зависимостях)
  useEffect(() => {
    const id = setTimeout(() => go(1), 6000);
    return () => clearTimeout(id);
  }, [active, go]);

  // Свайп влево/вправо на смартфонах; вертикальная прокрутка страницы не блокируется
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: C.bg, touchAction: "pan-y" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
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
            style={{ opacity: 0.85 }}
          />
        </div>
      ))}

      {/* Градиент слева — тёмный фон для текста */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to right,
            ${C.bg}cc 0%,
            ${C.bg}99 30%,
            ${C.bg}33 60%,
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
              style={{ color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
            >
              {s.title}
            </h1>
            <p className="text-base md:text-lg mb-8 max-w-xl" style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}>
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
            {s.link && (
              <a
                href={s.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 inline-flex items-center gap-2 font-semibold px-6 py-3.5 rounded-full border transition-colors duration-200 hover:bg-white/10"
                style={{ color: "#ffffff", borderColor: "rgba(255,255,255,0.5)" }}
              >
                {s.link.label}
                <span aria-hidden>↗</span>
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Точки-навигация */}
      <div className="relative z-[3] flex items-center justify-center gap-4 pb-8">
        <button
          type="button"
          aria-label="Предыдущий слайд"
          onClick={() => go(-1)}
          className="hidden md:flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none transition-colors hover:bg-white/25"
          style={{ background: "rgba(255,255,255,0.12)", color: "#ffffff" }}
        >
          ‹
        </button>
        <div className="flex gap-2">
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
        <button
          type="button"
          aria-label="Следующий слайд"
          onClick={() => go(1)}
          className="hidden md:flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none transition-colors hover:bg-white/25"
          style={{ background: "rgba(255,255,255,0.12)", color: "#ffffff" }}
        >
          ›
        </button>
      </div>
    </section>
  );
}
