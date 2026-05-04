"use client";

import { FormField, FieldType } from "../../types/form";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

interface Props {
  selectedField?: FormField;
  updateField: (id: string, updates: Partial<FormField>) => void;
  deleteField: (id: string) => void;
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
}: Props) {
  if (!selectedField) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-sm">
        Select a field to edit its settings
      </div>
    );
  }

  const inputClass =
    "w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="h-full flex flex-col">

      <div className="px-6 pt-6 pb-4 border-b">
        <h2 className="text-sm font-semibold text-gray-800">
          Field Settings
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            FIELD TYPE
          </label>

          <div className="relative">
            <select
              value={selectedField.type}
              onChange={(e) => {
                const newType = e.target.value as FieldType;

                const updates: Partial<FormField> = {
                  type: newType,
                };

                if (["multiple-choice", "checkboxes", "dropdown"].includes(newType)) {
                  updates.options =
                    selectedField.options || ["Option 1", "Option 2"];
                } else {
                  updates.options = undefined;
                }

                updateField(selectedField.id, updates);
              }}
              className={`${inputClass} appearance-none pr-10`}
            >
              {fieldTypes.map((f) => (
                <option key={f.type} value={f.type}>
                  {f.label}
                </option>
              ))}
            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            QUESTION
          </label>

          <input
            type="text"
            value={selectedField.question}
            onChange={(e) =>
              updateField(selectedField.id, {
                question: e.target.value,
              })
            }
            className={inputClass}
          />
        </div>

        <ToggleRow
          label="Required"
          value={selectedField.required}
          onChange={() =>
            updateField(selectedField.id, {
              required: !selectedField.required,
            })
          }
        />


        {selectedField.type === "rating" && (
          <>
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
                updateField(selectedField.id, {
                  iconStyle: val,
                })
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


        {["multiple-choice", "checkboxes", "dropdown"].includes(
          selectedField.type
        ) && (
            <OptionsEditor
              field={selectedField}
              updateField={updateField}
            />
          )}

        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            HELP TEXT
          </label>

          <input
            type="text"
            value={selectedField.helpText || ""}
            onChange={(e) =>
              updateField(selectedField.id, {
                helpText: e.target.value,
              })
            }
            className={inputClass}
            placeholder="Optional helper text"
          />
        </div>
      </div>

      <div className="p-6 border-t">
        <button
          onClick={() => deleteField(selectedField.id)}
          className="w-full text-red-600 text-sm font-medium py-2 flex items-center justify-center gap-2 hover:bg-red-50 rounded-md transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete Field
        </button>
      </div>
    </div>
  );
}

function ToggleRow({ label, value, onChange }: any) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>

      <button
        onClick={onChange}
        className={`relative w-10 h-5 rounded-full transition ${value ? "bg-blue-600" : "bg-gray-300"
          }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 bg-white rounded-full transition ${value ? "left-5" : "left-0.5"
            }`}
        />
      </button>
    </div>
  );
}

function SelectRow({ label, value, options, onChange }: any) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">
        {label.toUpperCase()}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500"
      >
        {options.map((o: any) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function OptionsEditor({ field, updateField }: any) {
  const options = field.options || ["Option 1", "Option 2"];

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    updateField(field.id, { options: newOptions });
  };

  const addOption = () => {
    updateField(field.id, {
      options: [...options, `Option ${options.length + 1}`],
    });
  };

  const deleteOption = (index: number) => {
    const newOptions = options.filter((_: any, i: number) => i !== index);
    updateField(field.id, { options: newOptions });
  };

  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">
        OPTIONS
      </label>

      <div className="space-y-2">
        {options.map((opt: string, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md"
            />
            <button
              onClick={() => deleteOption(i)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addOption}
        className="mt-3 text-blue-600 text-sm flex items-center gap-1 hover:underline"
      >
        <Plus className="w-4 h-4" />
        Add option
      </button>
    </div>
  );
}