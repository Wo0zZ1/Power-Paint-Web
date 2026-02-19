import { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p className="font-mono text-md text-muted-foreground my-2">
        Welcome to your Dashboard
      </p>
      {children}
    </div>
  );
}
