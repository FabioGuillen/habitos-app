import {
  LayoutDashboard,
  CalendarCheck,
  NotebookPen,
  Target,
  BarChart3,
  Menu,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

const links = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    color: "text-[#22C55E]",
  },
  {
    name: "Tracker",
    icon: CalendarCheck,
    path: "/tracker",
    color: "text-blue-400",
  },
  {
    name: "Notes",
    icon: NotebookPen,
    path: "/notes",
    color: "text-yellow-400",
  },
  {
    name: "Goals",
    icon: Target,
    path: "/goals",
    color: "text-purple-400",
  },
  {
    name: "Stats",
    icon: BarChart3,
    path: "/stats",
    color: "text-pink-400",
  },
];

interface Props {
  open: boolean;

  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: Props) => {
  const { pathname } = useLocation();

  return (
    <>
      {/* MOBILE BUTTON */}
      {!open && (
        <div className="md:hidden sticky  top-8 left-8 z-40">
          <button
            onClick={() => setOpen(true)}
            className="group relative overflow-hidden bg-[#111827]/90 backdrop-blur-xl border border-[#1F2937] hover:border-[#22C55E]/40 transition-all duration-300 p-3 rounded-2xl shadow-2xl shadow-black/30"
          >
            <div className="absolute inset-0 bg-[#22C55E]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            <Menu size={24} className="relative z-10" />
          </button>
        </div>
      )}

      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* MOBILE SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-[320px] bg-[#0B0F14]/95 backdrop-blur-2xl border-r border-[#1F2937] md:hidden z-[999] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#22C55E]/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between px-3 py-3 border-b border-[#1F2937]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#22C55E] flex items-center justify-center text-black shadow-lg shadow-green-500/20">
                <Sparkles size={24} />
              </div>

              <div>
                <h1 className="text-xl font-black tracking-tight">My Habits</h1>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-11 h-11 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-[#22C55E]/40 transition-all flex items-center justify-center"
            >
              <X size={20} />
            </button>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 px-2 py-3 space-y-3 overflow-y-auto">
            {links.map((item, index) => {
              const active = pathname === item.path;

              return (
                <motion.div
                  key={item.path}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`group relative overflow-hidden flex items-center justify-between rounded-3xl md:px-5 md:py-4 px-3 py-2 transition-all duration-300 ${
                      active
                        ? "bg-[#22C55E] text-black shadow-2xl shadow-green-500/20"
                        : "bg-[#111827]/70 border border-[#1F2937] hover:border-[#22C55E]/20 text-gray-300 hover:text-white"
                    }`}
                  >
                    {!active && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#22C55E]/5 to-transparent" />
                    )}

                    <div className="relative z-10 flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                          active ? "bg-black/10" : "bg-[#0B0F14]"
                        }`}
                      >
                        <item.icon
                          size={18}
                          className={active ? "text-black" : item.color}
                        />
                      </div>

                      <div>
                        <p className="font-semibold text-base">{item.name}</p>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        active
                          ? "translate-x-1"
                          : "group-hover:translate-x-1 text-gray-500"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex relative flex-col w-[310px] min-h-screen bg-[#0B0F14] border-r border-[#1F2937] overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#22C55E]/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col h-full px-5 py-6">
          <div className="flex items-center gap-4 px-3">
            <div className="relative">
              <div className="w-16 h-16 rounded-[22px] bg-[#22C55E] flex items-center justify-center text-black shadow-2xl shadow-green-500/30">
                <Sparkles size={24} />
              </div>

              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-black border-2 border-[#22C55E]" />
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight">My Habits</h1>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#1F2937] to-transparent my-4" />

          {/* NAV */}
          <nav className="flex-1 space-y-3">
            {links.map((item, index) => {
              const active = pathname === item.path;

              return (
                <motion.div
                  key={item.path}
                  initial={{
                    opacity: 0,
                    x: -15,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.07,
                  }}
                >
                  <Link
                    to={item.path}
                    className={`group relative overflow-hidden flex items-center justify-between rounded-[28px] px-5 py-4 transition-all duration-300 ${
                      active
                        ? "bg-[#22C55E] text-black shadow-[0_20px_60px_-15px_rgba(34,197,94,0.45)]"
                        : "bg-[#111827]/70 border border-[#1F2937] hover:border-[#22C55E]/20 text-gray-300 hover:text-white"
                    }`}
                  >
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                    )}

                    {!active && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-[#22C55E]/5 to-transparent" />
                    )}

                    <div className="relative z-10 flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          active ? "bg-black/10" : "bg-[#0B0F14]"
                        }`}
                      >
                        <item.icon
                          size={24}
                          className={active ? "text-black" : item.color}
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-[15px] tracking-wide">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    <ChevronRight
                      size={18}
                      className={`relative z-10 transition-all duration-300 ${
                        active
                          ? "translate-x-1"
                          : "group-hover:translate-x-1 text-gray-500"
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
