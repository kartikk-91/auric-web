import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { prisma } from "@/lib/db";
import { sendVerificationAction } from "@/app/actions/send-verification";

export async function POST(req: Request) {
  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { error: "Invalid request body.", code: "INVALID_BODY" },
        { status: 400 }
      );
    }

    const validatedFields = RegisterSchema.safeParse(body);
    if (!validatedFields.success) {
      const firstIssue = validatedFields.error.issues[0];
      return Response.json(
        {
          error: firstIssue?.message || "Please check the form and try again.",
          code: "VALIDATION_ERROR",
          fieldErrors: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { email, password, name } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return Response.json(
        {
          error: "An account with this email already exists. Try logging in instead.",
          code: "EMAIL_IN_USE",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await prisma.user.create({
        data: { name, email, hashedPassword },
      });
    } catch (dbError: any) {
      if (dbError?.code === "P2002") {
        return Response.json(
          {
            error: "An account with this email already exists. Try logging in instead.",
            code: "EMAIL_IN_USE",
          },
          { status: 409 }
        );
      }
      throw dbError;
    }

    const verificationToken = await generateVerificationToken(email);

    try {
      await sendVerificationAction(email, name, verificationToken.token);
    } catch (emailError) {
      console.error("SEND VERIFICATION EMAIL ERROR:", emailError);
      return Response.json(
        {
          success:
            "Your account was created, but we couldn't send the verification email. Please use the resend option on the verify page.",
          code: "ACCOUNT_CREATED_EMAIL_FAILED",
        },
        { status: 201 }
      );
    }

    return Response.json(
      {
        success: "Almost there! We've sent a verification link to your email.",
        code: "VERIFICATION_SENT",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return Response.json(
      {
        error: "Something went wrong on our end. Please try again in a moment.",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}