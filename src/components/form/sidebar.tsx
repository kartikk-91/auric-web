"use client";

import { FieldType } from "@/types/form";
import {
  AlignLeft,
  AlignJustify,
  Star,
  CheckSquare,
  ChevronDown,
  Smile,
  Upload,
  Mail,
  Phone,
  Link2,
  Calendar,
  Type,
  Minus,
} from "lucide-react";



interface Props {
  addField: (type: FieldType) => void;
}

const fieldTypes = [
  { type: "short-answer", icon: AlignLeft, label: "Short Answer" },
  { type: "rating", icon: Star, label: "Rating" },
  { type: "multiple-choice", icon: CheckSquare, label: "Multiple Choice" },
  { type: "checkboxes", icon: CheckSquare, label: "Checkboxes" },
  { type: "dropdown", icon: ChevronDown, label: "Dropdown" },
  { type: "nps", icon: Smile, label: "NPS Score" },
  { type: "email", icon: Mail, label: "Email" },
  { type: "phone", icon: Phone, label: "Phone" },
  { type: "website", icon: Link2, label: "Website" },
  { type: "date", icon: Calendar, label: "Date" },
];

export default function Sidebar({ addField }: Props) {
  return (
    <div className="h-full px-4 py-5">

      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Add Fields
      </h3>

      <div className="space-y-1">
        {fieldTypes.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => addField(type as FieldType)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <Icon className="w-4 h-4 text-gray-500" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}