"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2, Mail, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Verify() {
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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
<div className="flex justify-center">
            {loading && (
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              </div>
            )}
            
            {success && (
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-bounce-in">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
            )}
            
            {error && (
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center animate-shake">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
            )}
          </div>
<div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {loading && "Verifying Your Email"}
              {success && "Email Verified!"}
              {error && "Verification Failed"}
            </h1>
            <p className="text-sm text-gray-500">
              {loading && "Please wait while we verify your email address..."}
              {success && "Your email has been successfully verified."}
              {error && "We couldn't verify your email address."}
            </p>
          </div>
{loading && (
            <div className="flex items-center justify-center gap-2 py-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-slide-up">
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
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-slide-up">
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
            <div className="space-y-3 pt-2 animate-fade-in">
              <button
                onClick={() => router.push("/auth/login")}
                className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5"
              >
                {success ? "Go to Login" : "Back to Login"}
                <ArrowRight className="w-4 h-4" />
              </button>

              {error && (
                <button
                  onClick={() => router.push("/auth/register")}
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
                >
                  Request New Verification Email
                </button>
              )}
            </div>
          )}
        </div>
<div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            Need help?{" "}
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}