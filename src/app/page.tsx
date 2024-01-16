import { DataTable } from "@/components/demands-table";

export default function Home() {
  return (
    <main className="container">
      <DataTable
        data={[
          {
            id: "728ed52f",
            status: "completed",
            description: "descrição",
            totalPlan: 200,
          },
        ]}
      />
    </main>
  );
}
