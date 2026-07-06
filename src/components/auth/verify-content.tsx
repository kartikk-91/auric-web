"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2, Mail, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setError("Missing verification token!");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Verification failed");
        } else {
          setSuccess(data.success || "Email verified successfully!");
        }
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#F4F5FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(99,102,241,0.15)] border border-indigo-50 p-8 space-y-6">
          <div className="flex justify-center">
            {loading && (
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
              </div>
            )}

            {success && (
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            )}

            {error && (
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            )}
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {loading && "Verifying Your Email"}
              {success && "Email Verified!"}
              {error && "Verification Failed"}
            </h1>
            <p className="text-sm text-slate-500">
              {loading && "Please wait while we verify your email address..."}
              {success && "Your email has been successfully verified."}
              {error && "We couldn't verify your email address."}
            </p>
          </div>
          {loading && (
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900">
                    {success}
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    You can now log in to your account and start using our services.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-900">
                    {error}
                  </p>
                  <p className="text-xs text-red-700 mt-1">
                    The verification link may have expired or is invalid. Please request a new verification email.
                  </p>
                </div>
              </div>
            </div>
          )}
          {!loading && (
            <div className="space-y-3 pt-2">
              <button
                onClick={() => router.push("/auth/login")}
                className="w-full bg-[#3B5BDB] hover:bg-[#2F4AC4] active:scale-[0.98] text-white font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(59,91,219,0.35)]"
              >
                {success ? "Go to Login" : "Back to Login"}
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}