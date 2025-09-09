    "use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [activeFilter, setActiveFilter] = useState<string>("all");

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
    if (activeFilter === 'all') return programs;
    if (activeFilter === 'active') return programs.filter(p => p.status === 'ACTIVE');
    if (activeFilter === 'inactive') return programs.filter(p => p.status === 'INACTIVE');
    return programs;
  };

  const filteredPrograms = filterPrograms(
    programs.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
        <Button 
          variant={activeFilter === 'all' ? "default" : "outline"} 
          onClick={() => setActiveFilter('all')}
          className={activeFilter === 'all' ? "bg-[#C40503] hover:bg-[#A60000]" : ""}
        >
          Semua Program
        </Button>
        <Button 
          variant={activeFilter === 'active' ? "default" : "outline"} 
          onClick={() => setActiveFilter('active')}
          className={activeFilter === 'active' ? "bg-[#C40503] hover:bg-[#A60000]" : ""}
        >
          Program Aktif
        </Button>
        <Button 
          variant={activeFilter === 'inactive' ? "default" : "outline"} 
          onClick={() => setActiveFilter('inactive')}
          className={activeFilter === 'inactive' ? "bg-[#C40503] hover:bg-[#A60000]" : ""}
        >
          Program Non-Aktif
        </Button>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-[#C40503] "></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium ">Total Program</CardTitle>
            <div className="p-2 rounded-full bg-red-50">
              <BookOpen className="h-4 w-4 text-[#C40503]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">{programs.length}</div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            <div className="p-2 rounded-full bg-amber-50">
              <Users className="h-4 w-4 text-[#DAA625]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">
              {programs.reduce((a, b) => a + b.student_count, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-[#C40001]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
            <div className="p-2 rounded-full bg-red-50">
              <GraduationCap className="h-4 w-4 text-[#C40001]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">
              {programs.reduce((a, b) => a + b.teacher_count, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 py-3">
            <CardTitle className="text-sm font-medium">Total Kursus</CardTitle>
            <div className="p-2 rounded-full bg-amber-50">
              <BookOpen className="h-4 w-4 text-[#DAA625]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold pb-5">
              {programs.reduce((a, b) => a + b.courses.length, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Program Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-10 bg-white rounded-lg border border-gray-200 shadow-sm">
            <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700">Tidak ada program ditemukan</h3>
            <p className="text-sm text-gray-500 mt-2">Silakan ubah filter atau kata kunci pencarian Anda</p>
          </div>
        ) : (
          filteredPrograms.map((p) => (
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
          ))
        )}
      </div>
    </div>
  );
}
