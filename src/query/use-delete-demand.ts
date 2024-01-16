"use client";

import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteDemand() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      await api.delete(`/demand/${id}`);
    },

    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["demand"] });
    },
  });
}
