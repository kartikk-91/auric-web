"use client";
import Sidebar from "@/components/shared/sidebar";
import SettingsView from "@/components/settings/settings-view";

const Settings = () => {
  return (
    <div className="w-full h-screen flex overflow-y-hidden">
      <div><Sidebar/></div>
      <div className="w-full overflow-y-auto">
        <SettingsView />
      </div>
    </div>
  )
}

export default Settings