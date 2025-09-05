"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, FileText, Plus, User, Calendar, Clock, MapPin, BookOpen } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// State interfaces for meeting attendance visibility
interface MeetingAttendanceState {
  [meetingId: string]: boolean;
}

interface ClassDetailsProps {
  classData: {
    id: string;
    name: string;
    subject: string;
    level?: string;
    schedule: string;
    time: string;
    room?: string;
    teacher?: string;
    studentCount: number;
    progress: number;
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
  // Tidak lagi membutuhkan state untuk toggle kehadiran karena akan dikelola di halaman pertemuan

  return (
    <div className="py-6 space-y-6 w-full">
      <div className="flex items-center justify-between">
        <Link href="/dashboard-teacher/classes">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </Link>
        {/* Removed Edit Kelas and Mulai Kelas buttons since teachers don't edit classes directly */}
      </div>

      <Card>
        <CardHeader className="bg-[#C40503]/5 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-[#C40503]">
              {classData.name} - {classData.subject}
            </CardTitle>
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
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#C40503]">Informasi Kelas</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Jadwal:
                  </span>
                  <span className="font-medium">{classData.schedule}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Waktu:
                  </span>
                  <span className="font-medium">{classData.time}</span>
                </div>
                {classData.room && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Ruangan:
                    </span>
                    <span className="font-medium">{classData.room}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Jumlah Siswa:
                  </span>
                  <span className="font-medium">{classData.studentCount} siswa</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Progress:
                  </span>
                  <span className="font-medium">{classData.progress}%</span>
                </div>
                <div className="mt-2">
                  <Progress value={classData.progress} className="h-2" />
                </div>
              </div>
            </div>
            
            <div>
              {classData.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-[#C40503]">Deskripsi</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{classData.description}</p>
                  </div>
                </div>
              )}
              
              {classData.syllabus && classData.syllabus.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-[#C40503]">Silabus</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {classData.syllabus.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Informasi tambahan untuk guru */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold mb-3 text-[#C40503]">Informasi Kelas</h3>
                
                {/* Link Grup - Read Only */}
                {classData.groupLink && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Link Grup</label>
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                      {classData.groupLink}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Hubungi admin untuk mengubah link grup.</p>
                  </div>
                )}
                
                {/* Deskripsi Kelas - Read Only */}
                {classData.description && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Kelas</label>
                    <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                      {classData.description}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Hubungi admin untuk mengubah deskripsi kelas.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="students" className="mt-6">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="students" className="data-[state=active]:bg-white">
                <User className="h-4 w-4 mr-2" />
                Siswa
              </TabsTrigger>
              <TabsTrigger value="assignments" className="data-[state=active]:bg-white">
                <FileText className="h-4 w-4 mr-2" />
                Tugas
              </TabsTrigger>
              <TabsTrigger value="grades" className="data-[state=active]:bg-white">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                Nilai
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Daftar Siswa</CardTitle>
                    <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Siswa
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nama Siswa</TableHead>
                        <TableHead>Kehadiran</TableHead>
                        <TableHead>Nilai</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classData.students?.map((student) => (
                        <TableRow key={student.id}>
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
            
            <TabsContent value="assignments" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Tugas</CardTitle>
                    <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Tugas
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Tenggat Waktu</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classData.assignments?.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.id}</TableCell>
                          <TableCell>{assignment.title}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                assignment.status === "completed" 
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                  : assignment.status === "ongoing"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
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
            
            <TabsContent value="grades" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Nilai Siswa</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Export Excel
                      </Button>
                      <Button className="bg-[#DAA625] hover:bg-[#b88d1c] text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Nilai
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>Nama Siswa</TableHead>
                        <TableHead className="text-center">Tugas</TableHead>
                        <TableHead className="text-center">UTS</TableHead>
                        <TableHead className="text-center">UAS</TableHead>
                        <TableHead className="text-center">Nilai Akhir</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classData.students?.map((student, index) => (
                        <TableRow key={student.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell className="text-center">85</TableCell>
                          <TableCell className="text-center">78</TableCell>
                          <TableCell className="text-center">90</TableCell>
                          <TableCell className="text-center font-medium">
                            {student.grade}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Edit
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
        </CardContent>
      </Card>
    </div>
  );
}
