"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TDemand } from "@/types/Demand";
import { RemoveDemandDialog } from "./remove-demand-dialog";
import { EditDemandDialog } from "./edit-demand-dialog";
import { formatDate } from "@/lib/utils";

const columns: ColumnDef<TDemand>[] = [
  {
    accessorKey: "id",
    header: "SKU",
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => row.original.description || "-",
  },
  {
    accessorKey: "totalPlan",
    header: "Total Plan (tons)",
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {formatDate(row.original.date, "PPP")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      switch (row.original.status) {
        case "planning":
          return (
            <div className="bg-red-300 whitespace-nowrap w-fit py-1 px-2 rounded-lg">
              Planejamento
            </div>
          );
        case "in_progress":
          return (
            <div className="bg-blue-300 whitespace-nowrap w-fit py-1 px-2 rounded-lg">
              Em Andamento
            </div>
          );
        case "completed":
          return (
            <div className="bg-green-300 whitespace-nowrap w-fit py-1 px-2 rounded-lg">
              Concluído
            </div>
          );
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <EditDemandDialog demand={row.original} />

        <RemoveDemandDialog demandId={row.original.id} />
      </div>
    ),
  },
];

interface IProps {
  data: TDemand[];
}

export function DemandsTable({ data }: IProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
