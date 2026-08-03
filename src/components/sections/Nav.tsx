"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "#about", label: "О себе" },
  { href: "#biography", label: "Биография" },
  { href: "#quotes", label: "Цитаты" },
  { href: "#press", label: "Пресса" },
  { href: "#gallery", label: "Фото" },
  { href: "#music", label: "Музыка" },
  { href: "#contacts", label: "Контакты" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-ink-border/80 bg-ink/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between px-5 py-4 md:px-10 lg:px-16">
        <Link
          href="/#hero"
          className="font-display text-lg font-semibold tracking-wider text-white transition hover:text-flame"
          onClick={() => setOpen(false)}
        >
          SLVSAREVV
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-ink-muted transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-border text-white lg:hidden focus-ring"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Меню</span>
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 bg-current transition ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-border bg-ink/95 px-5 py-6 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-base text-white/90 transition hover:bg-white/5 hover:text-flame"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
