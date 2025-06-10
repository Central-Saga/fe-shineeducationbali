"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/lib/services/student.service";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {" "}
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "class",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {" "}
          Kelas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "No. Telepon",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "active" ? "success" : "destructive"}>
          {status === "active" ? "Aktif" : "Nonaktif"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Terdaftar",
    cell: ({ row }) => {
      return format(new Date(row.getValue("createdAt")), "dd MMMM yyyy", {
        locale: id,
      });
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const student = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.id)}
            >
              Salin ID Siswa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                (window.location.href = `/dashboard/users/students/${student.id}`)
              }
            >
              Lihat Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Handle edit - will be implemented in parent component
                document.dispatchEvent(
                  new CustomEvent("EDIT_STUDENT", {
                    detail: student,
                  })
                );
              }}
            >
              Ubah Data
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => {
                // Handle delete - will be implemented in parent component
                document.dispatchEvent(
                  new CustomEvent("DELETE_STUDENT", {
                    detail: student,
                  })
                );
              }}
            >
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
