import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentCompany } from "@/lib/auth-session";
import { uploadPublicFile } from "@/lib/storage";

const MAX_LOGO_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

export async function POST(req: NextRequest) {
  const company = await getCurrentCompany();
  if (!company) {
    return NextResponse.json({ error: "Company not found." }, { status: 404 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Logo must be a PNG, JPG, WEBP, or SVG file." },
      { status: 400 }
    );
  }
  if (file.size > MAX_LOGO_BYTES) {
    return NextResponse.json({ error: "Logo must be smaller than 2MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `companies/${company.c_id}/logo`;

  let logoUrl: string;
  try {
    logoUrl = await uploadPublicFile(key, buffer, file.type);
  } catch (err) {
    console.error("Logo upload failed:", err);
    return NextResponse.json({ error: "Failed to upload logo." }, { status: 500 });
  }

  const updated = await prisma.company.update({
    where: { c_id: company.c_id },
    data: { logoUrl },
  });

  return NextResponse.json({ logoUrl: updated.logoUrl });
}