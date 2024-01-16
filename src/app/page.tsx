"use client";

import { DataTable } from "@/components/demands-table";
import { Button } from "@/components/ui/button";
import { useGetDemands } from "@/query/use-get-demands";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const { query, pagination } = useGetDemands();

  const demands = query.data?.data || [];
  const meta = query.data?.meta;

  const range = () => {
    if (!meta) return null;

    const startItem = (meta.page - 1) * meta.take + 1;
    const endItem = Math.min(meta.page * meta.take, meta.itemCount);

    return `${startItem} - ${endItem} of ${meta.itemCount}`;
  };

  return (
    <main className="container">
      <DataTable data={demands} />

      <div className="flex items-center justify-end">
        {range()}

        <Button
          onClick={pagination.previous}
          variant={"ghost"}
          className="h-auto p-2"
        >
          <ChevronLeft />
        </Button>

        <Button
          onClick={pagination.next}
          variant={"ghost"}
          className="h-auto p-2"
        >
          <ChevronRight />
        </Button>
      </div>
    </main>
  );
}
