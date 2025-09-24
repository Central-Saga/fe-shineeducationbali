"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, PenLine, Clock, MapPin, User, BookOpen, Users, Calendar, Plus, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClassDetailsProps {
  classId: string;
}

// Dummy data
const classDetail = {
  id: "1",
  class_name: "Matematika SMA Kelas A",
  level: "SMA/SMK",
  program_name: "Matematika SMA",
  program_id: "prog-sma-001",
  schedule: "Senin, Rabu, Jumat",
  time_start: "08:00",
  time_end: "09:30",
  capacity: 30,
  current_enrollment: 25,
  teacher_name: "Dr. Ahmad Fauzi",
  teacher_id: "T001",
  status: "ACTIVE",
  students: [
    { id: "s1", name: "Andi Prasetyo", attendance: "90%", grade: "A" },
    { id: "s2", name: "Budi Santoso", attendance: "85%", grade: "A-" },
    { id: "s3", name: "Cindy Wulandari", attendance: "92%", grade: "A" },
    { id: "s4", name: "Dewi Anggraini", attendance: "78%", grade: "B+" },
    { id: "s5", name: "Eko Purnomo", attendance: "88%", grade: "A-" }
  ],
  assignments: [
    { id: "a1", title: "Latihan Matriks", dueDate: "10 Agustus 2025", status: "completed" },
    { id: "a2", title: "Quiz Determinan", dueDate: "17 Agustus 2025", status: "ongoing" },
    { id: "a3", title: "Tugas Akhir", dueDate: "30 Agustus 2025", status: "upcoming" }
  ],
  materials: [
    { id: "m1", title: "Modul Matriks", type: "PDF", uploadedDate: "5 Agustus 2025" },
    { id: "m2", title: "Slide Determinan", type: "PPTX", uploadedDate: "12 Agustus 2025" },
    { id: "m3", title: "Contoh Soal", type: "PDF", uploadedDate: "15 Agustus 2025" }
  ]
};

export function ClassDetails({ classId }: ClassDetailsProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch class details
    const fetchClassDetails = async () => {
      // In a real app, you would fetch data from API
      // For now, simulate a fetch delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    fetchClassDetails();
  }, [classId]);

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-[#C40503] border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat detail kelas...</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    if (status === "ACTIVE") {
      return <Badge className="bg-green-100 text-green-700">Aktif</Badge>;
    } else if (status === "COMPLETED") {
      return <Badge className="bg-blue-100 text-blue-700">Selesai</Badge>;
    } else if (status === "DRAFT") {
      return <Badge className="bg-amber-100 text-amber-700">Draft</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-700">Tidak Aktif</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/dashboard/class">
            <Button variant="outline" size="sm" className="mr-4">
              <ChevronLeft className="h-4 w-4 mr-1" /> Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{classDetail.class_name}</h1>
            <p className="text-gray-500">{classDetail.program_name} - {classDetail.level}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/class/edit/${classId}`}>
            <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
              <PenLine className="h-4 w-4 mr-2" />
              Edit Kelas
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="bg-[#C40503]/5 border-b">
            <CardTitle className="text-lg text-[#C40503]">Detail Kelas</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-[#DAA625]" />
                <div>
                  <p className="text-sm text-gray-500">Jadwal</p>
                  <p className="font-medium">{classDetail.schedule}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#C40503]" />
                <div>
                  <p className="text-sm text-gray-500">Waktu</p>
                  <p className="font-medium">{classDetail.time_start} - {classDetail.time_end}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-[#DAA625]" />
                <div>
                  <p className="text-sm text-gray-500">Program</p>
                  <p className="font-medium">{classDetail.program_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-[#C40503]" />
                <div>
                  <p className="text-sm text-gray-500">Pengajar</p>
                  <p className="font-medium">{classDetail.teacher_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-[#DAA625]" />
                <div>
                  <p className="text-sm text-gray-500">Kapasitas</p>
                  <p className="font-medium">{classDetail.current_enrollment}/{classDetail.capacity} siswa</p>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#C40503]/5 border-b">
            <CardTitle className="text-lg text-[#C40503]">Status</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Status Kelas</span>
                  {getStatusBadge(classDetail.status)}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Jumlah Siswa</span>
                  <span className="font-medium">{classDetail.current_enrollment}/{classDetail.capacity}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-[#C40503]"
                    style={{ width: `${(classDetail.current_enrollment / classDetail.capacity) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {Math.round((classDetail.current_enrollment / classDetail.capacity) * 100)}% Terisi
                </p>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Opsi Lainnya</h4>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    Kelola Siswa
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Lihat Jadwal Lengkap
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="mt-6">
        <TabsList className="bg-gray-100 mb-6">
          <TabsTrigger value="students" className="data-[state=active]:bg-white">
            <Users className="h-4 w-4 mr-2" />
            Daftar Siswa
          </TabsTrigger>
          <TabsTrigger value="assignments" className="data-[state=active]:bg-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Tugas
          </TabsTrigger>
          <TabsTrigger value="materials" className="data-[state=active]:bg-white">
            <FileText className="h-4 w-4 mr-2" />
            Materi
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="students">
          <Card>
            <CardHeader className="bg-white pb-2 flex flex-row items-center justify-between">
              <CardTitle>Daftar Siswa</CardTitle>
              <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Siswa
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium w-[50px]">No</TableHead>
                    <TableHead className="font-medium">ID</TableHead>
                    <TableHead className="font-medium">Nama Siswa</TableHead>
                    <TableHead className="font-medium">Kehadiran</TableHead>
                    <TableHead className="font-medium">Nilai</TableHead>
                    <TableHead className="font-medium text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classDetail.students.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.attendance}</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assignments">
          <Card>
            <CardHeader className="bg-white pb-2 flex flex-row items-center justify-between">
              <CardTitle>Daftar Tugas</CardTitle>
              <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Tugas
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium w-[50px]">No</TableHead>
                    <TableHead className="font-medium">ID</TableHead>
                    <TableHead className="font-medium">Judul Tugas</TableHead>
                    <TableHead className="font-medium">Tenggat Waktu</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classDetail.assignments.map((assignment, index) => (
                    <TableRow key={assignment.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{assignment.id}</TableCell>
                      <TableCell>{assignment.title}</TableCell>
                      <TableCell>{assignment.dueDate}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            assignment.status === "completed" 
                              ? "bg-green-100 text-green-800"
                              : assignment.status === "ongoing"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                          }
                        >
                          {assignment.status === "completed" ? "Selesai" : 
                           assignment.status === "ongoing" ? "Sedang Berlangsung" : "Akan Datang"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Detail
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials">
          <Card>
            <CardHeader className="bg-white pb-2 flex flex-row items-center justify-between">
              <CardTitle>Daftar Materi</CardTitle>
              <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Materi
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-medium w-[50px]">No</TableHead>
                    <TableHead className="font-medium">ID</TableHead>
                    <TableHead className="font-medium">Judul Materi</TableHead>
                    <TableHead className="font-medium">Tipe</TableHead>
                    <TableHead className="font-medium">Tanggal Unggah</TableHead>
                    <TableHead className="font-medium text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classDetail.materials.map((material, index) => (
                    <TableRow key={material.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{material.id}</TableCell>
                      <TableCell>{material.title}</TableCell>
                      <TableCell>{material.type}</TableCell>
                      <TableCell>{material.uploadedDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Lihat
                        </Button>
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
  );
}
