import { redis } from "@/lib/redis";

const MAX_ATTEMPTS = 20;

const WINDOW = 3600;

const BLOCK_TIME = 86400;

export async function isIpBlocked(ip: string) {
  if (process.env.NODE_ENV === "development" || ip === "LOCALHOST") {
    return false;
  }

  const blocked =
    await redis.get(
      `blocked:ip:${ip}`
    );

  return !!blocked;
}

export async function trackIpAbuse(ip: string) {
  const key =
    `abuse:ip:${ip}`;

  const attempts = await redis.incr(key);

  if (attempts === 1) {
    await redis.expire(
      key,
      WINDOW
    );
  }

  if (attempts >MAX_ATTEMPTS) {
    await redis.set(`blocked:ip:${ip}`,"1",{ ex: BLOCK_TIME });

    return true;
  }

  return false;
}