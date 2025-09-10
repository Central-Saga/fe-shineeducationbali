"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon, Search, Plus, Eye } from "lucide-react";
import { Header, Content, Pagination } from "@/components/ui-admin/layout";
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

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

  // Filter data
  const filteredData = attendanceData.filter(
    (student) =>
      student.studentName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) &&
      (selectedClass === "all" || student.class === selectedClass)
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Header
      header={{
        title: "Student Attendance",
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
      <Content>
        <div className="space-y-6 p-6">
          {/* Filters Section */}
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

          {/* Table Section */}
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-16 text-center">No</TableHead>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Guru</TableHead>
                  <TableHead>Jadwal</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Waktu Masuk</TableHead>
                  <TableHead>Input Oleh</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-gray-400 mb-2">
                          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">Tidak ada data</p>
                        <p className="text-gray-400 text-sm">Coba ubah filter pencarian</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  currentData.map((student, index) => (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell className="text-center text-gray-500 font-medium">
                        {startIndex + index + 1}
                      </TableCell>
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
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 flex items-center gap-2"
                        >
                          <Eye className="h-3 w-3" />
                          Lihat Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Content>
      </Header>
  );
}
