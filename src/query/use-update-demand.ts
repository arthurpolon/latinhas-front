"use client";

import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TArgs = {
  id: number;
  payload: {
    description?: string;
    totalPlan?: string;
    date?: Date;
    status?: "planning" | "in_progress" | "completed";
  };
};

export function useUpdateDemand() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(args: TArgs) {
      await api.patch(`/demand/${args.id}`, args.payload);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["demand"] });
    },
  });
}
