"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar, BookOpen, UserPlus, Clock, MoreHorizontal, Eye, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Header, TableLayout } from "@/components/ui-admin/layout";
import { adminClasses, AdminClass } from "@/data/data-admin/classes-data";

// Use the AdminClass interface from data file
type Class = AdminClass;

export function ClassList() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Use the comprehensive admin classes data
    setClasses(adminClasses);
    setLoading(false);
  }, []);

  const filteredClasses = classes.filter(
    (cls) =>
      (cls.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.course_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || cls.status === statusFilter.toUpperCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClasses = filteredClasses.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Calculate statistics
  const totalClasses = classes.length;
  const activeClasses = classes.filter(cls => cls.status === "ACTIVE").length;
  const completedClasses = classes.filter(cls => cls.status === "COMPLETED").length;
  const draftClasses = classes.filter(cls => cls.status === "DRAFT").length;
  const totalEnrollment = classes.reduce((sum, cls) => sum + cls.current_enrollment, 0);

  // Define columns for DataTable
  const columns: ColumnDef<Class>[] = [
    {
      id: "no",
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "class_name",
      header: () => <div>Nama Kelas</div>,
      cell: ({ row }) => {
        const classData = row.original;
        return (
          <div>
            <Link href={`/dashboard/class/${classData.id}`} className="font-medium text-[#C40503] hover:underline">
              {classData.class_name}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "course_name",
      header: () => <div>Kursus/Program</div>,
      cell: ({ row }) => {
        const classData = row.original;
        return (
          <div>
            <div className="font-medium">{classData.course_name}</div>
            <div className="text-xs text-[#DAA625] font-medium">{classData.program_name}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                {classData.subject}
              </span>
              <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                {classData.level}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "teacher_name",
      header: () => <div>Pengajar</div>,
      cell: ({ row }) => {
        const teacherName = row.getValue("teacher_name") as string;
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              {teacherName.charAt(0)}
            </div>
            <span>{teacherName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "schedule",
      header: () => <div>Jadwal</div>,
      cell: ({ row }) => {
        const classData = row.original;
        return (
          <div className="text-sm">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <span className="font-medium">{classData.schedule}</span>
            </div>
            <div className="text-xs text-gray-500">
              {classData.time_start} - {classData.time_end}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "capacity",
      header: () => <div>Kapasitas</div>,
      cell: ({ row }) => {
        const classData = row.original;
        const percentage = (classData.current_enrollment / classData.capacity) * 100;
        return (
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span>{classData.current_enrollment}/{classData.capacity}</span>
              <span className="text-xs text-gray-500">
                {Math.round(percentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${
                  percentage > 80
                    ? "bg-[#C40503]"
                    : percentage > 50
                    ? "bg-[#DAA625]"
                    : "bg-green-500"
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return status === "ACTIVE" ? (
          <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">
            Aktif
          </Badge>
        ) : status === "COMPLETED" ? (
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors">
            Selesai
          </Badge>
        ) : status === "DRAFT" ? (
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors">
            Draft
          </Badge>
        ) : (
          <Badge className="bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors">
            Non-Aktif
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Aksi</div>,
      cell: ({ row }) => {
        const classData = row.original;
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                  onClick={() => window.open(`/dashboard/class/${classData.id}`, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open(`/dashboard/class/edit/${classData.id}`, '_blank')}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
                      // Handle delete logic here
                      alert('Fitur hapus kelas akan segera tersedia');
                    }
                  }}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <Header
      header={{
        title: "Class Management",
        description: "Kelola semua kelas dalam sistem",
        actions: [
          {
            label: "Add New Class",
            href: "/dashboard/class/add",
            icon: <UserPlus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <TableLayout
        title="Class Management"
        description="Manage all class accounts in the system"
        data={currentClasses}
        columns={columns}
        searchQuery={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search classes by name, teacher..."
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
              { value: "COMPLETED", label: "Completed" },
              { value: "DRAFT", label: "Draft" },
            ],
          },
        ]}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredClasses.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        stats={[
          {
            title: "Total Classes",
            value: totalClasses,
            description: "Total class accounts",
            icon: <Calendar className="h-5 w-5 text-[#C40001]" />,
            color: "bg-[#C40001]",
            bgColor: "bg-red-50",
          },
          {
            title: "Active Classes",
            value: activeClasses,
            description: `${Math.round((activeClasses / totalClasses) * 100)}% of classes are active`,
            icon: <BookOpen className="h-5 w-5 text-[#DAA625]" />,
            color: "bg-[#DAA625]",
            bgColor: "bg-amber-50",
          },
          {
            title: "Completed Classes",
            value: completedClasses,
            description: `${Math.round((completedClasses / totalClasses) * 100)}% classes completed`,
            icon: <UserPlus className="h-5 w-5 text-green-600" />,
            color: "bg-green-600",
            bgColor: "bg-green-50",
          },
          {
            title: "Total Enrollment",
            value: totalEnrollment,
            description: "Total students enrolled",
            icon: <Clock className="h-5 w-5 text-purple-600" />,
            color: "bg-purple-600",
            bgColor: "bg-purple-50",
          },
        ]}
      />
    </Header>
  );
}
