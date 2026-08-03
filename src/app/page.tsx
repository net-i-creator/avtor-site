import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Biography } from "@/components/sections/Biography";
import { Quotes } from "@/components/sections/Quotes";
import { Press } from "@/components/sections/Press";
import { Gallery } from "@/components/sections/Gallery";
import { Music } from "@/components/sections/Music";
import { Footer } from "@/components/sections/Footer";

export const dynamic = "force-dynamic";

async function getPageData() {
  const [settings, biography, quotes, press, photos, singles] =
    await Promise.all([
      prisma.siteSettings.findUnique({ where: { id: 1 } }),
      prisma.biographyEntry.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.quote.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.pressItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.photo.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.single.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

  return {
    settings: settings ?? {
      heroTitle: "SLVSAREVV",
      heroSubtitle: "Юрий Антонович Слюсарев",
      heroTagline: "Артист. Писатель.",
      aboutText: "",
      aboutImageUrl: "/placeholders/portrait.svg",
      contactEmail: "press@slvsarevv.ru",
      socialLinks: "{}",
    },
    biography,
    quotes,
    press,
    photos,
    singles,
  };
}

export default async function HomePage() {
  const { settings, biography, quotes, press, photos, singles } =
    await getPageData();

  return (
    <>
      <Nav />
      <main>
        <Hero
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          tagline={settings.heroTagline}
        />
        <About text={settings.aboutText} imageUrl={settings.aboutImageUrl} />
        <Biography entries={biography} />
        <Quotes quotes={quotes} />
        <Press items={press} />
        <Gallery photos={photos} />
        <Music singles={singles} />
      </main>
      <Footer
        contactEmail={settings.contactEmail}
        socialLinks={settings.socialLinks}
        heroTitle={settings.heroTitle}
      />
    </>
  );
}
