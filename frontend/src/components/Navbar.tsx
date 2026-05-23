import { ChevronDown, LogOut, Settings, User } from "lucide-react";

import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useEffect, useRef, useState } from "react";

import { useAuthStore } from "../store/auth.store";
import { logoutUser } from "../utils/logoutUser";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky md:relative top-1 z-40 mb-5">
      <div className="relative rounded-[32px] border border-[#1F2937] bg-[#0F1722]/75 backdrop-blur-2xl px-4 md:px-7 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#22C55E]/5 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center md:justify-between justify-end">
          <div className="hidden md:block">
            <h2 className="text-2xl font-bold tracking-tight">
              Bienvenido de nuevo
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Sigue desarrollando tu disciplina{" "}
              <span className="text-white font-medium ml-1">{user?.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-3 rounded-2xl border px-3 py-2 transition-all duration-300 ${
                  open
                    ? "border-[#22C55E] bg-[#0B0F14]"
                    : "border-[#1F2937] bg-[#0B0F14] hover:border-[#22C55E]"
                }`}
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-[#22C55E] text-black flex items-center justify-center font-bold">
                    {initial}
                  </div>
                )}

                <div className="hidden md:block text-left">
                  <p className="font-semibold text-sm">{user?.name}</p>

                  <p className="text-xs text-gray-400 mt-1">Cuenta activa</p>
                </div>

                <ChevronDown
                  size={18}
                  className={`transition ${open ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    className="absolute right-0 top-20 w-[320px] rounded-[30px] border border-[#1F2937] bg-[#111827]/95 backdrop-blur-2xl p-3 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
                  >
                    <div className="p-4 border-b border-[#1F2937]">
                      <div className="flex items-center gap-4">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-16 h-16 rounded-3xl object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-3xl bg-[#22C55E] text-black flex items-center justify-center text-xl font-bold">
                            {initial}
                          </div>
                        )}

                        <div>
                          <h3 className="font-bold text-lg">{user?.name}</h3>

                          <p className="text-sm text-gray-400 mt-1">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 p-2">
                      <Link
                        to="/profile"
                        className="flex items-center gap-4 rounded-2xl border border-[#1F2937] bg-[#0B0F14] px-4 py-4 hover:border-[#22C55E] transition"
                      >
                        <User className="text-[#22C55E]" size={20} />

                        <div>
                          <p className="font-medium">Perfil</p>

                          <p className="text-xs text-gray-400 mt-1">
                            Ver cuenta
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/edit-profile"
                        className="flex items-center gap-4 rounded-2xl border border-[#1F2937] bg-[#0B0F14] px-4 py-4 hover:border-blue-500 transition"
                      >
                        <Settings className="text-blue-400" size={20} />

                        <div>
                          <p className="font-medium">Configuración</p>

                          <p className="text-xs text-gray-400 mt-1">
                            Editar Preferencias
                          </p>
                        </div>
                      </Link>

                      <button
                        onClick={logoutUser}
                        className="w-full flex items-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 hover:bg-red-500/20 transition"
                      >
                        <LogOut className="text-red-400" size={20} />

                        <div className="text-left">
                          <p className="font-medium text-red-400">
                            Cerrar sesión
                          </p>

                          <p className="text-xs text-red-300/70 mt-1">
                            Finalizar la sesión actual{" "}
                          </p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
