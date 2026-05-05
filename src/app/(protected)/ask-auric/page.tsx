"use client";
import AskAuricWindow from "@/components/ask-auric/auric-window";
import Sidebar from "@/components/shared/sidebar"



const AskAuricPage = () => {

  return (
    <div className="w-full h-screen flex overflow-y-hidden">
      <div><Sidebar/></div>
      <div className="w-full">
        <AskAuricWindow/>
      </div>
    </div>
  )
}

export default AskAuricPage