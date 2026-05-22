import { motion } from "framer-motion";
import { Calendar, Flame, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Habit } from "../types/habits";
import { useHabitsStore } from "../store/habits.store";

interface HabitCardProps {
  habit: any;
  days: number[];
  daysInMonth: number;
  onToggle: (habitId: string, day: number) => void;
  handleDeleteNote: (id: string) => void;
  selectedMonth: number;
}

const HabitCard = ({
  habit,
  days,
  daysInMonth,
  onToggle,
  handleDeleteNote,
}: HabitCardProps) => {
  const { setOpen, setColor, setTitle, setEditHabit } = useHabitsStore();
  const today = new Date().getDate();

  const completedDays = habit.logs.filter((l: any) => l.completed).length;
  const progress = Math.round((completedDays / daysInMonth) * 100);

  let streak = 0;

  const completedToday = habit.logs.some(
    (l: any) => l.day === today && l.completed,
  );
  const completedYesterday = habit.logs.some(
    (l: any) => l.day === today - 1 && l.completed,
  );
  const startDay = !completedToday && completedYesterday ? today - 1 : today;

  for (let i = startDay; i >= 1; i--) {
    const log = habit.logs.find((l: any) => l.day === i && l.completed);
    if (log) streak++;
    else break;
  }

  const color = habit.color || "#22C55E";

  const handleDayClick = (day: number) => {
    if (day > today) {
      toast.error(
        `Aún no has llegado al día ${day}. ¡Concéntrate en el día de hoy!`,
        {
          icon: "⏳",
          style: {
            background: "#111827",
            color: "#fff",
            border: "1px border #1F2937",
          },
        },
      );
      return;
    }

    onToggle(habit.id, day);
  };
  const handleEditHabit = async (habit: Habit) => {
    setEditHabit(habit);
    if (habit) {
      setColor(habit.color);
      setTitle(habit.title);
    }

    setOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden bg-[#111827] border border-[#1F2937] rounded-[32px] p-6 transition-all duration-300"
    >
      <div
        className="absolute top-0 right-0 w-56 h-56 blur-3xl rounded-full opacity-40"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
              />
              <h2 className="text-2xl font-bold">{habit.title}</h2>
            </div>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <div
                className="px-4 py-2 rounded-2xl text-sm font-semibold text-black"
                style={{ backgroundColor: color }}
              >
                {progress}%
              </div>

              <div className="flex items-center gap-2 text-orange-400 text-sm font-medium">
                <Flame
                  size={16}
                  className={streak > 0 ? "animate-pulse" : ""}
                />
                {streak} {streak === 1 ? "días" : "días"}
              </div>
            </div>
          </div>

          <div className="h-11 px-4 rounded-2xl bg-[#0B0F14] border border-[#1F2937] flex items-center gap-2.5 hover:border-white/20 transition-all duration-300 w-fit text-gray-400 hover:text-gray-200">
            <Calendar size={16} className="text-[#22C55E] flex-shrink-0" />

            <span className="text-xs font-medium tracking-wide whitespace-nowrap">
              {habit.createdAt
                ? new Date(habit.createdAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Sin fecha"}
            </span>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mt-7">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-400">Progreso mensual</span>
            <span className="font-medium">
              {completedDays}/{daysInMonth}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-[#0B0F14] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6 }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        {/* HEATMAP */}
        <div className="mt-8">
          <div className="grid grid-cols-7 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {days.map((day) => {
              const log = habit.logs.find((l: any) => l.day === day);
              const completed = log?.completed;
              const isFuture = day > today;

              return (
                <motion.button
                  key={day}
                  whileTap={isFuture ? undefined : { scale: 0.9 }}
                  whileHover={isFuture ? undefined : { scale: 1.08 }}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-xl border text-[11px] font-semibold transition-all duration-300 ${
                    completed
                      ? "text-black border-transparent shadow-lg"
                      : isFuture
                        ? "bg-[#0B0F14]/30 border-[#1F2937]/50 text-gray-600 cursor-not-allowed opacity-40"
                        : "bg-[#0B0F14] border-[#1F2937] hover:border-white/20 text-white"
                  } ${
                    day === today
                      ? "ring-2 ring-offset-2 ring-offset-[#111827]"
                      : ""
                  }`}
                  style={
                    completed
                      ? {
                          backgroundColor: color,
                          boxShadow: `0 0 10px ${color}`,
                        }
                      : day === today
                        ? { transform: "none", borderColor: color }
                        : undefined
                  }
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-400">Consistencia del hábito</div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleEditHabit(habit)}
              className="w-10 h-10 rounded-2xl bg-[#0B0F14] border border-[#1F2937] flex items-center justify-center hover:border-blue-500 transition"
            >
              <Pencil size={16} className="text-blue-400" />
            </button>

            <button
              onClick={() => handleDeleteNote(habit.id)}
              className="w-10 h-10 rounded-2xl bg-[#0B0F14] border border-[#1F2937] flex items-center justify-center hover:border-red-500 transition"
            >
              <Trash2 size={16} className="text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitCard;
