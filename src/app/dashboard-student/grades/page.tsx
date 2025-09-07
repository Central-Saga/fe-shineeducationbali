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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Eye,
  Calendar,
  Award,
  TrendingUp,
  BarChart3,
  Download,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Grade {
  id: string;
  assignmentId: string;
  assignmentTitle: string;
  classId: string;
  className: string;
  teacherName: string;
  grade: number;
  maxGrade: number;
  gradeCategory: string;
  feedback?: string;
  gradedDate: string;
  status: 'graded' | 'pending';
}

interface ClassSummary {
  classId: string;
  className: string;
  teacherName: string;
  averageGrade: number;
  totalAssignments: number;
  gradedAssignments: number;
  grades: Grade[];
}

export default function StudentGradesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [classSummaries, setClassSummaries] = useState<ClassSummary[]>([]);

  // Mock data - in real app, this would come from API based on student's enrolled classes
  useEffect(() => {
    const mockGrades: Grade[] = [
      {
        id: "1",
        assignmentId: "1",
        assignmentTitle: "Latihan Grammar Chapter 1",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        grade: 85,
        maxGrade: 100,
        gradeCategory: "Tugas",
        feedback: "Bagus, perlu perbaikan di tenses",
        gradedDate: "2025-07-01",
        status: "graded"
      },
      {
        id: "2",
        assignmentId: "2",
        assignmentTitle: "Essay Writing Practice",
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        grade: 92,
        maxGrade: 100,
        gradeCategory: "Tugas",
        feedback: "Excellent work!",
        gradedDate: "2025-07-03",
        status: "graded"
      },
      {
        id: "3",
        assignmentId: "3",
        assignmentTitle: "Vocabulary Quiz",
        classId: "2",
        className: "Matematika A",
        teacherName: "Bu Siti",
        grade: 78,
        maxGrade: 100,
        gradeCategory: "UTS",
        feedback: "Perlu latihan lebih",
        gradedDate: "2025-06-30",
        status: "graded"
      },
      {
        id: "4",
        assignmentId: "4",
        assignmentTitle: "Matematika Dasar - Soal Cerita",
        classId: "2",
        className: "Matematika A",
        teacherName: "Bu Siti",
        grade: 0,
        maxGrade: 100,
        gradeCategory: "Tugas",
        gradedDate: "",
        status: "pending"
      }
    ];

    const mockClassSummaries: ClassSummary[] = [
      {
        classId: "1",
        className: "Bahasa Inggris A",
        teacherName: "Mr. John",
        averageGrade: 88.5,
        totalAssignments: 3,
        gradedAssignments: 2,
        grades: mockGrades.filter(g => g.classId === "1")
      },
      {
        classId: "2",
        className: "Matematika A",
        teacherName: "Bu Siti",
        averageGrade: 78,
        totalAssignments: 2,
        gradedAssignments: 1,
        grades: mockGrades.filter(g => g.classId === "2")
      }
    ];

    setGrades(mockGrades);
    setClassSummaries(mockClassSummaries);
  }, []);

  // Filter grades based on search and filters
  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grade.className.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === "all" || grade.classId === classFilter;
    
    return matchesSearch && matchesClass;
  });

  // Get unique classes for filter
  const classes = [...new Set(grades.map(g => ({ id: g.classId, name: g.className })))];

  const getGradeColor = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 85) return "text-green-600 font-semibold";
    if (percentage >= 70) return "text-yellow-600 font-semibold";
    return "text-red-600 font-semibold";
  };

  const getGradeBadge = (grade: number, maxGrade: number) => {
    const percentage = (grade / maxGrade) * 100;
    if (percentage >= 85) return <Badge className="bg-green-100 text-green-800">A</Badge>;
    if (percentage >= 80) return <Badge className="bg-green-100 text-green-800">A-</Badge>;
    if (percentage >= 75) return <Badge className="bg-yellow-100 text-yellow-800">B+</Badge>;
    if (percentage >= 70) return <Badge className="bg-yellow-100 text-yellow-800">B</Badge>;
    if (percentage >= 65) return <Badge className="bg-yellow-100 text-yellow-800">B-</Badge>;
    if (percentage >= 60) return <Badge className="bg-orange-100 text-orange-800">C+</Badge>;
    if (percentage >= 55) return <Badge className="bg-orange-100 text-orange-800">C</Badge>;
    if (percentage >= 50) return <Badge className="bg-orange-100 text-orange-800">C-</Badge>;
    return <Badge className="bg-red-100 text-red-800">D</Badge>;
  };

  const getStatusBadge = (status: Grade['status']) => {
    switch (status) {
      case 'graded':
        return <Badge className="bg-green-100 text-green-800">Sudah Dinilai</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Belum Dinilai</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const handleViewGrade = (gradeId: string) => {
    console.log("View grade:", gradeId);
    // Navigate to grade detail page
  };

  const handleDownloadReport = () => {
    console.log("Download grade report");
    // Generate and download grade report
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#C40503]/10 rounded-lg">
              <Award className="h-6 w-6 text-[#C40503]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Nilai Saya</h1>
          </div>
          <p className="text-gray-600 mb-6">Lihat dan pantau nilai dari semua kelas yang Anda ikuti</p>
          <div className="flex justify-end">
            <Button onClick={handleDownloadReport} className="bg-[#C40503] hover:bg-[#A60000]">
              <Download className="h-4 w-4 mr-2" />
              Download Laporan
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#C40503]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Nilai</p>
                  <p className="text-3xl font-bold text-[#C40503]">{grades.length}</p>
                </div>
                <div className="p-3 bg-[#C40503]/10 rounded-lg">
                  <Award className="h-6 w-6 text-[#C40503]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-[#DAA625]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Rata-rata Nilai</p>
                  <p className="text-3xl font-bold text-[#DAA625]">
                    {grades.filter(g => g.status === 'graded').length > 0 
                      ? Math.round(grades.filter(g => g.status === 'graded').reduce((acc, g) => acc + g.grade, 0) / grades.filter(g => g.status === 'graded').length)
                      : 0
                    }
                  </p>
                </div>
                <div className="p-3 bg-[#DAA625]/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-[#DAA625]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Sudah Dinilai</p>
                  <p className="text-3xl font-bold text-green-600">
                    {grades.filter(g => g.status === 'graded').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Belum Dinilai</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {grades.filter(g => g.status === 'pending').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="grades" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="grades" className="flex items-center">
              <Award className="h-4 w-4 mr-2" />
              Daftar Nilai
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ringkasan Kelas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grades" className="space-y-6">
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
                        placeholder="Cari berdasarkan tugas atau kelas..."
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
                </div>
              </CardContent>
            </Card>

            {/* Grades Table */}
            <Card>
              <CardHeader>
                <CardTitle>Daftar Nilai ({filteredGrades.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tugas</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Guru</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-center">Nilai</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead>Tanggal Dinilai</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{grade.assignmentTitle}</div>
                          <div className="text-sm text-gray-500">ID: {grade.assignmentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{grade.className}</TableCell>
                      <TableCell>{grade.teacherName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{grade.gradeCategory}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {grade.status === 'graded' ? (
                          <div className="flex items-center justify-center gap-2">
                            <span className={getGradeColor(grade.grade, grade.maxGrade)}>
                              {grade.grade}/{grade.maxGrade}
                            </span>
                            {getGradeBadge(grade.grade, grade.maxGrade)}
                          </div>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Belum Dinilai</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {grade.feedback ? (
                          <div className="max-w-xs truncate" title={grade.feedback}>
                            {grade.feedback}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {grade.gradedDate ? (
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(grade.gradedDate).toLocaleDateString('id-ID')}
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewGrade(grade.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredGrades.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        Tidak ada nilai yang sesuai dengan filter
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
                <CardTitle>Ringkasan Nilai per Kelas</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Guru</TableHead>
                    <TableHead className="text-center">Total Tugas</TableHead>
                    <TableHead className="text-center">Sudah Dinilai</TableHead>
                    <TableHead className="text-center">Rata-rata</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classSummaries.map((summary) => (
                    <TableRow key={summary.classId}>
                      <TableCell className="font-medium">{summary.className}</TableCell>
                      <TableCell>{summary.teacherName}</TableCell>
                      <TableCell className="text-center">{summary.totalAssignments}</TableCell>
                      <TableCell className="text-center">{summary.gradedAssignments}</TableCell>
                      <TableCell className="text-center">
                        <span className={getGradeColor(summary.averageGrade, 100)}>
                          {summary.averageGrade}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getGradeBadge(summary.averageGrade, 100)}
                      </TableCell>
                      <TableCell className="text-center">
                        {summary.gradedAssignments === summary.totalAssignments ? (
                          <Badge className="bg-green-100 text-green-800">Lengkap</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Belum Lengkap</Badge>
                        )}
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
