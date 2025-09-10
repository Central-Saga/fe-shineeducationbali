"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter, Calendar } from "lucide-react";

export default function AttendanceReportPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Dummy data
  const attendanceReports = [
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

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>Attendance Reports</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Comprehensive attendance reports for students and teachers in teaching courses
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Ekspor
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Nama Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead className="text-center">Total Pertemuan</TableHead>
                  <TableHead className="text-center">Kehadiran</TableHead>
                  <TableHead className="text-center">Persentase</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
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
                  filteredReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{report.studentName}</TableCell>
                      <TableCell>{report.class}</TableCell>
                      <TableCell>{report.month}</TableCell>
                      <TableCell className="text-center">{report.totalSessions}</TableCell>
                      <TableCell className="text-center">{report.attendedSessions}</TableCell>
                      <TableCell className="text-center">{report.percentage}%</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`
                            ${report.percentage >= 90 ? 'bg-green-100 text-green-800' : ''}
                            ${report.percentage >= 75 && report.percentage < 90 ? 'bg-[#DAA625]/10 text-[#DAA625]' : ''}
                            ${report.percentage < 75 ? 'bg-[#C40503]/10 text-[#C40503]' : ''}
                            border-none
                          `}
                        >
                          {report.percentage >= 90
                            ? "Sangat Baik"
                            : report.percentage >= 75
                            ? "Baik"
                            : "Perlu Perhatian"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
