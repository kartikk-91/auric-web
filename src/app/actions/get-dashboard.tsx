"use server";

import { auth } from "@/auth";

async function getCompanyId() {
  const session = await auth();

  if (!session?.user?.c_id) {
    throw new Error(
      "Unauthorized: Company ID not found"
    );
  }

  return session.user.c_id;
}

export async function getDashboardData() {
  try {
    const c_id =
      await getCompanyId();

    const baseUrl =
      process.env
        .FEEDBACK_PIPELINE_URL;

    if (!baseUrl) {
      throw new Error(
        "Missing FEEDBACK_PIPELINE_URL in environment variables"
      );
    }

    const response =
      await fetch(
        `${baseUrl}/dashboard/${c_id}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

    if (!response.ok) {
      let errorMessage =
        `Dashboard API request failed (${response.status})`;

      try {
        const errorBody =
          await response.json();

        errorMessage =
          errorBody?.detail ||
          errorMessage;
      } catch {}

      throw new Error(
        errorMessage
      );
    }

    const data =
      await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(
      "Get dashboard error:",
      error
    );

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown dashboard error",
    };
  }
}