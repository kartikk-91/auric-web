import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentCompany } from "@/lib/auth-session";

export async function GET() {
  const company = await getCurrentCompany();
  if (!company) {
    return NextResponse.json({ error: "Company not found." }, { status: 404 });
  }

  const documents = await prisma.auricDocument.findMany({
    where: { c_id: company.c_id },
    orderBy: { uploadedAt: "desc" },
    select: {
      document_id: true,
      name: true,
      type: true,
      uploadedAt: true,
    },
  });

  return NextResponse.json({ documents });
}