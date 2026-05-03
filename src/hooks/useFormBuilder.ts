import { useState } from "react";
import { FormField, FieldType } from "@/types/form";

export function useFormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      question: "New Question",
      required: false,
    };

    setFields((prev) => [...prev, newField]);
    setSelectedFieldId(newField.id);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const deleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const duplicateField = (id: string) => {
    const field = fields.find((f) => f.id === id);
    if (!field) return;

    const newField = { ...field, id: Date.now().toString() };
    const index = fields.findIndex((f) => f.id === id);

    const newFields = [...fields];
    newFields.splice(index + 1, 0, newField);
    setFields(newFields);
  };

  return {
    fields,
    selectedFieldId,
    setSelectedFieldId,
    addField,
    updateField,
    deleteField,
    duplicateField,
    setFields,
  };
}