import Image from "next/image";
import { Badge } from "../ui/Badge";
import { Reveal } from "../ui/Reveal";

interface AboutProps {
  text: string;
  imageUrl: string;
}

export function About({ text, imageUrl }: AboutProps) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <section id="about" className="section-pad bg-ink">
      <div className="container-wide">
        <Reveal>
          <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-flame">
                Личность
              </p>
              <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">
                О себе
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Артист</Badge>
              <Badge variant="outline">Писатель</Badge>
            </div>
          </div>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink-border bg-ink-card">
              <Image
                src={imageUrl || "/placeholders/portrait.svg"}
                alt="SLVSAREVV — Юрий Антонович Слюсарев"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-white/80 md:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
