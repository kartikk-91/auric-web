
import { Prisma } from "@/generated/prisma/client";


export interface FeedbackFilterParams {
  dateRange?: string | null;
  sentiment?: string | null;
  location?: string | null;
  ageRange?: string | null;
}


function getDateRangeStart(dateRange?: string | null): Date | null {
  if (!dateRange || dateRange === "All Time") return null;

  const now = new Date();

  switch (dateRange) {
    case "Today": {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      return start;
    }
    case "Last 7 Days":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "Last 30 Days":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case "Last 90 Days":
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    default:
      return null;
  }
}


function getAgeBounds(ageRange?: string | null): { gte?: number; lte?: number } | null {
  if (!ageRange) return null;

  if (ageRange.endsWith("+")) {
    const gte = parseInt(ageRange.replace("+", ""), 10);
    return Number.isNaN(gte) ? null : { gte };
  }

  const [minStr, maxStr] = ageRange.split("-");
  const gte = parseInt(minStr, 10);
  const lte = parseInt(maxStr, 10);

  if (Number.isNaN(gte) || Number.isNaN(lte)) return null;

  return { gte, lte };
}

export function buildFeedbackWhere(
  companyId: string,
  filters: FeedbackFilterParams
): Prisma.FeedbackWhereInput {
  const where: Prisma.FeedbackWhereInput = {
    c_id: companyId,
  };

  const dateStart = getDateRangeStart(filters.dateRange);
  if (dateStart) {
    where.createdAt = { gte: dateStart };
  }

  const ageBounds = getAgeBounds(filters.ageRange);
  if (ageBounds) {
    where.age = ageBounds;
  }
  const resultFilter: Prisma.FeedbackResultWhereInput = {};

  if (filters.sentiment) {
    resultFilter.sentiment = {
      equals: filters.sentiment,
      mode: "insensitive",
    };
  }

  const location = filters.location?.trim();
  if (location) {
    where.OR = [
      { state: { contains: location, mode: "insensitive" } },
      { country: { contains: location, mode: "insensitive" } },
      {
        result: {
          is: {
            OR: [
              { state: { contains: location, mode: "insensitive" } },
              { country: { contains: location, mode: "insensitive" } },
              { formattedLocation: { contains: location, mode: "insensitive" } },
            ],
          },
        },
      },
    ];
  }

  if (Object.keys(resultFilter).length > 0) {
    where.result = { is: resultFilter };
  }

  return where;
}


export function parsePage(value: string | null): number {
  const page = parseInt(value ?? "1", 10);
  return Number.isNaN(page) || page < 1 ? 1 : page;
}


export function parsePageSize(value: string | null, fallback = 8, max = 100): number {
  const size = parseInt(value ?? String(fallback), 10);
  if (Number.isNaN(size) || size < 1) return fallback;
  return Math.min(size, max);
}