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
import { SquarePen } from "lucide-react";
import { RemoveDemandDialog } from "./remove-demand-dialog";

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
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button className="bg-blue-900 rounded py-1 px-1">
          <SquarePen className="text-white" />
        </button>

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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
