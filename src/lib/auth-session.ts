
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function getCurrentCompany() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;
  const company = await prisma.company.findFirst({
    where: { u_id: userId },
  });

  return company;
}