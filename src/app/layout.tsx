import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/session-provider";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auric",
  description:
    "AI Feedback Analyzer and Testimonial Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-[#f5f7fb]"
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}

          <Toaster
            position="top-center"
            richColors
            closeButton
            toastOptions={{
              classNames: {
                toast:
                  "!rounded-2xl !border !border-neutral-200 !shadow-xl",
                title:
                  "!text-sm !font-semibold",
                description:
                  "!text-sm",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}