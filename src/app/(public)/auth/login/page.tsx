"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Image from "next/image";
import { useState, useTransition } from "react";

// simple schema for login
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");

    startTransition(() => {
      signIn("credentials", {
        email: values.email,
        password: values.password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
      }).catch(() => {
        setError("Invalid credentials");
      });
    });
  };

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="bg-[#ffffff]">
      <div className="p-2 bg-white">
        <div>
          <h2>
            Welcome <span>back</span>
          </h2>
          <p>Login to your account</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
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
            />
          </div>

          <div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Signing in..." : "Login"}
            </Button>
          </div>

          {error && <p>{error}</p>}
        </form>

        <div>
          <div>or</div>

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