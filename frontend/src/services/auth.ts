import axiosInstance from "./axios";

export const loginUser = async (email: string, password: string) => {
  return axiosInstance.post("/auth/login", { email, password });
};
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
  });

  return res.data;
};
export const getMe = async () => axiosInstance.get("/auth/me");
export const updateProfile = async (formData: FormData) => {
  const res = await axiosInstance.patch("/auth/profile", formData);

  return res.data;
};
