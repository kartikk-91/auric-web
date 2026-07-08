import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

import { mapFeedbackRecord } from "@/lib/feedback-mapper";
import { buildFeedbackWhere } from "@/lib/feedback-query";
import type { Feedback } from "@/types/feedback";
const MAX_EXPORT_ROWS = 50_000;
const BATCH_SIZE = 1_000;

function csvEscape(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function feedbackToCsvRow(f: Feedback): string {
  return [
    f.id,
    f.name,
    f.email,
    f.age,
    f.location.formatted,
    f.analysis.sentiment,
    f.analysis.rating ?? "",
    f.analysis.sentimentScore,
    f.analysis.confidence,
    f.processingStatus,
    f.receivedFull,
    f.feedback,
    f.analysis.summary,
  ]
    .map(csvEscape)
    .join(",");
}

const CSV_HEADER = [
  "ID",
  "Name",
  "Email",
  "Age",
  "Location",
  "Sentiment",
  "Rating",
  "Sentiment Score",
  "Confidence",
  "Status",
  "Submitted",
  "Feedback",
  "AI Summary",
].join(",");

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const company = await prisma.company.findFirst({
      where: { user: { email: session.user.email } },
      select: { c_id: true },
    });

    if (!company) {
      return NextResponse.json({ message: "No company found." }, { status: 404 });
    }

    const { searchParams } = request.nextUrl;
    const format = searchParams.get("format") === "json" ? "json" : "csv";

    const where = buildFeedbackWhere(company.c_id, {
      dateRange: searchParams.get("dateRange"),
      sentiment: searchParams.get("sentiment"),
      location: searchParams.get("location"),
      ageRange: searchParams.get("ageRange"),
    });

    const encoder = new TextEncoder();
    let rowsWritten = 0;

    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (format === "csv") {
            controller.enqueue(encoder.encode(CSV_HEADER + "\n"));
          } else {
            controller.enqueue(encoder.encode("["));
          }

          let cursor: string | undefined;
          let isFirstJsonRow = true;

          while (rowsWritten < MAX_EXPORT_ROWS) {
            const take = Math.min(BATCH_SIZE, MAX_EXPORT_ROWS - rowsWritten);

            const batch = await prisma.feedback.findMany({
              where,
              include: {
                form: { select: { formId: true, title: true } },
                result: true,
              },
              orderBy: [{ createdAt: "desc" }, { f_id: "desc" }],
              take,
              ...(cursor
                ? { cursor: { f_id: cursor }, skip: 1 }
                : {}),
            });

            if (batch.length === 0) break;

            for (const record of batch) {
              const mapped = mapFeedbackRecord(record);

              if (format === "csv") {
                controller.enqueue(encoder.encode(feedbackToCsvRow(mapped) + "\n"));
              } else {
                const prefix = isFirstJsonRow ? "" : ",";
                controller.enqueue(encoder.encode(prefix + JSON.stringify(mapped)));
                isFirstJsonRow = false;
              }
            }

            rowsWritten += batch.length;
            cursor = batch[batch.length - 1].f_id;

            if (batch.length < take) break; // fewer rows than requested = we've hit the end
          }

          if (format === "json") {
            controller.enqueue(encoder.encode("]"));
          }

          controller.close();
        } catch (err) {
          console.error("Export stream failed:", err);
          controller.error(err);
        }
      },
    });

    const filename = `feedback-export-${new Date().toISOString().slice(0, 10)}.${format}`;

    return new Response(stream, {
      headers: {
        "Content-Type": format === "csv" ? "text/csv; charset=utf-8" : "application/json",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "X-Export-Row-Cap": String(MAX_EXPORT_ROWS),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to export feedback." }, { status: 500 });
  }
}