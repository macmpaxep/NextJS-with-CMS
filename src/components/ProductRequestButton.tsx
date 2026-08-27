"use client";

import { useRequestModal } from "@/components/RequestModalProvider";
import { site } from "@/lib/site";

export default function ProductRequestButton({ productName }: { productName: string }) {
  const { open } = useRequestModal();
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => open(productName)}
        className="inline-flex items-center gap-2 bg-cyan text-navy font-semibold px-6 py-3.5 rounded-full hover:bg-navy hover:text-white transition"
      >
        Оставить заявку на этот экран
      </button>
      <a
        href={`${site.whatsapp}?text=${encodeURIComponent(
          `Здравствуйте! Интересует ${productName}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-line/25 px-6 py-3.5 rounded-full hover:border-cyan hover:text-cyan-dim transition"
      >
        Спросить в WhatsApp
      </a>
    </div>
  );
}
