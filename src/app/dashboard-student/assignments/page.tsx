"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { 
  Search, 
  Filter, 
  Eye,
  Calendar,
  Clock,
  FileText,
  Users,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  teacherName: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'late' | 'graded';
  grade?: number;
  maxGrade?: number;
  submissionDate?: string;
  createdDate: string;
  isOverdue: boolean;
}

export default function StudentAssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  // Mock data - in real app, this would come from API based on student's enrolled classes
  useEffect(() => {
    const mockAssignments: Assignment[] = [
      {
        id: "1",
        title: "Latihan Grammar Chapter 1",
        description: "Kerjakan latihan grammar pada halaman 15-20",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        dueDate: "2025-07-05",
        status: "pending",
        createdDate: "2025-06-28",
        isOverdue: false
      },
      {
        id: "2",
        title: "Essay Writing Practice",
        description: "Tulis essay 300 kata tentang pengalaman liburan",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        dueDate: "2025-07-10",
        status: "submitted",
        submissionDate: "2025-07-08",
        createdDate: "2025-06-30",
        isOverdue: false
      },
      {
        id: "3",
        title: "Vocabulary Quiz",
        description: "Quiz vocabulary dari chapter 3",
        classId: "2",
        className: "Matematika A",
        teacherName: "Bu Siti",
        dueDate: "2025-06-25",
        status: "graded",
        grade: 85,
        maxGrade: 100,
        submissionDate: "2025-06-24",
        createdDate: "2025-06-20",
        isOverdue: true
      },
      {
        id: "4",
        title: "Matematika Dasar - Soal Cerita",
        description: "Selesaikan 10 soal cerita matematika",
        classId: "2",
        className: "Matematika A",
        teacherName: "Bu Siti",
        dueDate: "2025-07-15",
        status: "pending",
        createdDate: "2025-07-01",
        isOverdue: false
      }
    ];
    setAssignments(mockAssignments);
  }, []);

  // Filter assignments based on search and filters
  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === "all" || assignment.classId === classFilter;
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  // Get unique classes for filter
  const classes = [...new Set(assignments.map(a => ({ id: a.classId, name: a.className })))];

  const getStatusBadge = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Belum Dikumpulkan</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-100 text-blue-800">Sudah Dikumpulkan</Badge>;
      case 'late':
        return <Badge className="bg-red-100 text-red-800">Terlambat</Badge>;
      case 'graded':
        return <Badge className="bg-green-100 text-green-800">Sudah Dinilai</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'submitted':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'late':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'graded':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return "text-green-600 font-semibold";
    if (grade >= 70) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const handleViewAssignment = (assignmentId: string) => {
    console.log("View assignment:", assignmentId);
    // Navigate to assignment detail page
  };

  const handleSubmitAssignment = (assignmentId: string) => {
    console.log("Submit assignment:", assignmentId);
    // Open submission modal or navigate to submission page
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C40503]">Tugas Saya</h1>
          <p className="text-gray-600">Kelola dan kerjakan tugas dari kelas yang Anda ikuti</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Tugas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#C40503]">{assignments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Belum Dikumpulkan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {assignments.filter(a => a.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sudah Dikumpulkan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Rata-rata Nilai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {assignments.filter(a => a.grade).length > 0 
                ? Math.round(assignments.filter(a => a.grade).reduce((acc, a) => acc + (a.grade || 0), 0) / assignments.filter(a => a.grade).length)
                : 0
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-[#C40503]" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari berdasarkan judul atau deskripsi..."
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="pending">Belum Dikumpulkan</SelectItem>
                  <SelectItem value="submitted">Sudah Dikumpulkan</SelectItem>
                  <SelectItem value="graded">Sudah Dinilai</SelectItem>
                  <SelectItem value="late">Terlambat</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Tugas ({filteredAssignments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tugas</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Guru</TableHead>
                <TableHead>Tenggat Waktu</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assignment.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {assignment.description}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        Dibuat: {new Date(assignment.createdDate).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{assignment.className}</TableCell>
                  <TableCell>{assignment.teacherName}</TableCell>
                  <TableCell>
                    <div className={`flex items-center ${assignment.isOverdue ? 'text-red-600' : ''}`}>
                      <Clock className="h-4 w-4 mr-1" />
                      <span className={assignment.isOverdue ? 'font-semibold' : ''}>
                        {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                      </span>
                      {assignment.isOverdue && (
                        <Badge className="ml-2 bg-red-100 text-red-800">Terlambat</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(assignment.status)}
                      {getStatusBadge(assignment.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {assignment.grade ? (
                      <div className="flex items-center gap-1">
                        <span className={getGradeColor(assignment.grade)}>
                          {assignment.grade}/{assignment.maxGrade}
                        </span>
                        <Badge className="bg-green-100 text-green-800">
                          {assignment.grade >= 85 ? 'A' : assignment.grade >= 70 ? 'B' : 'C'}
                        </Badge>
                      </div>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewAssignment(assignment.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {assignment.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSubmitAssignment(assignment.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredAssignments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    Tidak ada tugas yang sesuai dengan filter
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
