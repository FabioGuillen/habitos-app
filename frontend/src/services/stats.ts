import axios from "./axios";

export const getStats = async () => {
  const now = new Date();

  const res = await axios.get("/stats", {
    params: {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },
  });

  return res.data;
};
