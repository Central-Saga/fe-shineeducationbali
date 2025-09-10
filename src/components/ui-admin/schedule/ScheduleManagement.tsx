"use client";

import React, { useState, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Clock,
  Filter,
  Search,
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#C40001]">Schedule Management</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <span>Dashboard</span>
            <span className="text-gray-400">/</span>
            <span>Schedule Management</span>
          </div>
        </div>
        <Button 
          onClick={() => router.push("/dashboard/schedule/create")}
          className="bg-[#C40001] hover:bg-[#a30300] text-white"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Schedule
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#C40001]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Schedules</p>
              <p className="text-2xl font-bold mt-1">{totalSchedules}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-[#C40001]"></span>
                Total schedule accounts
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <CalendarRange className="h-5 w-5 text-[#C40001]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Schedules</p>
              <p className="text-2xl font-bold mt-1">{activeSchedules}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-[#DAA625]"></span>
                {Math.round((activeSchedules / totalSchedules) * 100)}% of schedules are active
              </div>
            </div>
            <div className="p-3 rounded-full bg-amber-50">
              <CalendarRange className="h-5 w-5 text-[#DAA625]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-blue-600"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Schedules (30d)</p>
              <p className="text-2xl font-bold mt-1">{newSchedules}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                {Math.round((newSchedules / totalSchedules) * 100)}% growth in 30 days
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <UserPlus className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-purple-600"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Schedules</p>
              <p className="text-2xl font-bold mt-1">{pendingSchedules}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-600"></span>
                Schedules waiting for approval
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Management Section */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="h-1 w-full bg-[#C40001]"></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#C40001]">Schedule Management</h2>
              <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C40001]"></span>
                Manage all schedule accounts in the system
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search schedules by title, description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6">
          <DataTable columns={columns} data={currentSchedules} />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-2 py-4">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  Menampilkan {startIndex + 1} sampai {Math.min(endIndex, filteredSchedules.length)} dari {filteredSchedules.length} jadwal
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Tampilkan:</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                    setItemsPerPage(Number(value));
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-[#C40001] hover:bg-[#a30300] text-white"
                            : "text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                        }
                      >
                        {page}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="text-gray-500">...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        className={
                          currentPage === totalPages
                            ? "bg-[#C40001] hover:bg-[#a30300] text-white"
                            : "text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                        }
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;
