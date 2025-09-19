"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, Check, X, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Sample attendance data
const attendanceData = {
  class: {
    id: "c1",
    name: "Aljabar Linear",
    subject: "Matematika"
  },
  meeting: {
    id: "1",
    number: 1,
    title: "Pengenalan Aljabar Linear",
    date: "11 Juli 2025",
    time: "08:00 - 09:30"
  },
  summary: {
    total: 25,
    present: 18,
    absent: 4,
    late: 3
  },
  students: [
    { id: "s1", name: "Ahmad Rizal", status: "present" },
    { id: "s2", name: "Siti Nurhaliza", status: "present" },
    { id: "s3", name: "Budi Prakoso", status: "present" },
    { id: "s4", name: "Diana Putri", status: "present" },
    { id: "s5", name: "Eko Prasetyo", status: "absent" },
    { id: "s6", name: "Fauzi Rahman", status: "present" },
    { id: "s7", name: "Gita Savitri", status: "present" },
    { id: "s8", name: "Hadi Nugroho", status: "present" },
    { id: "s9", name: "Indah Permata", status: "present" },
    { id: "s10", name: "Joko Widodo", status: "absent" },
    { id: "s11", name: "Kartika Dewi", status: "present" },
    { id: "s12", name: "Lukman Hakim", status: "present" },
    { id: "s13", name: "Maya Angelica", status: "present" },
    { id: "s14", name: "Nando Pratama", status: "late" },
    { id: "s15", name: "Olivia Puspita", status: "present" },
    { id: "s16", name: "Pandu Wijaya", status: "present" },
    { id: "s17", name: "Qori Rahmawati", status: "present" },
    { id: "s18", name: "Rudi Setiawan", status: "present" },
    { id: "s19", name: "Siska Kohl", status: "late" },
    { id: "s20", name: "Tono Sudrajat", status: "present" },
    { id: "s21", name: "Umi Kalsum", status: "present" },
    { id: "s22", name: "Vina Muliani", status: "absent" },
    { id: "s23", name: "Wahyu Agung", status: "present" },
    { id: "s24", name: "Xaverius Ian", status: "late" },
    { id: "s25", name: "Yolanda Sari", status: "absent" }
  ]
};

export default function AttendanceMeetingPage() {
  // Gunakan useParams untuk mengakses parameter URL
  const params = useParams();
  const classId = params.classId as string;
  // const meetingId = params.meetingId as string;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [studentAttendance, setStudentAttendance] = useState(
    attendanceData.students.reduce((acc, student) => {
      acc[student.id] = student.status;
      return acc;
    }, {} as Record<string, string>)
  );
  
  const handleAttendanceChange = (studentId: string, status: string) => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };
  
  const filteredStudents = attendanceData.students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate stats based on current state
  const calculateStats = () => {
    const stats = { present: 0, absent: 0, late: 0 };
    Object.values(studentAttendance).forEach(status => {
      if (status === 'present') stats.present++;
      else if (status === 'absent') stats.absent++;
      else if (status === 'late') stats.late++;
    });
    return stats;
  };
  
  const stats = calculateStats();
  
  return (
    <div className="py-6 space-y-6 w-full">
      <div className="flex items-center justify-between">
        <Link href={`/dashboard-teacher/classes/${classId}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Detail Kelas
          </Button>
        </Link>
        <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
          Simpan Perubahan
        </Button>
      </div>
      
      <Card>
        <CardHeader className="bg-[#C40503]/5 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-xl text-[#C40503]">
                Absensi Pertemuan {attendanceData.meeting.number}
              </CardTitle>
              <p className="text-gray-600">
                {attendanceData.class.name} - {attendanceData.class.subject}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-gray-100 text-gray-800">
                {attendanceData.meeting.date}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                {attendanceData.meeting.time}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-bold">{attendanceData.students.length}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{stats.present}</div>
                <div className="text-xs text-green-500">Hadir</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-3 bg-red-50 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-bold text-red-600">{stats.absent}</div>
                <div className="text-xs text-red-500">Tidak Hadir</div>
              </div>
            </div>
            <div className="flex items-center justify-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-600">{stats.late}</div>
                <div className="text-xs text-yellow-500">Terlambat</div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Cari siswa berdasarkan nama..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Semua ({attendanceData.students.length})</TabsTrigger>
                <TabsTrigger value="present">Hadir ({stats.present})</TabsTrigger>
                <TabsTrigger value="absent">Tidak Hadir ({stats.absent})</TabsTrigger>
                <TabsTrigger value="late">Terlambat ({stats.late})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status Kehadiran</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map((student, index) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              <RadioGroup 
                                value={studentAttendance[student.id]} 
                                onValueChange={(value: string) => handleAttendanceChange(student.id, value)}
                                className="flex space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="present" id={`present-${student.id}`} className="text-green-600" />
                                  <Label htmlFor={`present-${student.id}`} className="text-green-600 flex items-center gap-1">
                                    <Check className="h-3 w-3" /> Hadir
                                  </Label>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="absent" id={`absent-${student.id}`} className="text-red-600" />
                                  <Label htmlFor={`absent-${student.id}`} className="text-red-600 flex items-center gap-1">
                                    <X className="h-3 w-3" /> Tidak Hadir
                                  </Label>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="late" id={`late-${student.id}`} className="text-yellow-600" />
                                  <Label htmlFor={`late-${student.id}`} className="text-yellow-600 flex items-center gap-1">
                                    <Clock className="h-3 w-3" /> Terlambat
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="present" className="mt-0">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status Kehadiran</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.filter(student => studentAttendance[student.id] === 'present').map((student, index) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                                <Check className="h-3 w-3" /> Hadir
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="absent" className="mt-0">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status Kehadiran</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.filter(student => studentAttendance[student.id] === 'absent').map((student, index) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                                <X className="h-3 w-3" /> Tidak Hadir
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="late" className="mt-0">
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status Kehadiran</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.filter(student => studentAttendance[student.id] === 'late').map((student, index) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center">
                              <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Terlambat
                              </Badge>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
              Simpan Perubahan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
