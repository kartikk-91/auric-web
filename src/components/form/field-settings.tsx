"use client";

import { FormField, FieldType } from "../../types/form";
import { ChevronDown, Plus, Trash2, MousePointer2 } from "lucide-react";

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

  const labelClass = "mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-gray-400";

  return (
    <div className={`flex h-full flex-col ${disabled ? "pointer-events-none opacity-60" : ""}`}>
      {/* Panel header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-800">Field Settings</h2>
        <p className="mt-0.5 text-xs text-gray-400">
          Editing field {selectedField.id ? `· ${fieldTypes.find(f => f.type === selectedField.type)?.label ?? selectedField.type}` : ""}
        </p>
      </div>

      {/* Scrollable settings body */}
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">

        {/* Field type */}
        <div>
          <label className={labelClass}>Field Type</label>
          <div className="relative">
            <select
              disabled={disabled}
              value={selectedField.type}
              onChange={(e) => {
                const newType = e.target.value as FieldType;
                const updates: Partial<FormField> = { type: newType };
                if (["multiple-choice", "checkboxes", "dropdown"].includes(newType)) {
                  updates.options = selectedField.options || ["Option 1", "Option 2"];
                } else {
                  updates.options = undefined;
                }
                updateField(selectedField.id, updates);
              }}
              className={`${inputClass} appearance-none pr-9`}
            >
              {fieldTypes.map((f) => (
                <option key={f.type} value={f.type}>
                  {f.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Question */}
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

        {/* Divider */}
        <div className="h-px w-full bg-gray-100" />

        {/* Required toggle */}
        <ToggleRow
          label="Required"
          description="Respondents must answer this field."
          value={selectedField.required}
          onChange={() =>
            updateField(selectedField.id, { required: !selectedField.required })
          }
        />

        {/* Rating-specific settings */}
        {selectedField.type === "rating" && (
          <>
            <div className="h-px w-full bg-gray-100" />

            <SelectRow
              label="Rating Scale"
              value={selectedField.ratingScale || 5}
              options={[
                { label: "3 Stars", value: 3 },
                { label: "5 Stars", value: 5 },
                { label: "10 Stars", value: 10 },
              ]}
              onChange={(val: any) =>
                updateField(selectedField.id, {
                  ratingScale: Number(val) as 3 | 5 | 10,
                })
              }
            />

            <SelectRow
              label="Icon Style"
              value={selectedField.iconStyle || "outline"}
              options={[
                { label: "Outline", value: "outline" },
                { label: "Filled", value: "filled" },
              ]}
              onChange={(val: any) =>
                updateField(selectedField.id, { iconStyle: val })
              }
            />

            <ToggleRow
              label="Show Labels"
              value={!!selectedField.showLabels}
              onChange={() =>
                updateField(selectedField.id, {
                  showLabels: !selectedField.showLabels,
                })
              }
            />
          </>
        )}

        {/* Options editor */}
        {["multiple-choice", "checkboxes", "dropdown"].includes(selectedField.type) && (
          <>
            <div className="h-px w-full bg-gray-100" />
            <OptionsEditor field={selectedField} updateField={updateField} />
          </>
        )}

        <div className="h-px w-full bg-gray-100" />

        {/* Help text */}
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

      {/* Delete footer */}
      <div className="border-t border-gray-100 px-5 py-4">
        <button
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

function ToggleRow({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {description && (
          <p className="mt-0.5 text-xs text-gray-400">{description}</p>
        )}
      </div>

      <button
        onClick={onChange}
        role="switch"
        aria-checked={value}
        className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          value ? "bg-blue-600" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            value ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: any;
  options: { label: string; value: any }[];
  onChange: (val: any) => void;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-9 text-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}

function OptionsEditor({ field, updateField }: any) {
  const options: string[] = field.options || ["Option 1", "Option 2"];

  const updateOption = (index: number, value: string) => {
    const next = [...options];
    next[index] = value;
    updateField(field.id, { options: next });
  };

  const addOption = () => {
    updateField(field.id, {
      options: [...options, `Option ${options.length + 1}`],
    });
  };

  const deleteOption = (index: number) => {
    updateField(field.id, {
      options: options.filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-widest text-gray-400">
        Options
      </label>

      <div className="space-y-1.5">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-5 shrink-0 text-center text-[11px] tabular-nums text-gray-400">
              {i + 1}.
            </span>
            <input
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => deleteOption(i)}
              disabled={options.length <= 1}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-300 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addOption}
        className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-blue-600 transition hover:text-blue-700"
      >
        <Plus className="h-3.5 w-3.5" />
        Add option
      </button>
    </div>
  );
}