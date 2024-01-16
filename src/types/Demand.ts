export type TDemand = {
  id: number;
  totalPlan: number;
  created_at: string;
  description: string | null;
  status: "planning" | "in_progress" | "completed";
};
