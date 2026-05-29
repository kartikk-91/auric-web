import { getDashboardData } from "@/app/actions/get-dashboard";
import { DashboardProvider } from "@/providers/dashboard-provider";
import DashboardContent from "@/components/dashboard/dashboard-content";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Sidebar from "@/components/shared/sidebar";


const Dashboard =
  async () => {

    const result =
      await getDashboardData();

    if (!result.success) {
      throw new Error(
        result.error
      );
    }

    return (
      <div className="w-full h-screen flex md:overflow-y-hidden">
        <div>
          <Sidebar />
        </div>

        <div className="w-full mt-16 md:mt-0">
          <DashboardProvider
            dashboardData={
              result.data
            }
          >
            <DashboardHeader />
            <DashboardContent />
          </DashboardProvider>
        </div>
      </div>
    );
  };

export default Dashboard;