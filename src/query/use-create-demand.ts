"use client";

import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TArgs = {
  date: Date;
  totalPlan: string;
  description?: string;
};

export function useCreateDemand() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(args: TArgs) {
      await api.post("/demand", args);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["demand"] });
    },
  });
}
