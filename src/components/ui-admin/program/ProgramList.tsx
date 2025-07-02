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

  return (
    <div className="space-y-6">
      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Program</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.reduce((a, b) => a + b.student_count, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.reduce((a, b) => a + b.teacher_count, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kursus</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {programs.reduce((a, b) => a + b.courses.length, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Add */}
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari program..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button className="bg-[#C40503] hover:bg-[#A30402]">
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Program
        </Button>
      </div>

      {/* Program Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-10 bg-white rounded-lg border">
            <div className="text-gray-400">Tidak ada data program.</div>
          </div>
        ) : (
          filtered.map((p) => (
            <Card key={p.id} className="group overflow-hidden hover:shadow-md transition-all duration-300">
              {/* Program Image Container - Remove default Card padding */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                {p.image ? (
                  <div className="relative h-full">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Improved gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4">
                      {/* Status badge */}
                      <div className="self-end">
                        {getStatusBadge(p.status)}
                      </div>
                      {/* Title and description */}
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg leading-tight">{p.title}</h3>
                        <p className="text-sm text-white/90 line-clamp-2 drop-shadow-lg leading-relaxed max-w-[90%]">{p.description}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-gray-300" />
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                {/* Statistics with improved layout */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-primary">{p.courses.length}</p>
                    <p className="text-xs text-muted-foreground">Kursus</p>
                  </div>
                  <div className="text-center border-x">
                    <p className="text-lg font-semibold text-primary">{p.student_count}</p>
                    <p className="text-xs text-muted-foreground">Siswa</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-primary">{p.teacher_count}</p>
                    <p className="text-xs text-muted-foreground">Guru</p>
                  </div>
                </div>

                {/* Program details with improved spacing */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {p.start_date} - {p.end_date}
                    </span>
                  </div>

                  {/* Level and Course badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-primary/5">
                      Level: {p.level}
                    </Badge>
                    {p.courses.slice(0, 3).map((course, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                    {p.courses.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{p.courses.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action buttons with improved spacing */}
                <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t">
                  <Button variant="ghost" size="sm" onClick={() => handleDetail(p)}>
                    <Eye className="h-4 w-4 mr-1" />
                    Detail
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(p)}>
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(p)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
