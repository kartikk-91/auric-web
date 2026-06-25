import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDashboardService } from "./dashboard-service";
import type { DashboardApiError, DashboardApiResponse } from "./types";

// Never cache — dashboard data must always be fresh
export const dynamic = "force-dynamic";

function errorResponse(
  message: string,
  status: number,
  code?: string
): NextResponse<DashboardApiError> {
  return NextResponse.json(
    { success: false, error: message, ...(code && { code }) },
    { status }
  );
}

export async function GET(): Promise<
  NextResponse<DashboardApiResponse | DashboardApiError>
> {
  // ── auth ────────────────────────────────────────────────────────────────────
  const session = await auth();

  if (!session?.user) {
    return errorResponse("Unauthorized", 401, "UNAUTHORIZED");
  }

  const c_id = session.user.c_id;

  if (!c_id) {
    return errorResponse(
      "Company ID not found in session",
      403,
      "MISSING_COMPANY_ID"
    );
  }

  // ── fetch ───────────────────────────────────────────────────────────────────
  try {
    const data = await getDashboardService(c_id);

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    // Distinguish known error shapes for easier debugging
    if (error instanceof Error) {
      console.error("[dashboard] service error:", {
        message: error.message,
        stack: error.stack,
        c_id,
      });

      // Prisma errors expose a `code` property
      const prismaCode = (error as { code?: string }).code;
      if (prismaCode) {
        return errorResponse(
          "Database error — please try again",
          503,
          prismaCode
        );
      }

      return errorResponse(error.message, 500, "INTERNAL_ERROR");
    }

    console.error("[dashboard] unknown error:", error);
    return errorResponse("An unexpected error occurred", 500, "UNKNOWN_ERROR");
  }
}