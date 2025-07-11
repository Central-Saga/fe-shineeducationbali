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
import { ArrowLeft, FileText, Plus, User, Calendar } from "lucide-react";
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
    <div className="container py-6 max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/dashboard-teacher/classes">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit Kelas
          </Button>
          <Button size="sm" className="bg-[#DAA625] hover:bg-[#b88d1c]">
            Mulai Kelas
          </Button>
        </div>
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
            </div>
          </div>
          
          <Tabs defaultValue="meetings" className="mt-6">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="meetings" className="data-[state=active]:bg-white">
                <Calendar className="h-4 w-4 mr-2" />
                Pertemuan
              </TabsTrigger>
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
            
            <TabsContent value="meetings" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Pertemuan Kelas</CardTitle>
                    <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Pertemuan
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Pertemuan 1 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center p-4 bg-[#C40503]/5 border-b">
                        <h3 className="text-lg font-medium flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Pertemuan 1 - Pengenalan Aljabar Linear
                        </h3>
                        <Badge className="bg-green-100 text-green-800">Telah Selesai</Badge>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Tanggal: 11 Juli 2025</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Waktu: 08:00 - 09:30</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Kehadiran: 18/25 hadir (72%)</span>
                          </div>
                        </div>
                        
                        <h4 className="font-medium mb-3">Materi Pertemuan</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <Link href="/dashboard-teacher/materials/m1">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-[#C40503]/10 p-2 rounded-md">
                                    <FileText className="h-6 w-6 text-[#C40503]" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Modul Aljabar Linear</h5>
                                    <p className="text-sm text-gray-500">PDF - 3.2 MB</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                          <Link href="/dashboard-teacher/materials/m2">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-[#DAA625]/10 p-2 rounded-md">
                                    <svg className="h-6 w-6 text-[#DAA625]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Presentasi Matriks dan Operasinya</h5>
                                    <p className="text-sm text-gray-500">PowerPoint - 4.7 MB</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                          <Link href="/dashboard-teacher/materials/m3">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-blue-100 p-2 rounded-md">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Latihan Soal Aljabar Linear</h5>
                                    <p className="text-sm text-gray-500">PDF - 1.5 MB</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            className="text-[#C40503]"
                            onClick={() => {
                              // This will be handled by state in a real implementation
                              alert('Menampilkan kehadiran untuk Pertemuan 1');
                            }}
                          >
                            Lihat Kehadiran
                          </Button>
                          <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                            Edit Pertemuan
                          </Button>
                        </div>
                        
                        {/* Attendance Section - Would be toggled by state in real implementation */}
                        <div className="mt-6 pt-6 border-t">
                          <h4 className="text-lg font-medium mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            Absensi Pertemuan 1 - 11 Juli 2025
                          </h4>
                          
                          {/* Attendance Summary Stats */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                            <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                              <div className="text-center">
                                <div className="text-xl font-bold">25</div>
                                <div className="text-xs text-gray-500">Total</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg">
                              <div className="text-center">
                                <div className="text-xl font-bold text-green-600">18</div>
                                <div className="text-xs text-green-500">Hadir</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-3 bg-red-50 rounded-lg">
                              <div className="text-center">
                                <div className="text-xl font-bold text-red-600">4</div>
                                <div className="text-xs text-red-500">Tidak Hadir</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-center p-3 bg-yellow-50 rounded-lg">
                              <div className="text-center">
                                <div className="text-xl font-bold text-yellow-600">3</div>
                                <div className="text-xs text-yellow-500">Terlambat</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="relative">
                              <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <input 
                                type="text" 
                                placeholder="Cari siswa berdasarkan nama..." 
                                className="px-4 py-2 pl-10 w-full border rounded-md"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {classData.students?.slice(0, 6).map((student, index) => (
                              <div key={student.id} className="flex items-center justify-between border p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 w-6 text-xs md:text-sm">{index + 1}.</span>
                                  <span className="font-medium text-sm">{student.name}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center space-x-1">
                                    <input 
                                      type="radio" 
                                      id={`present-${student.id}-p1`} 
                                      name={`attendance-${student.id}-p1`}
                                      className="w-3 h-3 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                                      defaultChecked={index < 4}
                                    />
                                    <label htmlFor={`present-${student.id}-p1`} className="text-green-600 text-xs">H</label>
                                  </div>
                                  
                                  <div className="flex items-center space-x-1">
                                    <input 
                                      type="radio" 
                                      id={`absent-${student.id}-p1`} 
                                      name={`attendance-${student.id}-p1`}
                                      className="w-3 h-3 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                                      defaultChecked={index === 4}
                                    />
                                    <label htmlFor={`absent-${student.id}-p1`} className="text-red-600 text-xs">A</label>
                                  </div>
                                  
                                  <div className="flex items-center space-x-1">
                                    <input 
                                      type="radio" 
                                      id={`late-${student.id}-p1`} 
                                      name={`attendance-${student.id}-p1`}
                                      className="w-3 h-3 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500"
                                      defaultChecked={index === 5}
                                    />
                                    <label htmlFor={`late-${student.id}-p1`} className="text-yellow-600 text-xs">T</label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <Button variant="outline" size="sm">
                              Lihat Semua Siswa
                            </Button>
                            <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                              Simpan Kehadiran
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pertemuan 2 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center p-4 bg-[#C40503]/5 border-b">
                        <h3 className="text-lg font-medium flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Pertemuan 2 - Sistem Persamaan Linear
                        </h3>
                        <Badge className="bg-green-100 text-green-800">Telah Selesai</Badge>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Tanggal: 18 Juli 2025</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Waktu: 08:00 - 09:30</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Kehadiran: 21/25 hadir (84%)</span>
                          </div>
                        </div>
                        
                        <h4 className="font-medium mb-3">Materi Pertemuan</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <Link href="/dashboard-teacher/materials/m4">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-[#C40503]/10 p-2 rounded-md">
                                    <FileText className="h-6 w-6 text-[#C40503]" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Modul Sistem Persamaan Linear</h5>
                                    <p className="text-sm text-gray-500">PDF - 2.8 MB</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                          <Link href="/dashboard-teacher/materials/m5">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-[#DAA625]/10 p-2 rounded-md">
                                    <svg className="h-6 w-6 text-[#DAA625]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Presentasi Metode Eliminasi dan Substitusi</h5>
                                    <p className="text-sm text-gray-500">PowerPoint - 3.5 MB</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" className="text-[#C40503]">
                            Lihat Kehadiran
                          </Button>
                          <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                            Edit Pertemuan
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pertemuan 3 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="flex justify-between items-center p-4 bg-[#C40503]/5 border-b">
                        <h3 className="text-lg font-medium flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Pertemuan 3 - Determinan dan Matriks Invers
                        </h3>
                        <Badge className="bg-blue-100 text-blue-800">Hari Ini</Badge>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Tanggal: 25 Juli 2025</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Waktu: 08:00 - 09:30</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Kehadiran: Belum dimulai</span>
                          </div>
                        </div>
                        
                        <h4 className="font-medium mb-3">Materi Pertemuan</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <Link href="/dashboard-teacher/materials/m6">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-[#C40503]/10 p-2 rounded-md">
                                    <FileText className="h-6 w-6 text-[#C40503]" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Modul Determinan dan Matriks Invers</h5>
                                    <p className="text-sm text-gray-500">PDF - 3.4 MB</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                          <Link href="/dashboard-teacher/materials/m7">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-[#DAA625]/10 p-2 rounded-md">
                                    <svg className="h-6 w-6 text-[#DAA625]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Presentasi Metode Cramer</h5>
                                    <p className="text-sm text-gray-500">PowerPoint - 2.9 MB</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                          <Link href="/dashboard-teacher/materials/m8">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-blue-100 p-2 rounded-md">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Latihan Soal Determinan</h5>
                                    <p className="text-sm text-gray-500">PDF - 1.8 MB</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" className="text-[#C40503]">
                            Lihat Kehadiran
                          </Button>
                          <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                            Edit Pertemuan
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pertemuan 4 - Mendatang */}
                    <div className="border rounded-lg overflow-hidden border-dashed">
                      <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
                        <h3 className="text-lg font-medium flex items-center text-gray-600">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Pertemuan 4 - Nilai Eigen dan Vektor Eigen
                        </h3>
                        <Badge className="bg-gray-100 text-gray-800">Mendatang</Badge>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Tanggal: 1 Agustus 2025</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Waktu: 08:00 - 09:30</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span>Kehadiran: Belum dimulai</span>
                          </div>
                        </div>
                        
                        <h4 className="font-medium mb-3">Materi Pertemuan</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <Link href="/dashboard-teacher/materials/m9">
                            <Card className="cursor-pointer hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="bg-[#C40503]/10 p-2 rounded-md">
                                    <FileText className="h-6 w-6 text-[#C40503]" />
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Modul Nilai dan Vektor Eigen</h5>
                                    <p className="text-sm text-gray-500">PDF - 2.6 MB</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </div>
                        
                        <div className="mt-4 flex justify-end gap-2">
                          <Button className="bg-[#C40503] hover:bg-[#a60402] text-white">
                            Edit Pertemuan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
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
