import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentCompany } from "@/lib/auth-session";

export async function GET() {
  const company = await getCurrentCompany();
  if (!company) {
    return NextResponse.json({ error: "Company not found." }, { status: 404 });
  }

  return NextResponse.json({
    c_id: company.c_id,
    cname: company.cname,
    phoneNumber: company.phoneNumber,
    address: company.address,
    logoUrl: company.logoUrl,
    description: company.description,
    website: company.website,
  });
}

export async function PATCH(req: NextRequest) {
  const company = await getCurrentCompany();
  if (!company) {
    return NextResponse.json({ error: "Company not found." }, { status: 404 });
  }

  const body = await req.json();
  const { cname, phoneNumber, address, description, website } = body ?? {};
  const errors: string[] = [];
  if (cname !== undefined && (!cname.trim() || cname.length > 255)) {
    errors.push("Company name must be 1-255 characters.");
  }
  if (phoneNumber !== undefined && (!phoneNumber.trim() || phoneNumber.length > 20)) {
    errors.push("Phone number must be 1-20 characters.");
  }
  if (address !== undefined && (!address.trim() || address.length > 255)) {
    errors.push("Address must be 1-255 characters.");
  }
  if (description !== undefined && description.length > 255) {
    errors.push("Description must be 255 characters or fewer.");
  }
  if (website !== undefined && website.length > 255) {
    errors.push("Website must be 255 characters or fewer.");
  }
  if (errors.length) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const updated = await prisma.company.update({
    where: { c_id: company.c_id },
    data: {
      ...(cname !== undefined && { cname }),
      ...(phoneNumber !== undefined && { phoneNumber }),
      ...(address !== undefined && { address }),
      ...(description !== undefined && { description }),
      ...(website !== undefined && { website }),
    },
  });

  return NextResponse.json({
    c_id: updated.c_id,
    cname: updated.cname,
    phoneNumber: updated.phoneNumber,
    address: updated.address,
    logoUrl: updated.logoUrl,
    description: updated.description,
    website: updated.website,
  });
}