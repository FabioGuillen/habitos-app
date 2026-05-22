import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteLog } from "../types/notes";

interface NotesState {
  notes: NoteLog[];
  setNotes: (notes: NoteLog[]) => void;
  addOrUpdateNote: (note: NoteLog) => void;
  removeNote: (id: string) => void;
  clearNotes: () => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],

      setNotes: (notes) => set({ notes }),

      // Útil para actualizar la lista después de guardar una nota en el modal
      addOrUpdateNote: (newNote) =>
        set((state) => {
          const exists = state.notes.find((n) => n.id === newNote.id);
          if (exists) {
            return {
              notes: state.notes.map((n) =>
                n.id === newNote.id ? newNote : n,
              ),
            };
          }
          return { notes: [...state.notes, newNote] };
        }),

      removeNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),

      clearNotes: () => set({ notes: [] }),
    }),
    {
      name: "notes-storage", // Nombre único en localStorage
    },
  ),
);
