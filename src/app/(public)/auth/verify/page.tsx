import { Suspense } from "react";

import OrbitLoader from "@/components/shared/orbit-loader";
import VerifyContent from "@/components/auth/verify-content";

export default function VerifyPage() {
  return (
    <Suspense fallback={<OrbitLoader />}>
      <VerifyContent />
    </Suspense>
  );
}