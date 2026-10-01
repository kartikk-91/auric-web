import { auth } from "@/auth";
import { getDashboardService } from "@/app/api/dashboard/dashboard-service";
import { DashboardProvider } from "@/providers/dashboard-provider";
import DashboardContent from "@/components/dashboard/dashboard-content";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Sidebar from "@/components/shared/sidebar";

export const dynamic = "force-dynamic";

const Dashboard =
  async () => {

    const session = await auth();
    if (!session?.user?.c_id) throw new Error("Unauthorized");
    const dashboardData = await getDashboardService(session.user.c_id);

    return (
      <div className="app-shell w-full h-screen flex md:overflow-y-hidden">
        <div>
          <Sidebar />
        </div>

        <div className="w-full mt-16 md:mt-0">
          <DashboardProvider
            dashboardData={
              dashboardData
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
