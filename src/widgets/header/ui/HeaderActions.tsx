import { getSession } from "@/shared/lib/auth";

import { AuthenticatedMenu } from "./AuthenticatedMenu";
import { UnauthenticatedMenu } from "./UnauthenticatedMenu";

export async function HeaderActions() {
  const session = await getSession();

  if (!session) return <UnauthenticatedMenu />;

  return <AuthenticatedMenu session={session} />;
}
