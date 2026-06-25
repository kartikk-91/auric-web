import { NextResponse } from "next/server";
import { auth } from "@/auth";

import { parseFeedbackData } from "@/lib/feedback-parser";
import type { Feedback } from "@/types/feedback";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const company = await prisma.company.findFirst({
      where: {
        user: {
          email: session.user.email,
        },
      },
      select: {
        c_id: true,
      },
    });

    if (!company) {
      return NextResponse.json([]);
    }

    const feedbacks = await prisma.feedback.findMany({
      where: {
        c_id: company.c_id,
      },
      include: {
        form: {
          select: {
            formId: true,
            title: true,
          },
        },
        result: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const response: Feedback[] = feedbacks.map((feedback) => {
      const parsed = parseFeedbackData(feedback.data);

      return {
        id: feedback.f_id,

        formId: feedback.formId,

        name: feedback.name,

        email: feedback.email,

        age: feedback.age,

        feedback: parsed.feedback,

        responses: parsed.responses,

        createdAt: feedback.createdAt.toISOString(),

        received: getRelativeTime(feedback.createdAt),

        receivedFull: feedback.createdAt.toLocaleString(),

        processingStatus: feedback.processingStatus,

        location: {
          country:
            feedback.result?.country ??
            feedback.country,

          state:
            feedback.result?.state ??
            feedback.state,

          formatted:
            feedback.result?.formattedLocation ??
            `${feedback.state}, ${feedback.country}`,

          flag:
            feedback.result?.countryFlag ??
            undefined,
        },

        analysis: {
          sentiment:
            capitalizeSentiment(
              feedback.result?.sentiment
            ),

          sentimentScore:
            feedback.result?.sentimentScore ??
            0,

          rating:
            feedback.result?.rating ??
            parsed.rating,

          summary:
            feedback.result?.summary ??
            "",

          testimonial:
            feedback.result?.testimonial ??
            "",

          praisedFeatures:
            Array.isArray(
              feedback.result?.praisedFeatures
            )
              ? (feedback.result
                  ?.praisedFeatures as string[])
              : [],

          criticizedFeatures:
            Array.isArray(
              feedback.result
                ?.criticizedFeatures
            )
              ? (feedback.result
                  ?.criticizedFeatures as string[])
              : [],

          confidence:
            feedback.result?.confidence ??
            0,
        },
      };
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to fetch feedback.",
      },
      {
        status: 500,
      }
    );
  }
}

function capitalizeSentiment(
  sentiment?: string
): "Positive" | "Neutral" | "Negative" {
  switch (sentiment?.toLowerCase()) {
    case "positive":
      return "Positive";

    case "negative":
      return "Negative";

    default:
      return "Neutral";
  }
}

function getRelativeTime(date: Date) {
  const now = new Date();

  const diff =
    Math.floor(
      (now.getTime() -
        date.getTime()) /
        (1000 * 60 * 60 * 24)
    );

  if (diff === 0) return "Today";

  if (diff === 1)
    return "Yesterday";

  if (diff < 7)
    return `${diff} days ago`;

  if (diff < 30)
    return `${Math.floor(
      diff / 7
    )} week${diff >= 14 ? "s" : ""} ago`;

  if (diff < 365)
    return `${Math.floor(
      diff / 30
    )} month${diff >= 60 ? "s" : ""} ago`;

  return `${Math.floor(
    diff / 365
  )} year${diff >= 730 ? "s" : ""} ago`;
}