import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";

const MainLayout = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <div className="h-screen w-full bg-[#0B0F14] text-white flex overflow-hidden ">
      <aside className="hidden md:flex w-72 border-r border-[#1F2937] bg-[#111827]  flex-col flex-shrink-0">
        <Sidebar open={openMenu} setOpen={setOpenMenu} />
      </aside>

      <main className="flex-1 overflow-y-auto px-4 pb-4 md:pb-4 md:px-8 md:pt-2 pt-2 custom-scrollbar">
        <div className="max-w-7xl mx-auto">
          <div className="md:hidden block">
            <Sidebar open={openMenu} setOpen={setOpenMenu} />
          </div>

          <Navbar />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
