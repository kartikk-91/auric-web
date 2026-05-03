"use client";

import Sidebar from "./sidebar";
import FieldSettings from "./field-settings";
import { useFormBuilder } from "@/hooks/useFormBuilder";
import FormCanvas from "./form-canvas";

export default function FormBuilder() {
  const form = useFormBuilder();

  const selectedField = form.fields.find(
    (f) => f.id === form.selectedFieldId
  );

  return (
    <div className="h-[calc(100vh-130px)] bg-[#ffffff] flex overflow-hidden">
      
      <div className="w-[240px] ml-4 border border-gray-200 rounded-xl shadow-sm bg-white h-full overflow-hidden">
        <Sidebar addField={form.addField} />
      </div>

      <div className="flex-1 h-full overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4">
          <FormCanvas
            fields={form.fields}
            setFields={form.setFields}
            selectedFieldId={form.selectedFieldId}
            setSelectedFieldId={form.setSelectedFieldId}
            deleteField={form.deleteField}
            duplicateField={form.duplicateField}
          />
        </div>
      </div>

      <div className="w-[320px] border border-gray-200 rounded-xl shadow-sm mr-4 bg-white h-full overflow-hidden">
        <FieldSettings
          selectedField={selectedField}
          updateField={form.updateField}
          deleteField={form.deleteField}
        />
      </div>
    </div>
  );
}