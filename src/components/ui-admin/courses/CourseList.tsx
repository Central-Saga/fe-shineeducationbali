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
import { MoreHorizontal, Pencil, Trash, Eye, ChevronLeft, ChevronRight } from "lucide-react";

export function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
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

    setFilteredCourses(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedCategory, selectedLevel, selectedTeacher]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#C40001]">Daftar Kursus</h2>
          <p className="text-muted-foreground">
            Kelola kursus dan program pembelajaran
          </p>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)}
          className="bg-[#C40001] hover:bg-[#a30300] text-white"
        >
          Tambah Kursus
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Cari kursus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 flex-wrap">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="Matematika">Matematika</SelectItem>
              <SelectItem value="IPA">IPA</SelectItem>
              <SelectItem value="Bahasa Inggris">Bahasa Inggris</SelectItem>
              <SelectItem value="IPS">IPS</SelectItem>
              <SelectItem value="Bahasa Indonesia">Bahasa Indonesia</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Level</SelectItem>
              <SelectItem value="SD">SD</SelectItem>
              <SelectItem value="SMP">SMP</SelectItem>
              <SelectItem value="SMA">SMA</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pengajar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Pengajar</SelectItem>
              {teachers.map((teacher) => (
                <SelectItem key={teacher} value={teacher}>
                  {teacher}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
