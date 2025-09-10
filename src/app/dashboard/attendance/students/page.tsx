"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon, Search, Plus } from "lucide-react";
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

export default function StudentAttendancePage() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data for student attendance (input by teachers)
  const attendanceData = [
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

  return (
    <Header
      header={{
        title: "Student Attendance",
        description: "Monitor student attendance input by teachers",
        breadcrumbs: [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Attendance", href: "/dashboard/attendance" },
          { label: "Students" },
        ],
        actions: [
          {
            label: "Add Attendance",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <Content
        title="Student Attendance Records"
        description="View and manage student attendance records input by teachers"
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
                  placeholder="Cari nama siswa..."
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
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Guru</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Waktu Masuk</TableHead>
                  <TableHead>Input Oleh</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData
                  .filter(
                    (student) =>
                      student.studentName
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) &&
                      (selectedClass === "all" ||
                        student.class === selectedClass)
                  )
                  .map((student) => (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {student.studentName}
                      </TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {student.teacher}
                      </TableCell>
                      <TableCell>{student.schedule}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`
                            ${
                              student.status === "HADIR"
                                ? "bg-green-100 text-green-800"
                                : ""
                            }
                            ${
                              student.status === "IZIN"
                                ? "bg-[#DAA625]/10 text-[#DAA625]"
                                : ""
                            }
                            ${
                              student.status === "SAKIT"
                                ? "bg-blue-100 text-blue-800"
                                : ""
                            }
                            ${
                              student.status === "ALPHA"
                                ? "bg-[#C40503]/10 text-[#C40503]"
                                : ""
                            }
                            border-none
                          `}
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {student.time}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        <div>
                          <div className="font-medium">{student.inputBy}</div>
                          <div className="text-xs text-gray-400">{student.inputTime}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3"
                        >
                          Lihat Detail
                        </Button>
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
