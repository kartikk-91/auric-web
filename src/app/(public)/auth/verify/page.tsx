"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Verify() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setError("Missing Token!");
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
          setSuccess(data.success);
        }
      } catch (err) {
        setError("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h2>Verify Email</h2>

      {loading && <p>Verifying...</p>}

      {success && <p style={{ color: "green" }}>{success}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && (
        <a href="/auth/login" className="underline">
          Go to Login
        </a>
      )}
    </div>
  );
}