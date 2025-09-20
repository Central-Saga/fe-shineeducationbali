"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowLeft, 
  Book, 
  Calendar, 
  CalendarCheck, 
  Clock, 
  Download, 
  Edit, 
  Mail, 
  MessageSquare, 
  Phone, 
  AlertTriangle,
  GraduationCap
} from "lucide-react";
// import Link from "next/link";
// import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// Import student data
import { studentsData } from "@/data/data-teacher/students-data";

// Example data for tabs
const attendanceData = [
  { date: "2025-07-01", status: "present", notes: "" },
  { date: "2025-06-30", status: "present", notes: "" },
  { date: "2025-06-29", status: "absent", notes: "Sick leave" },
  { date: "2025-06-28", status: "present", notes: "" },
  { date: "2025-06-27", status: "present", notes: "" },
  { date: "2025-06-26", status: "late", notes: "15 minutes late" },
  { date: "2025-06-25", status: "present", notes: "" },
];

const gradesData = [
  { subject: "Mathematics", assignment: "Mid-Term Exam", score: 85, grade: "A", date: "2025-06-15" },
  { subject: "Mathematics", assignment: "Homework 5", score: 78, grade: "B", date: "2025-06-10" },
  { subject: "English", assignment: "Essay", score: 88, grade: "A", date: "2025-06-08" },
  { subject: "Coding", assignment: "Project 1", score: 92, grade: "A", date: "2025-05-28" },
  { subject: "Coding", assignment: "Quiz 2", score: 75, grade: "B", date: "2025-05-20" },
];

