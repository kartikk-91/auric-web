"use server";

import { sendVerificationEmail } from "@/lib/mailer";

export async function sendVerificationAction(email: string, firstName: string | null , verificationToken: string) {
  try {
    
    const nameToUse = firstName ? firstName : "user";

    await sendVerificationEmail(email, nameToUse, verificationToken);

    return { success: true };
  } catch {
    console.error("Email error");
    return { success: false, error: "error" };
  }
}
