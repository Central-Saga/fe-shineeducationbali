"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Course } from "@/types/course";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { coursesData } from "@/data/data-admin/courses-data/courses-data";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash, Eye, ChevronLeft, ChevronRight, BookOpen, Users, UserPlus, Clock, Search, Filter } from "lucide-react";

export function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Get unique teacher list
  const teachers = useMemo(() => {
    const uniqueTeachers = Array.from(
      new Set(coursesData.map((course) => course.teacher))
    );
    return uniqueTeachers.sort();
  }, []);

  useEffect(() => {
    let filtered = coursesData;

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    if (selectedTeacher !== "all") {
      filtered = filtered.filter(
        (course) => course.teacher === selectedTeacher
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (course) => course.status === statusFilter.toUpperCase()
      );
    }

    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedLevel, selectedTeacher, statusFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  // Calculate statistics
  const totalCourses = coursesData.length;
  const activeCourses = coursesData.filter(course => course.status === "ACTIVE").length;
  const newCourses = coursesData.filter(course => {
    // Mock: courses created in last 30 days
    return Math.random() > 0.7; // Random for demo
  }).length;
  const pendingCourses = coursesData.filter(course => course.status === "DRAFT").length;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#C40001]">Course Management</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <span>Dashboard</span>
            <span className="text-gray-400">/</span>
            <span>Course Management</span>
          </div>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-[#C40001] hover:bg-[#a30300] text-white"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Course
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#C40001]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold mt-1">{totalCourses}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-[#C40001]"></span>
                Total course accounts
              </div>
            </div>
            <div className="p-3 rounded-full bg-red-50">
              <BookOpen className="h-5 w-5 text-[#C40001]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Courses</p>
              <p className="text-2xl font-bold mt-1">{activeCourses}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-[#DAA625]"></span>
                {Math.round((activeCourses / totalCourses) * 100)}% of courses are active
              </div>
            </div>
            <div className="p-3 rounded-full bg-amber-50">
              <Users className="h-5 w-5 text-[#DAA625]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-blue-600"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Courses (30d)</p>
              <p className="text-2xl font-bold mt-1">{newCourses}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                {Math.round((newCourses / totalCourses) * 100)}% growth in 30 days
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
              <p className="text-sm font-medium text-gray-500">Pending Courses</p>
              <p className="text-2xl font-bold mt-1">{pendingCourses}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-600"></span>
                Courses waiting for approval
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Course Management Section */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="h-1 w-full bg-[#C40001]"></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#C40001]">Course Management</h2>
              <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C40001]"></span>
                Manage all course accounts in the system
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search courses by name, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50/80">
            <TableRow className="hover:bg-gray-50/90">
              <TableHead className="w-[60px] text-center font-medium text-gray-700">No</TableHead>
              <TableHead className="w-[100px] font-medium text-gray-700">Kode</TableHead>
              <TableHead className="min-w-[200px] font-medium text-gray-700">Nama Kursus</TableHead>
              <TableHead className="min-w-[150px] font-medium text-gray-700">Kategori</TableHead>
              <TableHead className="min-w-[120px] font-medium text-gray-700">Level</TableHead>
              <TableHead className="min-w-[200px] font-medium text-gray-700">Pengajar</TableHead>
              <TableHead className="w-[100px] font-medium text-gray-700">Kapasitas</TableHead>
              <TableHead className="w-[100px] font-medium text-gray-700">Status</TableHead>
              <TableHead className="w-[70px] text-center font-medium text-gray-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCourses.map((course, index) => (
              <TableRow key={course.id} className="transition-colors hover:bg-gray-50/70">
                <TableCell className="text-center font-medium text-gray-600">
                  {index + 1}
                </TableCell>
                <TableCell>{`COURSE${String(course.id).padStart(
                  3,
                  "0"
                )}`}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{course.name}</span>
                    {course.type === "Private" && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        Private
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>
                  <span className="font-medium">{course.level}</span>
                </TableCell>
                <TableCell>{course.teacher}</TableCell>
                <TableCell>{course.totalStudents} siswa</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      course.status === "ACTIVE" ? "success" : "secondary"
                    }
                  >
                    {course.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/dashboard/courses/COURSE${String(
                            course.id
                          ).padStart(3, "0")}`}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Detail
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Menampilkan {startIndex + 1} sampai {Math.min(endIndex, filteredCourses.length)} dari {filteredCourses.length} kursus
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Tampilkan:</span>
              <Select value={itemsPerPage.toString()} onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
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
    </div>
  );
}
