import { create } from "zustand";
import { getMe } from "../services/auth";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

interface FormState {
  email: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  loading: boolean;

  form: FormState;

  setForm: (data: Partial<FormState>) => void;

  setAuth: (user: User, token: string) => void;

  fetchUser: () => Promise<void>;
  setUser: (user: User) => void;
  logout: () => void;

  clearForm: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  token: localStorage.getItem("token") || null,

  loading: false,

  form: {
    email: "",
    password: "",
  },

  setForm: (data) =>
    set((state) => ({
      form: {
        ...state.form,
        ...data,
      },
    })),

  clearForm: () =>
    set({
      form: {
        email: "",
        password: "",
      },
    }),
  setUser: (user) =>
    set({
      user,
    }),
  setAuth: (user, token) => {
    localStorage.setItem("token", token);

    set({
      user,
      token,
    });
  },

  fetchUser: async () => {
    try {
      const data = await getMe();

      set({
        user: data.data,
      });
    } catch (error) {
      console.log(error);

      set({
        user: null,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });

    window.location.href = "/login";
  },
}));
