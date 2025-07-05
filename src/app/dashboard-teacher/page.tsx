"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import data
import { classesData } from "@/data/data-teacher/classes/classes-data";
import { assignmentsData } from "@/data/data-teacher/assignments/assignments-data";
import { scheduleData } from "@/data/data-teacher/schedule/schedule-data";
import { studentsData } from "@/data/data-teacher/students-data";

// Icons
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  GraduationCap,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Bell,
  Clock,
  LineChart,
  ArrowUpRight
} from "lucide-react";

interface TeacherData {
  nama: string;
  peran: string[];
}

export default function TeacherOverview() {
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);
  
  // Get today's day for schedule
  const today = new Date();
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const todayName = dayNames[today.getDay()];
  
  // Filter today's classes
  const todayClasses = scheduleData.filter(
    (schedule) => schedule.dayOfWeek === todayName
  ).sort((a, b) => a.startTime.localeCompare(b.startTime));
  
  // Filter upcoming assignments
  const upcomingAssignments = assignmentsData
    .filter(assignment => assignment.status === "active")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      try {
        const data = localStorage.getItem("pengguna");
        if (data) {
          const parsedData = JSON.parse(data);
          setTeacherData(parsedData);
        }
      } catch (error) {
        console.error("Error loading teacher data:", error);
      }
    }
  }, []);

  if (!teacherData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // Calculate various stats
  const totalStudents = classesData.reduce((sum, cls) => sum + cls.studentCount, 0);
  const pendingAssignments = assignmentsData.filter(a => a.status === "active").length;
  const averageProgress = Math.round(
    classesData.reduce((sum, cls) => sum + cls.progress, 0) / classesData.length
  );
  
  // Get high-performing students (just a sample)
  const topStudents = studentsData
    .filter(student => student.grade === "A" || student.grade === "A-")
    .slice(0, 5);

  return (
    <div className="space-y-8 px-1 py-2">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#C40503] to-[#DAA625] p-6 md:p-8 text-white shadow-md">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Selamat Datang, {teacherData.nama || "Guru"}</h1>
          <p className="text-white/90 max-w-xl text-sm md:text-base pb-3">
            Pantau kelas, tugas, dan perkembangan siswa Anda dari dashboard ini. 
            <br className="hidden md:block" />
            Hari ini {new Date().toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}.
          </p>
          <div className="flex flex-wrap gap-3 ">
            <Link href="/dashboard-teacher/assignments/new">
              <Button className="bg-white text-[#C40503] hover:bg-white/90 border-0 shadow-sm">
                <FileText className="mr-3 h-4 w-4" /> Buat Tugas Baru
              </Button>
            </Link>
            <Link href="/dashboard-teacher/schedule">
              <Button variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20 shadow-sm">
                <Calendar className="mr-3 h-4 w-4" /> Lihat Jadwal
              </Button>
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent" />
        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-white/10" />
        <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-white/10" />
      </div>

      {/* Stat Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-t-4 border-t-[#C40503] shadow-sm hover:shadow transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium ">Total Kelas</CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-[#C40503]" />
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="text-2xl font-bold mb-5">{classesData.length}</div>
            <Link 
              href="/dashboard-teacher/classes"
              className="text-xs text-[#C40503] flex items-center hover:underline"
            >
              Lihat semua kelas
              <ChevronRight className="h-3 w-3 ml-2" />
            </Link>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#DAA625] shadow-sm hover:shadow transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">
              Total Siswa
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <Users className="h-4 w-4 text-[#DAA625]" />
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="text-2xl font-bold mb-5">{totalStudents}</div>
            <Link 
              href="/dashboard-teacher/students" 
              className="text-xs text-[#DAA625] flex items-center hover:underline"
            >
              Lihat data siswa
              <ChevronRight className="h-3 w-3 ml-2" />
            </Link>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#C40503] shadow-sm hover:shadow transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">
              Tugas Aktif
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
              <FileText className="h-4 w-4 text-[#C40503]" />
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="text-2xl font-bold mb-5">{pendingAssignments}</div>
            <Link 
              href="/dashboard-teacher/assignments" 
              className="text-xs text-[#C40503] flex items-center hover:underline"
            >
              Kelola tugas
              <ChevronRight className="h-3 w-3 ml-2" />
            </Link>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[#DAA625] shadow-sm hover:shadow transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
            <CardTitle className="text-sm font-medium">Progress Materi</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
              <LineChart className="h-4 w-4 text-[#DAA625]" />
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="text-2xl font-bold mb-2">{averageProgress}%</div>
            <Progress className="mt-2 mb-3" value={averageProgress} />
          </CardContent>
        </Card>
      </div>
      {/* Tab Navigation */}
      <div className="mt-8 mb-4">
        <Tabs defaultValue="schedule" className="w-full" >
          <TabsList className="bg-white p-1 gap-2 border rounded-md shadow-sm">
            <TabsTrigger 
              value="schedule" 
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm px-5 py-2.5 rounded-md transition-all"
            >
              <Calendar className="mr-3 h-4 w-4" />
              <span className="hidden sm:inline">Jadwal Hari Ini</span>
              <span className="sm:hidden">Jadwal</span>
            </TabsTrigger>
            <TabsTrigger 
              value="assignments" 
              className="data-[state=active]:bg-[#DAA625] data-[state=active]:text-white data-[state=active]:shadow-sm px-5 py-2.5 rounded-md transition-all"
            >
              <FileText className="mr-3 h-4 w-4" />
              <span className="hidden sm:inline">Tugas Terbaru</span>
              <span className="sm:hidden">Tugas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="students" 
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm px-5 py-2.5 rounded-md transition-all"
            >
              <Users className="mr-3 h-4 w-4" />
              <span className="hidden sm:inline">Siswa Berprestasi</span>
              <span className="sm:hidden">Siswa</span>
            </TabsTrigger>
          </TabsList>
        
        {/* Schedule Tab */}
        <TabsContent value="schedule" className="mt-0">
          <Card className="shadow-sm">
            <CardHeader className="bg-white pb-4 ">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Calendar className="mr-3 h-5 w-5 text-[#C40503]" /> 
                  Jadwal Mengajar Hari Ini
                </CardTitle>
                <Badge className="bg-[#C40503] text-white px-3">{todayName}</Badge>
              </div>
              <CardDescription className="mt-1.5">
                {todayClasses.length > 0 
                  ? `Anda memiliki ${todayClasses.length} kelas hari ini` 
                  : "Tidak ada jadwal mengajar untuk hari ini"}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-5 px-6">
              {todayClasses.length > 0 ? (
                <div className="space-y-6">
                  {todayClasses.map((schedule, index) => (
                    <div key={schedule.id} className="flex border-l-4 border-[#C40503] pl-5 py-3 bg-white rounded-lg shadow-sm">
                      <div className="w-20 h-20 bg-red-50 rounded-lg flex flex-col items-center justify-center mr-5 flex-shrink-0">
                        <span className="text-xs text-[#C40503] font-semibold mb-1">JAM</span>
                        <span className="text-xl font-bold text-[#C40503]">{schedule.startTime}</span>
                      </div>
                      <div className="flex-1 pt-1">
                        <h4 className="text-base font-semibold">{schedule.className}</h4>
                        <p className="text-sm text-gray-600 mt-0.5">{schedule.subject}</p>
                        <div className="flex mt-2 items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-2" />
                          {schedule.startTime} - {schedule.endTime}
                          <span className="mx-2">•</span>
                          <span>{schedule.location}</span>
                        </div>
                      </div>
                      <div className="pt-5 mr-5">
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          Detail
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-lg my-2">
                  <div className="mx-auto w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    <Calendar className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium">Tidak Ada Jadwal</h3>
                  <p className="text-slate-500 max-w-sm mx-auto mt-2">
                    Anda tidak memiliki jadwal mengajar untuk hari ini
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t py-4 px-6 flex justify-between">
              <Button variant="ghost" className="text-[#C40503]">
                Jadwal Minggu Ini
              </Button>
              <Link href="/dashboard-teacher/schedule">
                <Button className="bg-[#C40503] hover:bg-[#A60000]">
                  Lihat Semua Jadwal
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Assignments Tab */}
        <TabsContent value="assignments" className="mt-0">
          <Card>
            <CardHeader className="bg-slate-50 ">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <FileText className="mr-3 h-5 w-5 text-[#DAA625]" /> 
                  Tugas yang Perlu Dinilai
                </CardTitle>
                <Badge className="bg-[#DAA625]">{pendingAssignments} Tugas</Badge>
              </div>
              <CardDescription>
                Daftar tugas aktif yang perlu diperiksa
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {upcomingAssignments.map((assignment) => {
                // Calculate submission status
                const submissionRate = Math.round((assignment.submittedCount / assignment.totalStudents) * 100);
                const dueDate = new Date(assignment.dueDate);
                const isUrgent = new Date() > new Date(dueDate.getTime() - 2 * 24 * 60 * 60 * 1000);
                
                return (
                  <div 
                    key={assignment.id} 
                    className="mb-4 p-4 border rounded-lg hover:border-[#DAA625] transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-gray-600">{assignment.class} • {assignment.subject}</p>
                      </div>
                      {isUrgent ? (
                        <Badge variant="outline" className="border-red-200 text-red-600 bg-red-50">
                          <AlertCircle className="mr-2 h-3 w-3" /> Segera Berakhir
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">
                          <CheckCircle className="mr-2 h-3 w-3" /> Aktif
                        </Badge>
                      )}
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Progress Pengumpulan</span>
                        <span className="font-medium">{submissionRate}%</span>
                      </div>
                      <Progress value={submissionRate} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-xs text-slate-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-2" />
                        Batas waktu: {new Date(assignment.dueDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                      <Link href={`/dashboard-teacher/assignments/${assignment.id}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          Periksa <ArrowUpRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </CardContent>
            <CardFooter className="border-t py-4 px-6">
              <div className="w-full flex justify-between">
                <Button variant="ghost" className="text-[#DAA625]">
                  Tugas Selesai
                </Button>
                <Link href="/dashboard-teacher/assignments">
                  <Button className="bg-[#DAA625] hover:bg-[#C09520]">
                    Kelola Semua Tugas
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Top Students Tab */}
        <TabsContent value="students" className="mt-0">
          <Card>
            <CardHeader className="bg-slate-50 ">
              <CardTitle className="text-lg font-semibold flex items-center">
                <GraduationCap className="mr-3 h-5 w-5 text-[#C40503]" /> 
                Siswa Berprestasi
              </CardTitle>
              <CardDescription>
                Daftar siswa dengan performa terbaik di kelas Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 pt-2">
                {topStudents.map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#C40503] text-white flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">Kelas {student.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Badge className="bg-[#C40503] mr-2">{student.grade}</Badge>
                        <span className="text-sm">{student.attendance}% kehadiran</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t py-4 px-6">
              <Link href="/dashboard-teacher/students" className="w-full">
                <Button className="w-full bg-[#C40503] hover:bg-[#A60000]">
                  Lihat Semua Siswa
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity Section */}
      <Card className="border-t-4 border-t-[#C40503] shadow-sm mt-8">
        <CardHeader className="bg-white ">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg font-semibold ">
              <Bell className="mr-3 h-5 w-5 text-[#C40503]" />
              Aktivitas Terbaru
            </CardTitle>
            <Badge variant="outline" className="text-[#C40503] border-[#C40503] bg-red-50 px-3">3 Baru</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4 pb-4 px-6">
          <div className="space-y-6">
            <div className="flex items-start border-l-2 border-[#C40503] pl-5 py-3 hover:bg-slate-50 rounded-r-md transition-colors">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mr-5 flex-shrink-0">
                <FileText className="h-5 w-5 text-[#C40503]" />
              </div>
              <div className="space-y-1.5 pt-1">
                <p className="text-sm font-medium">
                  Anda membuat tugas baru untuk Kelas XI-A
                </p>
                <p className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 2 jam yang lalu
                </p>
              </div>
            </div>
            <div className="flex items-start border-l-2 border-[#DAA625] pl-5 py-3 hover:bg-slate-50 rounded-r-md transition-colors">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mr-5 flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-[#DAA625]" />
              </div>
              <div className="space-y-1.5 pt-1">
                <p className="text-sm font-medium">
                  Anda menilai Ujian Matematika untuk Kelas X-B
                </p>
                <p className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 5 jam yang lalu
                </p>
              </div>
            </div>
            <div className="flex items-start border-l-2 border-slate-300 pl-5 py-3 hover:bg-slate-50 rounded-r-md transition-colors">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mr-5 flex-shrink-0">
                <Users className="h-5 w-5 text-slate-500" />
              </div>
              <div className="space-y-1.5 pt-1">
                <p className="text-sm font-medium">
                  5 siswa baru bergabung dengan kelas Anda
                </p>
                <p className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-2" /> 1 hari yang lalu
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t py-4 px-6">
          <Button variant="outline" className="w-full hover:bg-slate-50 hover:text-[#C40503] transition-colors">
            Lihat Semua Aktivitas
          </Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  );
}
