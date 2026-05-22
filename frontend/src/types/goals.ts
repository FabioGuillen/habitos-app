export interface GoalsDate {
  completed: boolean;
  createdAt: string;
  currentValue: number;
  id: string;
  month: number;
  targetValue: number;
  title: string;
  type: "COUNT" | string;
  userId: string;
  year: number;
}
