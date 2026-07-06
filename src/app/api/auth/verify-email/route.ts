import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/db";

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

    const { token } = body as { token?: string };

    if (!token) {
      return Response.json(
        { error: "Verification token is missing.", code: "TOKEN_MISSING" },
        { status: 400 }
      );
    }

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return Response.json(
        {
          error: "This verification link is invalid or has already been used.",
          code: "TOKEN_NOT_FOUND",
        },
        { status: 400 }
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return Response.json(
        {
          error: "This verification link has expired. Please request a new one.",
          code: "TOKEN_EXPIRED",
        },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return Response.json(
        {
          error: "We couldn't find an account for this verification link.",
          code: "USER_NOT_FOUND",
        },
        { status: 400 }
      );
    }

    if (existingUser.isVerified) {
      await prisma.verificationToken
        .delete({ where: { v_id: existingToken.v_id } })
        .catch(() => {});
      return Response.json(
        { success: "Your email is already verified. You can log in now.", code: "ALREADY_VERIFIED" },
        { status: 200 }
      );
    }

    await prisma.user.update({
      where: { u_id: existingUser.u_id },
      data: {
        isVerified: true,
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({
      where: { v_id: existingToken.v_id },
    });

    return Response.json(
      { success: "Your email has been verified! You can log in now.", code: "VERIFIED" },
      { status: 200 }
    );
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    return Response.json(
      { error: "Something went wrong on our end. Please try again.", code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}