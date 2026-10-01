import "server-only";

import { createHmac } from "crypto";
import { getCurrentCompany } from "@/lib/auth-session";

const TOKEN_LIFETIME_SECONDS = 5 * 60;

function requiredEnvironment(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function base64Url(value: string | Buffer): string {
  return Buffer.from(value).toString("base64url");
}

export async function getAuricAccessToken(scopes: string[]): Promise<string> {
  const company = await getCurrentCompany();
  if (!company) throw new Error("No company is associated with this account.");

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64Url(JSON.stringify({
    sub: company.u_id,
    company_id: company.c_id,
    scope: scopes.join(" "),
    iss: requiredEnvironment("AURIC_API_JWT_ISSUER"),
    aud: requiredEnvironment("AURIC_API_JWT_AUDIENCE"),
    iat: now,
    exp: now + TOKEN_LIFETIME_SECONDS,
  }));
  const signingInput = `${header}.${payload}`;
  const signature = createHmac("sha256", requiredEnvironment("AURIC_API_JWT_SECRET"))
    .update(signingInput)
    .digest("base64url");

  return `${signingInput}.${signature}`;
}

export async function auricFetch(path: string, init: RequestInit, scopes: string[]): Promise<Response> {
  const baseUrl = requiredEnvironment("AURIC_API_URL").replace(/\/$/, "");
  const token = await getAuricAccessToken(scopes);
  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, ...init.headers },
  });
}
