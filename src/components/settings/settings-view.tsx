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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mt-12 sm:mt-0 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your company profile and what AuricBot knows about your business.
        </p>
      </div>

      
      <div className="mb-6 border-b border-gray-100 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 -mb-px px-3 sm:px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
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