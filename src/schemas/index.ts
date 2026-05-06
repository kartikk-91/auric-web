import * as z from "zod";

export const LoginSchema = z.object({
  email: z.email({
    message: "Valid email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.string().optional(),
});

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name is too long"),
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const companySchema = z.object({
  cname: z.string().min(1, "Company name is required"),
  phoneNumber: z.string().min(7, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().max(255).optional(),
  logo: z.any().optional(),
});













