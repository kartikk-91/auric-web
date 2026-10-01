import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail } from "@/lib/mailer";

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

    const validatedFields = LoginSchema.safeParse(body);
    if (!validatedFields.success) {
      const firstIssue = validatedFields.error.issues[0];
      return Response.json(
        {
          error: firstIssue?.message || "Please check the form and try again.",
          code: "VALIDATION_ERROR",
        },
        { status: 400 }
      );
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return Response.json(
        { error: "No account found with this email.", code: "USER_NOT_FOUND" },
        { status: 404 }
      );
    }

    if (!existingUser.hashedPassword) {
      return Response.json(
        {
          error:
            "This account was created with Google or GitHub. Please continue with that instead.",
          code: "OAUTH_ACCOUNT",
        },
        { status: 400 }
      );
    }

    if (!existingUser.isVerified) {
      try {
        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(
          existingUser.email,
          existingUser.name ?? "user",
          verificationToken.token
        );
      } catch (emailError) {
        console.error("RESEND VERIFICATION EMAIL ERROR:", emailError);
        return Response.json(
          {
            error:
              "Your email isn't verified yet, and we couldn't resend the verification link. Please try again shortly.",
            code: "EMAIL_NOT_VERIFIED_RESEND_FAILED",
          },
          { status: 500 }
        );
      }

      return Response.json(
        {
          success:
            "Email not verified. Please check your inbox.",
          code: "EMAIL_NOT_VERIFIED",
        },
        { status: 200 }
      );
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return Response.json({
        success: "Login successful.",
        code: "LOGIN_SUCCESS",
        redirect: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return Response.json(
              { error: "Incorrect email or password.", code: "INVALID_CREDENTIALS" },
              { status: 401 }
            );
          default:
            return Response.json(
              { error: "Something went wrong while signing you in.", code: "AUTH_ERROR" },
              { status: 500 }
            );
        }
      }
      throw error;
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json(
      {
        error: "Something went wrong on our end. Please try again in a moment.",
        code: "SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}
