import ZoomImage from "@/components/ZoomImage";

const certificates = [
  {
    src: "/certificates/leyard-authorization.jpg",
    alt: "Сертификат авторизации Leyard для ТОО «Dosled»",
    title: "Авторизация Leyard",
    text: "Сертификат авторизации Leyard: ТОО «Dosled» — авторизованный бизнес-партнёр Leyard по проекту ТЦ Mega Shymkent. Срок действия: 01.05.2026 – 01.12.2026.",
    landscape: true,
  },
  {
    src: "/certificates/eac-conformity.jpg",
    alt: "Сертификат соответствия ЕАЭС",
    title: "Сертификат соответствия ЕАЭС",
    text: "Поставляемое оборудование сопровождается сертификатами качества и соответствия. По запросу предоставляем полный пакет документов на конкретную партию экранов.",
    landscape: false,
  },
];

export default function Certificate() {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
      <div className="mb-8">
        <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan-dim mb-2">
          Подтверждение качества
        </p>
        <h2 className="display text-2xl md:text-3xl font-bold">Наши сертификаты</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {certificates.map((c) => (
          <div
            key={c.src}
            className="rounded-2xl border border-line/15 bg-white p-6 flex flex-col gap-5"
          >
            <div
              className={`w-full rounded-xl border border-line/15 bg-mist overflow-hidden ${
                c.landscape ? "aspect-[1.414/1]" : "aspect-[3/4] max-h-[26rem] mx-auto"
              }`}
            >
              <ZoomImage src={c.src} alt={c.alt} fit="contain" />
            </div>
            <div>
              <h3 className="display font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-slate text-sm leading-relaxed">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
