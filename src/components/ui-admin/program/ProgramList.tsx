"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  BookOpen,
  Users,
  GraduationCap,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  UserPlus,
  Clock,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Program } from "@/types/program";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProgramList() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    // Dummy data, replace with API call
    setPrograms([
      {
        id: "1",
        title: "English Learning Program",
        description: "Program bahasa Inggris untuk semua jenjang.",
        level: "UMUM",
        image: "/picprogram/bahasainggris.png",
        status: "ACTIVE",
        courses: [
          "Basic English",
          "Intermediate English",
          "Advanced English",
        ],
        start_date: "2025-01-01",
        end_date: "2025-12-31",
        created_at: "2024-07-01",
        updated_at: "2024-07-02",
        student_count: 120,
        teacher_count: 5,
      },
      {
        id: "2",
        title: "Mathematics Excellence Program",
        description: "Program Matematika untuk SD-SMP.",
        level: "SD/SMP",
        image: "/picprogram/matematika.png",
        status: "ACTIVE",
        courses: ["Matematika Dasar", "Matematika Lanjutan"],
        start_date: "2025-01-01",
        end_date: "2025-12-31",
        created_at: "2024-07-01",
        updated_at: "2024-07-02",
        student_count: 80,
        teacher_count: 3,
      },
      {
        id: "3",
        title: "Science Discovery Program",
        description: "Program sains untuk anak-anak.",
        level: "SD",
        image: "/picprogram/science.png",
        status: "INACTIVE",
        courses: ["Science Basic"],
        start_date: "2025-01-01",
        end_date: "2025-12-31",
        created_at: "2024-07-01",
        updated_at: "2024-07-02",
        student_count: 30,
        teacher_count: 2,
      },
    ]);
    setLoading(false);
  }, []);

  const filtered = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    if (status === "ACTIVE")
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    if (status === "INACTIVE")
      return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
    return <Badge>{status}</Badge>;
  };

  // Add handlers
  const handleDetail = (program: Program) => {
    console.log("View details:", program);
    // TODO: Implement detail view
  };

  const handleEdit = (program: Program) => {
    console.log("Edit program:", program);
    // TODO: Implement edit functionality
  };

  const handleDelete = (program: Program) => {
    console.log("Delete program:", program);
    // TODO: Implement delete functionality
  };

  // Filter options by status
  const filterPrograms = (programs: Program[]) => {
    if (statusFilter === 'all') return programs;
    return programs.filter(p => p.status === statusFilter);
  };

  const filteredPrograms = filterPrograms(
    programs.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    )
  ).sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.title.localeCompare(b.title);
      case "status":
        return a.status.localeCompare(b.status);
      case "students":
        return b.student_count - a.student_count;
      case "teachers":
        return b.teacher_count - a.teacher_count;
      default:
        return 0;
    }
  });

  // Calculate statistics
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === 'ACTIVE').length;
  const newPrograms = programs.filter(p => {
    // Mock: programs created in last 30 days
    return Math.random() > 0.7; // Random for demo
  }).length;
  const pendingPrograms = programs.filter(p => p.status === 'INACTIVE').length;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#C40001]">Program Management</h1>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
            <span>Dashboard</span>
            <span className="text-gray-400">/</span>
            <span>Program Management</span>
          </div>
        </div>
        <Button className="bg-[#C40001] hover:bg-[#a30300] text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Program
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#C40001]"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Programs</p>
              <p className="text-2xl font-bold mt-1">{totalPrograms}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-[#C40001]"></span>
                Total program accounts
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
              <p className="text-sm font-medium text-gray-500">Active Programs</p>
              <p className="text-2xl font-bold mt-1">{activePrograms}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-[#DAA625]"></span>
                {Math.round((activePrograms / totalPrograms) * 100)}% of programs are active
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
              <p className="text-sm font-medium text-gray-500">New Programs (30d)</p>
              <p className="text-2xl font-bold mt-1">{newPrograms}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
                {Math.round((newPrograms / totalPrograms) * 100)}% growth in 30 days
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
              <p className="text-sm font-medium text-gray-500">Pending Programs</p>
              <p className="text-2xl font-bold mt-1">{pendingPrograms}</p>
              <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-600"></span>
                Programs waiting for approval
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Program Management Section */}
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <div className="h-1 w-full bg-[#C40001]"></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#C40001]">Program Management</h2>
              <div className="text-sm text-gray-500 flex items-center gap-1.5 mt-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C40001]"></span>
                Manage all program accounts in the system
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search programs by name, description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

      {/* Program Grid Section */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="px-4 pt-4 overflow-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C40503]"></div>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700">Tidak ada program ditemukan</h3>
              <p className="text-sm text-gray-500 mt-2">Silakan ubah filter atau kata kunci pencarian Anda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((p) => (
                <Card key={p.id} className="group overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                  {/* Program Banner */}
                  <div className="h-1 w-full bg-[#C40001]"></div>
                  
                  {/* Program Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {p.image ? (
                      <>
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Multiple layer gradient for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-gray-300" />
                      </div>
                    )}
                    {/* Title and description with improved positioning */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Status badge at top */}
                      <div className="self-end">
                        {p.status === "ACTIVE" ? (
                          <Badge className="bg-green-100 text-green-800 border-green-200 font-medium px-3 py-1">
                            Aktif
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800 border-gray-200 font-medium px-3 py-1">
                            Non-Aktif
                          </Badge>
                        )}
                      </div>
                      {/* Title and description at bottom */}
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-lg leading-tight">{p.title}</h3>
                        <p className="text-sm text-white/90 line-clamp-2 drop-shadow-lg leading-relaxed max-w-[95%]">{p.description}</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Statistics with improved layout */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-[#C40503]">{p.courses.length}</p>
                        <p className="text-xs text-gray-500">Kursus</p>
                      </div>
                      <div className="text-center border-x border-gray-100">
                        <p className="text-lg font-semibold text-[#DAA625]">{p.student_count}</p>
                        <p className="text-xs text-gray-500">Siswa</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-[#C40503]">{p.teacher_count}</p>
                        <p className="text-xs text-gray-500">Guru</p>
                      </div>
                    </div>

                    {/* Program details with improved spacing */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#DAA625]" />
                        <span className="text-sm text-gray-600">
                          {p.start_date} - {p.end_date}
                        </span>
                      </div>

                      {/* Level badge */}
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-[#C40503]" />
                        <Badge variant="outline" className="bg-red-50 text-[#C40503] border-red-100">
                          Level: {p.level}
                        </Badge>
                      </div>

                      {/* Course badges */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {p.courses.slice(0, 3).map((course, i) => (
                          <Badge key={i} variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors">
                            {course}
                          </Badge>
                        ))}
                        {p.courses.length > 3 && (
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                            +{p.courses.length - 3} lainnya
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action buttons with improved styling */}
                    <div className="flex justify-between items-center gap-2 mt-4 pt-4 border-t">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDetail(p)}
                        className="text-[#C40503] hover:text-[#A30402] hover:bg-red-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEdit(p)}
                          className="border-[#DAA625] text-[#DAA625] hover:text-[#DAA625] hover:bg-amber-50"
                        >
                          <Edit2 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(p)}
                          className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}