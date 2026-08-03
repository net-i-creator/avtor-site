import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";

export const dynamic = "force-dynamic";

const categoryLabel: Record<string, string> = {
  MUSIC: "Музыка",
  LITERATURE: "Литература",
  GENERAL: "Общее",
};

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const item = await prisma.pressItem.findUnique({
    where: { slug: params.slug },
  });
  if (!item) return { title: "Материал не найден" };
  return {
    title: `${item.title} — SLVSAREVV`,
    description: item.excerpt,
  };
}

export default async function PressDetailPage({ params }: PageProps) {
  const [item, settings] = await Promise.all([
    prisma.pressItem.findUnique({ where: { slug: params.slug } }),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
  ]);

  if (!item) notFound();

  const date = new Date(item.publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const paragraphs = item.body.split("\n\n").filter(Boolean);

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-ink pt-24">
        <article className="container-narrow section-pad !pt-10">
          <Link
            href="/#press"
            className="text-sm text-ink-muted transition hover:text-flame"
          >
            ← Назад к прессе
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Badge>{categoryLabel[item.category] || item.category}</Badge>
            <span className="text-sm text-ink-muted">{date}</span>
            {item.sourceName && (
              <span className="text-sm text-flame/80">{item.sourceName}</span>
            )}
          </div>

          <h1 className="mt-6 font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-ink-muted">{item.excerpt}</p>

          {item.coverImageUrl && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-ink-border">
              <Image
                src={item.coverImageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}

          <div className="prose-custom mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-white/85 md:text-lg">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {item.sourceUrl && item.sourceUrl !== "#" && (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex text-flame transition hover:text-flame-soft"
            >
              Источник →
            </a>
          )}
        </article>
      </main>
      <Footer
        contactEmail={settings?.contactEmail ?? "press@slvsarevv.ru"}
        socialLinks={settings?.socialLinks ?? "{}"}
        heroTitle={settings?.heroTitle ?? "SLVSAREVV"}
      />
    </>
  );
}
