// app/api/knowledge/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentCompany } from "@/lib/auth-session";

// If you deploy this on Vercel, the default function timeout (10s on
// Hobby, 15s on Pro unless raised) can kill the request before embedding
// finishes on larger files. This raises the ceiling for this route only.
export const maxDuration = 120;

const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20MB — match your FastAPI validate_file_size
const ALLOWED_EXTENSIONS = ["pdf", "docx", "doc", "txt", "md", "csv"];
const ENGINE_TIMEOUT_MS = 110_000;

export async function POST(req: NextRequest) {
  const company = await getCurrentCompany();
  if (!company) {
    return NextResponse.json({ error: "Company not found." }, { status: 404 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file || !file.name) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: `Unsupported file type ".${ext}". Allowed: ${ALLOWED_EXTENSIONS.join(", ")}.` },
      { status: 400 }
    );
  }
  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File must be smaller than 20MB." }, { status: 400 });
  }

  const document = await prisma.auricDocument.create({
    data: {
      c_id: company.c_id,
      name: file.name,
      type: ext,
      storageKey: `${company.c_id}/${file.name}`,
    },
  });

  try {
    // Read the upload into a plain in-memory Blob before re-sending it.
    // Passing the original `file` object straight into a new FormData can
    // hang indefinitely — its underlying stream may already be partially
    // read by the time req.formData() handed it to us, so a fresh Blob
    // with a known byte length is the reliable way to forward it.
    const bytes = Buffer.from(await file.arrayBuffer());
    const blob = new Blob([bytes], { type: file.type || "application/octet-stream" });

    const engineForm = new FormData();
    engineForm.append("c_id", company.c_id);
    engineForm.append("document_id", document.document_id);
    engineForm.append("file", blob, file.name);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ENGINE_TIMEOUT_MS);

    let engineRes: Response;
    try {
      engineRes = await fetch(`${process.env.NEXT_PUBLIC_AURIC_API_ENDPOINT}/knowledge/upload`, {
        method: "POST",
        body: engineForm,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!engineRes.ok) {
      const detail = await engineRes.text();
      throw new Error(detail || "Ingestion service rejected the document.");
    }

    const result = await engineRes.json();

    return NextResponse.json({
      document_id: document.document_id,
      name: document.name,
      type: document.type,
      uploadedAt: document.uploadedAt,
      chunks: result.chunks,
    });
  } catch (err) {
    await prisma.auricDocument.delete({ where: { document_id: document.document_id } });

    const timedOut = err instanceof Error && err.name === "AbortError";
    console.error("Knowledge ingestion failed:", err);

    return NextResponse.json(
      {
        error: timedOut
          ? "The ingestion service took too long to respond. Please try again."
          : "Failed to process the document. Please try again.",
      },
      { status: 502 }
    );
  }
}