export default function StudentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    status: string;
    joinDate: string;
    lastActive: string;
    totalClasses: number;
    attendanceRate: number;
    averageGrade: number;
    courses: string[];
    class: string;
    grade: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const foundStudent = studentsData.find((s) => s.id === params.id);
      if (foundStudent) {
        // Transform the student data to match the expected interface
        setStudent({
          id: foundStudent.id,
          name: foundStudent.name,
          email: foundStudent.email,
          phone: foundStudent.phone,
          avatar: foundStudent.avatar,
          status: foundStudent.status,
          joinDate: "2024-01-15", // Default value
          lastActive: "2025-01-15", // Default value
          totalClasses: 45, // Default value
          attendanceRate: foundStudent.attendance,
          averageGrade: 85, // Default value
          courses: ["Mathematics", "English", "Coding"], // Default value
          class: foundStudent.class || "Grade 5A", // Add class property
          grade: foundStudent.grade || "A" // Add grade property
        });
      }
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C40503]"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Students
          </Button>
        </div>
        
        <Card className="border-none shadow-md bg-gradient-to-r from-red-50 to-amber-50">
          <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Student Not Found</h2>
            <p className="text-gray-500 mb-4">The student you are looking for could not be found.</p>
            <Button onClick={() => router.push('/dashboard-teacher/students')}>
              Return to Students List
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate grade distribution for visual representation
  const gradeDistribution = {
    A: gradesData.filter(g => g.grade.startsWith('A')).length,
    B: gradesData.filter(g => g.grade.startsWith('B')).length,
    C: gradesData.filter(g => g.grade.startsWith('C')).length,
    D: gradesData.filter(g => g.grade.startsWith('D')).length,
    total: gradesData.length
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
      </div>

      {/* Student Profile Header */}
      <Card className="border-none shadow-md overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#C40503] to-[#DAA625] relative">
          <div className="absolute bottom-0 left-0 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full" style={{ height: '50px' }}>
              <path fill="#ffffff" fillOpacity="1" d="M0,128L60,122.7C120,117,240,107,360,122.7C480,139,600,181,720,186.7C840,192,960,160,1080,149.3C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
          </div>
        </div>
        <CardContent className="pt-0">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative -mt-16 flex-shrink-0">
              <Avatar className="h-32 w-32 rounded-lg border-4 border-white shadow-lg">
                <AvatarImage src={student.avatar} alt={student.name} className="object-cover" />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-[#C40503] to-[#DAA625] text-white">
                  {student.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{student.name}</h2>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
                <p className="text-gray-500">{student.id}</p>
              </div>

              <div className="flex flex-wrap gap-y-4 gap-x-6 pt-2">
                <div className="flex items-center text-sm text-gray-700">
                  <Book className="mr-2 h-4 w-4 text-[#C40503]" />
                  <span>Class: <span className="font-medium">{student.class}</span></span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <GraduationCap className="mr-2 h-4 w-4 text-[#C40503]" />
                  <span>Grade: <span className="font-medium">{student.grade}</span></span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <CalendarCheck className="mr-2 h-4 w-4 text-[#C40503]" />
                  <span>Attendance: <span className="font-medium">{student.attendanceRate}%</span></span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Mail className="mr-2 h-4 w-4 text-[#C40503]" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Phone className="mr-2 h-4 w-4 text-[#C40503]" />
                  <span>{student.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge className={student.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-800"}>
                  {student.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Detail Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Academic Performance */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Academic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Current Grade</span>
                      <span className="text-sm font-bold text-[#C40503]">{student.grade}</span>
                    </div>
                    <Progress className="h-2" value={
                      student.grade === "A" ? 95 :
                      student.grade === "A-" ? 90 :
                      student.grade === "B+" ? 85 :
                      student.grade === "B" ? 80 :
                      student.grade === "B-" ? 75 :
                      student.grade === "C+" ? 70 :
                      student.grade === "C" ? 65 : 60
                    } />
                  </div>

                  <div className="pt-2">
                    <div className="text-sm font-medium mb-2">Grade Distribution</div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 flex-1 flex rounded-sm overflow-hidden">
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${(gradeDistribution.A / gradeDistribution.total) * 100}%` }} 
                        />
                        <div 
                          className="bg-blue-500" 
                          style={{ width: `${(gradeDistribution.B / gradeDistribution.total) * 100}%` }} 
                        />
                        <div 
                          className="bg-amber-500" 
                          style={{ width: `${(gradeDistribution.C / gradeDistribution.total) * 100}%` }} 
                        />
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${(gradeDistribution.D / gradeDistribution.total) * 100}%` }} 
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full inline-block mr-1"></span>
                        A: {gradeDistribution.A}
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-blue-500 rounded-full inline-block mr-1"></span>
                        B: {gradeDistribution.B}
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-amber-500 rounded-full inline-block mr-1"></span>
                        C: {gradeDistribution.C}
                      </div>
                      <div className="flex items-center">
                        <span className="h-2 w-2 bg-red-500 rounded-full inline-block mr-1"></span>
                        D: {gradeDistribution.D}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Overview */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Attendance Rate</span>
                      <span className="text-sm font-bold text-[#C40503]">{student.attendanceRate}%</span>
                    </div>
                    <Progress className="h-2" value={student.attendanceRate} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-3">
                    <div className="bg-green-50 p-3 rounded-md text-center">
                      <div className="text-xl font-semibold text-green-700">
                        {Math.round(student.attendanceRate * 0.9)}
                      </div>
                      <div className="text-xs text-gray-600">Present Days</div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-md text-center">
                      <div className="text-xl font-semibold text-red-700">
                        {Math.round(student.attendanceRate * 0.1)}
                      </div>
                      <div className="text-xs text-gray-600">Absent Days</div>
                    </div>
                  </div>
                  
                  <div className="pt-3">
                    <div className="text-sm text-gray-600">
                      Last absent: June 29, 2025 (Sick leave)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Book className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Submitted Math Homework</p>
                      <p className="text-xs text-gray-500">July 2, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Completed Coding Quiz</p>
                      <p className="text-xs text-gray-500">June 30, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">English Presentation</p>
                      <p className="text-xs text-gray-500">June 28, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Late Arrival</p>
                      <p className="text-xs text-gray-500">June 26, 2025</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Attendance Records</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceData.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`
                              ${record.status === "present" ? "bg-green-50 text-green-700 border-green-200" :
                                record.status === "absent" ? "bg-red-50 text-red-700 border-red-200" :
                                "bg-amber-50 text-amber-700 border-amber-200"
                              }
                            `}
                          >
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.notes || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Grades Tab */}
        <TabsContent value="grades" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Grade Records</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead className="text-right">Score</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gradesData.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell>{record.assignment}</TableCell>
                        <TableCell className="text-right">{record.score}/100</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`
                              ${record.grade.startsWith("A") ? "bg-green-50 text-green-700 border-green-200" :
                                record.grade.startsWith("B") ? "bg-blue-50 text-blue-700 border-blue-200" :
                                record.grade.startsWith("C") ? "bg-amber-50 text-amber-700 border-amber-200" :
                                "bg-red-50 text-red-700 border-red-200"
                              }
                            `}
                          >
                            {record.grade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(record.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>View and manage student assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <GraduationCap className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p>Assignment detail view coming soon.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
