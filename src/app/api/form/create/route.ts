import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.c_id) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const c_id = session.user.c_id;

    const existingForm =
      await prisma.feedbackForm.findFirst({
        where: {
          c_id,
          isActive: true,
        },
      });

    let form;

    if (existingForm) {
      form = await prisma.feedbackForm.update({
        where: {
          formId: existingForm.formId,
        },
        data: {
          title: body.title,
          tagLine: body.tagLine,
          schema: body.schema,
        },
      });
    } else {
      form = await prisma.feedbackForm.create({
        data: {
          c_id,
          title: body.title,
          tagLine: body.tagLine,
          schema: body.schema,
          isActive: true,
        },
      });
    }

    return Response.json(form);
  } catch (error) {
    console.error("Create/update form error:", error);

    return new Response(
      "Something went wrong",
      { status: 500 }
    );
  }
}