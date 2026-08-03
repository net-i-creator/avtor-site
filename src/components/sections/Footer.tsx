import { parseJson, type SocialLinks } from "@/lib/validators";
import { Wave } from "./Wave";

interface FooterProps {
  contactEmail: string;
  socialLinks: string;
  heroTitle: string;
}

const socialLabels: { key: keyof SocialLinks; label: string }[] = [
  { key: "telegram", label: "Telegram" },
  { key: "vk", label: "VK" },
  { key: "youtube", label: "YouTube" },
  { key: "yandexMusic", label: "Яндекс Музыка" },
  { key: "spotify", label: "Spotify" },
  { key: "appleMusic", label: "Apple Music" },
];

export function Footer({ contactEmail, socialLinks, heroTitle }: FooterProps) {
  const links = parseJson<SocialLinks>(socialLinks, {});
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="border-t border-ink-border bg-ink">
      <div className="container-wide section-pad !pb-10">
        <div className="mb-10">
          <Wave height={60} bars={40} animated={false} />
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">
              {heroTitle}
            </h2>
            <p className="mt-3 text-sm text-ink-muted">
              Деловое пространство артиста и писателя.
              <br />
              Пресса, музыка, тексты.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-flame">
              Контакты
            </h3>
            <a
              href={`mailto:${contactEmail}`}
              className="text-white transition hover:text-flame"
            >
              {contactEmail}
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-flame">
              Соцсети
            </h3>
            <ul className="flex flex-col gap-2">
              {socialLabels.map(({ key, label }) => {
                const url = links[key];
                if (!url) return null;
                return (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-muted transition hover:text-flame"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ink-border pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {heroTitle}. Все права защищены.
          </p>
          <p>Юрий Антонович Слюсарев</p>
        </div>
      </div>
    </footer>
  );
}
