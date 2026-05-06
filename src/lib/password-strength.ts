
export function getPasswordStrength(password: any) {
  if (!password) return null;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { label: "Weak", color: "bg-red-400", width: "w-1/3", textColor: "text-red-500" };
  if (score <= 3) return { label: "Medium", color: "bg-yellow-400", width: "w-2/3", textColor: "text-yellow-500" };
  return { label: "Strong", color: "bg-green-400", width: "w-full", textColor: "text-green-500" };
}