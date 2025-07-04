"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, MoreHorizontal, Users, Calendar, BookOpen, GraduationCap } from "lucide-react";

// Dummy type, replace with your actual type
interface Class {
  id: string;
  class_name: string;
  schedule: string;
  capacity: number;
  current_enrollment: number;
  teacher_name: string;
  course_name: string;
  program_name: string;
  status: "ACTIVE" | "INACTIVE" | "COMPLETED" | "DRAFT";
  room?: string;
}

export function ClassList() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy data, replace with API call
    const dummyClasses: Class[] = [
      {
        id: "1",
        class_name: "English Beginner A1",
        schedule: "Mon, Wed, Fri - 09:00-11:00",
        capacity: 20,
        current_enrollment: 15,
        teacher_name: "John Smith",
        course_name: "Basic English",
        program_name: "English Learning Program",
        status: "ACTIVE",
        room: "A1",
      },
      {
        id: "2",
        class_name: "Mathematics Advanced",
        schedule: "Tue, Thu - 14:00-16:00",
        capacity: 15,
        current_enrollment: 12,
        teacher_name: "Sarah Johnson",
        course_name: "Advanced Mathematics",
        program_name: "Mathematics Excellence Program",
        status: "ACTIVE",
        room: "B2",
      },
    ];
    setClasses(dummyClasses);
    setLoading(false);
  }, []);

  const filteredClasses = classes.filter(
    (cls) =>
      cls.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.course_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants: any = {
      ACTIVE: "bg-green-100 text-green-800",
      INACTIVE: "bg-gray-100 text-gray-800",
      COMPLETED: "bg-blue-100 text-blue-800",
      DRAFT: "bg-yellow-100 text-yellow-800",
    };
    return variants[status] || variants.DRAFT;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Class statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#C40503]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Kelas</p>
              <p className="text-2xl font-bold mt-1">{classes.length}</p>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <Calendar className="h-5 w-5 text-[#C40503]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Kelas Aktif</p>
              <p className="text-2xl font-bold mt-1">{classes.filter(c => c.status === "ACTIVE").length}</p>
            </div>
            <div className="p-3 rounded-full bg-amber-50">
              <BookOpen className="h-5 w-5 text-[#DAA625]" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Siswa</p>
              <p className="text-2xl font-bold mt-1">{classes.reduce((a, c) => a + c.current_enrollment, 0)}</p>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <Users className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#DAA625] to-[#C40503]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Kapasitas Total</p>
              <p className="text-2xl font-bold mt-1">{classes.reduce((a, c) => a + c.capacity, 0)}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <GraduationCap className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Classes Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold text-lg">Daftar Kelas</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari kelas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-medium">Nama Kelas</TableHead>
              <TableHead className="font-medium">Kursus/Program</TableHead>
              <TableHead className="font-medium">Pengajar</TableHead>
              <TableHead className="font-medium">Jadwal</TableHead>
              <TableHead className="font-medium">Kapasitas</TableHead>
              <TableHead className="font-medium">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClasses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-300 mb-3" />
                    <p>Tidak ada kelas yang ditemukan</p>
                    <p className="text-sm">Coba kata kunci pencarian lain atau tambahkan kelas baru</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredClasses.map((classData) => (
                <TableRow key={classData.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-[#C40503]">{classData.class_name}</div>
                      {classData.room && (
                        <div className="text-sm text-gray-500">
                          <span className="inline-flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Ruang {classData.room}
                          </span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{classData.course_name}</div>
                      <div className="text-xs text-[#DAA625] font-medium">{classData.program_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        {classData.teacher_name.charAt(0)}
                      </div>
                      <span>{classData.teacher_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-gray-400 mr-1" />
                      {classData.schedule}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span>{classData.current_enrollment}/{classData.capacity}</span>
                        <span className="text-xs text-gray-500">
                          {Math.round((classData.current_enrollment / classData.capacity) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            (classData.current_enrollment / classData.capacity) > 0.8
                              ? "bg-[#C40503]"
                              : (classData.current_enrollment / classData.capacity) > 0.5
                              ? "bg-[#DAA625]"
                              : "bg-green-500"
                          }`}
                          style={{
                            width: `${(classData.current_enrollment / classData.capacity) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {classData.status === "ACTIVE" ? (
                      <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">
                        Aktif
                      </Badge>
                    ) : classData.status === "COMPLETED" ? (
                      <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors">
                        Selesai
                      </Badge>
                    ) : classData.status === "DRAFT" ? (
                      <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors">
                        Draft
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors">
                        Non-Aktif
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
