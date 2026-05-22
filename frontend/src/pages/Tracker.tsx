import { useEffect, useMemo, useState } from "react";
import { Calendar, ChevronDown, ChevronUp, Plus } from "lucide-react";
import { motion } from "framer-motion";

import HabitCard from "../components/HabitCard";
import CreateHabitModal from "../components/CreateHabitModal";

import { deleteHabit, getHabits, toggleHabit } from "../services/habits";
import { useHabitsStore } from "../store/habits.store";
import toast from "react-hot-toast";
import DeleteConfirmModal from "../components/DeleteConfirmarModal";
import HabitsSkeleton from "../skeleton/HabitsSkeleton";

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

const Tracker = () => {
  const { habits, setHabits, setOpen } = useHabitsStore();

  const [filter, setFilter] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [habitIdToDelete, setHabitIdToDelete] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(habits.length === 0);

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const year = now.getFullYear();

  const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const visibleMonths = months.map((m, index) => ({
    name: m,
    offset: index - selectedMonth,
  }));

  const loadHabits = async (showSkeleton = true) => {
    if (showSkeleton) setLoading(true);
    const now = new Date();

    try {
      const data = await getHabits(selectedMonth + 1, now.getFullYear());
      setHabits(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadHabits(habits.length === 0);
  }, [selectedMonth]);

  const handleToggle = async (habitId: string, day: number) => {
    await toggleHabit(habitId, day);

    loadHabits(false);
  };
  const filteredHabits = useMemo(() => {
    if (filter === "best") {
      return [...habits].sort(
        (a: any, b: any) =>
          b.logs.filter((l: any) => l.completed).length -
          a.logs.filter((l: any) => l.completed).length,
      );
    }
    return habits;
  }, [filter, habits]);

  const handleOpenDeleteModal = (id: string) => {
    setHabitIdToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!habitIdToDelete) return;
    try {
      setDeleteLoading(true);
      await deleteHabit(habitIdToDelete);
      toast.success("Hábito eliminado correctamente");
      loadHabits();
    } catch {
      toast.error("No se pudo eliminar el hábito");
    } finally {
      setDeleteLoading(false);
      setDeleteModalOpen(false);
      setHabitIdToDelete(null);
    }
  };
  if (loading) {
    return <HabitsSkeleton />;
  }
  return (
    <div className="space-y-8 p-1 text-gray-100">
      <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#090d14] p-6 sm:p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)]">
        {/* Glow */}
        <div className="absolute -top-32 -right-32 h-[450px] w-[450px] rounded-full bg-[#22C55E]/10 blur-[150px]" />

        <div className="absolute bottom-[-100px] left-[-50px] h-[250px] w-[250px] rounded-full bg-[#22C55E]/5 blur-[100px]" />

        <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 flex flex-col gap-10">
          {/* CONTENT */}

          <div className="space-y-5 max-w-2xl">
            <div
              className="
      inline-flex
      items-center
      gap-2
      rounded-full
      px-4
      py-1
      border
      border-[#22C55E]/20
      bg-[#22C55E]/10"
            >
              <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" />

              <span className="uppercase tracking-widest text-xs font-bold text-[#22C55E]">
                Habit Tracker
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white">
              Construye disciplina
              <br />
              <span className="text-[#22C55E]">todos los días.</span>
            </h1>

            <p className="max-w-xl text-gray-400 leading-relaxed">
              Mantén constancia, visualiza tu progreso y convierte pequeñas
              acciones diarias en resultados acumulativos durante {year}.
            </p>
          </div>

          <div className="flex flex-row justify-between items-center gap-4">
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
            <button
              aria-label="Crear nuevo hábito"
              onClick={() => setOpen(true)}
              className="
        group
        rounded-2xl
        bg-gradient-to-r
        from-[#22C55E]
        to-[#16A34A]
        px-8
        py-4
        font-bold
        text-black
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
                aria-label="Crear nuevo hábito"
              />

              <span className="hidden md:inline">Nuevo Hábito</span>
            </button>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2.5 justify-between items-center">
        <div className="flex gap-2.5">
          {["all", "best"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                filter === item
                  ? "bg-[#22C55E] text-black border-[#22C55E] font-semibold shadow-lg shadow-[#22C55E]/10"
                  : "bg-gray-900/60 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-gray-200"
              }`}
            >
              {item === "all" ? "Todos los hábitos" : "Mejor rendimiento"}
            </button>
          ))}
        </div>
      </div>

      {filteredHabits.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          {filteredHabits.map((habit: any) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              days={days}
              daysInMonth={daysInMonth}
              onToggle={handleToggle}
              handleDeleteNote={handleOpenDeleteModal}
              selectedMonth={selectedMonth}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-gray-800 rounded-3xl text-center"
        >
          <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
            <Calendar className="text-gray-600" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-300">
            No hay hábitos este mes
          </h3>
          <p className="text-gray-500 mt-2 max-w-sm">
            Aún no has creado hábitos para {months[selectedMonth]}. ¡Empieza
            creando uno nuevo!
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-6 px-6 py-3 bg-gray-800 hover:bg-gray-700 transition rounded-xl text-sm font-medium"
          >
            Crear primer hábito
          </button>
        </motion.div>
      )}

      <CreateHabitModal onClose={() => setOpen(false)} onCreated={loadHabits} />

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

export default Tracker;
