import { redis } from
  "@/lib/redis";

const LIMIT = 5;
const WINDOW = 600;

export async function rateLimitIp(ip: string) {
  const key =`feedback:ip:${ip}`;

  const current = await redis.incr(key);

  if(current === 1) {
    await redis.expire(
      key,
      WINDOW
    );
  }

  return {
    success:
      current <= LIMIT,
    remaining: Math.max(LIMIT - current,0),
  };
}