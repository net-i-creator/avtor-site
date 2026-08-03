"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

export function AdminProviders({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
