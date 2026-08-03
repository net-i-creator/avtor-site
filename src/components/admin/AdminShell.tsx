"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/Button";

const nav = [
  { href: "/admin", label: "Дашборд", exact: true },
  { href: "/admin/settings", label: "Настройки" },
  { href: "/admin/biography", label: "Биография" },
  { href: "/admin/quotes", label: "Цитаты" },
  { href: "/admin/press", label: "Пресса" },
  { href: "/admin/gallery", label: "Галерея" },
  { href: "/admin/music", label: "Музыка" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-ink-border bg-ink-soft transition-transform lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center border-b border-ink-border px-5">
            <Link href="/admin" className="font-display font-semibold tracking-wider">
              SLVSAREVV <span className="text-flame">Admin</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-1 p-3">
            {nav.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-2.5 text-sm transition ${
                    active
                      ? "bg-flame-dim text-flame"
                      : "text-ink-muted hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 inset-x-0 border-t border-ink-border p-3 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="block rounded-xl px-4 py-2.5 text-sm text-ink-muted hover:bg-white/5 hover:text-white"
            >
              Открыть сайт ↗
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              Выйти
            </Button>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 items-center justify-between border-b border-ink-border px-5 lg:px-8">
            <button
              type="button"
              className="rounded-lg border border-ink-border px-3 py-1.5 text-sm lg:hidden"
              onClick={() => setOpen(true)}
            >
              Меню
            </button>
            <p className="hidden text-sm text-ink-muted lg:block">
              Управление контентом
            </p>
            <Link href="/" className="text-sm text-flame lg:hidden">
              Сайт
            </Link>
          </header>
          <main className="flex-1 p-5 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
