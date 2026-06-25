import { Draggable } from "@hello-pangea/dnd";
import { GripVertical, Copy, Trash2 } from "lucide-react";
import FieldPreview from "./field-preview";

const fieldTypeLabels: Record<string, string> = {
  "short-answer": "Short Answer",
  rating: "Rating",
  "multiple-choice": "Multiple Choice",
  checkboxes: "Checkboxes",
  dropdown: "Dropdown",
  nps: "NPS Score",
  email: "Email",
  phone: "Phone",
  website: "Website",
  date: "Date",
};

export default function FieldItem({
  field,
  index,
  selected,
  onSelect,
  deleteField,
  duplicateField,
  disabled,
}: any) {
  return (
    <Draggable draggableId={field.id} index={index} isDragDisabled={disabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={onSelect}
          className={[
            "group rounded-2xl border bg-white transition-all duration-150",
            selected
              ? "border-blue-400 shadow-md ring-2 ring-blue-50"
              : "border-gray-200 hover:border-gray-300 hover:shadow-sm",
            snapshot.isDragging ? "shadow-xl ring-2 ring-blue-100 rotate-[0.5deg]" : "",
            disabled ? "pointer-events-none opacity-60" : "cursor-pointer",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="flex gap-3 p-4 sm:p-5">
            {/* Drag handle */}
            <div
              {...provided.dragHandleProps}
              className="mt-1 shrink-0 cursor-grab text-gray-300 transition hover:text-gray-500 active:cursor-grabbing"
            >
              <GripVertical className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              {/* Top row: index + question + type badge + actions */}
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="shrink-0 text-xs font-semibold tabular-nums text-gray-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="break-words text-sm font-medium leading-snug text-gray-800">
                      {field.question}
                      {field.required && (
                        <span className="ml-1 text-red-400">*</span>
                      )}
                    </span>
                  </div>

                  <div className="mt-1.5">
                    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-500">
                      {fieldTypeLabels[field.type] || field.type}
                    </span>
                  </div>
                </div>

                {/* Actions — visible on hover or when selected */}
                <div
                  className={`flex shrink-0 items-center gap-1.5 transition-opacity ${
                    selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateField(field.id);
                    }}
                    title="Duplicate field"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition hover:border-gray-300 hover:text-gray-700"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteField(field.id);
                    }}
                    title="Delete field"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Field preview */}
              <div className="pointer-events-none select-none">
                <FieldPreview field={field} />
              </div>

              {/* Help text */}
              {field.helpText && (
                <p className="mt-2.5 flex items-start gap-1.5 text-xs leading-relaxed text-gray-400">
                  <span className="mt-px select-none text-gray-300">—</span>
                  {field.helpText}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}