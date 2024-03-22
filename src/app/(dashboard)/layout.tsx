import NavBar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import exp from "constants";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-80 md:flex-col md:fixed md:inset-y-0 z[80] bg-gray-900">
          <SideBar />
        </div>

        <main className="md:pl-80">
          <NavBar />
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
