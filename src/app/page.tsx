"use client";

import { DataTable } from "@/components/demands-table";
import { useGetDemands } from "@/query/use-get-demands";

export default function Home() {
  const { query, pagination } = useGetDemands();

  return (
    <main className="container">
      <DataTable data={query.data?.data || []} />

      <button onClick={pagination.previous}>Prev page</button>

      <button onClick={pagination.next}>Next page</button>
    </main>
  );
}
