import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import FieldItem from "./field-item";

export default function FormCanvas({
  fields,
  setFields,
  selectedFieldId,
  setSelectedFieldId,
  deleteField,
  duplicateField,
}: any) {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(fields);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setFields(items);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-xl shadow-sm px-8 py-8">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-1">
            Customer Feedback
          </h1>
          <p className="text-sm text-gray-500">
            We'd love to hear your thoughts! Your feedback helps us improve and
            serve you better.
          </p>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-5"
              >
                {fields.map((field: any, index: number) => (
                  <FieldItem
                    key={field.id}
                    field={field}
                    index={index}
                    selected={selectedFieldId === field.id}
                    onSelect={() => setSelectedFieldId(field.id)}
                    deleteField={deleteField}
                    duplicateField={duplicateField}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <button
          onClick={() => setSelectedFieldId(null)}
          className="w-full mt-6 py-3 border border-dashed border-gray-300 rounded-lg text-sm text-blue-600 font-medium hover:border-blue-400 hover:bg-blue-50 transition flex items-center justify-center gap-2"
        >
          + Add New Field
        </button>
      </div>
    </div>
  );
}