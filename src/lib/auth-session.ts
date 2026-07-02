// lib/auth-session.ts
//
// IMPORTANT: This assumes NextAuth v5 style `auth()` exported from "@/auth".
// Swap the import + session shape below for whatever auth setup you're
// actually using — this is the one wiring point every API route depends on.

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function getCurrentCompany() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  // Assumes one company per user. If you support multiple companies per
  // user later, pull the active c_id from the session/URL instead.
  const company = await prisma.company.findFirst({
    where: { u_id: userId },
  });

  return company;
}