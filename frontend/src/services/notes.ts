import axios from "./axios";
export const getMonthNotes = async (month: number, year: number) =>
  axios.get(`/notes?month=${month}&year=${year}`);

export const saveNote = async (day: number, note: string) => {
  const now = new Date();

  const res = await axios.post("/notes", {
    day,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    note,
  });

  return res.data;
};
export const deleteNote = async (id: string) => axios.delete(`/notes/${id}`);
