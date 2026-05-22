export interface Stats {
  completionRate: number;
  goalsCompleted: number;
  bestHabit: string;
  moodAverage: number;
  weeklyActivity: {
    day: string;
    value: number;
  }[];
}
