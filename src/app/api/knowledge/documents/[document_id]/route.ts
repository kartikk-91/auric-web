import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentCompany } from "@/lib/auth-session";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ document_id: string }> }
) {
  const { document_id } = await params;

  const company = await getCurrentCompany();
  if (!company) {
    return NextResponse.json({ error: "Company not found." }, { status: 404 });
  }

  const document = await prisma.auricDocument.findUnique({
    where: { document_id },
  });

  if (!document || document.c_id !== company.c_id) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }
  const engineRes = await fetch(
    `${process.env.NEXT_PUBLIC_AURIC_API_ENDPOINT}/knowledge/${document_id}?c_id=${company.c_id}`,
    { method: "DELETE" }
  );

  if (!engineRes.ok && engineRes.status !== 404) {
    const detail = await engineRes.text();
    console.error("Knowledge deletion failed:", detail);
    return NextResponse.json(
      { error: "Failed to remove the document from the knowledge base. Please try again." },
      { status: 502 }
    );
  }

  await prisma.auricDocument.delete({
    where: { document_id: document.document_id },
  });

  return NextResponse.json({ message: "Document deleted." });
}