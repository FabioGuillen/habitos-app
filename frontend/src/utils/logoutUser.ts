import { useAuthStore } from "../store/auth.store";
import { useGoalsStore } from "../store/goals.store";
import { useHabitsStore } from "../store/habits.store";
import { useStatsStore } from "../store/stats.store";
import { useUserStore } from "../store/user.store";

export const logoutUser = () => {
  useAuthStore.getState().logout();
  useGoalsStore.getState().clearGoals();
  useHabitsStore.getState().clearHabits();
  useGoalsStore.getState().clearGoals();
  useStatsStore.getState().clearStats();
  useUserStore.getState().clearUser();
};
