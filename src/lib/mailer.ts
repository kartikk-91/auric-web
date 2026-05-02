import { VerificationEmail } from "@/components/emails/verification-email";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});


export async function sendVerificationEmail(to: string, firstName: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}`;
  const html = VerificationEmail({ firstName, verificationUrl }); 

  await transporter.sendMail({
    from: `"Auric" <${process.env.GMAIL_USER}>`,
    to,
    subject: "Verify your Auric account",
    html,
  });
}
