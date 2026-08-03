import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";
import { Card } from "../ui/Card";

interface PressEntry {
  id: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  sourceName: string;
  category: string;
  publishedAt: Date | string;
  slug: string;
}

interface PressProps {
  items: PressEntry[];
}

const categoryLabel: Record<string, string> = {
  MUSIC: "Музыка",
  LITERATURE: "Литература",
  GENERAL: "Общее",
};

export function Press({ items }: PressProps) {
  return (
    <section id="press" className="section-pad bg-ink-soft">
      <div className="container-wide">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-flame">
            Медиа
          </p>
          <h2 className="mb-12 font-display text-3xl font-semibold text-white md:mb-16 md:text-5xl">
            Пресса и публикации
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item, i) => {
            const date = new Date(item.publishedAt).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <Reveal key={item.id} delay={i * 0.05}>
                <Link href={`/press/${item.slug}`} className="block h-full">
                  <Card hover className="flex h-full flex-col overflow-hidden !p-0">
                    <div className="relative aspect-[16/9] bg-ink">
                      <Image
                        src={item.coverImageUrl || "/placeholders/press-1.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <Badge variant="flame">
                          {categoryLabel[item.category] || item.category}
                        </Badge>
                        <span className="text-xs text-ink-muted">{date}</span>
                      </div>
                      <h3 className="font-display text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                        {item.excerpt}
                      </p>
                      {item.sourceName && (
                        <p className="mt-4 text-xs uppercase tracking-wider text-flame/80">
                          {item.sourceName}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
