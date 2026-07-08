"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import Image from "next/image";

import { FormInput } from "@/components/auth/form-inputs";
import { EyeIcon } from "@/components/auth/eye-icon";
import Widgets from "@/components/auth/widgets";

import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isPending, startTransition] = useTransition();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const DEMO_EMAIL = "project.demo106@gmail.com";
  const DEMO_PASSWORD = "demo1234";

  const handleDemoLogin = () => {
    setValue("email", DEMO_EMAIL, { shouldValidate: true });
    setValue("password", DEMO_PASSWORD, { shouldValidate: true });
    handleSubmit(onSubmit)();
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setInfo("");

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        let data: {
          error?: string;
          success?: string;
          code?: string;
          redirect?: string;
        } = {};
        try {
          data = await res.json();
        } catch {
        }

        if (!res.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          return;
        }

        if (data.code === "EMAIL_NOT_VERIFIED") {
          setInfo(
            data.success ||
              "Your email isn't verified yet. We've sent you a new verification link."
          );
          return;
        }

        window.location.href = data.redirect || DEFAULT_LOGIN_REDIRECT;
      } catch {
        setError("Network error. Please check your connection and try again.");
      }
    });
  };

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F5FF] flex flex-col overflow-hidden">
      <nav className="absolute top-0 w-full flex items-center justify-between px-4 md:px-10 py-4 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="Auric"
            className="w-20 md:w-24 h-fit"
          />
        </div>

        
        <div className="hidden md:block text-sm text-slate-500 relative pointer-events-auto">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/signup"
            className="text-[#3B5BDB] font-semibold hover:underline"
          >
            Sign up
          </a>
        </div>
      </nav>
      <div className="flex-1 flex items-center justify-center px-3 sm:px-4 relative overflow-hidden pt-16 md:pt-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-indigo-100/40" />
        </div>
        <div className="pointer-events-none">
          <Widgets />
        </div>


        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(99,102,241,0.15)] border border-indigo-50 px-5 sm:px-8 pt-4 pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 border-4 border-indigo-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-center mb-5">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                Welcome{" "}
                <span className="text-[#3B5BDB]">back</span>
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Login to continue to your Auric workspace
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-3"
            >
              <FormInput
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                }
                placeholder="Email address"
                type="email"
                registration={register("email")}
                error={errors.email?.message}
                disabled={isPending}
              />

              <FormInput
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                }
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                registration={register("password")}
                error={errors.password?.message}
                disabled={isPending}
                rightEl={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <EyeIcon open={showPassword} />
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
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />

                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>

                    Signing in…
                  </span>
                ) : (
                  "Login"
                )}
              </button>
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isPending}
                className="w-full py-3 text-xs font-medium text-[#3B5BDB] bg-indigo-50/60 hover:bg-indigo-50 border border-dashed border-indigo-200 rounded-xl transition-all duration-200 disabled:opacity-60"
              >
                Try it out - Login with demo account
              </button>
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {error}
                </div>
              )}
              {info && (
                <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5">
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {info}
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
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />

                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />

                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />

                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>

                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => onClick("github")}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>

                Continue with GitHub
              </button>
            </div>

            
            <div className="mt-4 text-center text-sm text-slate-500 md:hidden">
              Don&apos;t have an account?{" "}
              <a
                href="/auth/signup"
                className="text-[#3B5BDB] font-semibold hover:underline"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}