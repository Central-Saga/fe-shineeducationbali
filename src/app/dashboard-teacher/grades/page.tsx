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
  Award,
  CheckCircle,
  ChevronDown, 
  ChevronUp, 
  Download, 
  Filter, 
  GraduationCap, 
  Plus, 
  Search, 
  Star
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  useProcessedGradesData, 
  GradeCard, 
  TopStudentCard 
} from "@/components/ui-teacher/grades/grade-components";
import PageTitle from "@/components/ui-teacher/PageTitle";

// Import data
import { gradesData } from "@/data/data-teacher/grades/grades-data";

export default function GradesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  
  // Use the processed data
  const processedData = useProcessedGradesData();

  // Get unique classes and subjects
  const classes = [...new Set(gradesData.map(grade => grade.className))];
  const subjects = [...new Set(gradesData.map(grade => grade.subject))];

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
  const filteredStudents = processedData.filter(student => {
    let match = true;
    
    // Filter by search query
    if (searchQuery) {
      match = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Filter by class
    if (classFilter !== "all") {
      match = match && student.grades.some(grade => grade.className === classFilter);
    }
    
    // Filter by subject
    if (subjectFilter !== "all") {
      match = match && student.subjects.includes(subjectFilter);
    }
    
    return match;
  }).sort((a, b) => {
    // Sort by the selected field
    if (sortField === "name") {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortField === "averageScore") {
      const avgA = a.grades.length > 0 
        ? a.grades.reduce((sum, grade) => sum + grade.score, 0) / a.grades.length 
        : 0;
      const avgB = b.grades.length > 0 
        ? b.grades.reduce((sum, grade) => sum + grade.score, 0) / b.grades.length 
        : 0;
      return sortDirection === "asc" ? avgA - avgB : avgB - avgA;
    } else {
      return 0;
    }
  });
  
  // Calculate class statistics
  const calculateClassStats = (className: string) => {
    const classGrades = gradesData.filter(grade => grade.className === className && grade.status === "graded");
    
    if (classGrades.length === 0) return { average: 0, highest: 0, lowest: 0 };
    
    const scores = classGrades.map(grade => grade.score || 0);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    
    return { average, highest, lowest };
  };

  return (
    <div className="p-6 space-y-6">
      <PageTitle 
        title="Penilaian Siswa" 
        description="Kelola dan evaluasi nilai siswa"
        breadcrumb={[
          { title: "Dashboard", link: "/dashboard-teacher" },
          { title: "Pembelajaran", link: "#" },
          { title: "Nilai", link: "/dashboard-teacher/grades", active: true }
        ]}
      />

      {/* Grade Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {classes.slice(0, 4).map(className => {
          const stats = calculateClassStats(className);
          return (
            <GradeCard key={className} className={className} stats={stats} />
          );
        })}
      </div>

      {/* Grade Overview */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <GraduationCap className="mr-3 h-5 w-5 text-[#C40503]" />
            Daftar Nilai Siswa
          </CardTitle>
          <CardDescription>
            Kelola dan lihat nilai semua siswa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari siswa..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-40">
                <Select value={classFilter} onValueChange={setClassFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kelas</SelectItem>
                    {classes.map((className) => (
                      <SelectItem key={className} value={className}>{className}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-48">
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter Mata Pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Students Grades Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="w-[200px] cursor-pointer"
                    onClick={() => toggleSort("name")}
                  >
                    <div className="flex items-center">
                      Nama Siswa
                      {sortField === "name" && (
                        sortDirection === "asc" ? 
                        <ChevronUp className="ml-1 h-4 w-4" /> : 
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Kelas</TableHead>
                  {subjectFilter === "all" ? (
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => toggleSort("averageScore")}
                    >
                      <div className="flex items-center">
                        Nilai Rata-rata
                        {sortField === "averageScore" && (
                          sortDirection === "asc" ? 
                          <ChevronUp className="ml-1 h-4 w-4" /> : 
                          <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                      </div>
                    </TableHead>
                  ) : (
                    <TableHead>Nilai {subjectFilter}</TableHead>
                  )}
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  // Calculate average score for this student
                  const avgScore = student.grades.length > 0 
                    ? student.grades.reduce((sum, grade) => sum + grade.score, 0) / student.grades.length 
                    : 0;
                  
                  // Get specific subject score if filtered
                  const subjectScore = subjectFilter !== "all" && student.grades.length > 0
                    ? student.grades.find(g => g.subject === subjectFilter)?.score || 0
                    : avgScore;
                  
                  // Get the class names this student is in
                  const studentClasses = [...new Set(student.grades.map(g => g.className))];
                  
                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        {studentClasses.length > 1 
                          ? `${studentClasses[0]} +${studentClasses.length-1}`
                          : studentClasses[0] || "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{subjectFilter === "all" ? avgScore.toFixed(1) : subjectScore.toFixed(1)}</div>
                          <Progress 
                            value={subjectFilter === "all" ? avgScore : subjectScore} 
                            className="h-2 w-24" 
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 text-[#C40503]">
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                      Tidak ada siswa yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Menampilkan {filteredStudents.length} dari {processedData.length} siswa
          </p>
        </CardFooter>
      </Card>

      {/* Top Students */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Award className="mr-3 h-5 w-5 text-[#DAA625]" />
            Siswa Berprestasi
          </CardTitle>
          <CardDescription>
            Siswa dengan nilai tertinggi di setiap kelas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.slice(0, 3).map(className => {
              // Find top student in this class
              const classStudents = processedData.filter(s => 
                s.grades.some(g => g.className === className)
              );
              
              if (classStudents.length === 0) return null;
              
              const studentsWithAvg = classStudents.map(student => {
                const relevantGrades = student.grades.filter(g => g.className === className);
                const avgScore = relevantGrades.length > 0
                  ? relevantGrades.reduce((sum, grade) => sum + grade.score, 0) / relevantGrades.length
                  : 0;
                return { ...student, avgScore };
              });
              
              const topStudent = studentsWithAvg.sort((a, b) => b.avgScore - a.avgScore)[0];
              
              if (!topStudent) return null;
              
              return (
                <TopStudentCard 
                  key={`${className}-${topStudent.id}`}
                  student={{ name: topStudent.name, id: topStudent.id }}
                  className={className}
                  score={topStudent.avgScore}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
