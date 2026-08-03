import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SLVSAREVV — Юрий Антонович Слюсарев",
  description:
    "Официальный сайт артиста SLVSAREVV и писателя Юрия Антоновича Слюсарева. Биография, цитаты, пресса, фотографии и музыкальные синглы.",
  openGraph: {
    title: "SLVSAREVV — Юрий Антонович Слюсарев",
    description:
      "Артист. Писатель. Официальное пространство творчества.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="bg-ink">
      <body
        className={`${unbounded.variable} ${manrope.variable} min-h-screen bg-ink font-sans text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
