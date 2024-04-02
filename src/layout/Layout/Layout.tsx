import { Outlet } from "react-router-dom";
import { Sidebar } from "layout/Sidebar";
import { TopBar } from "layout/Topbar";

export function AppLayout() {
  return (
    <div className="flex bg-[#F5F5F5] transition-all duration-1000 ease-in-out">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen h-screen overflow-x-hidden overflow-y-auto">
        <TopBar />
        <div className="p-3">
          <div className="p-[36px]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
