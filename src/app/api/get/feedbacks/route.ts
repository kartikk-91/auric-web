import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

import { mapFeedbackRecord } from "@/lib/feedback-mapper";
import { buildFeedbackWhere, parsePage, parsePageSize } from "@/lib/feedback-query";
import { Prisma } from "@/generated/prisma/client";

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
      return NextResponse.json({
        data: [],
        page: 1,
        pageSize: 0,
        total: 0,
        totalPages: 0,
        stats: { total: 0, positive: 0, neutral: 0, negative: 0 },
      });
    }

    const { searchParams } = request.nextUrl;

    const page = parsePage(searchParams.get("page"));
    const pageSize = parsePageSize(searchParams.get("pageSize"), 8, 100);

    const where = buildFeedbackWhere(company.c_id, {
      dateRange: searchParams.get("dateRange"),
      sentiment: searchParams.get("sentiment"),
      location: searchParams.get("location"),
      ageRange: searchParams.get("ageRange"),
    });
    const sentimentWhere = (sentiment: string): Prisma.FeedbackWhereInput => ({
      AND: [
        where,
        {
          result: {
            is: { sentiment: { equals: sentiment, mode: "insensitive" } },
          },
        },
      ],
    });
    const [total, positive, neutral, negative, feedbacks] = await Promise.all([
      prisma.feedback.count({ where }),
      prisma.feedback.count({ where: sentimentWhere("positive") }),
      prisma.feedback.count({ where: sentimentWhere("neutral") }),
      prisma.feedback.count({ where: sentimentWhere("negative") }),
      prisma.feedback.findMany({
        where,
        include: {
          form: { select: { formId: true, title: true } },
          result: true,
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    const data = feedbacks.map(mapFeedbackRecord);

    return NextResponse.json({
      data,
      page,
      pageSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
      stats: { total, positive, neutral, negative },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch feedback." },
      { status: 500 }
    );
  }
}