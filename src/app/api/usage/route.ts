import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const company = await prisma.company.findFirst({
            where: { u_id: session.user.id },
            select: { c_id: true },
        });

        if (!company) {
            return NextResponse.json(
                { error: "No company found for this user" },
                { status: 404 }
            );
        }

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

        const limit = 100000;

        return NextResponse.json({
            used: usage?.totalTokens ?? 0,
            limit,
            promptTokens: usage?.promptTokens ?? 0,
            completionTokens: usage?.completionTokens ?? 0,
            month,
            year,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}