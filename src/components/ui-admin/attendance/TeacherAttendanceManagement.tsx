"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon, Search, Upload, FileText, Eye, MoreHorizontal, Edit2, Trash2 } from "lucide-react";
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
interface TeacherAttendance {
  id: number;
  teacherName: string;
  class: string;
  schedule: string;
  status: "HADIR" | "IZIN" | "TERLAMBAT" | "ALPHA";
  time: string;
  notes: string;
  uploadTime: string;
  attachment: string;
}

export function TeacherAttendanceManagement() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [loading] = useState<boolean>(false);

  // Dummy data for teacher attendance (uploaded by teachers themselves)
  const teacherAttendanceData: TeacherAttendance[] = [
    {
      id: 1,
      teacherName: "Ibu Sarah",
      class: "english-basic",
      schedule: "09:00 - 10:30",
      status: "HADIR",
      time: "08:45",
      notes: "",
      uploadTime: "08:50",
      attachment: "attendance_0900.pdf",
    },
    {
      id: 2,
      teacherName: "Pak Budi",
      class: "math-elementary",
      schedule: "10:30 - 12:00",
      status: "HADIR",
      time: "10:25",
      notes: "Siap mengajar",
      uploadTime: "10:30",
      attachment: "attendance_1030.pdf",
    },
    {
      id: 3,
      teacherName: "Ibu Maya",
      class: "computer-science",
      schedule: "13:00 - 14:30",
      status: "IZIN",
      time: "-",
      notes: "Sakit",
      uploadTime: "12:30",
      attachment: "sick_leave.pdf",
    },
    {
      id: 4,
      teacherName: "Pak John",
      class: "english-intermediate",
      schedule: "14:30 - 16:00",
      status: "HADIR",
      time: "14:25",
      notes: "Kelas berjalan lancar",
      uploadTime: "14:30",
      attachment: "attendance_1430.pdf",
    },
    {
      id: 5,
      teacherName: "Ibu Lisa",
      class: "math-elementary",
      schedule: "16:00 - 17:30",
      status: "TERLAMBAT",
      time: "16:15",
      notes: "Macet di jalan",
      uploadTime: "16:20",
      attachment: "attendance_1600.pdf",
    },
  ];

  // Filter data
  const filteredData = teacherAttendanceData.filter(
    (teacher) =>
      teacher.teacherName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (selectedClass === "all" || teacher.class === selectedClass)
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
  const totalTeachers = teacherAttendanceData.length;
  const presentTeachers = teacherAttendanceData.filter(t => t.status === "HADIR").length;
  const lateTeachers = teacherAttendanceData.filter(t => t.status === "TERLAMBAT").length;
  const absentTeachers = teacherAttendanceData.filter(t => t.status === "ALPHA" || t.status === "IZIN").length;

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "HADIR":
        return <Badge className="bg-green-100 text-green-800 border-none">HADIR</Badge>;
      case "IZIN":
        return <Badge className="bg-[#DAA625]/10 text-[#DAA625] border-none">IZIN</Badge>;
      case "TERLAMBAT":
        return <Badge className="bg-orange-100 text-orange-800 border-none">TERLAMBAT</Badge>;
      case "ALPHA":
        return <Badge className="bg-[#C40503]/10 text-[#C40503] border-none">ALPHA</Badge>;
      default:
        return <Badge className="border-none">{status}</Badge>;
    }
  };

  // Handle actions
  const handleView = (teacher: TeacherAttendance) => {
    console.log("View teacher attendance:", teacher);
  };

  const handleEdit = (teacher: TeacherAttendance) => {
    console.log("Edit teacher attendance:", teacher);
  };

  const handleDelete = (teacher: TeacherAttendance) => {
    console.log("Delete teacher attendance:", teacher);
  };

  // Define columns for DataTable
  const columns: ColumnDef<TeacherAttendance>[] = [
    {
      id: "no",
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "teacherName",
      header: () => <div>Nama Guru</div>,
      cell: ({ row }) => {
        const teacherName = row.getValue("teacherName") as string;
        return <div className="font-medium">{teacherName}</div>;
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
      accessorKey: "uploadTime",
      header: () => <div>Waktu Upload</div>,
      cell: ({ row }) => {
        const uploadTime = row.getValue("uploadTime") as string;
        return <div className="text-sm text-gray-600">{uploadTime}</div>;
      },
    },
    {
      accessorKey: "attachment",
      header: () => <div>Dokumen</div>,
      cell: ({ row }) => {
        const attachment = row.getValue("attachment") as string;
        return (
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-blue-600 hover:underline cursor-pointer">
              {attachment}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Aksi</div>,
      cell: ({ row }) => {
        const teacher = row.original;
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => handleView(teacher)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Detail
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleEdit(teacher)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleDelete(teacher)}
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
      title: "Total Guru",
      value: totalTeachers,
      description: "Total teacher accounts",
      icon: <CalendarIcon className="h-5 w-5 text-[#C40001]" />,
      color: "bg-[#C40001]",
      bgColor: "bg-red-50",
    },
    {
      title: "Hadir",
      value: presentTeachers,
      description: `${Math.round((presentTeachers / totalTeachers) * 100) || 0}% attendance rate`,
      icon: <FileText className="h-5 w-5 text-[#DAA625]" />,
      color: "bg-[#DAA625]",
      bgColor: "bg-amber-50",
    },
    {
      title: "Terlambat",
      value: lateTeachers,
      description: "Teachers who came late",
      icon: <Search className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tidak Hadir",
      value: absentTeachers,
      description: "Absent or on leave",
      icon: <Upload className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <Header
      header={{
        title: "Teacher Attendance Management",
        description: "Monitor teacher attendance uploaded by themselves",
        actions: [
          {
            label: "Upload Document",
            icon: <Upload className="h-4 w-4" />,
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
          title="Teacher Attendance"
          description="Monitor teacher attendance uploaded by themselves"
          data={currentData}
          columns={columns}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Cari nama guru..."
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

export default TeacherAttendanceManagement;
