import { getServerSession } from "next-auth";

import { AuthenticatedMenu } from "./AuthenticatedMenu";
import { UnauthenticatedMenu } from "./UnauthenticatedMenu";

export async function HeaderActions() {
  const session = await getServerSession();

  if (!session) return <UnauthenticatedMenu />;

  return <AuthenticatedMenu session={session} />;
}
