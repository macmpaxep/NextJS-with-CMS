import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-navy-2 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl bg-navy p-8 flex flex-col relative overflow-hidden">
          <div className="pixel-grid pixel-grid-fade absolute inset-0 opacity-30" />
          <div className="relative">
            <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan mb-3">Контакты</p>
            <h3 className="display font-bold text-xl mb-4">Наш адрес</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm">
              {site.address}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 border border-white/20 px-4 py-2.5 rounded-full text-sm hover:border-cyan hover:text-cyan transition"
              >
                {site.phoneDisplay}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-navy font-semibold px-4 py-2.5 rounded-full text-sm hover:opacity-90 transition"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-panel/40 border border-white/10 p-8">
          <p className="mono text-[11px] tracking-[0.2em] uppercase text-cyan mb-3">
            Электронная почта
          </p>
          <h3 className="display font-bold text-xl mb-4">Оставить заявку на почту</h3>
          <ContactForm />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} DOSLED.com | Все права защищены.</span>
          <span>{site.email}</span>
        </div>
      </div>
    </footer>
  );
}
