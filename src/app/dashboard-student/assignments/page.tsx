"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  CheckCircle,
  AlertCircle,
  BookOpen,
  Upload,
  ArrowRight
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

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tugas Saya</h1>
          <p className="text-gray-600">Kelola dan kerjakan tugas dari kelas yang Anda ikuti</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Tugas</p>
                  <p className="text-xl font-bold text-orange-600">{assignments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Belum Dikumpulkan</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {assignments.filter(a => a.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sudah Dikumpulkan</p>
                  <p className="text-xl font-bold text-blue-600">
                    {assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rata-rata Nilai</p>
                  <p className="text-xl font-bold text-green-600">
                    {assignments.filter(a => a.grade).length > 0 
                      ? Math.round(assignments.filter(a => a.grade).reduce((acc, a) => acc + (a.grade || 0), 0) / assignments.filter(a => a.grade).length)
                      : 0
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Cari tugas..."
                    className="pl-10"
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

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssignments.map((assignment) => {
            const daysLeft = getDaysUntilDue(assignment.dueDate);
            return (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{assignment.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BookOpen className="h-4 w-4" />
                        <span>{assignment.className}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(assignment.status)}
                      {getStatusBadge(assignment.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {assignment.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Guru:</span>
                      <span className="font-medium">{assignment.teacherName}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Tenggat:</span>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span className={assignment.isOverdue ? 'text-red-600 font-semibold' : ''}>
                          {new Date(assignment.dueDate).toLocaleDateString('id-ID')}
                        </span>
                        {assignment.isOverdue && (
                          <Badge variant="destructive" className="text-xs">Terlambat</Badge>
                        )}
                      </div>
                    </div>

                    {assignment.grade && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Nilai:</span>
                        <div className="flex items-center gap-2">
                          <span className={getGradeColor(assignment.grade)}>
                            {assignment.grade}/{assignment.maxGrade}
                          </span>
                          <Badge variant={assignment.grade >= 85 ? 'default' : assignment.grade >= 70 ? 'secondary' : 'destructive'}>
                            {assignment.grade >= 85 ? 'A' : assignment.grade >= 70 ? 'B' : 'C'}
                          </Badge>
                        </div>
                      </div>
                    )}

                    {assignment.status === 'pending' && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Sisa waktu:</span>
                          <span className={daysLeft <= 2 ? 'text-red-600 font-semibold' : 'text-gray-900'}>
                            {daysLeft} hari
                          </span>
                        </div>
                        <Progress 
                          value={Math.max(0, 100 - (daysLeft * 10))} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link href={`/dashboard-student/classes/${assignment.classId}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Lihat Detail
                      </Button>
                    </Link>
                    {assignment.status === 'pending' && (
                      <Button 
                        size="sm" 
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleSubmitAssignment(assignment.id)}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Kumpulkan
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAssignments.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada tugas</h3>
              <p className="text-gray-600 mb-4">
                Tidak ada tugas yang sesuai dengan filter yang Anda pilih.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setClassFilter("all");
                  setStatusFilter("all");
                }}
              >
                Reset Filter
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
