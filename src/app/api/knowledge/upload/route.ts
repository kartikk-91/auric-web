import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentCompany } from "@/lib/auth-session";
import { auricFetch } from "@/lib/auric-api";
export const maxDuration = 120;

const MAX_FILE_BYTES = 20 * 1024 * 1024; // 20MB 
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
    const bytes = Buffer.from(await file.arrayBuffer());
    const blob = new Blob([bytes], { type: file.type || "application/octet-stream" });

    const engineForm = new FormData();
    engineForm.append("document_id", document.document_id);
    engineForm.append("file", blob, file.name);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ENGINE_TIMEOUT_MS);

    let engineRes: Response;
    try {
      engineRes = await auricFetch("/knowledge/upload", {
        method: "POST",
        body: engineForm,
        signal: controller.signal,
      }, ["knowledge:write"]);
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
