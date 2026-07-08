"use client";

import { useSession } from "next-auth/react";
import AskAuricWindow from "@/components/ask-auric/auric-window";
import Sidebar from "@/components/shared/sidebar";

function FullPageLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
        <p className="text-sm text-gray-400">Loading…</p>
      </div>
    </div>
  );
}

const AskAuricPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <FullPageLoader />;
  }
  const companyId = session?.user?.c_id ?? null;

  return (
    <div className="w-full h-screen flex overflow-y-hidden">
      <div>
        <Sidebar />
      </div>
      <div className="w-full">
        <AskAuricWindow companyId={companyId} />
      </div>
    </div>
  );
};

export default AskAuricPage;