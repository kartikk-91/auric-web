import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.c_id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const form = await prisma.feedbackForm.findFirst({
      where: {
        c_id: session.user.c_id,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      form,
    });
  } catch (error) {
    console.error("Fetch form error:", error);

    return Response.json(
      {
        success: false,
        error: "Failed to fetch form",
      },
      { status: 500 }
    );
  }
}