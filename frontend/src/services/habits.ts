import axios from "./axios";
export interface HabitPayload {
  title: string;
  color: string;
  icon: string;
}
export const getHabits = async (month: number, year: number) =>
  axios.get(`/habits?month=${month}&year=${year}`);

export const toggleHabit = async (id: string, day: number) => {
  const now = new Date();

  await axios.post(`/habits/${id}/toggle`, {
    day,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });
};

export const createHabit = async (data: {
  title: string;
  color: string;
  icon: string;
}) => {
  const now = new Date();

  const res = await axios.post("/habits", {
    ...data,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  return res.data;
};
export const updateMyHabit = async (id: string, data: HabitPayload) => {
  const { data: res } = await axios.put(`/habits/${id}`, data);

  return res;
};
export const deleteHabit = async (id: string) => axios.delete(`/habits/${id}`);
