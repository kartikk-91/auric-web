"use client";

import { useState } from "react";
import {
  PanelLeft,
  Settings2,
  X,
} from "lucide-react";

import Sidebar from "./sidebar";
import FieldSettings from "./field-settings";
import FormCanvas from "./form-canvas";

export default function FormBuilder({
  form,
  title,
  setTitle,
  tagline,
  setTagline,
}: any) {
  const [showSidebar, setShowSidebar] =
    useState(false);

  const [showSettings, setShowSettings] =
    useState(false);

  const selectedField =
    form.fields.find(
      (f: any) =>
        f.id === form.selectedFieldId
    );

  return (
    <div className="relative flex flex-col lg:flex-row h-[calc(100vh-130px)] overflow-hidden bg-linear-to-b from-gray-50 to-white">

      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
        <button
          onClick={() =>
            setShowSidebar(true)
          }
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
        >
          <PanelLeft className="h-4 w-4" />
          Fields
        </button>

        <button
          onClick={() =>
            setShowSettings(true)
          }
          disabled={!selectedField}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Settings2 className="h-4 w-4" />
          Settings
        </button>
      </div>

      <div className="ml-4 mt-3 hidden h-full w-[240px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:block">
        <Sidebar
          addField={form.addField}
        />
      </div>
      <div className="min-w-0 flex-1 overflow-y-auto px-3 py-3 sm:px-5 lg:px-6">
        <div className="mx-auto max-w-5xl">
          <FormCanvas
            fields={form.fields}
            setFields={form.setFields}
            selectedFieldId={
              form.selectedFieldId
            }
            setSelectedFieldId={
              form.setSelectedFieldId
            }
            deleteField={
              form.deleteField
            }
            duplicateField={
              form.duplicateField
            }
            title={title}
            setTitle={setTitle}
            tagline={tagline}
            setTagline={
              setTagline
            }
          />
        </div>
      </div>


      <div className="mr-4 mt-3 hidden h-full w-[320px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm xl:block">
        <FieldSettings
          selectedField={
            selectedField
          }
          updateField={
            form.updateField
          }
          deleteField={
            form.deleteField
          }
        />
      </div>


      {showSidebar && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() =>
              setShowSidebar(false)
            }
          />

          <div className="fixed left-0 top-0 z-50 h-screen w-[320px] max-w-[90vw] overflow-hidden bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="font-semibold text-gray-900">
                Add Fields
              </h3>

              <button
                onClick={() =>
                  setShowSidebar(
                    false
                  )
                }
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <Sidebar
              addField={
                form.addField
              }
            />
          </div>
        </>
      )}


      {showSettings && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() =>
              setShowSettings(
                false
              )
            }
          />

          <div className="fixed right-0 top-0 z-50 h-screen w-[360px] max-w-[95vw] overflow-hidden bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <h3 className="font-semibold text-gray-900">
                Field Settings
              </h3>

              <button
                onClick={() =>
                  setShowSettings(
                    false
                  )
                }
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <FieldSettings
              selectedField={
                selectedField
              }
              updateField={
                form.updateField
              }
              deleteField={
                form.deleteField
              }
            />
          </div>
        </>
      )}
    </div>
  );
}