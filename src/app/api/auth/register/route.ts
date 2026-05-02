import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { prisma } from "@/lib/db";
import { sendVerificationAction } from "@/app/actions/send-verification";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedFields = RegisterSchema.safeParse(body);
    if (!validatedFields.success) {
      return Response.json({ error: "Invalid fields!" }, { status: 400 });
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return Response.json({ error: "Email already in use!" }, { status: 400 });
    }

    await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationAction(email, name, verificationToken.token);

    return Response.json({ success: "Confirmation email sent!" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}