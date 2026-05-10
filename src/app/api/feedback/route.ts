import { prisma } from "@/lib/db";
import { queueFeedback } from "@/lib/queue";
import { NextResponse } from "next/server";
import { feedbackSchema } from "@/lib/validators/feedback";
import { getClientIp } from "@/lib/security/ip";
import { validatePayload } from "@/lib/security/payload";
import { handlePrismaError } from "@/lib/errors/prisma";
import { rateLimitIp } from "@/lib/security/rate-limit";
import { isIpBlocked, trackIpAbuse } from "@/lib/security/block-ip";
import { unknown } from "zod";

export async function POST(req: Request) {
    try {

        const contentType = req.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
            return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
        }

        const ipAddress = getClientIp(req);

        const blocked = await isIpBlocked(ipAddress);

        if (blocked) {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        const limit = await rateLimitIp(ipAddress);

        if (!limit.success) {
            await trackIpAbuse(ipAddress);
            return NextResponse.json({ error: "Too many submissions" }, { status: 429 });
        }

        const rawBody = await req.json();

        if (!validatePayload(rawBody)) {
            return NextResponse.json({ error: "Payload too large" }, { status: 413 });
        }

        const parsed = feedbackSchema.safeParse(rawBody);

        if (!parsed.success) {
            await trackIpAbuse(ipAddress);

            return NextResponse.json(
                {
                    error: "Invalid input",
                    details: parsed.error.flatten(),
                },
                { status: 400 }
            );
        }

        const { formId, c_id, email, name, state, country, age, data } = parsed.data;


        const existingFeedback =
            await prisma.feedback.findUnique(
                {
                    where: {
                        email_formId: {
                            email,
                            formId,
                        },
                    },
                    select: {
                        f_id: true,
                    },
                }
            );

        if (
            existingFeedback
        ) {
            return NextResponse.json(
                {
                    error:
                        "Feedback already submitted",
                },
                {
                    status: 409,
                }
            );
        }

        const feedback =
            await prisma.feedback.create(
                {
                    data: {
                        company: {
                            connect: {
                                c_id,
                            },
                        },

                        form: {
                            connect: {
                                formId,
                            },
                        },

                        email,
                        name,
                        state:
                            state ??
                            "unknown",
                        country,
                        age,
                        data,
                        ipAddress,
                    },
                }
            );


        try {
            await queueFeedback(feedback.f_id, c_id);
        } catch (queueError) {
            console.error("Queue Error:", queueError);
        }

        return NextResponse.json(
            {
                success: true,
                feedbackId: feedback.f_id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Feedback API Error:", error);

        const handled = handlePrismaError(error);

        return NextResponse.json({ error: handled.message }, { status: handled.status });
    }
}