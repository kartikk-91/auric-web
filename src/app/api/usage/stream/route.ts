import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const POLL_INTERVAL_MS = 2000;
const HEARTBEAT_INTERVAL_MS = 20000;

export async function GET(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const company = await prisma.company.findFirst({
    where: { u_id: session.user.id },
    select: { c_id: true },
  });

  if (!company) {
    return new Response("No company found for this user", { status: 404 });
  }

  const encoder = new TextEncoder();
  let closed = false;
  let lastPayload = "";
  let interval: ReturnType<typeof setInterval> | undefined;
  let heartbeat: ReturnType<typeof setInterval> | undefined;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: unknown) => {
        if (closed) return;
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      };

      const fetchAndMaybeSend = async () => {
        try {
          const now = new Date();
          const month = now.getMonth() + 1;
          const year = now.getFullYear();

          const usage = await prisma.auricTokenUsage.findUnique({
            where: {
              c_id_month_year: {
                c_id: company.c_id,
                month,
                year,
              },
            },
          });

          const payload = {
            used: usage?.totalTokens ?? 0,
            limit: 100000,
            promptTokens: usage?.promptTokens ?? 0,
            completionTokens: usage?.completionTokens ?? 0,
            month,
            year,
          };

          const serialized = JSON.stringify(payload);
          if (serialized !== lastPayload) {
            lastPayload = serialized;
            send(payload);
          }
        } catch (err) {
          console.error("usage stream poll failed:", err);
        }
      };

      await fetchAndMaybeSend();

      interval = setInterval(fetchAndMaybeSend, POLL_INTERVAL_MS);

   
      heartbeat = setInterval(() => {
        if (!closed) controller.enqueue(encoder.encode(`: ping\n\n`));
      }, HEARTBEAT_INTERVAL_MS);

      req.signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(interval);
        clearInterval(heartbeat);
        try {
          controller.close();
        } catch {
          // already closed
        }
      });
    },
    cancel() {
      closed = true;
      clearInterval(interval);
      clearInterval(heartbeat);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}