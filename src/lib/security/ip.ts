export function getClientIp(
  req: Request
): string {
  const forwardedFor =
    req.headers.get(
      "x-forwarded-for"
    );

  const cloudflareIp =
    req.headers.get(
      "cf-connecting-ip"
    );

  const realIp =
    req.headers.get(
      "x-real-ip"
    );

  const ip =
    cloudflareIp ||
    forwardedFor
      ?.split(",")[0]
      ?.trim() ||
    realIp ||
    "unknown";

  if (
    [
      "::1",
      "127.0.0.1",
    ].includes(ip)
  ) {
    return "LOCALHOST";
  }

  return ip;
}