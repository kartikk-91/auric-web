import { Draggable } from "@hello-pangea/dnd";
import { GripVertical, Copy, Trash2 } from "lucide-react";
import FieldPreview from "./field-preview";

export default function FieldItem({
  field,
  index,
  selected,
  onSelect,
  deleteField,
  duplicateField,
}: any) {
  return (
    <Draggable draggableId={field.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={onSelect}
          className={`group flex gap-3 p-5 rounded-xl border bg-white transition-all
            ${selected
              ? "border-blue-400 shadow-md"
              : "border-gray-200 hover:border-gray-300"}
            ${snapshot.isDragging ? "shadow-lg" : ""}
          `}
        >
<div
            {...provided.dragHandleProps}
            className="mt-1 cursor-grab active:cursor-grabbing text-gray-400"
          >
            <GripVertical className="w-5 h-5" />
          </div>
<div className="flex-1">
<div className="flex items-start justify-between mb-3">
<div className="text-sm text-gray-800">
                <span className="font-medium mr-1">{index + 1}.</span>
                {field.question}
                {field.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </div>
<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateField(field.id);
                  }}
                  className="p-1.5 rounded hover:bg-gray-100"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteField(field.id);
                  }}
                  className="p-1.5 rounded hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
<FieldPreview field={field} />
{field.helpText && (
              <p className="text-xs text-gray-500 mt-2">
                {field.helpText}
              </p>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}