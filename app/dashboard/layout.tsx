import { getTranslations } from "next-intl/server";
import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const t = await getTranslations();

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold">{t("dashboard.title")}</h1>
      <p className="font-mono text-md text-muted-foreground my-2">
        {t("dashboard.welcome")}
      </p>
      {children}
    </div>
  );
}
