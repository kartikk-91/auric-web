"use client";

import { useState } from "react";
import Sidebar from "@/components/shared/sidebar";
import CustomizerPanel from "@/components/testimonials/customizer-panel";
import Header from "@/components/testimonials/header";
import PreviewPanel from "@/components/testimonials/preview-panel";
import PublishModal from "@/components/testimonials/publish-modal";
import {
  testimonials,
  defaultWallConfig,
} from "@/data/testimonial-data";

const Testimonials = () => {
  const [config, setConfig] = useState(defaultWallConfig);
  const [showModal, setShowModal] = useState(false);
  const [publishedData, setPublishedData] = useState<{ url: string; wallId: string } | null>(null);
  const [showCustomizerDrawer, setShowCustomizerDrawer] = useState(false);

  const handlePublish = async () => {
    setShowModal(true);
  };

  const handlePublishSuccess = (data: { url: string; wallId: string }) => {
    setPublishedData(data);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <div className="shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header
          onPublish={handlePublish}
          isPublished={!!publishedData}
        />

        <main className="flex flex-1 min-h-0 overflow-hidden">
          {/* Desktop: Fixed left customizer panel */}
          <aside className="hidden lg:flex w-[360px] xl:w-[400px] shrink-0 border-r border-gray-200 bg-white">
            <div className="h-full w-full overflow-y-auto px-5 py-6">
              <CustomizerPanel
                config={config}
                onChange={setConfig}
              />
            </div>
          </aside>

          {/* Preview section */}
          <section className="flex min-w-0 flex-1 flex-col overflow-y-auto">
            <div className="mx-auto w-full max-w-[1700px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">

              {/* Mobile: inline customizer */}
              <div className="block md:hidden mb-5">
                <CustomizerPanel
                  config={config}
                  onChange={setConfig}
                />
              </div>

              {/* Tablet: button to open drawer + preview */}
              <div className="hidden md:block lg:hidden">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Live Preview</h2>
                    <p className="text-xs text-gray-400 mt-0.5">This is how your testimonial wall will look.</p>
                  </div>
                  <button
                    onClick={() => setShowCustomizerDrawer(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.98]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <line x1="4" y1="21" x2="4" y2="14" />
                      <line x1="4" y1="10" x2="4" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="3" />
                      <line x1="20" y1="21" x2="20" y2="16" />
                      <line x1="20" y1="12" x2="20" y2="3" />
                      <line x1="1" y1="14" x2="7" y2="14" />
                      <line x1="9" y1="8" x2="15" y2="8" />
                      <line x1="17" y1="16" x2="23" y2="16" />
                    </svg>
                    Customize
                  </button>
                </div>
                <PreviewPanel config={config} testimonials={testimonials} />
              </div>

              {/* Desktop: preview only (customizer is in aside) */}
              <div className="hidden lg:block">
                <PreviewPanel config={config} testimonials={testimonials} />
              </div>
            </div>
          </section>
        </main>

        {/* Tablet: customizer drawer */}
        {showCustomizerDrawer && (
          <div className="fixed inset-0 z-50 hidden md:block lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowCustomizerDrawer(false)}
            />
            {/* Drawer */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 shrink-0">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Customize Wall</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Adjust your testimonial wall settings</p>
                  </div>
                  <button
                    onClick={() => setShowCustomizerDrawer(false)}
                    className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <CustomizerPanel config={config} onChange={setConfig} />
                </div>
                <div className="shrink-0 border-t border-gray-200 p-4">
                  <button
                    onClick={() => setShowCustomizerDrawer(false)}
                    className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
                  >
                    Apply & Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Publish modal */}
        {showModal && (
          <PublishModal
            config={config}
            onClose={() => setShowModal(false)}
            onSuccess={handlePublishSuccess}
            initialPublishedData={publishedData}
          />
        )}
      </div>
    </div>
  );
};

export default Testimonials;