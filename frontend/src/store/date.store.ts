import { create } from "zustand";

interface DateStore {
  selectedMonth: number;
  setSelectedMonth: (month: number) => void;
}

export const useDateStore = create<DateStore>((set) => ({
  selectedMonth: new Date().getMonth(),
  setSelectedMonth: (month) => set({ selectedMonth: month }),
}));
