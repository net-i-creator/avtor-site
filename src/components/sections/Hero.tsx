"use client";

import { Wave } from "./Wave";
import { Button } from "../ui/Button";

interface HeroProps {
  title: string;
  subtitle: string;
  tagline: string;
}

export function Hero({ title, subtitle, tagline }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink-gradient pt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,90,31,0.12),transparent_55%)]" />

      <div className="container-wide relative z-10 section-pad w-full">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-flame">
            Официальный сайт
          </p>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <p className="mt-5 font-display text-xl text-white/80 sm:text-2xl md:text-3xl">
            {subtitle}
          </p>
          <p className="mt-6 max-w-xl text-base text-ink-muted sm:text-lg">
            {tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#music">
              <Button size="lg">Слушать музыку</Button>
            </a>
            <a href="#about">
              <Button size="lg" variant="secondary">
                Узнать больше
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <Wave height={100} bars={56} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
