import type { GoalType } from "../types/goals";
import axios from "./axios";
interface PayloadGoal {
  title: string;
  targetValue: number;
  type: string;
}
const now = new Date();

const params = {
  month: now.getMonth() + 1,
  year: now.getFullYear(),
};

export const getGoals = async (month: number, year: number) =>
  axios.get(`/goals?month=${month}&year=${year}`);

export const createGoal = async (data: {
  title: string;
  targetValue: number;
  type: GoalType;
}) => {
  const res = await axios.post("/goals", {
    ...data,
    ...params,
  });

  return res.data;
};

export const addProgress = async (id: string, value: number) => {
  const res = await axios.post(`/goals/${id}/progress`, { value });

  return res.data;
};
export const updagteGoalNote = async (id: string, data: PayloadGoal) =>
  axios.put(`/goals/${id}`, data);
export const deleteGoal = async (id: string) => axios.delete(`/goals/${id}`);
