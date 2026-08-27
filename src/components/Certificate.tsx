import fs from "node:fs";
import path from "node:path";

function getCertificate(): string | null {
  try {
    const dir = path.join(process.cwd(), "public");
    const files = fs.readdirSync(dir).filter((f) => /^certificate.*\.(jpe?g|png|webp|pdf)$/i.test(f));
    return files.length ? `/${files[0]}` : null;
  } catch {
    return null;
  }
}

export default function Certificate() {
  const cert = getCertificate();
  const isPdf = cert?.toLowerCase().endsWith(".pdf");

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
      <div className="mb-8">
        <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan-dim mb-2">
          Подтверждение качества
        </p>
        <h2 className="display text-2xl md:text-3xl font-bold">Наш сертификат</h2>
      </div>

      <div className="rounded-2xl border border-line/15 bg-white p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-72 aspect-[3/4] rounded-xl border border-line/15 bg-mist flex items-center justify-center overflow-hidden shrink-0">
          {cert && !isPdf ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cert} alt="Сертификат качества" className="w-full h-full object-contain" />
          ) : cert && isPdf ? (
            <a
              href={cert}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-cyan-dim underline p-6 text-center"
            >
              Открыть PDF сертификата
            </a>
          ) : (
            <span className="text-slate text-xs text-center p-6">
              Положите файл certificate.jpg / .png / .pdf в /public
            </span>
          )}
        </div>
        <div>
          <h3 className="display font-semibold text-lg mb-2">
            Официальное подтверждение соответствия
          </h3>
          <p className="text-slate text-sm leading-relaxed max-w-lg">
            Поставляемое оборудование сопровождается сертификатами качества и
            соответствия. По запросу предоставляем полный пакет документов на
            конкретную партию экранов.
          </p>
        </div>
      </div>
    </section>
  );
}
