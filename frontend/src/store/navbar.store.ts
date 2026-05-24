import { create } from "zustand";

interface NavbarState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
