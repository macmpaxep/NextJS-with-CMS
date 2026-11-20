export default function PresentationDownload() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-14">
      <div className="rounded-2xl border border-line/20 bg-white px-6 py-8 text-center">
        <h2 className="display text-xl md:text-2xl font-bold">
          Скачайте презентацию и узнайте больше о нас
        </h2>
        <p className="mono text-[11px] text-slate/70 mt-2">PDF · 12,5 МБ</p>
        <a
          href="/dosled-presentation.pdf"
          download="DOSLED-presentation.pdf"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy text-white font-semibold text-sm px-6 py-2.5 hover:opacity-90 transition"
        >
          Скачать презентацию
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
          </svg>
        </a>
      </div>
    </section>
  );
}
