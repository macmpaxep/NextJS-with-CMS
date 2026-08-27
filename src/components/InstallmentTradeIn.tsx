"use client";

import { useRequestModal } from "@/components/RequestModalProvider";

export default function InstallmentTradeIn() {
  const { open } = useRequestModal();
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 pb-16 grid md:grid-cols-2 gap-6">
      <button
        onClick={() => open()}
        className="text-left group rounded-2xl border border-line/15 bg-white p-8 flex items-center justify-between gap-6 hover:border-cyan/50 hover:shadow-lg transition"
      >
        <div>
          <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan-dim mb-2">
            Гибкая оплата
          </p>
          <h3 className="display font-bold text-2xl mb-2">Рассрочка</h3>
          <p className="text-slate text-sm max-w-sm">
            Разбейте стоимость экрана на удобные платежи без переплат банка — расчёт
            индивидуально под ваш проект.
          </p>
        </div>
        <ArrowCircle />
      </button>

      <button
        onClick={() => open()}
        className="text-left group rounded-2xl bg-navy text-white p-8 flex items-center justify-between gap-6 hover:shadow-lg transition relative overflow-hidden"
      >
        <div className="pixel-grid pixel-grid-fade absolute inset-0 opacity-40" />
        <div className="relative">
          <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan mb-2">
            Обновите оборудование
          </p>
          <h3 className="display font-bold text-2xl mb-2">Trade-in</h3>
          <p className="text-white/65 text-sm max-w-sm">
            Сдайте старый LED-экран в зачёт стоимости нового — оценим состояние
            и предложим выгодные условия обмена.
          </p>
        </div>
        <ArrowCircle dark />
      </button>
    </section>
  );
}

function ArrowCircle({ dark }: { dark?: boolean }) {
  return (
    <span
      className={`relative shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition group-hover:translate-x-1 ${
        dark ? "bg-cyan text-navy" : "bg-navy text-white"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
