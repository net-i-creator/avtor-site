import { prisma } from "@/lib/prisma";
import { MusicAdmin } from "./MusicAdmin";

export const dynamic = "force-dynamic";

export default async function MusicAdminPage() {
  const singles = await prisma.single.findMany({
    orderBy: { sortOrder: "asc" },
  });
  return <MusicAdmin singles={singles} />;
}
