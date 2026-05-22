import {
  Flame,
  Trophy,
  Target,
  Smile,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { getStats } from "../services/stats";

import { getMe } from "../services/auth";
import DashboardSkeleton from "../skeleton/DashboardSkeleton";
import { useStatsStore } from "../store/stats.store";
import { useUserStore } from "../store/user.store";

const Dashboard = () => {
  const { setStats, stats } = useStatsStore();
  const { setUser, user } = useUserStore();
  const [loading, setLoading] = useState(stats === null || user === null);

  const getMeinfo = async (showSkeleton = true) => {
    if (showSkeleton) setLoading(true);
    try {
      const res = await getMe();
      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadStats(stats === null);
    getMeinfo(user === null);
  }, []);

  const loadStats = async (showSkeleton = true) => {
    if (showSkeleton) setLoading(true);
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <DashboardSkeleton />;
  }
  const cards = [
    {
      title: "Cumplimiento",
      value: `${stats?.completionRate}%`,
      icon: <Flame size={22} />,
      color: "from-[#22C55E]/20 to-[#22C55E]/5",
      iconColor: "text-[#22C55E]",
    },
    {
      title: "Mejor hábito",
      value: stats?.bestHabit || "-",
      icon: <Trophy size={22} />,
      color: "from-yellow-500/20 to-yellow-500/5",
      iconColor: "text-yellow-400",
    },
    {
      title: "Goals",
      value: stats?.goalsCompleted,
      icon: <Target size={22} />,
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-400",
    },
    {
      title: "Mood",
      value: stats?.moodAverage || 0,
      icon: <Smile size={22} />,
      color: "from-purple-500/20 to-purple-500/5",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden bg-[#111827] border border-[#1F2937] rounded-[32px] p-6 md:p-8">
        {/* GLOW */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E]/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
          {/* LEFT */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-sm px-4 py-2 rounded-full font-medium">
              <Sparkles size={16} />
              Tu progreso mensual
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-6 leading-tight">
              Hola,
              <span className="text-[#22C55E] ml-3">
                {user?.name || "Usuario"}
              </span>
            </h1>

            <p className="text-gray-400 text-lg mt-5 leading-relaxed max-w-2xl">
              Cada hábito completado fortalece tu disciplina. Sigue construyendo
              tu mejor versión día tras día.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <div className="bg-[#0B0F14] border border-[#1F2937] rounded-2xl px-5 py-4">
                <p className="text-sm text-gray-400">Rendimiento</p>

                <div className="flex items-center gap-2 mt-2">
                  <p className="text-2xl font-bold">{stats?.completionRate}%</p>

                  <ArrowUpRight className="text-[#22C55E]" />
                </div>
              </div>

              <div className="bg-[#0B0F14] border border-[#1F2937] rounded-2xl px-5 py-4">
                <p className="text-sm text-gray-400">Cuenta</p>

                <div className="flex items-center gap-2 mt-2 text-[#22C55E] font-semibold">
                  <ShieldCheck size={18} />
                  Activa
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center xl:justify-end">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-44 h-44 md:w-56 md:h-56 rounded-[36px] object-cover border border-[#1F2937] shadow-2xl shadow-black/30"
              />
            ) : (
              <div className="w-44 h-44 md:w-56 md:h-56 rounded-[36px] bg-[#22C55E] text-black flex items-center justify-center text-7xl font-bold shadow-2xl shadow-green-500/20">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.1,
            }}
            className={`relative overflow-hidden rounded-[28px] border border-[#1F2937] bg-gradient-to-br ${card.color} p-6`}
          >
            {/* BLUR */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div
                className={`w-14 h-14 rounded-2xl bg-[#0B0F14] border border-[#1F2937] flex items-center justify-center ${card.iconColor}`}
              >
                {card.icon}
              </div>

              <p className="text-gray-400 mt-6 text-sm">{card.title}</p>

              <h2 className="text-4xl font-bold mt-2 tracking-tight">
                {card.value}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-[#111827] border border-[#1F2937] rounded-[32px] p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Rendimiento mensual
              </h2>

              <p className="text-gray-400 mt-2">
                Tu consistencia del mes actual
              </p>
            </div>

            <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] px-4 py-2 rounded-full font-semibold">
              {stats?.completionRate}%
            </div>
          </div>

          <div className="mt-10">
            <div className="w-full h-5 bg-[#0B0F14] rounded-full overflow-hidden border border-[#1F2937]">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${stats?.completionRate}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-full bg-gradient-to-r from-[#22C55E] to-green-400 rounded-full"
              />
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-3">
              <span>Inicio</span>

              <span>Objetivo</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0B0F14] border border-[#1F2937] rounded-[32px] p-6">
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#22C55E]/5 blur-3xl rounded-full" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-3xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center">
              <Sparkles className="text-[#22C55E]" />
            </div>

            <h2 className="text-2xl font-bold mt-8 leading-tight">
              La constancia supera la motivación.
            </h2>

            <p className="text-gray-400 mt-4 leading-relaxed">
              Cada pequeño hábito repetido diariamente genera resultados
              extraordinarios con el tiempo.
            </p>

            <div className="mt-8 bg-[#0B0F14] border border-[#1F2937] rounded-2xl p-5">
              <p className="text-sm text-gray-400">Mejor hábito</p>

              <p className="text-xl font-bold mt-2">
                {stats?.bestHabit || "Sin datos"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
