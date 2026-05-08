"use client";
import DashboardContent from "@/components/dashboard/dashboard-content";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Sidebar from "@/components/shared/sidebar"



const Dashboard = () => {

  return (
    <div className="w-full h-screen flex md:overflow-y-hidden">
      <div><Sidebar/></div>
      <div className="w-full mt-16 md:mt-0">
        <DashboardHeader/>
        <DashboardContent/>
      </div>
    </div>
  )
}

export default Dashboard