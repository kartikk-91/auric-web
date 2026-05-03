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
    email: z.email({
      message: "Valid email is required",
    }),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    name: z.string().min(1, {
      message: "Name is required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const companySchema = z.object({
  cname: z.string().min(1, "Company name is required"),
  phoneNumber: z.string().min(7, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  description: z.string().max(255).optional(),
  logo: z.any().optional(),
});













