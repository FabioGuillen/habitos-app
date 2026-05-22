import { create } from "zustand";
import type { Stats } from "../types/stats";
import { persist } from "zustand/middleware";
interface StatsState {
  stats: Stats | null;
  setStats: (stats: Stats) => void;
  clearStats: () => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      stats: null,
      setStats: (stats: Stats) => set({ stats }),
      clearStats: () => set({ stats: null }),
    }),
    { name: "stats-storage" },
  ),
);
