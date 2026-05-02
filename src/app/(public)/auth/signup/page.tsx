"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";
import { useState, useTransition } from "react";


export default function Signup() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const text = await res.text();
        let data;
        try{
          data=JSON.parse(text);
        }
        catch{
          data={}
        }
        
        if (!res.ok) {
          setError(data.error || "Something went wrong");
          return;
        }

        setSuccess(data.success || "Registered successfully");
      } catch (err) {
        setError("Something went wrong");
      }
    });
  };

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  }

  const checkStrength = (value: string) => {
    if (!value) return setPasswordStrength("");
    let strength = 0;
    if (value.length >= 6) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;
    if (strength <= 1) setPasswordStrength("Weak");
    else if (strength === 2) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  return (
    <div className="bg-[#ffffff]">
      <div className="p-2 bg-white">
        <div>
          <h2>
            Create your <span>account</span>
          </h2>
          <p>
            Start your 14-day free trial. No credit card required
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="Full name"
              {...form.register("name")}
              disabled={isPending}
            />
          </div>

          <div>
            <Input
              placeholder="Email address"
              type="email"
              {...form.register("email")}
              disabled={isPending}
            />
          </div>

          <div>
            <Input
              placeholder="Password"
              type="password"
              {...form.register("password")}
              disabled={isPending}
              onChange={(e) => {
                form.setValue("password", e.target.value);
                checkStrength(e.target.value);
              }}
            />
            {passwordStrength && <p>{passwordStrength}</p>}
          </div>

          <div>
            <Input
              placeholder="Confirm Password"
              type="password"
              {...form.register("confirmPassword")}
              disabled={isPending}
            />
          </div>

          <div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Account"}
            </Button>
          </div>

          {error && <p>{error}</p>}
          {success && <p>{success}</p>}
        </form>
        <div>
          <div>
            or
          </div>
          <Button
        onClick={() => onClick("google")}
        variant="outline"
      >
        <Image src="/icons/google.svg" alt="google" width={20} height={20} />
        Google
      </Button>
      <Button
        onClick={() => onClick("github")}
        variant="outline"
      >
        <Image src="/icons/github.svg" alt="github" width={20} height={20} />
        GitHub
      </Button>
        </div>

      </div>
    </div>
  );
}
