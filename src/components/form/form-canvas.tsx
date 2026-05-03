import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import FieldItem from "./field-item";
import EditableHeader from "./editable-hearder";

export default function FormCanvas({
  fields,
  setFields,
  selectedFieldId,
  setSelectedFieldId,
  deleteField,
  duplicateField,
  title,
  setTitle,
  tagline,
  setTagline,
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
        <EditableHeader
          title={title}
          setTitle={setTitle}
          tagline={tagline}
          setTagline={setTagline}
        />

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