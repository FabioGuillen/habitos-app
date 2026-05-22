import {
  Mail,
  ShieldCheck,
  Pencil,
  LogOut,
  Calendar,
  BadgeCheck,
  Lock,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { logoutUser } from "../utils/logoutUser";
import { useEffect, useState } from "react";
import ProfileSkeleton from "../skeleton/ProfileSkeleton";

const Profile = () => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(!user);

  const initial = user?.name?.charAt(0).toUpperCase() || "U";
  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  if (loading) return <ProfileSkeleton />;
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-black tracking-tight">Mi Perfil</h1>

        <p className="text-gray-400 mt-2">
          Gestiona tu información y seguridad
        </p>
      </div>

      {/* HERO PROFILE */}
      <div className="relative overflow-hidden bg-[#111827] border border-[#1F2937] rounded-[36px]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22C55E]/10 blur-3xl rounded-full" />

        <div className="relative z-10 p-8 md:p-10">
          <div className="flex flex-col xl:flex-row justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-32 h-32 rounded-[30px] object-cover border border-[#1F2937] shadow-xl"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-[30px] bg-[#22C55E] text-black text-5xl font-bold flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,.35)]">
                    {initial}
                  </div>
                )}

                <div className="absolute -bottom-2 -right-2 w-11 h-11 rounded-2xl bg-[#0B0F14] border border-[#1F2937] flex items-center justify-center">
                  <BadgeCheck size={20} className="text-[#22C55E]" />
                </div>
              </div>

              {/* INFO */}
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-4xl font-bold">{user?.name}</h2>

                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] px-3 py-1 rounded-full text-xs font-medium">
                    Cuenta activa
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 mt-4">
                  <Mail size={16} />
                  {user?.email}
                </div>

                <p className="text-gray-500 mt-5 max-w-xl leading-relaxed">
                  Tu perfil está protegido y sincronizado correctamente. Mantén
                  tus datos actualizados para una mejor experiencia.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 xl:self-center shrink-0">
              <Link
                to="/edit-profile"
                className="h-12 px-5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A]
    transition-all duration-300 text-black font-semibold
    flex items-center gap-2 shadow-lg shadow-green-500/20"
              >
                <Pencil size={16} />
                <span className="text-sm">Editar</span>
              </Link>

              <button
                onClick={logoutUser}
                className="w-12 h-12 rounded-2xl
    bg-red-500/10 hover:bg-red-500/20
    border border-red-500/20
    transition-all duration-300
    flex items-center justify-center
    hover:scale-105"
              >
                <LogOut size={18} className="text-red-400" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-10">
            <div className="bg-[#0B0F14] border border-[#1F2937] rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Estado</p>

                  <h3 className="text-xl font-bold mt-2 text-[#22C55E]">
                    Activo
                  </h3>
                </div>

                <ShieldCheck className="text-[#22C55E]" />
              </div>
            </div>

            <div className="bg-[#0B0F14] border border-[#1F2937] rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Seguridad</p>

                  <h3 className="text-xl font-bold mt-2">JWT</h3>
                </div>

                <Lock className="text-blue-400" />
              </div>
            </div>

            <div className="bg-[#0B0F14] border border-[#1F2937] rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Miembro</p>

                  <h3 className="text-xl font-bold mt-2">Premium</h3>
                </div>

                <Calendar className="text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-[#111827] border border-[#1F2937] rounded-[36px] p-7 hover:border-[#22C55E]/30 transition">
          <h3 className="text-2xl font-bold">Información</h3>

          <p className="text-sm text-gray-400 mt-2">Datos de la cuenta</p>

          <div className="space-y-5 mt-8">
            <div className="bg-[#0B0F14] rounded-2xl p-5 border border-[#1F2937]">
              <p className="text-gray-400 text-sm">Nombre</p>

              <p className="font-semibold mt-2">{user?.name}</p>
            </div>

            <div className="bg-[#0B0F14] rounded-2xl p-5 border border-[#1F2937]">
              <p className="text-gray-400 text-sm">Email</p>

              <p className="font-semibold mt-2">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-[36px] p-7 hover:border-blue-500/20 transition">
          <h3 className="text-2xl font-bold">Seguridad</h3>

          <p className="text-sm text-gray-400 mt-2">
            Protección y autenticación
          </p>

          <div className="space-y-5 mt-8">
            <div className="bg-[#0B0F14] rounded-2xl p-5 border border-[#1F2937]">
              <p className="text-gray-400 text-sm">Sesión</p>

              <p className="text-[#22C55E] font-semibold mt-2">
                Activa y protegida
              </p>
            </div>

            <div className="bg-[#0B0F14] rounded-2xl p-5 border border-[#1F2937]">
              <p className="text-gray-400 text-sm">Autenticación</p>

              <p className="text-blue-400 font-semibold mt-2">JWT Enabled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
