interface Props {
  firstName: string;
  verificationUrl: string;
}

export function VerificationEmail({ firstName, verificationUrl }: Props) {
  return `
    <div style="font-family: Helvetica, Arial, sans-serif; background-color:#f9fafb; padding:40px 20px;">
      <div style="max-width:600px; margin:0 auto; background:#fff; border-radius:16px; padding:32px; box-shadow:0 4px 14px rgba(0,0,0,0.08);">
        <h1 style="font-size:24px; font-weight:700; margin-bottom:12px; color:#1f2937;">Hi ${firstName},</h1>
        <p style="font-size:16px; margin:0 0 20px; color:#4b5563;">
          Welcome to <strong>Auric</strong> 👋 <br/>
          Please verify your email address to activate your account.
        </p>
        <a href="${verificationUrl}" style="display:inline-block; padding:14px 28px; background:#6366f1; color:#fff; border-radius:10px; font-weight:600; text-decoration:none; font-size:16px;">Verify Email</a>
        <div style="border-top:1px solid #e5e7eb; margin:32px 0;"></div>
        <p style="font-size:14px; color:#6b7280;">If the button above doesn’t work, copy and paste this link into your browser:</p>
        <p style="font-size:14px; color:#2563eb; word-break:break-all;">${verificationUrl}</p>
        <p style="font-size:12px; color:#9ca3af; margin-top:40px;">
          You’re receiving this email because you signed up for Auric.<br/>
          If this wasn’t you, please ignore this email.
        </p>
      </div>
    </div>
  `;
}
