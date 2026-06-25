import { Feedback } from "@/types/feedback";

function download(
  content: Blob,
  filename: string
) {
  const url =
    URL.createObjectURL(content);

  const link =
    document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}

export function exportFeedbackCSV(
  feedbacks: Feedback[]
) {
  if (!feedbacks.length) return;

  const rows = feedbacks.map((feedback) => ({
    Name: feedback.name,
    Email: feedback.email,

    Rating:
      feedback.analysis.rating ?? "",

    Sentiment:
      feedback.analysis.sentiment,

    Score:
      feedback.analysis.sentimentScore,

    Confidence:
      feedback.analysis.confidence,

    Country:
      feedback.location.country,

    State:
      feedback.location.state,

    Submitted:
      feedback.receivedFull,

    Summary:
      feedback.analysis.summary,

    Testimonial:
      feedback.analysis.testimonial,

    Feedback:
      feedback.feedback,
  }));

  const headers =
    Object.keys(rows[0]);

  const csv = [
    headers.join(","),

    ...rows.map((row) =>
      headers
        .map(
          (header) =>
            `"${String(
              row[
                header as keyof typeof row
              ] ?? ""
            ).replace(/"/g, '""')}"`
        )
        .join(",")
    ),
  ].join("\n");

  download(
    new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    }),
    `feedback-${new Date().toISOString().split("T")[0]}.csv`
  );
}

export function exportFeedbackJSON(
  feedbacks: Feedback[]
) {
  download(
    new Blob(
      [
        JSON.stringify(
          feedbacks,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    ),
    `feedback-${new Date().toISOString().split("T")[0]}.json`
  );
}