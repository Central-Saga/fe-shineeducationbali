"use client";

import { useState, useEffect } from "react";
import { Search, Download, Filter, Calendar, MoreHorizontal, Eye, Edit2, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Header, TableLayout } from "@/components/ui-admin/layout";

// Define types
interface AttendanceReport {
  id: string;
  studentName: string;
  class: string;
  totalSessions: number;
  attendedSessions: number;
  percentage: number;
  month: string;
}

export function AttendanceReportsManagement() {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [loading] = useState<boolean>(false);

  // Dummy data
  const attendanceReports: AttendanceReport[] = [
    {
      id: "1",
      studentName: "Kadek Ayu Putri",
      class: "Bahasa Inggris Dasar",
      totalSessions: 12,
      attendedSessions: 11,
      percentage: 92,
      month: "Juni 2025",
    },
    {
      id: "2",
      studentName: "I Made Wirawan",
      class: "Matematika SD",
      totalSessions: 16,
      attendedSessions: 14,
      percentage: 88,
      month: "Juni 2025",
    },
    {
      id: "3",
      studentName: "Ni Putu Devi",
      class: "Computer Science",
      totalSessions: 8,
      attendedSessions: 8,
      percentage: 100,
      month: "Juni 2025",
    },
    {
      id: "4",
      studentName: "I Nyoman Artha",
      class: "Bahasa Inggris Lanjutan",
      totalSessions: 12,
      attendedSessions: 9,
      percentage: 75,
      month: "Mei 2025",
    },
  ];

  // Filter data
  const filteredReports = attendanceReports.filter((report) => {
    const matchesSearch = report.studentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesMonth =
      selectedMonth === "all" || report.month === selectedMonth;
    const matchesClass =
      selectedClass === "all" || report.class === selectedClass;
    return matchesSearch && matchesMonth && matchesClass;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredReports.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedMonth, selectedClass]);

  // Statistics
  const totalReports = attendanceReports.length;
  const excellentReports = attendanceReports.filter(r => r.percentage >= 90).length;
  const goodReports = attendanceReports.filter(r => r.percentage >= 75 && r.percentage < 90).length;
  const needsAttentionReports = attendanceReports.filter(r => r.percentage < 75).length;

  // Get status badge styling
  const getStatusBadge = (percentage: number) => {
    if (percentage >= 90) {
      return <Badge className="bg-green-100 text-green-800 border-none">Sangat Baik</Badge>;
    } else if (percentage >= 75) {
      return <Badge className="bg-[#DAA625]/10 text-[#DAA625] border-none">Baik</Badge>;
    } else {
      return <Badge className="bg-[#C40503]/10 text-[#C40503] border-none">Perlu Perhatian</Badge>;
    }
  };

  // Handle actions
  const handleView = (report: AttendanceReport) => {
    console.log("View attendance report:", report);
  };

  const handleEdit = (report: AttendanceReport) => {
    console.log("Edit attendance report:", report);
  };

  const handleDelete = (report: AttendanceReport) => {
    console.log("Delete attendance report:", report);
  };

  const handleExport = () => {
    console.log("Export attendance reports");
  };

  // Define columns for DataTable
  const columns: ColumnDef<AttendanceReport>[] = [
    {
      id: "no",
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "studentName",
      header: () => <div>Nama Siswa</div>,
      cell: ({ row }) => {
        const studentName = row.getValue("studentName") as string;
        return <div className="font-medium">{studentName}</div>;
      },
    },
    {
      accessorKey: "class",
      header: () => <div>Kelas</div>,
      cell: ({ row }) => {
        const classValue = row.getValue("class") as string;
        return <div>{classValue}</div>;
      },
    },
    {
      accessorKey: "month",
      header: () => <div>Periode</div>,
      cell: ({ row }) => {
        const month = row.getValue("month") as string;
        return <div>{month}</div>;
      },
    },
    {
      accessorKey: "totalSessions",
      header: () => <div>Total Pertemuan</div>,
      cell: ({ row }) => {
        const totalSessions = row.getValue("totalSessions") as number;
        return <div className="text-center">{totalSessions}</div>;
      },
    },
    {
      accessorKey: "attendedSessions",
      header: () => <div>Kehadiran</div>,
      cell: ({ row }) => {
        const attendedSessions = row.getValue("attendedSessions") as number;
        return <div className="text-center">{attendedSessions}</div>;
      },
    },
    {
      accessorKey: "percentage",
      header: () => <div>Persentase</div>,
      cell: ({ row }) => {
        const percentage = row.getValue("percentage") as number;
        return <div className="text-center">{percentage}%</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const report = row.original;
        return getStatusBadge(report.percentage);
      },
    },
    {
      id: "actions",
      header: () => <div>Aksi</div>,
      cell: ({ row }) => {
        const report = row.original;
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => handleView(report)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Detail
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(report)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(report)}
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

  // Prepare stats for TableLayout
  const statsData = [
    {
      title: "Total Laporan",
      value: totalReports,
      description: "Total attendance reports",
      icon: <Calendar className="h-5 w-5 text-[#C40001]" />,
      color: "bg-[#C40001]",
      bgColor: "bg-red-50",
    },
    {
      title: "Sangat Baik",
      value: excellentReports,
      description: `${Math.round((excellentReports / totalReports) * 100) || 0}% excellent attendance`,
      icon: <Search className="h-5 w-5 text-[#DAA625]" />,
      color: "bg-[#DAA625]",
      bgColor: "bg-amber-50",
    },
    {
      title: "Baik",
      value: goodReports,
      description: `${Math.round((goodReports / totalReports) * 100) || 0}% good attendance`,
      icon: <Filter className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Perlu Perhatian",
      value: needsAttentionReports,
      description: `${Math.round((needsAttentionReports / totalReports) * 100) || 0}% need attention`,
      icon: <Download className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <Header
      header={{
        title: "Attendance Reports Management",
        description: "Comprehensive attendance reports for students and teachers in teaching courses",
        actions: [
          {
            label: "Export Report",
            icon: <Download className="h-4 w-4" />,
            variant: "default",
            onClick: handleExport,
          },
        ],
      }}
    >
        {/* Custom Filters Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari nama siswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-white"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Select
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter Bulan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Bulan</SelectItem>
                <SelectItem value="Juni 2025">Juni 2025</SelectItem>
                <SelectItem value="Mei 2025">Mei 2025</SelectItem>
                <SelectItem value="April 2025">April 2025</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                <SelectItem value="Bahasa Inggris Dasar">Bahasa Inggris Dasar</SelectItem>
                <SelectItem value="Matematika SD">Matematika SD</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Bahasa Inggris Lanjutan">Bahasa Inggris Lanjutan</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Ekspor
            </Button>
          </div>
        </div>

        {/* Table Layout */}
        <TableLayout
          title="Attendance Reports"
          description="Comprehensive attendance reports for students and teachers"
          data={currentData}
          columns={columns}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Cari nama siswa..."
          filters={[
            {
              key: "month",
              label: "All Months",
              value: selectedMonth,
              onChange: setSelectedMonth,
              options: [
                { value: "all", label: "All Months" },
                { value: "Juni 2025", label: "Juni 2025" },
                { value: "Mei 2025", label: "Mei 2025" },
                { value: "April 2025", label: "April 2025" },
              ],
            },
            {
              key: "class",
              label: "All Classes",
              value: selectedClass,
              onChange: setSelectedClass,
              options: [
                { value: "all", label: "All Classes" },
                { value: "Bahasa Inggris Dasar", label: "Bahasa Inggris Dasar" },
                { value: "Matematika SD", label: "Matematika SD" },
                { value: "Computer Science", label: "Computer Science" },
                { value: "Bahasa Inggris Lanjutan", label: "Bahasa Inggris Lanjutan" },
              ],
            },
          ]}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredReports.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          stats={statsData}
          loading={loading}
          showSearch={false}
          showFilters={false}
        />
    </Header>
  );
}

export default AttendanceReportsManagement;
