import { NextRequest, NextResponse } from "next/server";
import { auricFetch } from "@/lib/auric-api";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const ALLOWED_PATHS = new Set([
  "auricbot/chat/stream",
  "auricbot/chats",
]);
function safePath(parts: string[]): string | null {
  const path = parts.join("/");
  if (ALLOWED_PATHS.has(path) || /^auricbot\/chats\/[^/]+$/.test(path)) return path;
  return null;
}

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const path = safePath((await context.params).path);
  if (!path) return NextResponse.json({ error: "Unknown Auric API endpoint." }, { status: 404 });

  const url = new URL(request.url);
  url.searchParams.delete("company_id");
  url.searchParams.delete("c_id");
  let body: string | undefined;
  if (!["GET", "DELETE"].includes(request.method)) {
    const rawBody = await request.text();
    if (request.headers.get("content-type")?.includes("application/json")) {
      try {
        const payload = JSON.parse(rawBody) as Record<string, unknown>;
        delete payload.company_id;
        delete payload.c_id;
        body = JSON.stringify(payload);
      } catch {
        return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
      }
    } else {
      body = rawBody;
    }
  }

  try {
    const upstream = await auricFetch(`/${path}${url.search}`, {
      method: request.method,
      body: body || undefined,
      headers: request.headers.get("content-type") ? { "Content-Type": request.headers.get("content-type")! } : undefined,
      cache: "no-store",
    }, [request.method === "GET" ? "chat:read" : "chat:write"]);
    const headers = new Headers();
    const contentType = upstream.headers.get("content-type");
    if (contentType) headers.set("Content-Type", contentType);
    return new Response(upstream.body, { status: upstream.status, headers });
  } catch (error) {
    console.error("Auric API proxy failed:", error);
    return NextResponse.json({ error: "Auric service is unavailable." }, { status: 503 });
  }
}

export const GET = proxy;
export const POST = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
