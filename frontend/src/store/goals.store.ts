import { create } from "zustand";
import { persist } from "zustand/middleware"; // 1. Importa el middleware
import type { GoalsDate } from "../types/goals";
type GoalType = "COUNT" | "MONEY" | "DAYS" | "CUSTOM";
interface GoalForm {
  title: string;
  targetValue: number;
  type: GoalType;
}

interface GoalsState {
  goals: GoalsDate[];
  goalForm: GoalForm;
  editGoal: GoalsDate | null;
  // Acciones
  setGoalForm: (goalForm: GoalForm) => void;
  setGoals: (goals: GoalsDate[]) => void;
  setEditGoal: (editGoal: GoalsDate | null) => void;
  updateGoal: (update: GoalsDate) => void;
  clearGoals: () => void;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      goals: [],
      editGoal: null,
      goalForm: { title: "", targetValue: 10, type: "COUNT" },

      setGoals: (goals) => set({ goals }),
      setEditGoal: (editGoal) => set({ editGoal }),
      setGoalForm: (goalForm) => set({ goalForm }),

      updateGoal: (update) =>
        set((state) => ({
          goals: state.goals.map((g) => (g && g.id === update.id ? update : g)),
        })),

      clearGoals: () =>
        set({
          goals: [],
          editGoal: null,
          goalForm: { title: "", targetValue: 0, type: "COUNT" },
        }),
    }),
    {
      name: "goals-storage",
    },
  ),
);
