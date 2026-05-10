import { prisma } from "@/lib/db";
import { queueFeedback } from "@/lib/queue";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
) {
  try {
    const body =
      await req.json();

    const {
      formId,
      c_id,
      email,
      name,
      state,
      country,
      age,
      data,
    } = body;

    if (
      !formId ||
      !c_id ||
      !email ||
      !name ||
      !country ||
      !age
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields",
        },
        { status: 400 }
      );
    }

    const forwardedFor =
      req.headers.get(
        "x-forwarded-for"
      );

    const realIp =
      req.headers.get(
        "x-real-ip"
      );

    let ipAddress =
      "unknown";

    if (forwardedFor) {
      ipAddress =
        forwardedFor
          .split(",")[0]
          .trim();
    } else if (realIp) {
      ipAddress = realIp;
    }

    if (
      [
        "::1",
        "127.0.0.1",
      ].includes(ipAddress)
    ) {
      ipAddress =
        "LOCALHOST";
    }

    // Save feedback
    const feedback =
      await prisma.feedback.create(
        {
          data: {
            company: {
              connect: {
                c_id,
              },
            },

            form: {
              connect: {
                formId,
              },
            },

            email,
            name,
            state,
            country,
            age:
              Number(age),
            data,
            ipAddress,
          },
        }
      );

    // Queue async processing
    const queued =
      await queueFeedback(
        feedback.f_id,
        c_id
      );

    if (!queued) {
      console.error(
        "Failed to queue feedback:",
        feedback.f_id
      );
    }

    return NextResponse.json({
      success: true,
      feedbackId:
        feedback.f_id,
    });
  } catch (error) {
    console.error(
      "Feedback API Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Internal Server Error",
      },
      { status: 500 }
    );
  }
}