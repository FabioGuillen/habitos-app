export interface HabitLog {
  id?: string;
  habitId: string;
  day: number;
  month: number;
  year: number;
  completed: boolean;
}

export interface Habit {
  id: string;
  title: string;
  color: string;
  icon: string;
  active: boolean;
  month: number;
  year: number;
  createdAt: string;
  userId: string;
  logs: HabitLog[];
}

export type HabitsResponse = Habit[];
