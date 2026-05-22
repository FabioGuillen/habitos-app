import { create } from "zustand";
import { persist } from "zustand/middleware"; // Middleware para guardar en localStorage
import type { Habit } from "../types/habits";

interface HabitState {
  habits: Habit[];
  editHabit: Habit | null;
  open: boolean;
  title: string;
  setTitle: (title: string) => void;
  color: string;
  setColor: (color: string) => void;
  setOpen: (open: boolean) => void;
  setEditHabit: (editHabit: Habit | null) => void;
  updateHabit: (habit: Habit) => void;
  setHabits: (habits: Habit[]) => void;
  clearHabits: () => void;
}

export const useHabitsStore = create<HabitState>()(
  persist(
    (set) => ({
      habits: [],
      title: "",
      color: "#22C55E",
      open: false,
      editHabit: null,

      setColor: (color) => set({ color }),
      setTitle: (title) => set({ title }),
      setOpen: (open) => set({ open }),
      setEditHabit: (editHabit) => set({ editHabit }),
      setHabits: (habits) => set({ habits }),

      updateHabit: (updatedHabit) =>
        set((state) => {
          if (!updatedHabit || !updatedHabit.id) return state;
          return {
            habits: state.habits.map((h) =>
              h && h.id === updatedHabit.id ? updatedHabit : h,
            ),
          };
        }),

      clearHabits: () =>
        set({
          habits: [],
          title: "",
          color: "#22C55E",
          open: false,
          editHabit: null,
        }),
    }),
    {
      name: "habits-storage", // Nombre en localStorage
    },
  ),
);
