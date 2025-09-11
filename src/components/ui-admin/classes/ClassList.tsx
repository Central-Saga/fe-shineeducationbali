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
import { PlusCircle, Search, MoreHorizontal, Users, Calendar, BookOpen, GraduationCap, ChevronLeft, ChevronRight, UserPlus, Clock, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Header } from "@/components/ui-admin/layout";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");

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
      (cls.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.course_name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || cls.status === statusFilter.toUpperCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentClasses = filteredClasses.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

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

  // Calculate statistics
  const totalClasses = classes.length;
  const activeClasses = classes.filter(cls => cls.status === "ACTIVE").length;
  const newClasses = classes.filter(cls => {
    // Mock: classes created in last 30 days
    return Math.random() > 0.7; // Random for demo
  }).length;
  const pendingClasses = classes.filter(cls => cls.status === "DRAFT").length;

  return (
    <Header
      header={{
        title: "Class Management",
        description: "Kelola semua kelas dalam sistem",
        actions: [
          {
            label: "Add New Class",
            href: "/dashboard/class/add",
            icon: <UserPlus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#C40001]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Classes</p>
              <p className="text-2xl font-bold mt-1">{totalClasses}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-[#C40001]"></span>
                Total class accounts
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <Calendar className="h-5 w-5 text-[#C40001]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Classes</p>
              <p className="text-2xl font-bold mt-1">{activeClasses}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-[#DAA625]"></span>
                {Math.round((activeClasses / totalClasses) * 100)}% of classes are active
              </div>
            </div>
            <div className="p-3 rounded-full bg-amber-50">
              <BookOpen className="h-5 w-5 text-[#DAA625]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-blue-600"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Classes (30d)</p>
              <p className="text-2xl font-bold mt-1">{newClasses}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                {Math.round((newClasses / totalClasses) * 100)}% growth in 30 days
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <UserPlus className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-purple-600"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Classes</p>
              <p className="text-2xl font-bold mt-1">{pendingClasses}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-600"></span>
                Classes waiting for approval
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Class Management Section */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="h-1 w-full bg-[#C40001]"></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#C40001]">Class Management</h2>
              <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C40001]"></span>
                Manage all class accounts in the system
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search classes by name, teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-4 flex-wrap">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Class Table Section */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6">
          <div className="rounded-md border">
            <Table>
          <TableHeader className="bg-gray-50/80">
            <TableRow className="hover:bg-gray-50/90">
              <TableHead className="w-[60px] text-center font-medium text-gray-700">No</TableHead>
              <TableHead className="w-[200px] font-medium text-gray-700">Nama Kelas</TableHead>
              <TableHead className="w-[180px] font-medium text-gray-700">Kursus/Program</TableHead>
              <TableHead className="w-[150px] font-medium text-gray-700">Pengajar</TableHead>
              <TableHead className="w-[180px] font-medium text-gray-700">Jadwal</TableHead>
              <TableHead className="w-[120px] font-medium text-gray-700">Kapasitas</TableHead>
              <TableHead className="w-[100px] font-medium text-gray-700">Status</TableHead>
              <TableHead className="w-[120px] text-center font-medium text-gray-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentClasses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <BookOpen className="h-12 w-12 text-gray-300 mb-3" />
                    <p>Tidak ada kelas yang ditemukan</p>
                    <p className="text-sm">Coba kata kunci pencarian lain atau tambahkan kelas baru</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentClasses.map((classData, index) => (
                <TableRow key={classData.id} className="transition-colors hover:bg-gray-50/70">
                  <TableCell className="text-center font-medium text-gray-600">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <div>
                      <Link href={`/dashboard/class/${classData.id}`} className="font-medium text-[#C40503] hover:underline">
                        {classData.class_name}
                      </Link>
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
                  <TableCell className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      <Link href={`/dashboard/class/edit/${classData.id}`}>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 border-gray-300 text-[#C40503] hover:bg-[#C40503]/5"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-gray-300 text-gray-600 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          if (window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
                            // Handle delete logic here
                            alert('Fitur hapus kelas akan segera tersedia');
                          }
                        }}
                      >
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Menampilkan {startIndex + 1} sampai {Math.min(endIndex, filteredClasses.length)} dari {filteredClasses.length} kelas
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Tampilkan:</span>
              <select 
                value={itemsPerPage} 
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-[#C40001] hover:bg-[#a30300] text-white"
                        : "text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                    }
                  >
                    {page}
                  </Button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-gray-500">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className={
                      currentPage === totalPages
                        ? "bg-[#C40001] hover:bg-[#a30300] text-white"
                        : "text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
                    }
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-[#C40001] border-[#C40001]/20 hover:bg-[#C40001]/5"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </Header>
  );
}
