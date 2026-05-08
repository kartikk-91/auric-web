export const publicRoutes = [
    "/",
    "/auth/verify",
    "/feedback/*",
    "/f/*",
];

export const authRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/error",
];

export const protectedRoutes = [
    "/dashboard/*",
    "/settings/*",
    "/build/*",
    "/organization/*",
    "/ask-auric/*",
    "/testimonials/*",
    "/feedbacks/*"
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";