"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  BarChart3
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  classId: string;
  className: string;
  teacherName: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  checkInTime?: string;
  checkOutTime?: string;
  notes?: string;
}

interface ClassAttendanceSummary {
  classId: string;
  className: string;
  teacherName: string;
  totalSessions: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  attendanceRate: number;
  records: AttendanceRecord[];
}

export default function StudentAttendancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [classSummaries, setClassSummaries] = useState<ClassAttendanceSummary[]>([]);

  // Mock data - in real app, this would come from API based on student's enrolled classes
  useEffect(() => {
    const mockAttendanceRecords: AttendanceRecord[] = [
      {
        id: "1",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        date: "2025-07-01",
        status: "present",
        checkInTime: "08:00",
        checkOutTime: "09:30",
        notes: "Hadir tepat waktu"
      },
      {
        id: "2",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        date: "2025-06-28",
        status: "late",
        checkInTime: "08:15",
        checkOutTime: "09:30",
        notes: "Terlambat 15 menit"
      },
      {
        id: "3",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        date: "2025-06-25",
        status: "present",
        checkInTime: "08:00",
        checkOutTime: "09:30",
        notes: "Hadir tepat waktu"
      },
      {
        id: "4",
        classId: "2",
        className: "Matematika A",
        teacherName: "Bu Siti",
        date: "2025-07-02",
        status: "absent",
        notes: "Sakit"
      },
      {
        id: "5",
        classId: "2",
        className: "Matematika A",
        teacherName: "Bu Siti",
        date: "2025-06-29",
        status: "present",
        checkInTime: "10:00",
        checkOutTime: "11:30",
        notes: "Hadir tepat waktu"
      }
    ];

    const mockClassSummaries: ClassAttendanceSummary[] = [
      {
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        totalSessions: 10,
        presentCount: 8,
        absentCount: 1,
        lateCount: 1,
        attendanceRate: 80,
        records: mockAttendanceRecords.filter(r => r.classId === "1")
      },
      {
        classId: "2",
        className: "Matematika A",
        teacherName: "Bu Siti",
        totalSessions: 8,
        presentCount: 7,
        absentCount: 1,
        lateCount: 0,
        attendanceRate: 87.5,
        records: mockAttendanceRecords.filter(r => r.classId === "2")
      }
    ];

    setAttendanceRecords(mockAttendanceRecords);
    setClassSummaries(mockClassSummaries);
  }, []);

  // Filter attendance records based on search and filters
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.teacherName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === "all" || record.classId === classFilter;
    
    // Filter by month
    let matchesMonth = true;
    if (monthFilter !== "all") {
      const recordDate = new Date(record.date);
      const recordMonth = recordDate.getMonth() + 1;
      matchesMonth = recordMonth.toString() === monthFilter;
    }
    
    return matchesSearch && matchesClass && matchesMonth;
  });

  // Get unique classes for filter
  const classes = Array.from(
    new Map(attendanceRecords.map(r => [r.classId, { id: r.classId, name: r.className }])).values()
  );

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">Hadir</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800">Tidak Hadir</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800">Terlambat</Badge>;
      case 'excused':
        return <Badge className="bg-blue-100 text-blue-800">Izin</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'absent':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'excused':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAttendanceRateColor = (rate: number) => {
    if (rate >= 90) return "text-green-600 font-semibold";
    if (rate >= 80) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const getAttendanceRateBadge = (rate: number) => {
    if (rate >= 90) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (rate >= 80) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    return <Badge className="bg-red-100 text-red-800">Need Improvement</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#C40503]/10 rounded-lg">
              <CheckCircle className="h-6 w-6 text-[#C40503]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Kehadiran Saya</h1>
          </div>
          <p className="text-gray-600">Pantau kehadiran Anda di semua kelas yang diikuti</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#C40503]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Sesi</p>
                  <p className="text-3xl font-bold text-[#C40503]">{attendanceRecords.length}</p>
                </div>
                <div className="p-3 bg-[#C40503]/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-[#C40503]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Hadir</p>
                  <p className="text-3xl font-bold text-green-600">
                    {attendanceRecords.filter(r => r.status === 'present').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Tidak Hadir</p>
                  <p className="text-3xl font-bold text-red-600">
                    {attendanceRecords.filter(r => r.status === 'absent').length}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#DAA625]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Rata-rata Kehadiran</p>
                  <p className="text-3xl font-bold text-[#DAA625]">
                    {classSummaries.length > 0 
                      ? Math.round(classSummaries.reduce((acc, c) => acc + c.attendanceRate, 0) / classSummaries.length)
                      : 0
                    }%
                  </p>
                </div>
                <div className="p-3 bg-[#DAA625]/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#DAA625]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Riwayat Kehadiran
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ringkasan Kelas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2 text-[#C40503]" />
                  Filter & Pencarian
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Cari berdasarkan kelas atau guru..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-48">
                    <Select value={classFilter} onValueChange={setClassFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter Kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Kelas</SelectItem>
                        {classes.map(cls => (
                          <SelectItem key={cls.id} value={cls.id}>
                            {cls.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-48">
                    <Select value={monthFilter} onValueChange={setMonthFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter Bulan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Bulan</SelectItem>
                        <SelectItem value="1">Januari</SelectItem>
                        <SelectItem value="2">Februari</SelectItem>
                        <SelectItem value="3">Maret</SelectItem>
                        <SelectItem value="4">April</SelectItem>
                        <SelectItem value="5">Mei</SelectItem>
                        <SelectItem value="6">Juni</SelectItem>
                        <SelectItem value="7">Juli</SelectItem>
                        <SelectItem value="8">Agustus</SelectItem>
                        <SelectItem value="9">September</SelectItem>
                        <SelectItem value="10">Oktober</SelectItem>
                        <SelectItem value="11">November</SelectItem>
                        <SelectItem value="12">Desember</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Records Table */}
            <Card>
              <CardHeader>
                <CardTitle>Riwayat Kehadiran ({filteredRecords.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Guru</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Waktu Masuk</TableHead>
                    <TableHead>Waktu Keluar</TableHead>
                    <TableHead>Catatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          {new Date(record.date).toLocaleDateString('id-ID')}
                        </div>
                      </TableCell>
                      <TableCell>{record.className}</TableCell>
                      <TableCell>{record.teacherName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          {getStatusBadge(record.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {record.checkInTime ? (
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            {record.checkInTime}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.checkOutTime ? (
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            {record.checkOutTime}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.notes ? (
                          <div className="max-w-xs truncate" title={record.notes}>
                            {record.notes}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredRecords.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Tidak ada riwayat kehadiran yang sesuai dengan filter
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Kehadiran per Kelas</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Guru</TableHead>
                    <TableHead className="text-center">Total Sesi</TableHead>
                    <TableHead className="text-center">Hadir</TableHead>
                    <TableHead className="text-center">Tidak Hadir</TableHead>
                    <TableHead className="text-center">Terlambat</TableHead>
                    <TableHead className="text-center">Tingkat Kehadiran</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classSummaries.map((summary) => (
                    <TableRow key={summary.classId}>
                      <TableCell className="font-medium">{summary.className}</TableCell>
                      <TableCell>{summary.teacherName}</TableCell>
                      <TableCell className="text-center">{summary.totalSessions}</TableCell>
                      <TableCell className="text-center text-green-600 font-semibold">
                        {summary.presentCount}
                      </TableCell>
                      <TableCell className="text-center text-red-600 font-semibold">
                        {summary.absentCount}
                      </TableCell>
                      <TableCell className="text-center text-yellow-600 font-semibold">
                        {summary.lateCount}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={getAttendanceRateColor(summary.attendanceRate)}>
                          {summary.attendanceRate}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getAttendanceRateBadge(summary.attendanceRate)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
