export interface GoalsDate {
  completed: boolean;
  createdAt: string;
  currentValue: number;
  id: string;
  month: number;
  targetValue: number;
  title: string;
  type: GoalType;
  userId: string;
  year: number;
}
export type GoalType = "COUNT" | "MONEY" | "DAYS" | "CUSTOM";
export interface GoalForm {
  title: string;
  targetValue: number;
  type: GoalType;
}
