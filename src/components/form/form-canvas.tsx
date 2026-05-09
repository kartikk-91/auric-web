import {
  DragDropContext,
  Droppable,
} from "@hello-pangea/dnd";

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
  const onDragEnd = (
    result: any
  ) => {
    if (
      !result.destination
    )
      return;

    const items =
      Array.from(fields);

    const [moved] =
      items.splice(
        result.source.index,
        1
      );

    items.splice(
      result.destination
        .index,
      0,
      moved
    );

    setFields(items);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm transition-all">

        <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">

          <EditableHeader
            title={title}
            setTitle={setTitle}
            tagline={tagline}
            setTagline={
              setTagline
            }
          />

          <DragDropContext
            onDragEnd={
              onDragEnd
            }
          >
            <Droppable droppableId="fields">
              {(provided) => (
                <div
                  ref={
                    provided.innerRef
                  }
                  {
                    ...provided.droppableProps
                  }
                  className="space-y-4 sm:space-y-5"
                >
                  {fields.map(
                    (
                      field: any,
                      index: number
                    ) => (
                      <FieldItem
                        key={
                          field.id
                        }
                        field={
                          field
                        }
                        index={
                          index
                        }
                        selected={
                          selectedFieldId ===
                          field.id
                        }
                        onSelect={() =>
                          setSelectedFieldId(
                            field.id
                          )
                        }
                        deleteField={
                          deleteField
                        }
                        duplicateField={
                          duplicateField
                        }
                      />
                    )
                  )}

                  {
                    provided.placeholder
                  }
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <button
            onClick={() =>
              setSelectedFieldId(
                null
              )
            }
            className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-blue-600 transition hover:border-blue-400 hover:bg-blue-50"
          >
            + Add New Field
          </button>
        </div>
      </div>
    </div>
  );
}