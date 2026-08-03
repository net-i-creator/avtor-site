import { prisma } from "@/lib/prisma";
import { PressAdmin } from "./PressAdmin";

export const dynamic = "force-dynamic";

export default async function PressAdminPage() {
  const items = await prisma.pressItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <PressAdmin
      items={items.map((item) => ({
        ...item,
        publishedAt: item.publishedAt.toISOString(),
      }))}
    />
  );
}
