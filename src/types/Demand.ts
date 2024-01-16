export type TDemand = {
  id: number;
  date: string;
  totalPlan: number;
  created_at: string;
  description: string | null;
  status: "planning" | "in_progress" | "completed";
};
