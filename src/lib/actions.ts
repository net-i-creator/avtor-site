"use server";

import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import {
  biographySchema,
  photoSchema,
  pressSchema,
  quoteSchema,
  settingsSchema,
  singleSchema,
} from "@/lib/validators";

function revalidatePublic(slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/press/${slug}`);
}

export async function updateSettings(formData: FormData) {
  await requireAdmin();

  const raw = {
    heroTitle: String(formData.get("heroTitle") || ""),
    heroSubtitle: String(formData.get("heroSubtitle") || ""),
    heroTagline: String(formData.get("heroTagline") || ""),
    aboutText: String(formData.get("aboutText") || ""),
    aboutImageUrl: String(formData.get("aboutImageUrl") || ""),
    contactEmail: String(formData.get("contactEmail") || ""),
    socialLinks: {
      telegram: String(formData.get("telegram") || ""),
      vk: String(formData.get("vk") || ""),
      youtube: String(formData.get("youtube") || ""),
      yandexMusic: String(formData.get("yandexMusic") || ""),
      spotify: String(formData.get("spotify") || ""),
      appleMusic: String(formData.get("appleMusic") || ""),
    },
  };

  const data = settingsSchema.parse(raw);

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {
      ...data,
      socialLinks: JSON.stringify(data.socialLinks),
    },
    create: {
      id: 1,
      ...data,
      socialLinks: JSON.stringify(data.socialLinks),
    },
  });

  revalidatePublic();
  return { ok: true };
}

export async function createBiography(formData: FormData) {
  await requireAdmin();
  const data = biographySchema.parse({
    period: formData.get("period"),
    title: formData.get("title"),
    body: formData.get("body"),
    sortOrder: formData.get("sortOrder") || 0,
  });
  await prisma.biographyEntry.create({ data });
  revalidatePublic();
  return { ok: true };
}

export async function updateBiography(id: string, formData: FormData) {
  await requireAdmin();
  const data = biographySchema.parse({
    period: formData.get("period"),
    title: formData.get("title"),
    body: formData.get("body"),
    sortOrder: formData.get("sortOrder") || 0,
  });
  await prisma.biographyEntry.update({ where: { id }, data });
  revalidatePublic();
  return { ok: true };
}

export async function deleteBiography(id: string) {
  await requireAdmin();
  await prisma.biographyEntry.delete({ where: { id } });
  revalidatePublic();
  return { ok: true };
}

export async function createQuote(formData: FormData) {
  await requireAdmin();
  const data = quoteSchema.parse({
    text: formData.get("text"),
    context: formData.get("context") || "",
    sortOrder: formData.get("sortOrder") || 0,
  });
  await prisma.quote.create({ data });
  revalidatePublic();
  return { ok: true };
}

export async function updateQuote(id: string, formData: FormData) {
  await requireAdmin();
  const data = quoteSchema.parse({
    text: formData.get("text"),
    context: formData.get("context") || "",
    sortOrder: formData.get("sortOrder") || 0,
  });
  await prisma.quote.update({ where: { id }, data });
  revalidatePublic();
  return { ok: true };
}

export async function deleteQuote(id: string) {
  await requireAdmin();
  await prisma.quote.delete({ where: { id } });
  revalidatePublic();
  return { ok: true };
}

export async function createPress(formData: FormData) {
  await requireAdmin();
  const title = String(formData.get("title") || "");
  const rawSlug = String(formData.get("slug") || "");
  const slug =
    rawSlug ||
    slugify(title, { lower: true, strict: true, locale: "ru" }) ||
    `press-${Date.now()}`;

  const data = pressSchema.parse({
    title,
    excerpt: formData.get("excerpt"),
    body: formData.get("body") || "",
    coverImageUrl: formData.get("coverImageUrl") || "",
    sourceName: formData.get("sourceName") || "",
    sourceUrl: formData.get("sourceUrl") || "",
    category: formData.get("category") || "GENERAL",
    publishedAt: formData.get("publishedAt") || undefined,
    slug,
    sortOrder: formData.get("sortOrder") || 0,
  });

  await prisma.pressItem.create({
    data: {
      ...data,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      slug,
    },
  });
  revalidatePublic(slug);
  return { ok: true };
}

export async function updatePress(id: string, formData: FormData) {
  await requireAdmin();
  const existing = await prisma.pressItem.findUnique({ where: { id } });
  if (!existing) throw new Error("Not found");

  const title = String(formData.get("title") || "");
  const rawSlug = String(formData.get("slug") || "");
  const slug =
    rawSlug ||
    existing.slug ||
    slugify(title, { lower: true, strict: true, locale: "ru" });

  const data = pressSchema.parse({
    title,
    excerpt: formData.get("excerpt"),
    body: formData.get("body") || "",
    coverImageUrl: formData.get("coverImageUrl") || "",
    sourceName: formData.get("sourceName") || "",
    sourceUrl: formData.get("sourceUrl") || "",
    category: formData.get("category") || "GENERAL",
    publishedAt: formData.get("publishedAt") || undefined,
    slug,
    sortOrder: formData.get("sortOrder") || 0,
  });

  await prisma.pressItem.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.publishedAt
        ? new Date(data.publishedAt)
        : existing.publishedAt,
      slug,
    },
  });
  revalidatePublic(slug);
  revalidatePublic(existing.slug);
  return { ok: true };
}

export async function deletePress(id: string) {
  await requireAdmin();
  const item = await prisma.pressItem.delete({ where: { id } });
  revalidatePublic(item.slug);
  return { ok: true };
}

export async function createPhoto(formData: FormData) {
  await requireAdmin();
  const data = photoSchema.parse({
    url: formData.get("url"),
    caption: formData.get("caption") || "",
    sortOrder: formData.get("sortOrder") || 0,
  });
  await prisma.photo.create({ data });
  revalidatePublic();
  return { ok: true };
}

export async function updatePhoto(id: string, formData: FormData) {
  await requireAdmin();
  const data = photoSchema.parse({
    url: formData.get("url"),
    caption: formData.get("caption") || "",
    sortOrder: formData.get("sortOrder") || 0,
  });
  await prisma.photo.update({ where: { id }, data });
  revalidatePublic();
  return { ok: true };
}

export async function deletePhoto(id: string) {
  await requireAdmin();
  await prisma.photo.delete({ where: { id } });
  revalidatePublic();
  return { ok: true };
}

export async function createSingle(formData: FormData) {
  await requireAdmin();
  const data = singleSchema.parse({
    title: formData.get("title"),
    coverImageUrl: formData.get("coverImageUrl") || "",
    releaseYear: formData.get("releaseYear"),
    streamingLinks: {
      yandexMusic: String(formData.get("yandexMusic") || ""),
      spotify: String(formData.get("spotify") || ""),
      appleMusic: String(formData.get("appleMusic") || ""),
      vk: String(formData.get("vk") || ""),
    },
    sortOrder: formData.get("sortOrder") || 0,
  });
  await prisma.single.create({
    data: {
      ...data,
      streamingLinks: JSON.stringify(data.streamingLinks),
    },
  });
  revalidatePublic();
  return { ok: true };
}

export async function updateSingle(id: string, formData: FormData) {
  await requireAdmin();
  const data = singleSchema.parse({
    title: formData.get("title"),
    coverImageUrl: formData.get("coverImageUrl") || "",
    releaseYear: formData.get("releaseYear"),
    streamingLinks: {
      yandexMusic: String(formData.get("yandexMusic") || ""),
      spotify: String(formData.get("spotify") || ""),
      appleMusic: String(formData.get("appleMusic") || ""),
      vk: String(formData.get("vk") || ""),
    },
    sortOrder: formData.get("sortOrder") || 0,
  });
  await prisma.single.update({
    where: { id },
    data: {
      ...data,
      streamingLinks: JSON.stringify(data.streamingLinks),
    },
  });
  revalidatePublic();
  return { ok: true };
}

export async function deleteSingle(id: string) {
  await requireAdmin();
  await prisma.single.delete({ where: { id } });
  revalidatePublic();
  return { ok: true };
}
