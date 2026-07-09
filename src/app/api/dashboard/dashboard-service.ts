import { prisma } from "@/lib/db";
import type { DashboardData, StatCard, Testimonial, ChangeType } from "./types"

function calcPercentageChange(
    current: number,
    previous: number
): { change: string; changeType: ChangeType } {
    const cur = current ?? 0;
    const prev = previous ?? 0;

    if (prev === 0) {
        if (cur === 0) return { change: "0%", changeType: "positive" };
        return { change: "100%", changeType: "positive" };
    }

    const pct = Math.round(((cur - prev) / prev) * 1000) / 10; // 1 decimal
    return {
        change: `${Math.abs(pct)}%`,
        changeType: pct >= 0 ? "positive" : "negative",
    };
}

async function fetchAnalytics(c_id: string) {
    return prisma.analytics.findUnique({ where: { c_id } });
}


async function fetchComparisonMetrics(c_id: string) {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
    const [current, previous] = await Promise.all([
        prisma.feedbackResult.aggregate({
            _avg: {
                rating: true,
                sentimentScore: true,
            },
            _count: {
                f_id: true,
            },
            where: {
                feedback: {
                    c_id,
                    createdAt: {
                        gte: thirtyDaysAgo,
                    },
                },
            },
        }),

        prisma.feedbackResult.aggregate({
            _avg: {
                rating: true,
                sentimentScore: true,
            },
            _count: {
                f_id: true,
            },
            where: {
                feedback: {
                    c_id,
                    createdAt: {
                        gte: sixtyDaysAgo,
                        lt: thirtyDaysAgo,
                    },
                },
            },
        }),
    ]);

    return {
        current: {
            totalFeedbacks: current._count.f_id,
            avgRating: current._avg.rating ?? 0,
            avgSentiment: current._avg.sentimentScore ?? 0,
        },
        previous: {
            totalFeedbacks: previous._count.f_id,
            avgRating: previous._avg.rating ?? 0,
            avgSentiment: previous._avg.sentimentScore ?? 0,
        },
    };
}

async function fetchRecentTestimonials(
    c_id: string,
    limit = 5
): Promise<Testimonial[]> {
    const rows = await prisma.feedback.findMany({
        where: { c_id },
        orderBy: { createdAt: "desc" },
        take: limit,
        select: {
            name: true,
            country: true,
            createdAt: true,
            result: {
                select: { testimonial: true, rating: true },
            },
        },
    });

    return rows
        .filter((r) => r.result?.testimonial?.trim())
        .map((r) => ({
            author: r.name,
            quote: r.result!.testimonial.trim(),
            rating: r.result!.rating ?? 0,
            location: r.country,
            date: r.createdAt.toISOString().split("T")[0],
        }));
}

async function fetchActiveFormId(c_id: string): Promise<string | null> {
    const form = await prisma.feedbackForm.findFirst({
        where: { c_id, isActive: true },
        select: { formId: true },
        orderBy: { createdAt: "desc" },
    });
    return form?.formId ?? null;
}

async function fetchCompanyOwnerName(c_id: string): Promise<string> {
    const company = await prisma.company.findUnique({
        where: { c_id },
        select: { user: { select: { name: true } } },
    });
    return company?.user?.name ?? "";
}

const EMPTY_DASHBOARD: Omit<DashboardData, "userName"> = {
    stats: [],
    ratingDistribution: {},
    sentimentDistribution: { Positive: 0, Neutral: 0, Negative: 0 },
    ResponseByLocation: {},
    topPraised: {},
    topCriticized: {},
    totalFeedbacks: 0,
    recentTestimonials: [],
    formLink: "",
};

export async function getDashboardService(c_id: string): Promise<DashboardData> {
    const [analytics, comparison, recentTestimonials, formId, userName] =
        await Promise.all([
            fetchAnalytics(c_id),
            fetchComparisonMetrics(c_id),
            fetchRecentTestimonials(c_id),
            fetchActiveFormId(c_id),
            fetchCompanyOwnerName(c_id),
        ]);

    if (!analytics) return { ...EMPTY_DASHBOARD, userName };
    const prevRating = comparison.previous.avgRating;
    const prevSentiment = comparison.previous.avgSentiment;
    const prevAuricScore =
        ((prevRating / 5) * 100 * 0.6) + (prevSentiment * 100 * 0.4);
    const stats: StatCard[] = [
        {
            title: "Testimonials",
            value: String(analytics.totalFeedbacks),
            ...calcPercentageChange(
                analytics.totalFeedbacks,
                comparison.previous.totalFeedbacks
            ),
        },
        {
            title: "Avg. Rating",
            value: String(Math.round((analytics.avgRating ?? 0) * 10) / 10),
            ...calcPercentageChange(analytics.avgRating ?? 0, prevRating),
        },
        {
            title: "Avg. Sentiment",
            value: `${Math.round((analytics.avgSentiment ?? 0) * 100)}%`,
            ...calcPercentageChange(analytics.avgSentiment ?? 0, prevSentiment),
        },
        {
            title: "Auric Score",
            value: String(Math.round((analytics.auricScore ?? 0) * 10) / 10),
            ...calcPercentageChange(analytics.auricScore ?? 0, prevAuricScore),
        },
    ];
    const sentDist = (analytics.sentimentDist ?? {}) as Record<string, number>;
    const sentimentDistribution = {
        Positive: sentDist.positive ?? 0,
        Neutral: sentDist.neutral ?? 0,
        Negative: sentDist.negative ?? 0,
    };

    return {
        userName,
        stats,
        ratingDistribution: (analytics.ratingDist ?? {}) as Record<string, number>,
        sentimentDistribution,
        ResponseByLocation: (analytics.responseByLocation ?? {}) as Record<string, number>,
        topPraised: (analytics.topPraised ?? {}) as Record<string, number>,
        topCriticized: (analytics.topCriticized ?? {}) as Record<string, number>,
        totalFeedbacks: analytics.totalFeedbacks ?? 0,
        recentTestimonials,
        formLink: formId ? `/feedback/${formId}` : "",
    };
}