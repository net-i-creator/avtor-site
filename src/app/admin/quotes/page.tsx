import { prisma } from "@/lib/prisma";
import { QuotesAdmin } from "./QuotesAdmin";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  const quotes = await prisma.quote.findMany({ orderBy: { sortOrder: "asc" } });
  return <QuotesAdmin quotes={quotes} />;
}
