"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Schedule, ScheduleType } from "@/types/schedule";
import { scheduleData } from "@/data/data-admin/schedule/schedule-data";
import {
  CalendarRange,
  Eye,
  FileText,
  PencilIcon,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(scheduleData);
  const router = useRouter();

  const columns: ColumnDef<Schedule>[] = [
    {
      accessorKey: "id",
      header: "ID Jadwal",
    },
    {
      accessorKey: "title",
      header: "Nama Jadwal",
    },
    {
      accessorKey: "schedule_type",
      header: "Tipe",
      cell: ({ row }) => {
        const type = row.getValue("schedule_type") as ScheduleType;
        return (
          <Badge>
            {type === "REGULAR"
              ? "Reguler"
              : type === "EXAM"
              ? "Ujian"
              : type === "EVENT"
              ? "Event"
              : "Libur"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "education_level",
      header: "Jenjang",
    },
    {
      accessorKey: "start_date",
      header: "Tanggal Mulai",
    },
    {
      accessorKey: "end_date",
      header: "Tanggal Selesai",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "ACTIVE"
                ? "success"
                : status === "DRAFT"
                ? "secondary"
                : "outline"
            }
          >
            {status === "ACTIVE"
              ? "Aktif"
              : status === "DRAFT"
              ? "Draft"
              : "Tidak Aktif"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Aksi",
      cell: ({ row }) => {
        const schedule = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/schedule/detail/${schedule.id}`)
                }
              >
                <Eye className="h-4 w-4 mr-2" />
                Detail
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/schedule/print/${schedule.id}`)
                }
              >
                <FileText className="h-4 w-4 mr-2" />
                Cetak
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/dashboard/schedule/edit/${schedule.id}`)
                }
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Manajemen Jadwal</h2>
        <Button onClick={() => router.push("/dashboard/schedule/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Jadwal
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter Tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Tipe</SelectItem>
                <SelectItem value="REGULAR">Reguler</SelectItem>
                <SelectItem value="EXAM">Ujian</SelectItem>
                <SelectItem value="EVENT">Event</SelectItem>
                <SelectItem value="HOLIDAY">Libur</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter Jenjang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenjang</SelectItem>
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA">SMA</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="ACTIVE">Aktif</SelectItem>
                <SelectItem value="INACTIVE">Tidak Aktif</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <Input
                placeholder="Cari jadwal..."
                type="search"
                className="w-full"
              />
            </div>
          </div>

          <DataTable columns={columns} data={schedules} />
        </div>
      </Card>
    </div>
  );
};

export default ScheduleManagement;
