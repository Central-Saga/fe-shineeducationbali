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
import { MoreHorizontal, Pencil, Trash, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [filteredCourses, setFilteredCourses] = useState(coursesData);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Get unique lists for filters
  const categories = useMemo(() => {
    return Array.from(new Set(coursesData.map((course) => course.category))).sort();
  }, []);

  const teachers = useMemo(() => {
    return Array.from(new Set(coursesData.map((course) => course.teacher))).sort();
  }, []);

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, { bg: string; text: string; gradient: string }> = {
      "Matematika": { 
        bg: "bg-blue-100", 
        text: "text-blue-700",
        gradient: "from-blue-500 to-blue-700"
      },
      "IPA": { 
        bg: "bg-green-100", 
        text: "text-green-700",
        gradient: "from-green-500 to-teal-600" 
      },
      "Bahasa Inggris": { 
        bg: "bg-purple-100", 
        text: "text-purple-700",
        gradient: "from-purple-500 to-purple-700" 
      },
      "Bahasa Indonesia": { 
        bg: "bg-red-100", 
        text: "text-red-700",
        gradient: "from-red-500 to-red-700" 
      },
      "IPS": { 
        bg: "bg-amber-100", 
        text: "text-amber-700",
        gradient: "from-amber-500 to-amber-700" 
      }
    };

    return colorMap[category] || { bg: "bg-gray-100", text: "text-gray-700", gradient: "from-gray-500 to-gray-700" };
  };

  const getLevelIcon = (level: string) => {
    switch(level) {
      case "SD":
        return "📚"; // Elementary book icon
      case "SMP":
        return "📘"; // Middle school book icon
      case "SMA":
        return "🎓"; // High school graduation icon
      default:
        return "📖"; // Default book icon
    }
  };

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
  }, [searchQuery, selectedCategory, selectedLevel, selectedTeacher]);

  return (
    <div className="space-y-8 px-6 py-10 max-w-[90rem] mx-auto bg-gradient-to-b from-white to-gray-50/30">
      {/* Header with breadcrumbs like UsersManagement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Daftar Kursus
          </h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <Link href="/dashboard" className="hover:text-[#C40503] transition-colors">
              Dashboard
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/dashboard/courses" className="hover:text-[#C40503] transition-colors">
              Manajemen Kursus
            </Link>
          </div>
        </div>
        <Button 
          onClick={() => setDialogOpen(true)} 
          className="bg-gradient-to-r from-[#C40503] to-[#DAA625] hover:from-[#a30300] hover:to-[#b58a1f] shadow-sm transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Tambah Kursus
        </Button>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-white">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#C40503] to-[#C40503]/70"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Total Kursus</CardTitle>
            <div className="p-2.5 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#C40503]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{coursesData.length}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#C40503]"></span>
              Total kursus tersedia
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-white">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#DAA625] to-[#DAA625]/70"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Kursus Aktif</CardTitle>
            <div className="p-2.5 rounded-full bg-amber-50 hover:bg-amber-100 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#DAA625]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{coursesData.filter(course => course.status === "ACTIVE").length}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-[#DAA625]"></span>
              {Math.round((coursesData.filter(course => course.status === "ACTIVE").length / coursesData.length) * 100)}% kursus aktif
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-white">
          <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 to-blue-500/70"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Jumlah Siswa</CardTitle>
            <div className="p-2.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{coursesData.reduce((sum, course) => sum + course.totalStudents, 0)}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
              Total siswa di semua kursus
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-none shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 bg-white">
          <div className="h-1.5 w-full bg-gradient-to-r from-green-500 to-green-500/70"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-4">
            <CardTitle className="text-sm font-medium">Pengajar</CardTitle>
            <div className="p-2.5 rounded-full bg-green-50 hover:bg-green-100 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold pb-2">{teachers.length}</div>
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
              Pengajar aktif
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Search and Filter Panel */}
      <Card className="shadow-md border-none overflow-hidden hover:shadow-lg transition-all duration-300">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
        <CardHeader className="pb-3 pt-5 bg-gradient-to-br from-white to-red-50/10">
          <div className="flex flex-col lg:flex-row lg:justify-between space-y-4 lg:space-y-0 lg:items-center">
            <div>
              <CardTitle className="mb-1.5 font-bold text-gray-800">Filter Kursus</CardTitle>
              <CardDescription className="text-sm text-gray-500 flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></span>
                Cari dan filter kursus berdasarkan kategori, level, atau pengajar
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-5 pt-0">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-1/2 relative">
                <Input
                  placeholder="Cari kursus, kategori, atau pengajar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 border-gray-200 focus-visible:border-[#C40503]/30 focus-visible:ring-[#C40503]/20 transition-all hover:border-gray-300"
                />
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="flex items-center ml-auto gap-2">
                <span className="text-sm text-gray-500">Tampilan:</span>
                <div className="flex bg-gray-100 rounded-md p-1">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded ${viewMode === "grid" 
                      ? "bg-white text-[#C40503] shadow-sm" 
                      : "text-gray-500"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setViewMode("table")}
                    className={`p-1.5 rounded ${viewMode === "table" 
                      ? "bg-white text-[#C40503] shadow-sm" 
                      : "text-gray-500"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] border-gray-200">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[150px] border-gray-200">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Level</SelectItem>
                  <SelectItem value="SD">
                    <div className="flex items-center gap-2">
                      <span>📚</span> SD
                    </div>
                  </SelectItem>
                  <SelectItem value="SMP">
                    <div className="flex items-center gap-2">
                      <span>📘</span> SMP
                    </div>
                  </SelectItem>
                  <SelectItem value="SMA">
                    <div className="flex items-center gap-2">
                      <span>🎓</span> SMA
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                <SelectTrigger className="w-[220px] border-gray-200">
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

              {/* Filter indicators */}
              {(selectedCategory !== "all" || selectedLevel !== "all" || selectedTeacher !== "all") && (
                <div className="flex items-center gap-2 ml-2">
                  <Button 
                    variant="ghost" 
                    className="h-8 text-xs text-gray-500 hover:text-[#C40503]"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedLevel("all");
                      setSelectedTeacher("all");
                    }}
                  >
                    Reset Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course List - Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length === 0 ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Tidak ada kursus yang ditemukan</h3>
              <p className="text-gray-500 mt-2 max-w-sm">
                Silahkan ubah filter pencarian atau tambahkan kursus baru.
              </p>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const categoryColor = getCategoryColor(course.category);
              const courseCode = `COURSE${String(course.id).padStart(3, "0")}`;
              return (
                <Card 
                  key={course.id} 
                  className="overflow-hidden border-none shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 group"
                >
                  {/* Card Accent Line Based on Category */}
                  <div className={`h-1.5 w-full ${categoryColor.bg}`}></div>
                  
                  <div className="p-5">
                    {/* Course Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1.5">{courseCode}</div>
                        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{course.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${categoryColor.bg} ${categoryColor.text}`}>
                            {course.category}
                          </Badge>
                          
                          <Badge 
                            variant="secondary"
                            className="bg-gray-100 text-gray-700 font-normal"
                          >
                            {course.level} • {course.class}
                          </Badge>
                          
                          {course.type === "Private" && (
                            <Badge className="bg-blue-100 text-blue-700">
                              Private
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Badge 
                        variant={course.status === "ACTIVE" ? "default" : "secondary"}
                        className={course.status === "ACTIVE" 
                          ? "bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800"
                        }
                      >
                        {course.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                    {/* Course Info */}
                    <div className="flex flex-col gap-3 mt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Pengajar</div>
                            <div className="text-sm font-medium text-gray-800">{course.teacher}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Siswa</div>
                            <div className="text-sm font-medium text-gray-800">{course.totalStudents}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Jadwal</div>
                          <div className="text-sm font-medium text-gray-800">{course.schedule}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                      <Button 
                        asChild
                        variant="outline" 
                        size="sm" 
                        className="text-gray-600 border-gray-200 hover:text-[#C40503] hover:border-[#C40503]/20"
                      >
                        <Link href={`/dashboard/courses/${courseCode}`}>
                          <Eye className="h-3.5 w-3.5 mr-1.5" />
                          Detail
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
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
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      )}

      {/* Course List - Table View */}
      {viewMode === "table" && (
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-[100px] font-medium">Kode</TableHead>
                <TableHead className="min-w-[220px] font-medium">Nama Kursus</TableHead>
                <TableHead className="min-w-[150px] font-medium">Kategori</TableHead>
                <TableHead className="min-w-[120px] font-medium">Level</TableHead>
                <TableHead className="min-w-[200px] font-medium">Pengajar</TableHead>
                <TableHead className="w-[100px] font-medium">Kapasitas</TableHead>
                <TableHead className="w-[100px] font-medium">Status</TableHead>
                <TableHead className="w-[100px] font-medium">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-40 text-center">
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900">Tidak ada kursus yang ditemukan</h3>
                      <p className="text-gray-500 mt-1">Silahkan ubah filter pencarian atau tambahkan kursus baru.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses.map((course) => {
                  const categoryColor = getCategoryColor(course.category);
                  const courseCode = `COURSE${String(course.id).padStart(3, "0")}`;
                  
                  return (
                    <TableRow key={course.id} className="hover:bg-gray-50/70 transition-colors">
                      <TableCell className="font-medium">{courseCode}</TableCell>
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
                      <TableCell>
                        <Badge className={`${categoryColor.bg} ${categoryColor.text}`}>
                          {course.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{getLevelIcon(course.level)}</span>
                          <span className="font-medium">{course.level}</span>
                        </div>
                      </TableCell>
                      <TableCell>{course.teacher}</TableCell>
                      <TableCell>{course.totalStudents} siswa</TableCell>
                      <TableCell>
                        <Badge
                          variant={course.status === "ACTIVE" ? "default" : "secondary"}
                          className={course.status === "ACTIVE" 
                            ? "bg-green-100 hover:bg-green-200 text-green-700 hover:text-green-800"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-800"
                          }
                        >
                          {course.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-500 hover:text-[#C40503]"
                          >
                            <Link href={`/dashboard/courses/${courseCode}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
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
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
