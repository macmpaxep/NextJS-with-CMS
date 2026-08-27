"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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

  if (status === "sent") {
    return (
      <p className="text-white/80 text-sm">
        Спасибо! Заявка отправлена на {site.email}, мы свяжемся с вами.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="hidden" name="_subject" value="Заявка с сайта AGE LED (форма внизу)" />
      <input type="hidden" name="_to" value={site.email} />
      <input
        name="Имя"
        required
        placeholder="Ваше имя"
        className="w-full rounded-lg bg-navy/60 border border-white/15 px-3.5 py-2.5 text-sm placeholder:text-white/40 focus:border-cyan outline-none"
      />
      <input
        name="Email"
        type="email"
        required
        placeholder="Ваш email"
        className="w-full rounded-lg bg-navy/60 border border-white/15 px-3.5 py-2.5 text-sm placeholder:text-white/40 focus:border-cyan outline-none"
      />
      <textarea
        name="Сообщение"
        required
        rows={3}
        placeholder="Опишите задачу или интересующий тип экрана"
        className="w-full rounded-lg bg-navy/60 border border-white/15 px-3.5 py-2.5 text-sm placeholder:text-white/40 focus:border-cyan outline-none resize-none"
      />
      {status === "error" && (
        <p className="text-xs text-red-300">Не удалось отправить. Попробуйте ещё раз.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-cyan text-navy font-semibold py-2.5 text-sm hover:bg-white transition disabled:opacity-60"
      >
        {status === "sending" ? "Отправка…" : "Отправить"}
      </button>
    </form>
  );
}
