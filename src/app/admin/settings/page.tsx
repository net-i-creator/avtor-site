import { prisma } from "@/lib/prisma";
import { parseJson, type SocialLinks } from "@/lib/validators";
import { SettingsForm } from "./SettingsForm";
import { AdminPageHeader } from "@/components/admin/FormFields";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  const social = parseJson<SocialLinks>(settings?.socialLinks ?? "{}", {});

  return (
    <div>
      <AdminPageHeader
        title="Настройки сайта"
        description="Hero-блок, текст «О себе», контакты и ссылки на соцсети."
      />
      <SettingsForm
        initial={{
          heroTitle: settings?.heroTitle ?? "SLVSAREVV",
          heroSubtitle: settings?.heroSubtitle ?? "",
          heroTagline: settings?.heroTagline ?? "",
          aboutText: settings?.aboutText ?? "",
          aboutImageUrl: settings?.aboutImageUrl ?? "",
          contactEmail: settings?.contactEmail ?? "",
          ...social,
        }}
      />
    </div>
  );
}
