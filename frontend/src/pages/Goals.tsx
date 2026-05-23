import { useEffect, useMemo, useState } from "react";
import {
  Target,
  Trophy,
  Plus,
  Flame,
  TrendingUp,
  Calendar,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { getGoals, addProgress, deleteGoal } from "../services/goals";
import toast from "react-hot-toast";
import type { GoalForm, GoalsDate } from "../types/goals";
import { useGoalsStore } from "../store/goals.store";
import CreateGoalModal from "../components/CreateGoalModal";
import GoalsGrid from "../components/GoalsGrid";
import DeleteConfirmModal from "../components/DeleteConfirmarModal";
import GoalsPageSkeleton from "../skeleton/GoalsSkeleton";
const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];
const Goals = () => {
  const [open, setOpen] = useState(false);
  const [loadingGoalId, setLoadingGoalId] = useState<string | null>(null);
  const { goals, setGoals, setEditGoal, setGoalForm } = useGoalsStore();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [habitIdToDelete, setHabitIdToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());

  const visibleMonths = months.map((m, index) => ({
    name: m,
    offset: index - selectedMonth,
  }));
  const [loading, setLoading] = useState(goals.length === 0);
  const load = async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) setLoading(true); // Solo es true si es la primera vez
      const data = await getGoals(selectedMonth + 1, now.getFullYear());
      setGoals(data.data);
    } catch (error) {
      console.error("Error al cargar metas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(goals.length === 0);
  }, [selectedMonth]);

  const handleProgress = async (
    id: string,
    amount: number,
    currentValue: number,
    targetValue: number,
  ) => {
    if (amount === 1 && currentValue >= targetValue) return;
    if (amount === -1 && currentValue <= 0) return;

    try {
      setLoadingGoalId(id);
      await addProgress(id, amount);

      await load(false);
    } catch (error) {
      toast.error("No se pudo actualizar el progreso");
    } finally {
      setLoadingGoalId(null);
    }
  };
  const stats = useMemo(() => {
    if (goals.length === 0) {
      return {
        completedGoals: 0,
        activeGoals: 0,
        averageProgress: 0,
        bestGoal: null,
      };
    }

    const completed = goals.filter(
      (g) => g.currentValue >= g.targetValue,
    ).length;
    const active = goals.length - completed;

    const totalPercent = goals.reduce(
      (acc, goal) => acc + (goal.currentValue / goal.targetValue) * 100,
      0,
    );
    const average = Math.round(totalPercent / goals.length);

    const best = goals.reduce((bestGoal, currentGoal) => {
      const currentPercent =
        (currentGoal.currentValue / currentGoal.targetValue) * 100;
      const bestPercent = (bestGoal.currentValue / bestGoal.targetValue) * 100;
      return currentPercent > bestPercent ? currentGoal : bestGoal;
    });

    return {
      completedGoals: completed,
      activeGoals: active,
      averageProgress: average,
      bestGoal: best,
    };
  }, [goals]);

  const handleEditGoal = (goal: GoalsDate) => {
    setEditGoal(goal);

    setGoalForm({
      title: goal.title,
      targetValue: goal.targetValue,
      type: goal.type,
    });
    setOpen(true);
  };
  const handleOpenDeleteModal = (id: string) => {
    setHabitIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!habitIdToDelete) return;
    try {
      setDeleteLoading(true);
      await deleteGoal(habitIdToDelete);
      toast.success("Hábito eliminado correctamente");
      load();
    } catch {
      toast.error("No se pudo eliminar el hábito");
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      setHabitIdToDelete(null);
    }
  };
  if (loading) {
    return <GoalsPageSkeleton />;
  }
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#090d14] p-6 sm:p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)]">
        <div className="absolute -top-32 right-[-100px] h-[450px] w-[450px] rounded-full bg-[#22C55E]/10 blur-[150px]" />

        <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 flex flex-col gap-10">
          <div className="space-y-5 w-full ">
            <div
              className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-[#22C55E]/20
      bg-[#22C55E]/10
      px-4
      py-1 "
            >
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />

              <span className="uppercase text-xs tracking-widest font-bold text-[#22C55E]">
                Goal Tracking
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white">
              Convierte objetivos
              <br />
              <span className="text-[#22C55E]">en resultados reales.</span>
            </h1>

            <p className="max-w-2xl text-gray-400 leading-relaxed">
              Mantén claridad sobre tus prioridades y sigue el progreso de tus
              metas durante{" "}
              <span className="text-white font-semibold capitalize">
                {months[selectedMonth]}
              </span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div
              className="
      flex
      items-center
      gap-4
      rounded-3xl
      border
      border-white/5
      bg-white/[0.03]
      backdrop-blur-xl
      px-4
      py-3"
            >
              <div
                className="
        h-12
        w-12
        rounded-2xl
        bg-[#22C55E]/10
        border
        border-[#22C55E]/20
        flex
        items-center
        justify-center"
              >
                <Calendar size={20} className="text-[#22C55E]" />
              </div>

              <div className="relative h-[60px] w-[150px] overflow-hidden flex items-center justify-center">
                {visibleMonths.map(({ name, offset }) => {
                  if (Math.abs(offset) > 1) return null;

                  return (
                    <motion.div
                      key={name}
                      animate={{
                        y: offset * 32,
                        opacity: offset === 0 ? 1 : 0.3,
                        scale: offset === 0 ? 1 : 0.8,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className={`absolute ${
                        offset === 0
                          ? "text-white text-2xl font-black"
                          : "text-gray-500 text-xs"
                      }`}
                    >
                      {name}
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() =>
                    setSelectedMonth((p) => (p === 0 ? 11 : p - 1))
                  }
                  className="text-gray-400 hover:text-[#22C55E] transition"
                >
                  <ChevronUp size={14} />
                </button>

                <button
                  onClick={() =>
                    setSelectedMonth((p) => (p === 11 ? 0 : p + 1))
                  }
                  className="text-gray-400 hover:text-[#22C55E] transition"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* CTA */}

            <button
              onClick={() => setOpen(true)}
              aria-label="Crear nueva meta"
              className="
        group
        rounded-2xl
        px-8
        py-4
        bg-gradient-to-r
        from-[#22C55E]
        to-[#16A34A]
        text-black
        font-bold
        flex
        items-center
        gap-3
        hover:scale-[1.03]
        transition-all
        shadow-[0_15px_40px_-10px_rgba(34,197,94,0.45)]"
            >
              <Plus
                size={18}
                className="group-hover:rotate-90 transition"
                aria-label="Crear nueva meta"
              />
              <span className="">Nueva Meta</span>
            </button>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Metas activas</p>
              <h3 className="text-4xl font-bold mt-3">{stats.activeGoals}</h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <Target className="text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Completadas</p>
              <h3 className="text-4xl font-bold mt-3">
                {stats.completedGoals}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/10 flex items-center justify-center">
              <Trophy className="text-[#22C55E]" />
            </div>
          </div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Progreso promedio</p>
              <h3 className="text-4xl font-bold mt-3">
                {stats.averageProgress}%
              </h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-[#111827] border border-[#1F2937] rounded-[30px] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Mejor goal</p>
              <h3 className="text-xl font-bold mt-3 line-clamp-1">
                {stats.bestGoal?.title || "-"}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* GOALS GRID */}

      <GoalsGrid
        goals={goals}
        handleEditGoal={handleEditGoal}
        handleProgress={handleProgress}
        loadingGoalId={loadingGoalId}
        setOpen={setOpen}
        handleOpenDeleteModal={handleOpenDeleteModal}
      />

      <div className="relative overflow-hidden bg-gradient-to-r from-[#111827] to-[#0B0F14] border border-[#1F2937] rounded-[36px] p-8">
        <h2 className="text-3xl font-bold">Tu progreso construye tu futuro</h2>
        <p className="text-gray-400 mt-4 max-w-3xl leading-relaxed text-lg">
          Las metas no se cumplen por motivación momentánea, sino por
          consistencia diaria. Cada avance suma.
        </p>
      </div>

      <CreateGoalModal
        open={open}
        onClose={() => setOpen(false)}
        onCreated={load}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setHabitIdToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />
    </div>
  );
};

export default Goals;
