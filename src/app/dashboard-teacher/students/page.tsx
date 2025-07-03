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
  ChevronDown, 
  ChevronUp, 
  Download,
  Filter, 
  MoreHorizontal,
  Plus, 
  Search, 
  User,
  UserPlus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import data
import { studentsData } from "@/data/data-teacher/students-data";

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Get unique classes
  const classes = [...new Set(studentsData.map(student => student.class))];

  // Toggle sort direction
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort students
  const filteredStudents = [...studentsData].filter(student => {
    let match = true;
    
    // Filter by search query
    if (searchQuery) {
      match = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              student.id.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Filter by class
    if (classFilter !== "all") {
      match = match && (student.class === classFilter);
    }
    
    return match;
  }).sort((a, b) => {
    // Sort by the selected field
    if (sortField === "name") {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortField === "grade") {
      const gradeOrder = { "A": 1, "A-": 2, "B+": 3, "B": 4, "B-": 5, "C+": 6, "C": 7, "D": 8, "E": 9 };
      return sortDirection === "asc" 
        ? (gradeOrder[a.grade as keyof typeof gradeOrder] || 99) - (gradeOrder[b.grade as keyof typeof gradeOrder] || 99)
        : (gradeOrder[b.grade as keyof typeof gradeOrder] || 99) - (gradeOrder[a.grade as keyof typeof gradeOrder] || 99);
    } else if (sortField === "attendance") {
      return sortDirection === "asc" 
        ? a.attendance - b.attendance 
        : b.attendance - a.attendance;
    } else {
      return 0;
    }
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Daftar Siswa
        </h1>
        <Link href="/dashboard-teacher/students/add">
          <Button className="bg-[#C40503] hover:bg-[#A60000]">
            <UserPlus className="mr-3 h-4 w-4" />
            Tambah Siswa
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Total Siswa</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-[#C40503]">{studentsData.length}</div>
            <p className="text-xs text-gray-500 mt-1">Di semua kelas</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Siswa Aktif</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-[#DAA625]">
              {studentsData.filter(s => s.status === "active").length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Siswa</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Rata-rata Kehadiran</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-gray-700">
              {Math.round(studentsData.reduce((sum, s) => sum + s.attendance, 0) / studentsData.length)}%
            </div>
            <p className="text-xs text-gray-500 mt-1">Kehadiran</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Siswa Berprestasi</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-gray-700">
              {studentsData.filter(s => s.grade === "A" || s.grade === "A-").length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Grade A</p>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <User className="mr-3 h-5 w-5 text-[#C40503]" />
            Daftar Siswa
          </CardTitle>
          <CardDescription>
            Kelola dan lihat informasi semua siswa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari siswa berdasarkan nama atau ID..."
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
                  {classes.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Students Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Siswa</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("grade")}
                  >
                    <div className="flex items-center">
                      Grade
                      {sortField === "grade" && (
                        sortDirection === "asc" ? 
                          <ChevronUp className="ml-2 h-4 w-4" /> : 
                          <ChevronDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => toggleSort("attendance")}
                  >
                    <div className="flex items-center">
                      Kehadiran
                      {sortField === "attendance" && (
                        sortDirection === "asc" ? 
                          <ChevronUp className="ml-2 h-4 w-4" /> : 
                          <ChevronDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback>
                            {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-gray-500">{student.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`
                          ${student.grade.startsWith("A") ? "bg-green-50 text-green-700 border-green-200" : 
                            student.grade.startsWith("B") ? "bg-blue-50 text-blue-700 border-blue-200" :
                            student.grade.startsWith("C") ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-red-50 text-red-700 border-red-200"
                          }
                        `}
                      >
                        {student.grade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.attendance >= 80 ? "outline" : "secondary"}>
                        {student.attendance}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {student.status === "active" ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Aktif
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          Tidak Aktif
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/dashboard-teacher/students/${student.id}`}>
                        <Button size="sm" variant="outline">
                          Detail
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Tidak ada siswa yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan {filteredStudents.length} dari {studentsData.length} siswa
          </p>
          <Button variant="outline" className="text-[#C40503]">
            <Download className="mr-2 h-4 w-4" />
            Ekspor Data Siswa
          </Button>
        </CardFooter>
      </Card>

      {/* Class Overview */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Ringkasan Kelas</CardTitle>
          <CardDescription>
            Distribusi siswa per kelas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map(className => {
              const classStudents = studentsData.filter(s => s.class === className);
              const activeStudents = classStudents.filter(s => s.status === "active").length;
              const avgAttendance = Math.round(
                classStudents.reduce((sum, s) => sum + s.attendance, 0) / classStudents.length
              );
              
              return (
                <div key={className} className="p-4 border rounded-lg hover:border-[#C40503] transition-colors">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{className}</h3>
                    <Badge>{classStudents.length} siswa</Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Siswa Aktif</span>
                      <span>{activeStudents} dari {classStudents.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Kehadiran Rata-rata</span>
                      <span>{avgAttendance}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Grade A/A-</span>
                      <span>
                        {classStudents.filter(s => s.grade === "A" || s.grade === "A-").length}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
