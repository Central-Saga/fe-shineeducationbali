"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Schedule, ScheduleType } from "@/types/schedule";
import { scheduleData } from "@/data/data-admin/schedule/schedule-data";
import {
  CalendarRange,
  Eye,
  FileText,
  PencilIcon,
  MoreHorizontal,
  UserPlus,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header, TableLayout } from "@/components/ui-admin/layout";

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(scheduleData);
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>(scheduleData);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();

  // Filter and pagination logic
  useEffect(() => {
    let filtered = schedules;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (schedule) =>
          schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          schedule.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          schedule.education_level.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((schedule) => schedule.schedule_type === typeFilter);
    }

    // Level filter
    if (levelFilter !== "all") {
      filtered = filtered.filter((schedule) => schedule.education_level === levelFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((schedule) => schedule.status === statusFilter);
    }

    setFilteredSchedules(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [schedules, searchQuery, typeFilter, levelFilter, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSchedules = filteredSchedules.slice(startIndex, endIndex);

  const columns: ColumnDef<Schedule>[] = [
    {
      id: "no",
      header: "No",
      cell: ({ row }) => {
        return <div className="text-center font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
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

  // Calculate statistics
  const totalSchedules = schedules.length;
  const activeSchedules = schedules.filter(s => s.status === 'ACTIVE').length;
  const newSchedules = schedules.filter(s => {
    // Mock: schedules created in last 30 days
    return Math.random() > 0.7; // Random for demo
  }).length;
  const pendingSchedules = schedules.filter(s => s.status === 'DRAFT').length;

  return (
    <Header
      header={{
        title: "Schedule Management",
        description: "Kelola semua jadwal dalam sistem",
        actions: [
          {
            label: "Add New Schedule",
            onClick: () => router.push("/dashboard/schedule/create"),
            icon: <UserPlus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <TableLayout
        title="Schedule Management"
        description="Manage all schedule accounts in the system"
        data={currentSchedules}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search schedules by title, description..."
        filters={[
          {
            key: "status",
            label: "All Status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "all", label: "All Status" },
              { value: "ACTIVE", label: "Active" },
              { value: "INACTIVE", label: "Inactive" },
              { value: "DRAFT", label: "Draft" },
            ],
          },
        ]}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredSchedules.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        stats={[
          {
            title: "Total Schedules",
            value: totalSchedules,
            description: "Total schedule accounts",
            icon: <CalendarRange className="h-5 w-5 text-[#C40001]" />,
            color: "bg-[#C40001]",
            bgColor: "bg-red-50",
          },
          {
            title: "Active Schedules",
            value: activeSchedules,
            description: `${Math.round((activeSchedules / totalSchedules) * 100)}% of schedules are active`,
            icon: <CalendarRange className="h-5 w-5 text-[#DAA625]" />,
            color: "bg-[#DAA625]",
            bgColor: "bg-amber-50",
          },
          {
            title: "New Schedules (30d)",
            value: newSchedules,
            description: `${Math.round((newSchedules / totalSchedules) * 100)}% growth in 30 days`,
            icon: <UserPlus className="h-5 w-5 text-blue-600" />,
            color: "bg-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            title: "Pending Schedules",
            value: pendingSchedules,
            description: "Schedules waiting for approval",
            icon: <Clock className="h-5 w-5 text-purple-600" />,
            color: "bg-purple-600",
            bgColor: "bg-purple-50",
          },
        ]}
      />
    </Header>
  );
};

export default ScheduleManagement;
