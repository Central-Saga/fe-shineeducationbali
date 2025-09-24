"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, FileText, Plus, User, Calendar, Clock, BookOpen, Users, Download } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { AttendanceModal } from "./AttendanceModal";
import { ClassDetailTable, ClassDetailData } from "../layout/TabsNavigationTable";

// State interfaces for meeting attendance visibility
// interface MeetingAttendanceState {
//   [meetingId: string]: boolean;
// }

interface ClassDetailsProps {
  classData: {
    id: string;
    name: string; // Nama program (contoh: "Matematika SMA")
    subject: string; // Kategori program (contoh: "Matematika")
    level: string; // Jenjang pendidikan (SD, SMP, SMA/SMK)
    programId?: string; // ID program untuk referensi
    schedule: string;
    time: string;
    room?: string;
    teacher?: string;
    studentCount: number;
    capacity: number; // Kapasitas maksimal kelas
    progress: number; // Progress pembelajaran
    status: string;
    description?: string;
    syllabus?: string[];
    groupLink?: string;
    students?: Array<{
      id: string;
      name: string;
      attendance: string;
      grade: string;
    }>;
    assignments?: Array<{
      id: string;
      title: string;
      dueDate: string;
      status: string;
    }>;
    materials?: Array<{
      id: string;
      title: string;
      type: string;
      uploadedDate: string;
    }>;
  };
}

