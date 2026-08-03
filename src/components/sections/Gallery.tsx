"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "../ui/Reveal";

interface PhotoItem {
  id: string;
  url: string;
  caption: string;
}

interface GalleryProps {
  photos: PhotoItem[];
}

export function Gallery({ photos }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  const prev = useCallback(() => {
    setActive((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length
    );
  }, [photos.length]);

  const next = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, prev, next]);

  return (
    <section id="gallery" className="section-pad bg-ink">
      <div className="container-wide">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-flame">
            Визуал
          </p>
          <h2 className="mb-12 font-display text-3xl font-semibold text-white md:mb-16 md:text-5xl">
            Фотографии
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {photos.map((photo, i) => (
            <Reveal key={photo.id} delay={i * 0.04}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-ink-border bg-ink-card focus-ring"
              >
                <Image
                  src={photo.url}
                  alt={photo.caption || `Фото ${i + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                {photo.caption && (
                  <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-left text-sm text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    {photo.caption}
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null && photos[active] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
          onClick={close}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full border border-white/20 px-3 py-1 text-sm text-white hover:border-flame hover:text-flame"
            onClick={close}
          >
            Закрыть
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 px-3 py-2 text-white hover:border-flame md:left-6"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Предыдущее фото"
          >
            ←
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 px-3 py-2 text-white hover:border-flame md:right-6"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Следующее фото"
          >
            →
          </button>
          <div
            className="relative max-h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src={photos[active].url}
                alt={photos[active].caption || "Фотография"}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            {photos[active].caption && (
              <p className="mt-4 text-center text-sm text-white/80">
                {photos[active].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
