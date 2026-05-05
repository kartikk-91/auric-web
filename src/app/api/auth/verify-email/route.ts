import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {

  try {
    const { token } = await req.json();

    if (!token) {
      return Response.json({ error: "Token missing!" }, { status: 400 });
    }

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return Response.json(
        { error: "Token does not exist!" },
        { status: 400 }
      );
    }

    const hasExpired =
      new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return Response.json(
        { error: "Token has expired!" },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
      return Response.json(
        { error: "Email does not exist!" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        u_id: existingUser.u_id,
      },
      data: {
        isVerified: true,
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({
      where: { v_id: existingToken.v_id },
    });

    return Response.json({ success: "Email Verified!" });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error);
    return Response.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}