export function ClassDetails({ classData }: ClassDetailsProps) {
  // State untuk AttendanceModal
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

  // Convert assignments to ClassDetailData format
  const assignmentsData: ClassDetailData[] = (classData.assignments || []).map(assignment => ({
    id: assignment.id,
    title: assignment.title,
    subject: classData.subject,
    dueDate: assignment.dueDate,
    status: assignment.status === "completed" ? "completed" : 
            assignment.status === "ongoing" ? "in-progress" : "upcoming",
    type: "assignment" as const,
    totalStudents: classData.studentCount,
    submittedCount: Math.floor(Math.random() * classData.studentCount), // Mock data
  }));

  // Convert materials to ClassDetailData format
  const materialsData: ClassDetailData[] = (classData.materials || []).map(material => ({
    id: material.id,
    title: material.title,
    subject: classData.subject,
    dueDate: material.uploadedDate,
    status: "completed" as const,
    type: material.type === "PDF" ? "material" as const : "material" as const,
  }));

  // Convert students to ClassDetailData format
  const studentsData: ClassDetailData[] = (classData.students || []).map(student => ({
    id: student.id,
    title: student.name,
    subject: classData.subject,
    dueDate: new Date().toISOString().split('T')[0], // Current date as placeholder
    status: "completed" as const, // All students are active
    type: "assignment" as const, // Using assignment type for students
  }));

  // Combine assignments and materials for the main table
  const allClassData: ClassDetailData[] = [...assignmentsData, ...materialsData];

  // Handler functions for ClassDetailTable
  const handleEditItem = (item: ClassDetailData) => {
    console.log("Edit item:", item);
    // Implement edit logic
  };

  const handleDeleteItem = (item: ClassDetailData) => {
    console.log("Delete item:", item);
    // Implement delete logic
  };

  const handleViewItem = (item: ClassDetailData) => {
    console.log("View item:", item);
    // Implement view logic
  };

  const handleExportData = () => {
    console.log("Export data");
    // Implement export logic
  };

  const handleSearchData = (query: string) => {
    console.log("Search query:", query);
    // Implement search logic
  };

  const handleAddAssignment = () => {
    console.log("Add new assignment");
    // Implement add assignment logic
  };

  const handleAddMaterial = () => {
    console.log("Add new material");
    // Implement add material logic
  };

  const handleAddStudent = () => {
    console.log("Add new student");
    // Implement add student logic
  };
  const [selectedSession, setSelectedSession] = useState<{ 
    id: string; 
    title: string; 
    subject: string; 
    level: string;
    programId: string;
    schedule: string;
    date: string; 
    timeStart: string; 
    timeEnd: string; 
    status: string; 
    studentCount: number; 
    completionProgress: number; 
    description: string; 
    materials: string[]; 
    assignments: { id: string; title: string; description: string; dueDate: string; status: string }[]; 
    attendanceRecord: { present: number; absent: number; late: number; excused: number } | null 
  } | null>(null);

  // Mock data untuk sessions yang akan ditampilkan di tab kehadiran
  const mockSessions = [
    {
      id: "1",
      title: "Pertemuan 1: Pengenalan Dasar",
      subject: classData.subject,
      level: classData.level,
      programId: classData.programId || classData.id,
      schedule: classData.schedule,
      date: "2024-01-15",
      timeStart: "09:00",
      timeEnd: "11:00",
      status: "completed" as const,
      studentCount: classData.studentCount,
      completionProgress: 100,
      description: "Pengenalan dasar-dasar materi pembelajaran",
      materials: ["Materi 1: Pengenalan", "Materi 2: Konsep Dasar"],
      assignments: [
        {
          id: "1",
          title: "Tugas 1: Latihan Dasar",
          description: "Latihan dasar untuk memahami konsep",
          dueDate: "2024-01-20",
          status: "completed"
        }
      ],
      attendanceRecord: {
        present: 18,
        absent: 2,
        late: 0,
        excused: 0
      }
    },
    {
      id: "2",
      title: "Pertemuan 2: Praktik Lanjutan",
      subject: classData.subject,
      level: classData.level,
      programId: classData.programId || classData.id,
      schedule: classData.schedule,
      date: "2024-01-22",
      timeStart: "09:00",
      timeEnd: "11:00",
      status: "ongoing" as const,
      studentCount: classData.studentCount,
      completionProgress: 60,
      description: "Praktik lanjutan dengan studi kasus",
      materials: ["Materi 3: Praktik", "Materi 4: Studi Kasus"],
      assignments: [
        {
          id: "2",
          title: "Tugas 2: Praktik Mandiri",
          description: "Praktik mandiri dengan studi kasus",
          dueDate: "2024-01-27",
          status: "ongoing"
        }
      ],
      attendanceRecord: {
        present: 19,
        absent: 1,
        late: 0,
        excused: 0
      }
    },
    {
      id: "3",
      title: "Pertemuan 3: Review dan Evaluasi",
      subject: classData.subject,
      level: classData.level,
      programId: classData.programId || classData.id,
      schedule: classData.schedule,
      date: "2024-01-29",
      timeStart: "09:00",
      timeEnd: "11:00",
      status: "upcoming",
      studentCount: classData.studentCount,
      completionProgress: 0,
      description: "Review materi dan evaluasi pembelajaran",
      materials: ["Materi 5: Review", "Materi 6: Evaluasi"],
      assignments: [],
      attendanceRecord: null
    }
  ];

  // Handle attendance modal
  const handleAttendanceClick = (session: { 
    id: string; 
    title: string; 
    subject: string; 
    level: string;
    programId: string;
    schedule: string;
    date: string; 
    timeStart: string; 
    timeEnd: string; 
    status: string; 
    studentCount: number; 
    completionProgress: number; 
    description: string; 
    materials: string[]; 
    assignments: { id: string; title: string; description: string; dueDate: string; status: string }[]; 
    attendanceRecord: { present: number; absent: number; late: number; excused: number } | null 
  }) => {
    setSelectedSession(session);
    setIsAttendanceModalOpen(true);
  };

  const handleAttendanceSave = (attendanceData: { 
    classId: string;
    attendanceRecords: Record<string, 'present' | 'absent' | 'late' | 'excused' | 'unrecorded'>;
    summary: { total: number; present: number; absent: number; late: number; excused: number };
    students: { attendance: 'present' | 'absent' | 'late' | 'excused' | 'unrecorded'; id: string; name: string; }[];
  }) => {
    console.log('Attendance saved:', attendanceData);
    // Handle saving attendance data
    setIsAttendanceModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-6">
          <Link 
            href="/dashboard-teacher/classes"
            className="inline-flex items-center text-gray-600 hover:text-[#C40001] mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Kelas
        </Link>
          
          {/* Class Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl font-bold text-gray-900">{classData.name}</CardTitle>
            <Badge 
              className={
                classData.status === "active" 
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }
            >
              {classData.status === "active" ? "Aktif" : "Tidak Aktif"}
            </Badge>
          </div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      {classData.subject}
                    </Badge>
                    <Badge variant="outline" className="text-purple-600 border-purple-200">
                      {classData.level}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Kapasitas Kelas</p>
                  <p className="text-2xl font-bold text-[#C40001]">{classData.studentCount}/{classData.capacity}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round((classData.studentCount / classData.capacity) * 100)}% terisi
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C40001]/10 rounded-lg">
                    <Calendar className="h-5 w-5 text-[#C40001]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Jadwal</p>
                    <p className="font-medium">{classData.schedule}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C40001]/10 rounded-lg">
                    <Clock className="h-5 w-5 text-[#C40001]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Waktu</p>
                    <p className="font-medium">{classData.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#C40001]/10 rounded-lg">
                    <Users className="h-5 w-5 text-[#C40001]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Jumlah Siswa</p>
                    <p className="font-medium">{classData.studentCount}/{classData.capacity} siswa</p>
                  </div>
                </div>
              </div>
          
              {classData.description && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Deskripsi Kelas</h3>
                  <p className="text-gray-700">{classData.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <div className="w-full">
            <Tabs defaultValue="students" className="w-full">
            <TabsList className="bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="students" className="data-[state=active]:bg-white data-[state=active]:text-[#C40001] data-[state=active]:shadow-sm">
                <User className="h-4 w-4 mr-2" />
                Siswa
              </TabsTrigger>
              <TabsTrigger value="assignments" className="data-[state=active]:bg-white data-[state=active]:text-[#C40001] data-[state=active]:shadow-sm">
                <FileText className="h-4 w-4 mr-2" />
                Tugas
              </TabsTrigger>
              <TabsTrigger value="materials" className="data-[state=active]:bg-white data-[state=active]:text-[#C40001] data-[state=active]:shadow-sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Materi
              </TabsTrigger>
              <TabsTrigger value="attendance" className="data-[state=active]:bg-white data-[state=active]:text-[#C40001] data-[state=active]:shadow-sm">
                <Users className="h-4 w-4 mr-2" />
                Kehadiran
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="mt-6">
              <ClassDetailTable
                data={studentsData}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                onView={handleViewItem}
                onExport={handleExportData}
                onSearch={handleSearchData}
                onAdd={handleAddStudent}
                title="Daftar Siswa"
                description="Kelola data siswa dalam kelas"
                addButtonText="Tambah Siswa"
              />
            </TabsContent>
            
            <TabsContent value="assignments" className="mt-6">
              <ClassDetailTable
                data={assignmentsData}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                onView={handleViewItem}
                onExport={handleExportData}
                onSearch={handleSearchData}
                onAdd={handleAddAssignment}
                title="Tugas"
                description="Kelola tugas dan aktivitas pembelajaran"
                addButtonText="Buat Tugas Baru"
              />
            </TabsContent>
            
            <TabsContent value="materials" className="mt-6">
              <ClassDetailTable
                data={materialsData}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                onView={handleViewItem}
                onExport={handleExportData}
                onSearch={handleSearchData}
                onAdd={handleAddMaterial}
                title="Materi Pembelajaran"
                description="Kelola materi dan dokumen pembelajaran"
                addButtonText="Upload Materi"
              />
            </TabsContent>
            
            <TabsContent value="attendance" className="mt-6">
              <div className="space-y-6">
                {/* Header */}
                <Card className="shadow-sm">
                  <CardHeader className="bg-[#C40001]/5 border-b">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-[#C40001] flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Kehadiran Siswa - Pertemuan Kelas
                      </CardTitle>
                      <Button className="bg-[#C40001] hover:bg-[#A60000] text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Pertemuan
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="p-1 bg-blue-100 rounded">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900">Manajemen Kehadiran Pertemuan</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Kelola kehadiran siswa untuk setiap pertemuan kelas. Klik &quot;Catat Kehadiran&quot; untuk mencatat kehadiran siswa pada pertemuan yang sedang berlangsung.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Session Cards */}
                <div className="space-y-6">
                  {mockSessions.map((session) => (
                    <Card key={session.id} className="shadow-sm w-full">
                      <CardHeader className="bg-gray-50 border-b">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#C40001]/10 rounded-lg">
                              <Calendar className="h-5 w-5 text-[#C40001]" />
                            </div>
                            <div>
                              <CardTitle className="text-lg text-gray-900">{session.title}</CardTitle>
                              <p className="text-sm text-gray-600">
                                {new Date(session.date).toLocaleDateString('id-ID', {
                                  weekday: 'long',
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })} • {session.timeStart} - {session.timeEnd}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            className={
                              session.status === "completed" 
                                ? "bg-green-100 text-green-800"
                                : session.status === "ongoing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {session.status === "completed" ? "Selesai" : 
                             session.status === "ongoing" ? "Sedang Berlangsung" : "Akan Datang"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          {/* Informasi Pertemuan */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">Informasi Pertemuan</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-500" />
                                <span>{session.studentCount} siswa</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span>Progress: {session.completionProgress}%</span>
                              </div>
                            </div>
                          </div>

                          {/* Kehadiran */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">Kehadiran</h4>
                            {session.attendanceRecord ? (
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Total:</span>
                                  <span className="font-medium">{session.attendanceRecord.present + session.attendanceRecord.absent + session.attendanceRecord.late + session.attendanceRecord.excused}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-green-600">Hadir:</span>
                                  <span className="font-medium text-green-600">{session.attendanceRecord.present}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-red-600">Tidak Hadir:</span>
                                  <span className="font-medium text-red-600">{session.attendanceRecord.absent}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-yellow-600">Terlambat:</span>
                                  <span className="font-medium text-yellow-600">{session.attendanceRecord.late}</span>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-500">Belum ada data kehadiran</p>
                            )}
                          </div>

                          {/* Aksi */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900">Aksi</h4>
                            <div className="space-y-3">
                              <Button 
                                size="default" 
                                className="w-full bg-[#C40001] hover:bg-[#A60000] text-white h-10"
                                onClick={() => handleAttendanceClick(session)}
                              >
                                <Users className="h-4 w-4 mr-2" />
                                Catat Kehadiran
                              </Button>
                              <Button 
                                size="default" 
                                variant="outline" 
                                className="w-full h-10"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                Lihat Detail
                              </Button>
                            </div>
                          </div>
                        </div>
        </CardContent>
      </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            </Tabs>
        </div>
      </div>

      {/* Attendance Modal */}
      <AttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
        classData={selectedSession ? {
          id: selectedSession.id,
          name: selectedSession.title,
          subject: selectedSession.subject,
          level: selectedSession.level,
          programId: selectedSession.programId,
          schedule: selectedSession.schedule
        } : { id: '', name: '', subject: '', level: '', programId: '', schedule: '' }}
        studentData={classData.students ? {
          classId: classData.id,
          sessionId: selectedSession?.id || classData.id,
          students: classData.students.map(student => ({
            id: student.id,
            name: student.name,
            attendance: (student.attendance as 'present' | 'absent' | 'late' | 'unrecorded') || 'unrecorded'
          }))
        } : undefined}
        onSave={handleAttendanceSave}
      />
    </div>
  );
}
