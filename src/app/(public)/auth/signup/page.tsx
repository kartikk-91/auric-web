"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FormInput } from "@/components/auth/form-inputs";
import { RegisterSchema } from "@/schemas";
import { getPasswordStrength } from "@/lib/password-strength";
import { EyeIcon } from "@/components/auth/eye-icon";
import Widgets from "@/components/auth/widgets";

export default function SignupPage() {
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (values: any) => {
    setError("");
    setErrorCode("");
    setSuccess("");
    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        let data: { error?: string; success?: string; code?: string } = {};
        try {
          data = await res.json();
        } catch {
        }

        if (!res.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          setErrorCode(data.code || "");
          return;
        }

        setSuccess(
          data.success || "Almost there! We've sent a verification link to your email."
        );
      } catch {
        setError("Network error. Please check your connection and try again.");
      }
    });
  };

  const onClick = (provider: any) => {
    signIn(provider, { redirectTo: "/dashboard" });
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F5FF] flex flex-col overflow-hidden">

      <nav className="absolute top-0 w-full flex items-center justify-between px-6 md:px-10 py-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-fit h-fit flex items-center justify-center">
            <Image
              src={'/logo.png'}
              width={100}
              height={100}
              alt={'Auric'}
              className="w-24 h-fit"
            />
          </div>
        </div>
        <div className="text-sm text-slate-500 relative z-999 pointer-events-auto">
          Already have an account?{" "}
          <a href="/auth/login" className="text-[#3B5BDB] font-semibold hover:underline">
            Log in
          </a>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-indigo-100/40" />
        </div>

        <Widgets/>


        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(99,102,241,0.15)] border border-indigo-50 px-8 pt-4 pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 border-4 border-indigo-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <div className="text-center mb-5">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Create your{" "}
                <span className="text-[#3B5BDB]">account</span>
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Start your 14-day free trial. No credit card required
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
              <FormInput
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                placeholder="Full name"
                registration={register("name")}
                error={errors.name?.message}
                disabled={isPending}
              />
              <FormInput
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                placeholder="Email address"
                type="email"
                registration={register("email")}
                error={errors.email?.message}
                disabled={isPending}
              />
              <div>
                <FormInput
                  icon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  }
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  registration={{
                    ...register("password"),
                    onChange: (e: any) => {
                      setValue("password", e.target.value, { shouldValidate: true });
                      setPasswordValue(e.target.value);
                    },
                  }}
                  error={errors.password?.message}
                  disabled={isPending}
                  rightEl={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                      <EyeIcon open={showPassword} />
                    </button>
                  }
                />
                {strength && !errors.password && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                    </div>
                    <span className={`text-xs font-medium ${strength.textColor}`}>{strength.label}</span>
                  </div>
                )}
              </div>
              <FormInput
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                placeholder="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                registration={register("confirmPassword")}
                error={errors.confirmPassword?.message}
                disabled={isPending}
                rightEl={
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex={-1}>
                    <EyeIcon open={showConfirmPassword} />
                  </button>
                }
              />
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-[#3B5BDB] hover:bg-[#2F4AC4] active:scale-[0.98] text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(59,91,219,0.35)] disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account…
                  </span>
                ) : "Create Account"}
              </button>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {error}
                    {errorCode === "EMAIL_IN_USE" && (
                      <>
                        {" "}
                        <a href="/auth/login" className="underline font-semibold">
                          Log in instead
                        </a>
                      </>
                    )}
                  </span>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {success}
                </div>
              )}
            </form>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs text-slate-400">or</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => onClick("google")}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => onClick("github")}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Continue with GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}