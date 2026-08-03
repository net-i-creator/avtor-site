import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { Card } from "../ui/Card";
import { parseJson, type StreamingLinks } from "@/lib/validators";

interface SingleItem {
  id: string;
  title: string;
  coverImageUrl: string;
  releaseYear: number;
  streamingLinks: string;
}

interface MusicProps {
  singles: SingleItem[];
}

const platformLabels: { key: keyof StreamingLinks; label: string }[] = [
  { key: "yandexMusic", label: "Яндекс Музыка" },
  { key: "spotify", label: "Spotify" },
  { key: "appleMusic", label: "Apple Music" },
  { key: "vk", label: "VK Музыка" },
];

export function Music({ singles }: MusicProps) {
  return (
    <section id="music" className="section-pad bg-ink-soft">
      <div className="container-wide">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-flame">
            Релизы
          </p>
          <h2 className="mb-12 font-display text-3xl font-semibold text-white md:mb-16 md:text-5xl">
            Музыка / Синглы
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {singles.map((single, i) => {
            const links = parseJson<StreamingLinks>(single.streamingLinks, {});
            return (
              <Reveal key={single.id} delay={i * 0.06}>
                <Card hover className="overflow-hidden !p-0">
                  <div className="relative aspect-square bg-ink">
                    <Image
                      src={single.coverImageUrl || "/placeholders/single-1.svg"}
                      alt={single.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-flame">
                      {single.releaseYear}
                    </p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-white">
                      {single.title}
                    </h3>
                    <div className="mt-4 flex flex-col gap-1.5">
                      {platformLabels.map(({ key, label }) => {
                        const url = links[key];
                        if (!url) return null;
                        return (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-ink-muted transition hover:text-flame"
                          >
                            {label} →
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
