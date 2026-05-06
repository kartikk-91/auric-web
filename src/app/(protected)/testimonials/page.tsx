"use client";
import Sidebar from "@/components/shared/sidebar"
import CustomizerPanel from "@/components/testimonials/customizer-panel";
import Header from "@/components/testimonials/header";
import PreviewPanel from "@/components/testimonials/preview-panel";
import PublishModal from "@/components/testimonials/publish-modal";
import { testimonials, defaultWallConfig } from "@/data/testimonial-data";
import { useState } from "react";


const Testimonials = () => {
  const [config, setConfig] = useState(defaultWallConfig);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full h-screen flex overflow-y-hidden">
      <div><Sidebar /></div>
      <div className="w-full">
        <Header onPublish={() => setShowModal(true)} />
        <main className="flex-1 flex gap-6 px-8 py-6 w-full mx-auto">
       
          <div className="w-[380px] h-full shrink-0 overflow-y-scroll">
            <CustomizerPanel config={config} onChange={setConfig} />
          </div>

      
          <div className="w-px bg-gray-200 self-stretch" />

    
          <div className="flex-1 min-w-0">
            <PreviewPanel config={config} testimonials={testimonials} />
          </div>
        </main>

        {showModal && <PublishModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  )
}

export default Testimonials