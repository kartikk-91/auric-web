"use client";

import { useEffect, useRef, useState } from "react";
import { FormField, FieldType } from "../../types/form";
import { ChevronDown, Trash2, MousePointer2 } from "lucide-react";
import ToggleRow from "./toggle-row";

interface Props {
  selectedField?: FormField;
  updateField: (id: string, updates: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  disabled?: boolean;
}

const fieldTypes: { type: FieldType; label: string }[] = [
  { type: "short-answer", label: "Short Answer" },
  { type: "rating", label: "Rating" },
  { type: "multiple-choice", label: "Multiple Choice" },
  { type: "checkboxes", label: "Checkboxes" },
  { type: "dropdown", label: "Dropdown" },
  { type: "nps", label: "NPS Score" },
  { type: "email", label: "Email" },
  { type: "phone", label: "Phone" },
  { type: "website", label: "Website" },
  { type: "date", label: "Date" },
];

function FieldTypeSelect({
  value,
  onChange,
  disabled,
}: {
  value: FieldType;
  onChange: (type: FieldType) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const current = fieldTypes.find((f) => f.type === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-left text-sm text-gray-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
      >
        <span className="truncate">{current?.label ?? value}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
      </button>

      {open && !disabled && (
        <div
          role="listbox"
          className="custom-scroll absolute z-30 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-sm"
        >
          {fieldTypes.map((f) => {
            const isSelected = f.type === value;
            return (
              <button
                key={f.type}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(f.type);
                  setOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-sm transition ${
                  isSelected
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FieldSettings({
  selectedField,
  updateField,
  deleteField,
  disabled,
}: Props) {
  if (!selectedField) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
          <MousePointer2 className="h-5 w-5 text-gray-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">No field selected</p>
          <p className="mt-1 text-xs leading-relaxed text-gray-400">
            Click any field on the canvas to edit its settings here.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed";

  const labelClass =
    "mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-gray-400";

  return (
    <div
      className={`flex h-full flex-col ${
        disabled ? "pointer-events-none opacity-60" : ""
      }`}
    >
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-800">Field Settings</h2>
        <p className="mt-0.5 text-xs text-gray-400">
          Editing field{" "}
          {selectedField.id
            ? `· ${
                fieldTypes.find((f) => f.type === selectedField.type)?.label ??
                selectedField.type
              }`
            : ""}
        </p>
      </div>

      <div className="custom-scroll flex-1 space-y-5 overflow-y-auto px-5 py-5">
       
        <div>
          <label className={labelClass}>Field Type</label>
          <FieldTypeSelect
            value={selectedField.type}
            onChange={(type) => updateField(selectedField.id, { type })}
            disabled={disabled}
          />
        </div>

   
        <div>
          <label className={labelClass}>Question</label>
          <input
            type="text"
            disabled={disabled}
            value={selectedField.question}
            onChange={(e) =>
              updateField(selectedField.id, { question: e.target.value })
            }
            className={inputClass}
            placeholder="Enter your question"
          />
        </div>

        <div className="h-px w-full bg-gray-100" />

        
        <ToggleRow
          label="Required"
          description="Respondents must answer this field."
          value={!!selectedField.required}
          onChange={() =>
            updateField(selectedField.id, { required: !selectedField.required })
          }
          disabled={disabled}
        />

        <div className="h-px w-full bg-gray-100" />

        <div>
          <label className={labelClass}>Help Text</label>
          <input
            type="text"
            disabled={disabled}
            value={selectedField.helpText || ""}
            onChange={(e) =>
              updateField(selectedField.id, { helpText: e.target.value })
            }
            className={inputClass}
            placeholder="Optional helper text shown below the field"
          />
        </div>
      </div>

      <div className="border-t border-gray-100 px-5 py-4">
        <button
          type="button"
          onClick={() => deleteField(selectedField.id)}
          disabled={disabled}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-transparent py-2.5 text-sm font-medium text-red-500 transition hover:border-red-100 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
          Delete Field
        </button>
      </div>
    </div>
  );
}