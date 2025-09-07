"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  FileText, 
  Award, 
  UserCheck, 
  Clock, 
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface StudentData {
  nama: string;
  role: string[];
}

// Mock data untuk contoh
const mockQuickStats = {
  enrolledClasses: 5,
  pendingAssignments: 3,
  averageGrade: 85,
  attendanceRate: 92,
  studyStreak: 7
};

const mockUpcomingClasses = [
  {
    id: "1",
    subject: "Matematika",
    time: "08:00 - 09:30",
    teacher: "Bu Siti",
    room: "Ruang A1",
    status: "upcoming"
  },
  {
    id: "2", 
    subject: "Bahasa Inggris",
    time: "10:00 - 11:30",
    teacher: "Mr. John",
    room: "Ruang B2",
    status: "upcoming"
  }
];

const mockRecentAssignments = [
  {
    id: "1",
    title: "Tugas Matematika - Bab 5",
    class: "Matematika",
    dueDate: "2024-01-15",
    status: "pending",
    points: 100
  },
  {
    id: "2",
    title: "Essay Bahasa Inggris",
    class: "Bahasa Inggris", 
    dueDate: "2024-01-18",
    status: "submitted",
    points: 100
  }
];

const mockRecentGrades = [
  {
    id: "1",
    subject: "Matematika",
    assignment: "Ulangan Bab 4",
    score: 90,
    maxScore: 100,
    date: "2024-01-10"
  },
  {
    id: "2",
    subject: "Bahasa Inggris",
    assignment: "Presentasi",
    score: 85,
    maxScore: 100,
    date: "2024-01-08"
  }
];

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("pengguna");
    if (data) {
      setStudentData(JSON.parse(data));
    }
  }, []);

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  Selamat datang, {studentData.nama}! 👋
                </h1>
                <p className="text-yellow-100">
                  Siap untuk belajar hari ini? Mari kita mulai perjalanan belajar Anda!
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                <Star className="h-5 w-5" />
                <span className="font-semibold">{mockQuickStats.studyStreak} hari streak!</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kelas Aktif</p>
                  <p className="text-xl font-bold text-blue-600">{mockQuickStats.enrolledClasses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tugas Pending</p>
                  <p className="text-xl font-bold text-orange-600">{mockQuickStats.pendingAssignments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Award className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rata-rata Nilai</p>
                  <p className="text-xl font-bold text-green-600">{mockQuickStats.averageGrade}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserCheck className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kehadiran</p>
                  <p className="text-xl font-bold text-purple-600">{mockQuickStats.attendanceRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Classes */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Kelas Mendatang
                </CardTitle>
                <Link href="/dashboard-student/classes">
                  <Button variant="outline" size="sm">Lihat Semua</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUpcomingClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{classItem.subject}</h4>
                        <p className="text-sm text-gray-600">{classItem.teacher} • {classItem.room}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{classItem.time}</p>
                        <Badge variant="secondary" className="text-xs">Akan Datang</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Assignments */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  Tugas Terbaru
                </CardTitle>
                <Link href="/dashboard-student/assignments">
                  <Button variant="outline" size="sm">Lihat Semua</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentAssignments.map((assignment) => {
                    const daysLeft = getDaysUntilDue(assignment.dueDate);
                    return (
                      <div key={assignment.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-lg ${
                          assignment.status === 'pending' ? 'bg-orange-100' : 'bg-green-100'
                        }`}>
                          {assignment.status === 'pending' ? (
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                          <p className="text-sm text-gray-600">{assignment.class}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            {assignment.status === 'pending' ? `${daysLeft} hari lagi` : 'Selesai'}
                          </p>
                          <Badge variant={assignment.status === 'pending' ? 'destructive' : 'secondary'}>
                            {assignment.status === 'pending' ? 'Pending' : 'Selesai'}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Grades */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Nilai Terbaru
                </CardTitle>
                <Link href="/dashboard-student/grades">
                  <Button variant="outline" size="sm">Lihat Semua</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockRecentGrades.map((grade) => {
                    const percentage = (grade.score / grade.maxScore) * 100;
                    return (
                      <div key={grade.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{grade.subject}</h4>
                          <Badge variant={percentage >= 80 ? 'default' : percentage >= 60 ? 'secondary' : 'destructive'}>
                            {grade.score}/{grade.maxScore}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{grade.assignment}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{percentage.toFixed(0)}%</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{formatDate(grade.date)}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
                Aksi Cepat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/dashboard-student/classes">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                    <BookOpen className="h-6 w-6" />
                    <span>Kelas Saya</span>
                  </Button>
                </Link>
                <Link href="/dashboard-student/assignments">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    <span>Tugas</span>
                  </Button>
                </Link>
                <Link href="/dashboard-student/grades">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                    <Award className="h-6 w-6" />
                    <span>Nilai</span>
                  </Button>
                </Link>
                <Link href="/dashboard-student/attendance">
                  <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                    <UserCheck className="h-6 w-6" />
                    <span>Kehadiran</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
