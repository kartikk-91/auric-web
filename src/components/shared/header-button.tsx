"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

interface HeaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  children: ReactNode;
  variant?: "primary" | "secondary";
}


export default function HeaderButton({
  icon,
  children,
  variant = "primary",
  className = "",
  ...props
}: HeaderButtonProps) {
  const base =
    "flex h-9 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 sm:h-10 sm:px-5";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  );
}