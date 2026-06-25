"use client";

import { FieldType } from "@/types/form";
import {
  AlignLeft,
  Star,
  CheckSquare,
  List,
  ChevronDown,
  Smile,
  Mail,
  Phone,
  Link2,
  Calendar,
} from "lucide-react";

interface Props {
  addField: (type: FieldType) => void;
  disabled?: boolean;
}

const fieldGroups = [
  {
    label: "Text",
    fields: [
      { type: "short-answer", icon: AlignLeft, label: "Short Answer" },
    ],
  },
  {
    label: "Choice",
    fields: [
      { type: "multiple-choice", icon: List, label: "Multiple Choice" },
      { type: "checkboxes", icon: CheckSquare, label: "Checkboxes" },
      { type: "dropdown", icon: ChevronDown, label: "Dropdown" },
    ],
  },
  {
    label: "Scale",
    fields: [
      { type: "rating", icon: Star, label: "Rating" },
      { type: "nps", icon: Smile, label: "NPS Score" },
    ],
  },
  {
    label: "Contact",
    fields: [
      { type: "email", icon: Mail, label: "Email" },
      { type: "phone", icon: Phone, label: "Phone" },
      { type: "website", icon: Link2, label: "Website" },
      { type: "date", icon: Calendar, label: "Date" },
    ],
  },
];

export default function Sidebar({ addField, disabled }: Props) {
  return (
    <div className="h-full overflow-y-auto px-3 py-5">
      <p className="mb-4 px-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        Field Types
      </p>

      <div className="space-y-5">
        {fieldGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 px-2 text-[10px] font-medium uppercase tracking-wider text-gray-400">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.fields.map(({ type, icon: Icon, label }) => (
                <button
                  key={type}
                  onClick={() => addField(type as FieldType)}
                  disabled={disabled}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-gray-700 transition hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition group-hover:bg-blue-100 group-hover:text-blue-600">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}