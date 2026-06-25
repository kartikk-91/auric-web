"use server";

import { auth } from "@/auth";
import type { DashboardData } from "@/app/api/dashboard/types"

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getDashboardData(): Promise<Result<DashboardData>> {
  try {
    const session = await auth();

    if (!session?.user?.c_id) {
      return { success: false, error: "Unauthorized: Company ID not found" };
    }

    // Import directly — no HTTP round-trip, same process
    const { getDashboardService } = await import(
      "@/app/api/dashboard/dashboard-service"
    );

    const data = await getDashboardService(session.user.c_id);

    return { success: true, data };
  } catch (error) {
    console.error("[getDashboardData] error:", error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown dashboard error",
    };
  }
}