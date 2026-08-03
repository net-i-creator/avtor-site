import { z } from "zod";

export const settingsSchema = z.object({
  heroTitle: z.string().min(1, "Обязательное поле"),
  heroSubtitle: z.string().min(1, "Обязательное поле"),
  heroTagline: z.string().min(1, "Обязательное поле"),
  aboutText: z.string().min(1, "Обязательное поле"),
  aboutImageUrl: z.string().optional().default(""),
  contactEmail: z.string().email("Некорректный email"),
  socialLinks: z.object({
    telegram: z.string().optional().default(""),
    vk: z.string().optional().default(""),
    youtube: z.string().optional().default(""),
    yandexMusic: z.string().optional().default(""),
    spotify: z.string().optional().default(""),
    appleMusic: z.string().optional().default(""),
  }),
});

export const biographySchema = z.object({
  period: z.string().min(1, "Укажите период"),
  title: z.string().min(1, "Укажите заголовок"),
  body: z.string().min(1, "Укажите текст"),
  sortOrder: z.coerce.number().int().default(0),
});

export const quoteSchema = z.object({
  text: z.string().min(1, "Укажите цитату"),
  context: z.string().optional().default(""),
  sortOrder: z.coerce.number().int().default(0),
});

export const pressSchema = z.object({
  title: z.string().min(1, "Укажите заголовок"),
  excerpt: z.string().min(1, "Укажите отрывок"),
  body: z.string().optional().default(""),
  coverImageUrl: z.string().optional().default(""),
  sourceName: z.string().optional().default(""),
  sourceUrl: z.string().optional().default(""),
  category: z.enum(["MUSIC", "LITERATURE", "GENERAL"]).default("GENERAL"),
  publishedAt: z.string().optional(),
  slug: z.string().optional(),
  sortOrder: z.coerce.number().int().default(0),
});

export const photoSchema = z.object({
  url: z.string().min(1, "Загрузите изображение"),
  caption: z.string().optional().default(""),
  sortOrder: z.coerce.number().int().default(0),
});

export const singleSchema = z.object({
  title: z.string().min(1, "Укажите название"),
  coverImageUrl: z.string().optional().default(""),
  releaseYear: z.coerce.number().int().min(1990).max(2100),
  streamingLinks: z.object({
    yandexMusic: z.string().optional().default(""),
    spotify: z.string().optional().default(""),
    appleMusic: z.string().optional().default(""),
    vk: z.string().optional().default(""),
  }),
  sortOrder: z.coerce.number().int().default(0),
});

export type SettingsInput = z.infer<typeof settingsSchema>;
export type BiographyInput = z.infer<typeof biographySchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type PressInput = z.infer<typeof pressSchema>;
export type PhotoInput = z.infer<typeof photoSchema>;
export type SingleInput = z.infer<typeof singleSchema>;

export type SocialLinks = {
  telegram?: string;
  vk?: string;
  youtube?: string;
  yandexMusic?: string;
  spotify?: string;
  appleMusic?: string;
};

export type StreamingLinks = {
  yandexMusic?: string;
  spotify?: string;
  appleMusic?: string;
  vk?: string;
};

export function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
