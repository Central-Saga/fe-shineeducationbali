"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, CheckIcon, Clock, Download, FileText, Users, XIcon } from "lucide-react";
import Link from "next/link";

export default function MeetingDetailsPage({ params }: { params: { meetingId: string } }) {
  // In a real app, you would fetch meeting data based on the meetingId
  const meetingData = {
    id: params.meetingId,
    title: "Pertemuan 1 - Pengenalan Aljabar Linear",
    classId: "math-101",
    className: "Matematika Dasar Kelas 5",
    date: "11 Juli 2025",
    startTime: "08:00",
    endTime: "09:30",
    status: "completed", // or "upcoming", "ongoing"
    description: "Pada pertemuan ini, siswa akan diperkenalkan pada konsep dasar aljabar linear termasuk variabel, koefisien, dan persamaan linear sederhana.",
    materials: [
      { id: "m1", name: "Modul Aljabar Linear", type: "pdf", size: "3.2 MB" },
      { id: "m2", name: "Presentasi Matriks dan Operasinya", type: "ppt", size: "4.7 MB" },
    ],
    attendance: {
      present: 18,
      absent: 5,
      excused: 2,
      total: 25,
    },
    students: [
      { id: "s1", name: "Ahmad Syahroni", status: "present", notes: "" },
      { id: "s2", name: "Budi Santoso", status: "present", notes: "" },
      { id: "s3", name: "Cindy Paramitha", status: "absent", notes: "Sakit" },
      { id: "s4", name: "Dimas Prayoga", status: "present", notes: "" },
      { id: "s5", name: "Eka Putri", status: "present", notes: "" },
    ],
  };

  // Helper function to get attendance status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800 flex items-center";
      case "absent":
        return "bg-red-100 text-red-800 flex items-center";
      case "excused":
        return "bg-yellow-100 text-yellow-800 flex items-center";
      default:
        return "bg-gray-100 text-gray-800 flex items-center";
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard-teacher/meetings">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#C40503] to-[#DAA625] text-transparent bg-clip-text">
            {meetingData.title}
          </h1>
          <p className="text-gray-500 mt-1">
            Kelas: {meetingData.className}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center text-[#C40503]">
              <Clock className="h-10 w-10" />
            </div>
            <h3 className="text-center font-semibold mt-2">Tanggal & Waktu</h3>
            <p className="text-center text-gray-600">{meetingData.date}</p>
            <p className="text-center text-gray-600">{meetingData.startTime} - {meetingData.endTime}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center text-[#DAA625]">
              <Users className="h-10 w-10" />
            </div>
            <h3 className="text-center font-semibold mt-2">Kehadiran</h3>
            <p className="text-center text-gray-600">
              {meetingData.attendance.present} hadir / {meetingData.attendance.total} siswa
            </p>
            <p className="text-center text-gray-600">
              ({Math.round((meetingData.attendance.present / meetingData.attendance.total) * 100)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center text-[#C40503]">
              <FileText className="h-10 w-10" />
            </div>
            <h3 className="text-center font-semibold mt-2">Materi</h3>
            <p className="text-center text-gray-600">{meetingData.materials.length} file tersedia</p>
            <div className="flex justify-center mt-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Unduh Semua
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white">
            Ringkasan
          </TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:bg-white">
            Absensi
          </TabsTrigger>
          <TabsTrigger value="materials" className="data-[state=active]:bg-white">
            Materi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Pertemuan</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold mb-2">Deskripsi</h3>
              <p className="text-gray-700 mb-6">{meetingData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Statistik Kehadiran</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hadir:</span>
                      <span className="font-medium text-green-600">{meetingData.attendance.present} siswa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tidak Hadir:</span>
                      <span className="font-medium text-red-600">{meetingData.attendance.absent} siswa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Izin:</span>
                      <span className="font-medium text-yellow-600">{meetingData.attendance.excused} siswa</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">{meetingData.attendance.total} siswa</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Materi Pertemuan</h3>
                  <div className="space-y-3">
                    {meetingData.materials.map((material) => (
                      <div key={material.id} className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-[#C40503]" />
                          <span>{material.name}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{material.size}</span>
                          <Download className="h-4 w-4 ml-2 cursor-pointer hover:text-[#C40503]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Daftar Kehadiran Siswa</CardTitle>
              <Button className="bg-[#C40503] hover:bg-[#a60402]">
                Edit Kehadiran
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Keterangan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {meetingData.students.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(student.status)}`}>
                          {student.status === "present" && <CheckIcon className="h-3 w-3 mr-1" />}
                          {student.status === "absent" && <XIcon className="h-3 w-3 mr-1" />}
                          {student.status === "present" && "Hadir"}
                          {student.status === "absent" && "Tidak Hadir"}
                          {student.status === "excused" && "Izin"}
                        </span>
                      </TableCell>
                      <TableCell>{student.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Materi Pembelajaran</CardTitle>
              <Button className="bg-[#C40503] hover:bg-[#a60402]">
                Tambah Materi
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meetingData.materials.map((material) => (
                  <Card key={material.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-[#C40503]/10 p-2 rounded-md">
                          <FileText className="h-6 w-6 text-[#C40503]" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium">{material.name}</h5>
                          <p className="text-sm text-gray-500">{material.type.toUpperCase()} - {material.size}</p>
                        </div>
                        <Download className="h-5 w-5 text-gray-400 hover:text-[#C40503] cursor-pointer" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
