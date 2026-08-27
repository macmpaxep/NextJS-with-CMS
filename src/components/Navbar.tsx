"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/categories";
import { useRequestModal } from "@/components/RequestModalProvider";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { open } = useRequestModal();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setMobileOpen(false);
    }
  }

  return (
    <>
      <header className="bg-white/95 backdrop-blur border-b border-line/15 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="h-16 flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img src="/logo-dosled-new.png" alt="DOSLED" className="h-10 w-auto object-contain" />
            </Link>

            <form
              onSubmit={handleSearch}
              className="hidden lg:flex flex-1 max-w-md items-center gap-2 bg-mist border border-line/20 rounded-full px-4 py-2 focus-within:border-cyan transition"
            >
              <SearchIcon />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по каталогу…"
                className="bg-transparent outline-none text-sm w-full placeholder:text-slate/70"
              />
            </form>

            <div className="flex-1 hidden lg:block" />

            <button
              onClick={() => open()}
              className="hidden md:inline-flex items-center rounded-full bg-cyan text-navy font-semibold text-sm px-5 py-2.5 hover:bg-cyan-dim hover:text-white transition shrink-0"
            >
              Оставить заявку
            </button>

            <button
              className="lg:hidden ml-auto"
              aria-label="Открыть меню"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <BurgerIcon open={mobileOpen} />
            </button>
          </div>

          <form
            onSubmit={handleSearch}
            className="lg:hidden flex items-center gap-2 bg-mist border border-line/20 rounded-full px-4 py-2 mb-3"
          >
            <SearchIcon />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по каталогу…"
              className="bg-transparent outline-none text-sm w-full placeholder:text-slate/70"
            />
          </form>

          <nav className="hidden lg:flex items-center gap-1 pb-2 -mt-1 overflow-x-auto">
            <NavLink href="/categories" strong>
              Категории
            </NavLink>
            {categories.map((c) => (
              <NavLink key={c.slug} href={`/category/${c.slug}`}>
                {c.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-line/15 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col">
            <MobileLink href="/categories" onClick={() => setMobileOpen(false)} strong>
              Категории
            </MobileLink>
            {categories.map((c) => (
              <MobileLink key={c.slug} href={`/category/${c.slug}`} onClick={() => setMobileOpen(false)}>
                {c.label}
              </MobileLink>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                open();
              }}
              className="mt-3 rounded-full bg-cyan text-navy font-semibold text-sm px-5 py-2.5"
            >
              Оставить заявку
            </button>
          </nav>
        </div>
      )}
    </>
  );
}

function NavLink({
  href,
  children,
  strong,
}: {
  href: string;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-md transition hover:bg-mist hover:text-cyan-dim ${
        strong ? "font-semibold text-navy" : "text-slate"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onClick,
  strong,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  strong?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`py-2.5 border-b border-line/10 text-sm ${strong ? "font-semibold" : "text-slate"}`}
    >
      {children}
    </Link>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate shrink-0">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}
