export interface NoteLog {
  id: string;
  userId: string;
  note: string;

  day: number;
  month: number;
  year: number;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}
