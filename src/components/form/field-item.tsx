import { Draggable } from "@hello-pangea/dnd";
import {
  GripVertical,
  Copy,
  Trash2,
} from "lucide-react";

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
    <Draggable
      draggableId={field.id}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          onClick={onSelect}
          className={`
            group rounded-2xl border bg-white p-4 transition-all sm:p-5
            ${
              selected
                ? "border-blue-400 shadow-md ring-2 ring-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }
            ${
              snapshot.isDragging
                ? "shadow-xl"
                : ""
            }
          `}
        >
          <div className="flex gap-3">


            <div
              {...provided.dragHandleProps}
              className="mt-1 shrink-0 cursor-grab text-gray-400 active:cursor-grabbing"
            >
              <GripVertical className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">


              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                <div className="min-w-0 text-sm text-gray-800 sm:text-[15px]">
                  <span className="mr-1 font-semibold">
                    {index + 1}.
                  </span>

                  <span className="break-words">
                    {field.question}
                  </span>

                  {field.required && (
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  )}
                </div>


                <div className="flex items-center gap-2 self-end sm:self-auto sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateField(
                        field.id
                      );
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition hover:bg-gray-50"
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteField(
                        field.id
                      );
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>


              <div className="mt-3">
                <FieldPreview
                  field={field}
                />
              </div>


              {field.helpText && (
                <p className="mt-3 text-xs leading-relaxed text-gray-500">
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