export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="bg-navy scanline relative overflow-hidden">
      <div className="pixel-grid pixel-grid-fade absolute inset-0 opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <p className="mono text-cyan text-xs tracking-[0.25em] uppercase mb-3">{eyebrow}</p>
        <h1 className="display text-white text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        {intro && <p className="text-white/65 max-w-2xl">{intro}</p>}
      </div>
    </div>
  );
}
