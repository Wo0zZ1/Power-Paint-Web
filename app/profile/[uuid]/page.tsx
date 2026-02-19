import { cn } from "@/utils";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ uuid: number }>;
}) {
  const { uuid } = await params;

  const cookieStore = await cookies();

  const user = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${uuid}`, {
    headers: { Cookie: cookieStore.toString() },
  }).then((res) => res.json());

  if (!user || user.error) notFound();

  return <div className={cn("")}>{JSON.stringify(user)}</div>;
}
