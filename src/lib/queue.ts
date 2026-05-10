import { redis } from "./redis";

const STREAM_NAME =
  "feedback_stream";

export async function queueFeedback(
  f_id: string,
  c_id: string
) {
  try {
    await redis.xadd(
      STREAM_NAME,
      "*",
      {
        f_id,
        c_id,
        createdAt:
          Date.now().toString(),
      }
    );

    return true;
  } catch (error) {
    console.error(
      "Queue Error:",
      error
    );

    return false;
  }
}