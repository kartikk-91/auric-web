import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { LayoutTemplate, Plus } from "lucide-react";

import FieldItem from "./field-item";
import EditableHeader from "./editable-header";

export default function FormCanvas({
  fields,
  setFields,
  selectedFieldId,
  setSelectedFieldId,
  deleteField,
  duplicateField,
  addField,
  title,
  setTitle,
  tagline,
  setTagline,
  disabled,
}: any) {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setFields(items);
  };

  const handleAddField = () => {
    if (typeof addField === "function") {
      addField("short-answer");
    }
  };

  return (
    <div className="flex h-full justify-center">
      <div
        className={`custom-scroll h-full w-full overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-sm transition-all ${
          disabled ? "pointer-events-none opacity-60" : ""
        }`}
      >
        <div className="px-5 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-10 ">
          <EditableHeader
            title={title}
            setTitle={setTitle}
            tagline={tagline}
            setTagline={setTagline}
            disabled={disabled}
          />

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="fields">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="space-y-3 sm:space-y-4"
                >
                  {fields.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                        <LayoutTemplate className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          No fields yet
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Add fields from the left panel to get started.
                        </p>
                      </div>
                    </div>
                  ) : (
                    fields.map((field: any, index: number) => (
                      <FieldItem
                        key={field.id}
                        field={field}
                        index={index}
                        selected={selectedFieldId === field.id}
                        onSelect={() => setSelectedFieldId(field.id)}
                        deleteField={deleteField}
                        duplicateField={duplicateField}
                        disabled={disabled}
                      />
                    ))
                  )}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <button
            type="button"
            onClick={handleAddField}
            disabled={disabled}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-transparent text-sm font-medium text-gray-400 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="h-4 w-4" />
            Add Field
          </button>
        </div>
      </div>
    </div>
  );
}