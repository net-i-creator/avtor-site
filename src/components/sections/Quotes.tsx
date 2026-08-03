import { Reveal } from "../ui/Reveal";
import { Card } from "../ui/Card";

interface QuoteItem {
  id: string;
  text: string;
  context: string;
}

interface QuotesProps {
  quotes: QuoteItem[];
}

export function Quotes({ quotes }: QuotesProps) {
  return (
    <section id="quotes" className="section-pad bg-ink">
      <div className="container-wide">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-flame">
            Слова
          </p>
          <h2 className="mb-12 font-display text-3xl font-semibold text-white md:mb-16 md:text-5xl">
            Цитаты
          </h2>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote, i) => (
            <Reveal key={quote.id} delay={i * 0.06}>
              <Card hover className="flex h-full flex-col justify-between">
                <blockquote className="font-display text-lg leading-snug text-white md:text-xl">
                  <span className="text-flame">«</span>
                  {quote.text}
                  <span className="text-flame">»</span>
                </blockquote>
                {quote.context && (
                  <p className="mt-6 text-xs uppercase tracking-wider text-ink-muted">
                    — {quote.context}
                  </p>
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
