import { Reveal } from "../ui/Reveal";

interface BiographyEntry {
  id: string;
  period: string;
  title: string;
  body: string;
}

interface BiographyProps {
  entries: BiographyEntry[];
}

export function Biography({ entries }: BiographyProps) {
  return (
    <section id="biography" className="section-pad bg-ink-soft">
      <div className="container-wide">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-flame">
            Путь
          </p>
          <h2 className="mb-12 font-display text-3xl font-semibold text-white md:mb-16 md:text-5xl">
            Биография
          </h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-flame via-flame/40 to-transparent md:left-1/2 md:-translate-x-px" />

          <div className="space-y-10 md:space-y-14">
            {entries.map((entry, index) => {
              const left = index % 2 === 0;
              return (
                <Reveal key={entry.id} delay={index * 0.05}>
                  <div
                    className={`relative grid gap-6 md:grid-cols-2 ${
                      left ? "" : "md:[&>*:first-child]:order-2"
                    }`}
                  >
                    <div
                      className={`${
                        left ? "md:pr-12 md:text-right" : "md:pl-12"
                      } pl-10 md:pl-0`}
                    >
                      <span className="inline-block rounded-full border border-flame/30 bg-flame-dim px-3 py-1 text-xs font-medium uppercase tracking-wider text-flame">
                        {entry.period}
                      </span>
                      <h3 className="mt-3 font-display text-xl font-semibold text-white md:text-2xl">
                        {entry.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                        {entry.body}
                      </p>
                    </div>
                    <div className="hidden md:block" />
                    <span className="absolute left-[7px] top-2 h-2.5 w-2.5 rounded-full bg-flame shadow-[0_0_12px_rgba(255,90,31,0.8)] md:left-1/2 md:-translate-x-1/2" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
