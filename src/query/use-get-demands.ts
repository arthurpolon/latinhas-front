"use client";

import { usePagination } from "@/hooks/use-pagination";
import { api } from "@/services/api";
import { TDemand } from "@/types/Demand";
import { TPaginated } from "@/types/Paginated";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useGetDemands() {
  const [pageCount, setPageCount] = useState(0);
  const pagination = usePagination({
    total: pageCount,
  });

  const query = useQuery<TPaginated<TDemand>>({
    queryKey: ["demand", pagination.active],
    queryFn: () =>
      api
        .get(`/demand?page=${pagination.active}&take=9`)
        .then((res) => res.data),
  });

  useEffect(() => {
    setPageCount(query.data?.meta.pageCount || 0);
  }, [query.data?.meta.pageCount]);

  return { query, pagination };
}
