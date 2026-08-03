import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [settings, biography, quotes, press, photos, singles] =
    await Promise.all([
      prisma.siteSettings.count(),
      prisma.biographyEntry.count(),
      prisma.quote.count(),
      prisma.pressItem.count(),
      prisma.photo.count(),
      prisma.single.count(),
    ]);

  const cards = [
    {
      href: "/admin/settings",
      title: "Настройки сайта",
      value: settings ? "Настроено" : "Пусто",
      desc: "Hero, о себе, контакты, соцсети",
    },
    {
      href: "/admin/biography",
      title: "Биография",
      value: String(biography),
      desc: "Записей в таймлайне",
    },
    {
      href: "/admin/quotes",
      title: "Цитаты",
      value: String(quotes),
      desc: "Опубликованных цитат",
    },
    {
      href: "/admin/press",
      title: "Пресса",
      value: String(press),
      desc: "Публикаций и пресс-релизов",
    },
    {
      href: "/admin/gallery",
      title: "Галерея",
      value: String(photos),
      desc: "Фотографий",
    },
    {
      href: "/admin/music",
      title: "Музыка",
      value: String(singles),
      desc: "Синглов",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-white md:text-3xl">
        Дашборд
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        Добро пожаловать. Выберите раздел для редактирования контента.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <Card hover className="h-full transition">
              <p className="text-xs uppercase tracking-wider text-flame">
                {card.title}
              </p>
              <p className="mt-3 font-display text-3xl font-semibold text-white">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-ink-muted">{card.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
