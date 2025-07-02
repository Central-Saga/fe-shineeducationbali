"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Calendar,
  Check,
  Clock,
  Download,
  Edit,
  FileText,
  Filter,
  Plus,
  Search,
  X 
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import data
import { attendanceData, attendanceSummary } from "@/data/data-teacher/attendance/attendance-data";

// Component for AttendancePage
export default function AttendancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Filter attendance data
  const filteredAttendance = attendanceData.filter(record => {
    let match = true;
    
    // Filter by search query
    if (searchQuery) {
      match = record.className.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Filter by class
    if (classFilter !== "all") {
      match = match && (record.classId === classFilter);
    }
    
    // Filter by date (simplified for demo)
    if (dateFilter !== "all") {
      if (dateFilter === "today") {
        match = match && (record.date === "2025-07-01"); // Today in our dummy data
      } else if (dateFilter === "yesterday") {
        match = match && (record.date === "2025-06-30"); // Yesterday in our dummy data
      }
    }
    
    return match;
  });

  // Get unique classes for filter
  const classes = [...new Set(attendanceData.map(record => record.classId))]
    .map(classId => {
      const classRecord = attendanceData.find(record => record.classId === classId);
      return {
        id: classId,
        name: classRecord ? classRecord.className : classId
      };
    });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Kehadiran Siswa
        </h1>
        <Button className="bg-[#C40503] hover:bg-[#A60000]">
          <Plus className="mr-3 h-4 w-4" /> 
          Catat Kehadiran Baru
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Total Kehadiran</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-[#C40503]">{attendanceSummary.totalPresent}</div>
            <p className="text-xs text-gray-500 mt-1">Siswa</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Tingkat Kehadiran</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-[#DAA625]">{attendanceSummary.attendanceRate}%</div>
            <p className="text-xs text-gray-500 mt-1">Rata-rata</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Siswa Tidak Hadir</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-gray-700">{attendanceSummary.totalAbsent}</div>
            <p className="text-xs text-gray-500 mt-1">Siswa</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Siswa Terlambat</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-gray-700">{attendanceSummary.totalLate}</div>
            <p className="text-xs text-gray-500 mt-1">Siswa</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <FileText className="mr-3 h-5 w-5 text-[#C40503]" /> 
            Daftar Kehadiran
          </CardTitle>
          <CardDescription>
            Lihat dan kelola semua catatan kehadiran siswa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari berdasarkan nama kelas..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-48">
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kelas</SelectItem>
                    {classes.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter Tanggal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tanggal</SelectItem>
                    <SelectItem value="today">Hari Ini</SelectItem>
                    <SelectItem value="yesterday">Kemarin</SelectItem>
                    <SelectItem value="week">Minggu Ini</SelectItem>
                    <SelectItem value="month">Bulan Ini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Attendance Records */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Tanggal</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Mata Pelajaran</TableHead>
                  <TableHead className="text-center">Hadir</TableHead>
                  <TableHead className="text-center">Tidak Hadir</TableHead>
                  <TableHead className="text-center">Terlambat</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record) => {
                  // Calculate attendance statistics for this record
                  const present = record.students.filter(s => s.status === 'present').length;
                  const absent = record.students.filter(s => s.status === 'absent').length;
                  const late = record.students.filter(s => s.status === 'late').length;
                  
                  return (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">
                        {new Date(record.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell>{record.className}</TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {present}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {absent}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          {late}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredAttendance.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                      Tidak ada data kehadiran yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan {filteredAttendance.length} dari {attendanceData.length} catatan kehadiran
          </p>
          <Button variant="outline" className="text-[#C40503]">
            <Download className="mr-2 h-4 w-4" />
            Ekspor Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
