"use client";

import { useState } from "react";
import { Building2, BookOpen } from "lucide-react";
import CompanyProfile from "@/components/settings/company-profile";
import KnowledgeBase from "@/components/settings/knowledge-base";

const TABS = [
  { key: "profile", label: "Company profile", icon: Building2 },
  { key: "knowledge", label: "Knowledge base", icon: BookOpen },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">
      <div className="mt-12 sm:mt-0 mb-6">
        <h1 className="text-2xl font-semibold tracking-[-0.035em] text-slate-950">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your company profile and what AuricBot knows about your business.
        </p>
      </div>

      
      <div className="mb-7 rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.28)]">
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3 sm:px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === key
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 hover:bg-slate-50 hover:text-gray-700"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "profile" ? <CompanyProfile /> : <KnowledgeBase />}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
