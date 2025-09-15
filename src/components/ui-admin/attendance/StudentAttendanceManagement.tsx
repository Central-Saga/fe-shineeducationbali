"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon, Search, Plus, Eye, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Header, TableLayout } from "@/components/ui-admin/layout";

// Define types
interface StudentAttendance {
  id: number;
  studentName: string;
  class: string;
  teacher: string;
  schedule: string;
  status: "HADIR" | "IZIN" | "SAKIT" | "ALPHA";
  time: string;
  notes: string;
  inputBy: string;
  inputTime: string;
}

export function StudentAttendanceManagement() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [loading] = useState<boolean>(false);

  // Dummy data for student attendance (input by teachers)
  const attendanceData: StudentAttendance[] = [
    {
      id: 1,
      studentName: "Kadek Ayu Putri",
      class: "english-basic",
      teacher: "Ibu Sarah",
      schedule: "09:00 - 10:30",
      status: "HADIR",
      time: "08:55",
      notes: "",
      inputBy: "Ibu Sarah",
      inputTime: "09:00",
    },
    {
      id: 2,
      studentName: "I Made Wirawan",
      class: "math-elementary",
      teacher: "Pak Budi",
      schedule: "10:30 - 12:00",
      status: "HADIR",
      time: "10:25",
      notes: "Terlambat 5 menit",
      inputBy: "Pak Budi",
      inputTime: "10:30",
    },
    {
      id: 3,
      studentName: "Ni Putu Devi",
      class: "computer-science",
      teacher: "Ibu Maya",
      schedule: "13:00 - 14:30",
      status: "IZIN",
      time: "-",
      notes: "Sakit",
      inputBy: "Ibu Maya",
      inputTime: "13:00",
    },
    {
      id: 4,
      studentName: "I Nyoman Artha",
      class: "english-intermediate",
      teacher: "Pak John",
      schedule: "14:30 - 16:00",
      status: "ALPHA",
      time: "-",
      notes: "Tidak ada keterangan",
      inputBy: "Pak John",
      inputTime: "14:30",
    },
    {
      id: 5,
      studentName: "Wayan Budiarta",
      class: "math-elementary",
      teacher: "Pak Budi",
      schedule: "16:00 - 17:30",
      status: "SAKIT",
      time: "-",
      notes: "Demam",
      inputBy: "Pak Budi",
      inputTime: "16:00",
    },
  ];

  // Filter data
  const filteredData = attendanceData.filter(
    (student) =>
      student.studentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (selectedClass === "all" || student.class === selectedClass)
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedClass]);

  // Statistics
  const totalStudents = attendanceData.length;
  const presentStudents = attendanceData.filter(s => s.status === "HADIR").length;
  const sickStudents = attendanceData.filter(s => s.status === "SAKIT").length;
  const absentStudents = attendanceData.filter(s => s.status === "ALPHA").length;

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "HADIR":
        return <Badge className="bg-green-100 text-green-800 border-none">HADIR</Badge>;
      case "IZIN":
        return <Badge className="bg-[#DAA625]/10 text-[#DAA625] border-none">IZIN</Badge>;
      case "SAKIT":
        return <Badge className="bg-blue-100 text-blue-800 border-none">SAKIT</Badge>;
      case "ALPHA":
        return <Badge className="bg-[#C40503]/10 text-[#C40503] border-none">ALPHA</Badge>;
      default:
        return <Badge className="border-none">{status}</Badge>;
    }
  };

  // Handle actions
  const handleView = (student: StudentAttendance) => {
    console.log("View student attendance:", student);
  };

  const handleEdit = (student: StudentAttendance) => {
    console.log("Edit student attendance:", student);
  };

  const handleDelete = (student: StudentAttendance) => {
    console.log("Delete student attendance:", student);
  };

  // Define columns for DataTable
  const columns: ColumnDef<StudentAttendance>[] = [
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
      accessorKey: "teacher",
      header: () => <div>Guru</div>,
      cell: ({ row }) => {
        const teacher = row.getValue("teacher") as string;
        return <div className="text-sm text-gray-600">{teacher}</div>;
      },
    },
    {
      accessorKey: "schedule",
      header: () => <div>Jadwal</div>,
      cell: ({ row }) => {
        const schedule = row.getValue("schedule") as string;
        return <div>{schedule}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return getStatusBadge(status);
      },
    },
    {
      accessorKey: "time",
      header: () => <div>Waktu Masuk</div>,
      cell: ({ row }) => {
        const time = row.getValue("time") as string;
        return <div className="text-center">{time}</div>;
      },
    },
    {
      accessorKey: "inputBy",
      header: () => <div>Input Oleh</div>,
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="text-sm text-gray-600">
            <div className="font-medium">{student.inputBy}</div>
            <div className="text-xs text-gray-400">{student.inputTime}</div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Aksi</div>,
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => handleView(student)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Detail
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(student)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(student)}
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
      title: "Total Siswa",
      value: totalStudents,
      description: "Total student attendance records",
      icon: <CalendarIcon className="h-5 w-5 text-[#C40001]" />,
      color: "bg-[#C40001]",
      bgColor: "bg-red-50",
    },
    {
      title: "Hadir",
      value: presentStudents,
      description: `${Math.round((presentStudents / totalStudents) * 100) || 0}% attendance rate`,
      icon: <Search className="h-5 w-5 text-[#DAA625]" />,
      color: "bg-[#DAA625]",
      bgColor: "bg-amber-50",
    },
    {
      title: "Sakit",
      value: sickStudents,
      description: "Students who are sick",
      icon: <Plus className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tidak Hadir",
      value: absentStudents,
      description: "Absent students",
      icon: <Eye className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <Header
      header={{
        title: "Student Attendance Management",
        description: "Monitor student attendance input by teachers",
        actions: [
          {
            label: "Add Attendance",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
        {/* Custom Filters Section */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-auto flex flex-col">
            <p className="text-sm text-gray-500 mb-2">Pilih Tanggal</p>
            <div className="grid gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal bg-white",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "PPP", { locale: id })
                    ) : (
                      <span>Pilih tanggal</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="w-full md:w-auto flex flex-col">
            <p className="text-sm text-gray-500 mb-2">Filter Kelas</p>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[240px] bg-white">
                <SelectValue placeholder="Pilih kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                <SelectItem value="english-basic">Bahasa Inggris Dasar</SelectItem>
                <SelectItem value="math-elementary">Matematika SD</SelectItem>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="english-intermediate">Bahasa Inggris Lanjutan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table Layout */}
        <TableLayout
          title="Student Attendance"
          description="Monitor student attendance input by teachers"
          data={currentData}
          columns={columns}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Cari nama siswa..."
          filters={[
            {
              key: "class",
              label: "All Classes",
              value: selectedClass,
              onChange: setSelectedClass,
              options: [
                { value: "all", label: "All Classes" },
                { value: "english-basic", label: "Bahasa Inggris Dasar" },
                { value: "math-elementary", label: "Matematika SD" },
                { value: "computer-science", label: "Computer Science" },
                { value: "english-intermediate", label: "Bahasa Inggris Lanjutan" },
              ],
            },
          ]}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
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

export default StudentAttendanceManagement;
