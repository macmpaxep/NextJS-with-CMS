"use client";

import { useEffect, useState } from "react";
import { categories } from "@/data/categories";
import { site } from "@/lib/site";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  presetProduct?: string;
};

export default function RequestModal({ isOpen, onClose, presetProduct }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(site.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-modal-title"
    >
      <button
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl border border-line/20 overflow-hidden">
        <div className="pixel-grid bg-navy px-6 py-5 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-navy" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="mono text-cyan text-[11px] tracking-[0.2em] uppercase">
                Заявка на подбор
              </p>
              <h3 id="request-modal-title" className="display text-white text-xl font-bold mt-1">
                Оставить заявку
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Закрыть окно"
              className="text-white/70 hover:text-white text-2xl leading-none -mt-1"
            >
              ×
            </button>
          </div>
        </div>

        {status === "sent" ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-cyan/15 text-cyan flex items-center justify-center mx-auto mb-4 text-2xl">
              ✓
            </div>
            <p className="display font-semibold text-lg mb-1">Заявка отправлена</p>
            <p className="text-slate text-sm">
              Свяжемся с вами в ближайшее время. Можно также написать сразу в{" "}
              <a href={site.whatsapp} target="_blank" className="text-cyan-dim underline">
                WhatsApp
              </a>
              .
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2.5 rounded-lg bg-navy text-white text-sm font-medium hover:bg-navy-2 transition"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <input type="hidden" name="_subject" value="Новая заявка с сайта AGE LED" />
            {presetProduct && (
              <input type="hidden" name="Товар" value={presetProduct} />
            )}
            <Field label="Имя" name="Имя" required placeholder="Как к вам обращаться" />
            <Field label="Компания" name="Компания" placeholder="Название компании" />
            <div>
              <label className="block text-xs font-medium text-slate mb-1.5">
                Тип LED-экрана
              </label>
              <select
                name="Тип LED-экрана"
                defaultValue={presetProduct ?? ""}
                className="w-full rounded-lg border border-line/30 bg-mist px-3.5 py-2.5 text-sm focus:border-cyan focus:ring-1 focus:ring-cyan outline-none"
              >
                <option value="">Выберите тип экрана</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.label}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="Номер телефона"
              name="Телефон"
              required
              type="tel"
              placeholder="+7 ___ ___ __ __"
            />

            {status === "error" && (
              <p className="text-sm text-red-600">
                Не удалось отправить. Попробуйте ещё раз или напишите в WhatsApp.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg bg-cyan text-navy font-semibold py-3 text-sm hover:bg-cyan-dim hover:text-white transition disabled:opacity-60"
            >
              {status === "sending" ? "Отправка…" : "Отправить заявку"}
            </button>
            <p className="text-[11px] text-slate text-center">
              Нажимая «Отправить», вы соглашаетесь на обработку контактных данных.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate mb-1.5">
        {label} {required && <span className="text-cyan-dim">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line/30 bg-mist px-3.5 py-2.5 text-sm focus:border-cyan focus:ring-1 focus:ring-cyan outline-none placeholder:text-slate/60"
      />
    </div>
  );
}
