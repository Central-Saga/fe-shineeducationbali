"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";

export type TeacherAttendance = {
  id: string;
  teacherId: string;
  teacherName: string;
  className: string;
  date: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "SICK" | "PERMISSION";
  time?: string;
  notes?: string;
  uploadTime: string;
  attachment: string;
};

export const teacherAttendanceColumns: ColumnDef<TeacherAttendance>[] = [
  {
    accessorKey: "teacherName",
    header: "Nama Guru",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("teacherName")}</div>
    ),
  },
  {
    accessorKey: "className",
    header: "Kelas",
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">{row.getValue("className")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div>{date.toLocaleDateString("id-ID")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusConfig = {
        PRESENT: {
          label: "HADIR",
          className: "bg-green-100 text-green-800",
        },
        LATE: {
          label: "TERLAMBAT",
          className: "bg-orange-100 text-orange-800",
        },
        SICK: {
          label: "SAKIT",
          className: "bg-blue-100 text-blue-800",
        },
        PERMISSION: {
          label: "IZIN",
          className: "bg-[#DAA625]/10 text-[#DAA625]",
        },
        ABSENT: {
          label: "ALPHA",
          className: "bg-[#C40503]/10 text-[#C40503]",
        },
      };

      const config = statusConfig[status as keyof typeof statusConfig] || {
        label: status,
        className: "bg-gray-100 text-gray-800",
      };

      return (
        <Badge className={`${config.className} border-none`}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Waktu Masuk",
    cell: ({ row }) => {
      const time = row.getValue("time") as string;
      return <div className="text-center">{time || "-"}</div>;
    },
  },
  {
    accessorKey: "uploadTime",
    header: "Waktu Upload",
    cell: ({ row }) => {
      const uploadTime = row.getValue("uploadTime") as string;
      return <div className="text-sm text-gray-600">{uploadTime || "-"}</div>;
    },
  },
  {
    accessorKey: "attachment",
    header: "Dokumen",
    cell: ({ row }) => {
      const attachment = row.getValue("attachment") as string;
      return (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
            {attachment || "Tidak ada"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Catatan",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string;
      return (
        <div className="text-sm text-gray-600 max-w-xs truncate">
          {notes || "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const attachment = row.getValue("attachment") as string;
      
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3"
            onClick={() => {
              // Handle view document
              console.log("View document:", attachment);
            }}
          >
            <Eye className="h-3 w-3 mr-1" />
            Lihat
          </Button>
          {attachment && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3"
              onClick={() => {
                // Handle download document
                console.log("Download document:", attachment);
              }}
            >
              <Download className="h-3 w-3 mr-1" />
              Unduh
            </Button>
          )}
        </div>
      );
    },
  },
];
