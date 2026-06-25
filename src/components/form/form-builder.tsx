"use client";

import { useState, useEffect } from "react";
import { PanelLeft, Settings2, X } from "lucide-react";

import Sidebar from "./sidebar";
import FieldSettings from "./field-settings";
import FormCanvas from "./form-canvas";

export default function FormBuilder({
  form,
  title,
  setTitle,
  tagline,
  setTagline,
  disabled,
}: any) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const selectedField = form.fields.find(
    (f: any) => f.id === form.selectedFieldId
  );

  // Close mobile drawers when disabled (e.g. during publish)
  useEffect(() => {
    if (disabled) {
      setShowSidebar(false);
      setShowSettings(false);
    }
  }, [disabled]);

  // Lock body scroll when a drawer is open
  useEffect(() => {
    if (showSidebar || showSettings) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSidebar, showSettings]);

  return (
    <div className="relative flex h-[calc(100vh-130px)] flex-col overflow-hidden bg-gradient-to-b from-gray-50/80 to-white lg:flex-row">

      {/* Mobile toolbar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 lg:hidden">
        <button
          onClick={() => setShowSidebar(true)}
          disabled={disabled}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PanelLeft className="h-4 w-4" />
          Add Field
        </button>

        <button
          onClick={() => setShowSettings(true)}
          disabled={!selectedField || disabled}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Settings2 className="h-4 w-4" />
          Settings
          {selectedField && (
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500" />
          )}
        </button>
      </div>

      {/* Desktop: Left sidebar */}
      <div className="ml-4 mt-3 hidden h-full w-[220px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
        <Sidebar addField={form.addField} disabled={disabled} />
      </div>

      {/* Center canvas */}
      <div className="min-w-0 flex-1 overflow-y-auto px-3 py-3 sm:px-5 lg:px-5">
        <div className="mx-auto max-w-3xl">
          <FormCanvas
            fields={form.fields}
            setFields={form.setFields}
            selectedFieldId={form.selectedFieldId}
            setSelectedFieldId={form.setSelectedFieldId}
            deleteField={form.deleteField}
            duplicateField={form.duplicateField}
            title={title}
            setTitle={setTitle}
            tagline={tagline}
            setTagline={setTagline}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Desktop: Right settings panel */}
      <div className="mr-4 mt-3 hidden h-full w-[300px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm xl:block">
        <FieldSettings
          selectedField={selectedField}
          updateField={form.updateField}
          deleteField={form.deleteField}
          disabled={disabled}
        />
      </div>

      {/* Mobile: Sidebar drawer */}
      {showSidebar && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSidebar(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-screen w-[300px] max-w-[90vw] overflow-hidden bg-white shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h3 className="text-sm font-semibold text-gray-900">Add Field</h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Sidebar
              addField={(type: any) => {
                form.addField(type);
                setShowSidebar(false);
              }}
            />
          </div>
        </>
      )}

      {/* Mobile: Settings drawer */}
      {showSettings && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          />
          <div className="fixed right-0 top-0 z-50 h-screen w-[340px] max-w-[95vw] overflow-hidden bg-white shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h3 className="text-sm font-semibold text-gray-900">Field Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <FieldSettings
              selectedField={selectedField}
              updateField={form.updateField}
              deleteField={form.deleteField}
            />
          </div>
        </>
      )}
    </div>
  );
}