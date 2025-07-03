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
import { ArrowLeft, FileText, Plus, User } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard-teacher/classes">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="bg-red-50 dark:bg-red-900/10 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-red-800 dark:text-red-200">
              {classData.name} - {classData.subject}
            </CardTitle>
            <Badge 
              className={
                classData.status === "active" 
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-200"
              }
            >
              {classData.status === "active" ? "Aktif" : "Tidak Aktif"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-700 dark:text-red-300">Informasi Kelas</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Jadwal:</span>
                  <span>{classData.schedule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Waktu:</span>
                  <span>{classData.time}</span>
                </div>
                {classData.room && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Ruangan:</span>
                    <span>{classData.room}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Jumlah Siswa:</span>
                  <span>{classData.studentCount} siswa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Progress:</span>
                  <span>{classData.progress}%</span>
                </div>
              </div>
            </div>
            
            <div>
              {classData.description && (
                <>
                  <h3 className="text-lg font-semibold mb-4 text-red-700 dark:text-red-300">Deskripsi</h3>
                  <p className="text-gray-700 dark:text-gray-300">{classData.description}</p>
                </>
              )}
              
              {classData.syllabus && classData.syllabus.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-red-700 dark:text-red-300">Silabus</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {classData.syllabus.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="students" className="mt-6">
            <TabsList className="bg-red-50 dark:bg-red-900/10">
              <TabsTrigger value="students" className="data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-800/20">
                <User className="h-4 w-4 mr-2" />
                Siswa
              </TabsTrigger>
              <TabsTrigger value="materials" className="data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-800/20">
                <FileText className="h-4 w-4 mr-2" />
                Materi
              </TabsTrigger>
              <TabsTrigger value="assignments" className="data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-800/20">
                <FileText className="h-4 w-4 mr-2" />
                Tugas
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="students" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Daftar Siswa</CardTitle>
                    <Button className="bg-red-700 hover:bg-red-800 text-white">
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
            
            <TabsContent value="materials" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Materi Pembelajaran</CardTitle>
                    <Button className="bg-red-700 hover:bg-red-800 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Materi
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Tipe</TableHead>
                        <TableHead>Tanggal Upload</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classData.materials?.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell className="font-medium">{material.id}</TableCell>
                          <TableCell>{material.title}</TableCell>
                          <TableCell>{material.type}</TableCell>
                          <TableCell>{material.uploadedDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Unduh
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
                    <Button className="bg-red-700 hover:bg-red-800 text-white">
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
