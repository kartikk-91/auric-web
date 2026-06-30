"use client";

import { ThumbsUp, Wrench, Info } from "lucide-react";
import { useDashboard } from "@/providers/dashboard-provider";

interface TopicCount {
  topic: string;
  count: number;
}

const MAX_ROWS = 5;
const MAX_LABEL_LENGTH = 22;

/**
 * Normalizes a raw topic key from the analytics payload into a clean,
 * display-ready label, and merges near-duplicate keys (e.g. "Presentation &
 * Setup" vs "Presentation and Setup") so they don't appear as separate rows.
 */
function normalizeTopic(raw: string): string {
  return raw
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\band\b/gi, "&")
    .toLowerCase();
}

function toTitleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function truncate(label: string): string {
  if (label.length <= MAX_LABEL_LENGTH) return label;
  return `${label.slice(0, MAX_LABEL_LENGTH - 1).trimEnd()}…`;
}

/**
 * Collapses a raw {topic: count} map into a sorted, deduped, display-ready
 * list capped at MAX_ROWS. Ties are broken alphabetically for stable
 * ordering across refreshes.
 */
function processTopics(
  raw: Record<string, number> | undefined
): TopicCount[] {
  if (!raw) return [];

  const merged = new Map<string, { label: string; count: number }>();

  for (const [key, count] of Object.entries(raw)) {
    const normKey = normalizeTopic(key);
    const existing = merged.get(normKey);
    if (existing) {
      existing.count += count;
    } else {
      merged.set(normKey, { label: toTitleCase(normKey), count });
    }
  }

  return Array.from(merged.values())
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
    .slice(0, MAX_ROWS)
    .map(({ label, count }) => ({ topic: label, count }));
}

function TopicRow({
  topic,
  count,
  maxCount,
  totalFeedbacks,
  barColor,
  trackColor,
}: {
  topic: string;
  count: number;
  maxCount: number;
  totalFeedbacks: number;
  barColor: string;
  trackColor: string;
}) {
  const widthPct = maxCount > 0 ? Math.max((count / maxCount) * 100, 8) : 0;
  const sharePct =
    totalFeedbacks > 0 ? Math.round((count / totalFeedbacks) * 100) : null;

  return (
    <div className="group">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span
          className="truncate text-xs font-medium text-gray-700 sm:text-sm"
          title={topic}
        >
          {truncate(topic)}
        </span>
        <span className="shrink-0 text-xs font-semibold tabular-nums text-gray-900 sm:text-sm">
          {count}
          {sharePct !== null && (
            <span className="ml-1 font-normal text-gray-400">
              · {sharePct}%
            </span>
          )}
        </span>
      </div>
      <div className={`h-1.5 w-full overflow-hidden rounded-full ${trackColor}`}>
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${widthPct}%` }}
        />
      </div>
    </div>
  );
}

function EmptyColumn({ message }: { message: string }) {
  return (
    <div className="flex h-full min-h-[120px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 px-4 py-6 text-center">
      <p className="text-xs text-gray-400 sm:text-sm">{message}</p>
    </div>
  );
}

export default function CustomerSignal() {
  const { dashboardData } = useDashboard();

  const totalFeedbacks: number = dashboardData?.totalFeedbacks || 0;
  const topPraised = processTopics(dashboardData?.topPraised);
  const topCriticized = processTopics(dashboardData?.topCriticized);

  const maxPraised = Math.max(...topPraised.map((t) => t.count), 0);
  const maxCriticized = Math.max(...topCriticized.map((t) => t.count), 0);

  const isFullyEmpty = topPraised.length === 0 && topCriticized.length === 0;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 md:p-6">
      <div className="mb-5 flex items-center justify-between sm:mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Customer Signal
          </h3>
          <Info className="h-4 w-4 text-gray-400" />
        </div>

        {totalFeedbacks > 0 && (
          <span className="text-xs text-gray-400 sm:text-sm">
            Based on {totalFeedbacks} review{totalFeedbacks === 1 ? "" : "s"}
          </span>
        )}
      </div>

      {isFullyEmpty ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <div className="rounded-full bg-blue-50 p-3">
            <ThumbsUp className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-sm font-medium text-gray-700">
            No feedback yet
          </p>
          <p className="max-w-[240px] text-xs text-gray-400">
            Once customers start leaving reviews, you&apos;ll see what they
            love and what to fix here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Loved */}
          <div>
            <div className="mb-3 flex items-center gap-1.5">
              <div className="rounded-md bg-blue-50 p-1">
                <ThumbsUp className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Loved
              </span>
            </div>

            {topPraised.length > 0 ? (
              <div className="space-y-3.5">
                {topPraised.map((item) => (
                  <TopicRow
                    key={item.topic}
                    topic={item.topic}
                    count={item.count}
                    maxCount={maxPraised}
                    totalFeedbacks={totalFeedbacks}
                    barColor="bg-blue-500"
                    trackColor="bg-blue-50"
                  />
                ))}
              </div>
            ) : (
              <EmptyColumn message="No standout praise yet" />
            )}
          </div>

          {/* Needs Attention */}
          <div>
            <div className="mb-3 flex items-center gap-1.5">
              <div className="rounded-md bg-amber-50 p-1">
                <Wrench className="h-3.5 w-3.5 text-amber-600" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Needs Attention
              </span>
            </div>

            {topCriticized.length > 0 ? (
              <div className="space-y-3.5">
                {topCriticized.map((item) => (
                  <TopicRow
                    key={item.topic}
                    topic={item.topic}
                    count={item.count}
                    maxCount={maxCriticized}
                    totalFeedbacks={totalFeedbacks}
                    barColor="bg-amber-400"
                    trackColor="bg-amber-50"
                  />
                ))}
              </div>
            ) : (
              <EmptyColumn message="No criticisms reported — great work" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}