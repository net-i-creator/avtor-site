import { PrismaClient } from "@prisma/client";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import path from "path";

/**
 * On Vercel (serverless) the filesystem is read-only except /tmp.
 * Copy the seeded SQLite DB into /tmp once per cold start so reads
 * (and short-lived writes) work for a demo deployment.
 */
function ensureDemoDatabase() {
  if (!process.env.VERCEL) return;

  const tmpDb = "/tmp/dev.db";
  if (existsSync(tmpDb)) return;

  const candidates = [
    path.join(process.cwd(), "prisma", "dev.db"),
    path.join(process.cwd(), "prisma", "seed.db"),
  ];

  for (const src of candidates) {
    if (existsSync(src)) {
      mkdirSync("/tmp", { recursive: true });
      copyFileSync(src, tmpDb);
      return;
    }
  }
}

ensureDemoDatabase();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
