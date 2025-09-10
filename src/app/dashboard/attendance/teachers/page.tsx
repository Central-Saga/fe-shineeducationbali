"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon, Search, Upload, FileText, Plus } from "lucide-react";
import { Header, Content } from "@/components/ui-admin/layout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function TeacherAttendancePage() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for teacher attendance (uploaded by teachers themselves)
  const teacherAttendanceData = [
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

  return (
    <Header
      header={{
        title: "Teacher Attendance",
        description: "Monitor teacher attendance uploaded by themselves",
        breadcrumbs: [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Attendance", href: "/dashboard/attendance" },
          { label: "Teachers" },
        ],
        actions: [
          {
            label: "Upload Document",
            icon: <Upload className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <Content
        title="Teacher Attendance Records"
        description="View and manage teacher attendance documents uploaded by themselves"
      >
          <div className="flex flex-col md:flex-row gap-5 mb-6">
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

            <div className="flex-grow md:ml-auto relative">
              <p className="text-sm text-gray-500 mb-2">Pencarian</p>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari nama guru..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 bg-white"
                />
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Nama Guru</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Waktu Masuk</TableHead>
                  <TableHead>Waktu Upload</TableHead>
                  <TableHead>Dokumen</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherAttendanceData
                  .filter(
                    (teacher) =>
                      teacher.teacherName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) &&
                      (selectedClass === "all" ||
                        teacher.class === selectedClass)
                  )
                  .map((teacher) => (
                    <TableRow key={teacher.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {teacher.teacherName}
                      </TableCell>
                      <TableCell>{teacher.class}</TableCell>
                      <TableCell>{teacher.schedule}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`
                            ${
                              teacher.status === "HADIR"
                                ? "bg-green-100 text-green-800"
                                : ""
                            }
                            ${
                              teacher.status === "IZIN"
                                ? "bg-[#DAA625]/10 text-[#DAA625]"
                                : ""
                            }
                            ${
                              teacher.status === "TERLAMBAT"
                                ? "bg-orange-100 text-orange-800"
                                : ""
                            }
                            ${
                              teacher.status === "ALPHA"
                                ? "bg-[#C40503]/10 text-[#C40503]"
                                : ""
                            }
                            border-none
                          `}
                        >
                          {teacher.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {teacher.time}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {teacher.uploadTime}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-blue-600 hover:underline cursor-pointer">
                            {teacher.attachment}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3"
                          >
                            <Upload className="h-3 w-3 mr-1" />
                            Lihat
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 px-3"
                          >
                            Detail
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </Content>
      </Header>
  );
}
