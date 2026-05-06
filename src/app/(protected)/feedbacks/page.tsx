"use client";
import FeedbackDashboard from "@/components/feedbacks/feedback-dashboard";
import Sidebar from "@/components/shared/sidebar"



const Feedbacks = () => {

  return (
    <div className="w-full h-screen flex overflow-y-hidden">
      <div><Sidebar/></div>
      <div className="w-full overflow-y-scroll">
        <FeedbackDashboard/>
      </div>
    </div>
  )
}

export default Feedbacks