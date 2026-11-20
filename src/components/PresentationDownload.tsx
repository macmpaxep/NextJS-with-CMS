export default function PresentationDownload() {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8">
      <a
        href="/dosled-presentation.pdf"
        download="DOSLED-presentation.pdf"
        className="group flex items-center gap-4 rounded-xl border border-line/20 bg-white px-4 py-3 sm:max-w-md sm:mx-auto hover:border-navy/40 hover:shadow-sm transition"
      >
        <span className="shrink-0 w-9 h-9 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5" />
          </svg>
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-semibold leading-tight">Презентация DOSLED</span>
          <span className="block mono text-[11px] text-slate/70">PDF · 12,5 МБ</span>
        </span>
        <span className="shrink-0 inline-flex items-center gap-1 text-sm font-semibold text-navy group-hover:underline">
          Скачать
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
          </svg>
        </span>
      </a>
    </div>
  );
}
