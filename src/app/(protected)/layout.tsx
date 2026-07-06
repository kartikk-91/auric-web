import { prisma } from "@/lib/db";
import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const org = await prisma.company.findFirst({
    where: {
      u_id: session.user.id,
    },
    select: {
      c_id: true,
      forms: {
        select: {
          formId: true,
        },
      },
    },
  });

  if (!org) {
    redirect("/organization");
  }

  if (org.forms.length === 0) {
    redirect("/build/feedbackForm");
  }

  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
}