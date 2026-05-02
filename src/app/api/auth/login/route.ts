import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationAction } from "@/app/actions/send-verification";

export async function POST(req: Request) {
  
  try {
    const body = await req.json();

    const validatedFields = LoginSchema.safeParse(body);
    if (!validatedFields.success) {
      return Response.json({ error: "Invalid fields!" }, { status: 400 });
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.hashedPassword) {
      return Response.json(
        { error: "Email doesn't exist!" },
        { status: 400 }
      );
    }

    if (!existingUser.isVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email);

      await sendVerificationAction(
        existingUser.email,
        existingUser.name,
        verificationToken.token
      );

      return Response.json({ success: "Confirmation email sent!" });
    }

    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return Response.json({
        success: "Login successful",
        redirect: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return Response.json(
              { error: "Invalid credentials!" },
              { status: 401 }
            );
          default:
            return Response.json(
              { error: "Something went wrong!" },
              { status: 500 }
            );
        }
      }

      throw error;
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}