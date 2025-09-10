"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Attendance } from "@/types/attendance";

// Extend Attendance type with required display fields
const columnHelper = createColumnHelper<
  Attendance & {
    studentName: string;
    className: string;
    teacherName: string;
    inputBy: string;
    inputTime: string;
  }
>();

const getStatusBadge = (status: Attendance["status"]) => {
  const variants = {
    PRESENT: "success",
    ABSENT: "destructive",
    LATE: "secondary",
    SICK: "outline",
    PERMISSION: "default",
  } as const;

  const labels = {
    PRESENT: "Hadir",
    ABSENT: "Tidak Hadir",
    LATE: "Terlambat",
    SICK: "Sakit",
    PERMISSION: "Izin",
  } as const;

  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

export const studentAttendanceColumns = [
  columnHelper.accessor("studentName", {
    header: "Nama Siswa",
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
  }),
  columnHelper.accessor("className", {
    header: "Kelas",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("teacherName", {
    header: "Guru",
    cell: (info) => <div className="text-sm text-gray-600">{info.getValue()}</div>,
  }),
  columnHelper.accessor("date", {
    header: "Tanggal",
    cell: (info) =>
      format(new Date(info.getValue()), "dd MMMM yyyy", { locale: id }),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => getStatusBadge(info.getValue()),
  }),
  columnHelper.accessor("notes", {
    header: "Keterangan",
    cell: (info) => info.getValue() || "-",
  }),
  columnHelper.accessor("inputBy", {
    header: "Input Oleh",
    cell: (info) => (
      <div className="text-sm text-gray-600">
        <div className="font-medium">{info.getValue()}</div>
        <div className="text-xs text-gray-400">{info.row.original.inputTime}</div>
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const attendance = row.original;
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              document.dispatchEvent(
                new CustomEvent("EDIT_ATTENDANCE", {
                  detail: attendance,
                })
              );
            }}
          >
            Lihat Detail
          </Button>
        </div>
      );
    },
  }),
];
