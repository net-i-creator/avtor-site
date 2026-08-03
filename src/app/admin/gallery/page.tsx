import { prisma } from "@/lib/prisma";
import { GalleryAdmin } from "./GalleryAdmin";

export const dynamic = "force-dynamic";

export default async function GalleryAdminPage() {
  const photos = await prisma.photo.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return <GalleryAdmin photos={photos} />;
}
