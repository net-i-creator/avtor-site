import { prisma } from "@/lib/prisma";
import { BiographyAdmin } from "./BiographyAdmin";

export const dynamic = "force-dynamic";

export default async function BiographyPage() {
  const entries = await prisma.biographyEntry.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return <BiographyAdmin entries={entries} />;
}
