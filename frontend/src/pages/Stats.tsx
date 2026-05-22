import {
  Flame,
  Trophy,
  Target,
  Activity,
  Sparkles,
  ArrowUpRight,
  Crown,
} from "lucide-react";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

import { getStats } from "../services/stats";
import StatsSkeleton from "../skeleton/StatsSkeleton";
import { useStatsStore } from "../store/stats.store";

const Stats = () => {
  const { setStats, stats } = useStatsStore();
  const [loading, setLoading] = useState(stats === null);

  const loadStats = async (showSkeleton = true) => {
    if (showSkeleton) setLoading(true);
    try {
      const data = await getStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats(stats === null);
  }, []);

  if (loading || stats === null) {
    return <StatsSkeleton />;
  }

  const totalActivity = stats.weeklyActivity.reduce(
    (acc, item) => acc + item.value,
    0,
  );

  const cards = [
    {
      title: "Cumplimiento",
      value: `${stats.completionRate}%`,
      icon: <Flame size={24} />,
      color: "from-[#22C55E]/20 to-[#22C55E]/5",
      iconBg: "bg-[#22C55E]/10",
      iconColor: "text-[#22C55E]",
    },
    {
      title: "Mejor hábito",
      value: stats.bestHabit || "-",
      icon: <Crown size={24} />,
      color: "from-yellow-500/20 to-yellow-500/5",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
    },
    {
      title: "Goals",
      value: stats.goalsCompleted,
      icon: <Target size={24} />,
      color: "from-blue-500/20 to-blue-500/5",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Actividad",
      value: totalActivity,
      icon: <Activity size={24} />,
      color: "from-purple-500/20 to-purple-500/5",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HERO */}
      <div className="relative overflow-hidden bg-[#111827] border border-[#1F2937] rounded-[36px] p-6 md:p-8">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22C55E]/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles size={16} />
              Estadísticas premium
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight tracking-tight">
              Tu progreso
              <span className="text-[#22C55E]"> evoluciona</span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mt-5 max-w-2xl">
              Analiza tu disciplina, consistencia y rendimiento mensual con
              métricas avanzadas en tiempo real.
            </p>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#22C55E]/20 to-transparent border border-[#1F2937] flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-[#0B0F14] border border-[#1F2937] flex flex-col items-center justify-center shadow-2xl shadow-green-500/10">
                <p className="text-gray-400 text-sm">Cumplimientos </p>

                <h2 className="text-6xl font-bold mt-2">
                  {stats.completionRate}%
                </h2>

                <div className="mt-4 flex items-center gap-2 text-[#22C55E] text-sm font-medium">
                  <ArrowUpRight size={16} />
                  En progreso
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CARDS */}
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
              delay: index * 0.08,
            }}
            className={`relative overflow-hidden rounded-[30px] border border-[#1F2937] bg-gradient-to-br ${card.color} p-6`}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div
                className={`w-16 h-16 rounded-3xl ${card.iconBg} border border-[#1F2937] flex items-center justify-center ${card.iconColor}`}
              >
                {card.icon}
              </div>

              <p className="text-gray-400 mt-7 text-sm">{card.title}</p>

              <h2 className="text-4xl font-bold mt-2 tracking-tight">
                {card.value}
              </h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 bg-[#111827] border border-[#1F2937] rounded-[32px] p-6 md:p-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Actividad semanal
              </h2>

              <p className="text-gray-400 mt-2">Hábitos completados por día</p>
            </div>

            <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] px-4 py-2 rounded-full font-semibold">
              {totalActivity} total
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyActivity}>
                <CartesianGrid stroke="#1F2937" vertical={false} />

                <XAxis
                  dataKey="day"
                  stroke="#9CA3AF"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(255,255,255,0.03)",
                  }}
                  contentStyle={{
                    background: "#0B0F14",
                    border: "1px solid #1F2937",
                    borderRadius: "18px",
                    color: "#fff",
                  }}
                />

                <Bar dataKey="value" fill="#22C55E" radius={[14, 14, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SIDE PANEL */}
        <div className="space-y-5">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0B0F14] border border-[#1F2937] rounded-[32px] p-6">
            <div className="absolute top-0 right-0 w-52 h-52 bg-yellow-500/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <Trophy className="text-yellow-400" />
              </div>

              <p className="text-gray-400 text-sm mt-8">Mejor hábito</p>

              <h2 className="text-3xl font-bold mt-3 leading-tight">
                {stats.bestHabit || "-"}
              </h2>

              <p className="text-gray-400 mt-4 leading-relaxed">
                Tu hábito más constante y fuerte este mes.
              </p>
            </div>
          </div>

          {/* GOALS */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#111827] to-[#0B0F14] border border-[#1F2937] rounded-[32px] p-6">
            <div className="absolute top-0 right-0 w-52 h-52 bg-blue-500/10 blur-3xl rounded-full" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Target className="text-blue-400" />
              </div>

              <p className="text-gray-400 text-sm mt-8">Goals completados</p>

              <h2 className="text-5xl font-bold mt-3">
                {stats.goalsCompleted}
              </h2>

              <p className="text-gray-400 mt-4 leading-relaxed">
                Metas alcanzadas durante este mes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AREA CHART */}
      <div className="relative overflow-hidden bg-[#111827] border border-[#1F2937] rounded-[36px] p-6 md:p-8">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#22C55E]/5 blur-3xl rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Evolución</h2>

              <p className="text-gray-400 mt-2">
                Visualiza tu progreso semanal
              </p>
            </div>

            <div className="text-[#22C55E] font-semibold">
              Disciplina activa
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.weeklyActivity}>
                <defs>
                  <linearGradient
                    id="greenGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22C55E" stopOpacity={0.5} />

                    <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid stroke="#1F2937" vertical={false} />

                <XAxis
                  dataKey="day"
                  stroke="#9CA3AF"
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#0B0F14",
                    border: "1px solid #1F2937",
                    borderRadius: "18px",
                    color: "#fff",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22C55E"
                  strokeWidth={4}
                  fill="url(#greenGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* MOTIVATION */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#111827] to-[#0B0F14] border border-[#1F2937] rounded-[36px] p-8">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#22C55E]/10 blur-3xl rounded-full" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-3xl">
            <div className="w-16 h-16 rounded-3xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mb-6">
              <Flame className="text-[#22C55E]" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Tu disciplina está creciendo
            </h2>

            <p className="text-gray-400 mt-5 text-lg leading-relaxed">
              La constancia diaria transforma pequeñas acciones en resultados
              extraordinarios. Sigue avanzando un día a la vez.
            </p>
          </div>

          <div className="bg-[#0B0F14] border border-[#1F2937] rounded-[28px] px-8 py-7 min-w-[240px]">
            <p className="text-gray-400 text-sm">Nivel actual</p>

            <h2 className="text-5xl font-bold mt-3">PRO</h2>

            <p className="text-[#22C55E] mt-3 font-medium">Disciplina activa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
