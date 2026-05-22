import type { GoalsDate } from "../types/goals";
import { CheckCircle2, Loader2, Minus, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";
import { Pencil, Plus, Trash2 } from "lucide-react";
interface GoalsGridProps {
  goals: GoalsDate[];
  setOpen: (open: boolean) => void;
  handleEditGoal: (goal: GoalsDate) => void;
  handleProgress: (
    id: string,
    value: number,
    currentValue: number,
    targetValue: number,
  ) => void;
  loadingGoalId: string | null;
  handleOpenDeleteModal: (id: string) => void;
}
const GoalsGrid = ({
  goals,
  handleEditGoal,
  handleProgress,
  loadingGoalId,
  setOpen,
  handleOpenDeleteModal,
}: GoalsGridProps) => {
  return (
    <div>
      {goals.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const percent = Math.min(
              Math.round((goal.currentValue / goal.targetValue) * 100),
              100,
            );
            const completed = percent >= 100;
            const isButtonLoading = loadingGoalId === goal.id;

            return (
              <motion.div
                key={goal.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`relative overflow-hidden rounded-[32px] border p-7 transition-all duration-300 ${
                  completed
                    ? "bg-gradient-to-br from-[#22C55E]/5 to-[#111827] border-[#22C55E]/20"
                    : "bg-[#111827] border-[#1F2937] hover:border-gray-700"
                }`}
              >
                <div className="absolute top-6 right-6 transition-opacity duration-300 flex items-center gap-1">
                  <div className="flex gap-3">
                    {" "}
                    <button
                      onClick={() => handleEditGoal(goal)}
                      className="w-9 h-9 rounded-2xl group bg-[#0B0F14] border z-20 border-[#1F2937] flex items-center justify-center hover:border-[#22C55E]/40 transition-all"
                    >
                      <Pencil size={14} className="group-hover:text-blue-300" />
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(goal.id)}
                      className="w-9 h-9 rounded-2xl z-20 group bg-[#0B0F14] border border-[#1F2937] flex items-center justify-center hover:border-[#22C55E]/40 transition-all"
                    >
                      <Trash2 size={14} className="hover:text-red-500" />
                    </button>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">{goal.title}</h2>
                    <p className="text-sm text-gray-400 mb-6">
                      {goal.currentValue} / {goal.targetValue} completado
                    </p>
                    <div className="w-full flex gap-2 items-center">
                      <div className="w-full h-3 bg-[#0B0F14] rounded-full overflow-hidden border border-[#1F2937]/50">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          className={`h-full rounded-full ${
                            completed
                              ? "bg-[#22C55E]"
                              : "bg-gradient-to-r from-[#22C55E] to-green-400"
                          }`}
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center w-20 h-20 rounded-3xl bg-[#0B0F14] border border-[#1F2937] flex-shrink-0">
                        <span className="text-2xl font-black">{percent}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span
                    className={`text-sm font-medium flex items-center gap-2 ${
                      completed ? "text-[#22C55E]" : "text-gray-500"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <Sparkles size={16} />
                    )}
                    {completed ? "¡Objetivo cumplido!" : "Sigue avanzando"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleProgress(
                          goal.id,
                          -1,
                          goal.currentValue,
                          goal.targetValue,
                        )
                      }
                      disabled={goal.currentValue <= 0 || isButtonLoading}
                      className="p-3 rounded-2xl bg-[#0B0F14] border border-[#1F2937] text-gray-500 hover:text-red-400 hover:border-red-500/30 transition-all disabled:opacity-50"
                    >
                      <Minus size={18} />
                    </button>
                    <button
                      onClick={() =>
                        handleProgress(
                          goal.id,
                          1,
                          goal.currentValue,
                          goal.targetValue,
                        )
                      }
                      disabled={completed || isButtonLoading}
                      className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-gray-200 text-black font-bold transition-all disabled:opacity-50"
                    >
                      {isButtonLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        "+1 Progreso"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="relative overflow-hidden bg-[#111827] border border-dashed border-[#1F2937] rounded-[36px] p-14 text-center">
          <Target size={70} className="mx-auto text-[#22C55E]" />
          <h2 className="text-4xl font-bold mt-7">No tienes goals</h2>
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed text-lg">
            Define objetivos claros y empieza a construir tu progreso diario con
            un sistema visual premium.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="mt-8 bg-[#22C55E] hover:bg-[#16A34A] transition-all duration-300 text-black font-semibold px-7 py-4 rounded-3xl inline-flex items-center gap-3"
          >
            <Plus size={20} />
            Crear primera meta
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalsGrid;
