import cloudinary from "@/lib/cloudinary";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await req.formData();

        const cname = formData.get("cname") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const address = formData.get("address") as string;
        const website = (formData.get("website") as string) || "";
        const description = (formData.get("description") as string) || "";
        const file = formData.get("logo") as File | null;

        if (!cname || !phoneNumber || !address) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        let logoUrl: string | null = null;

        if (file) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
            const maxSize = 2 * 1024 * 1024;

            if (!allowedTypes.includes(file.type)) {
                return NextResponse.json(
                    { error: "Invalid file type" },
                    { status: 400 }
                );
            }

            if (file.size > maxSize) {
                return NextResponse.json(
                    { error: "File too large (max 2MB)" },
                    { status: 400 }
                );
            }

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
                (resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        {
                            folder: "org-logos",
                            transformation: [
                                { width: 200, height: 200, crop: "limit" },
                                { quality: "auto" }
                            ]
                        },
                        (error, result) => {
                            if (error || !result) reject(error);
                            else resolve(result);
                        }
                    );

                    stream.end(buffer);
                }
            );

            logoUrl = uploadResult.secure_url;
        }

        const company = await prisma.company.create({
            data: {
                cname,
                phoneNumber,
                address,
                website,
                description,
                logoUrl,
                user: {
                    connect: {
                        u_id: session.user.id
                    }
                }
            }
        });

        return NextResponse.json(
            { message: "Company created successfully", companyId: company.c_id },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}