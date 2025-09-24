"use client";

import { useState, useMemo, useEffect } from "react";
import { Plus, Users, BookOpen, TrendingUp, Clock, Eye, Edit, Trash2, MoreHorizontal, PencilIcon } from "lucide-react";
import { programsData, Program } from "@/data/data-admin/program-data/program-data";
import { Header, TableLayout } from "@/components/ui-admin/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProgramManagement() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [educationLevelFilter, setEducationLevelFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from program data
    setPrograms(programsData);
    setLoading(false);
  }, []);

  // Define columns directly in the component
  const columns: ColumnDef<Program>[] = [
    {
      id: "no",
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: () => <div>Nama Program</div>,
      cell: ({ row }) => {
        const program = row.original;
        return (
          <div className="space-y-1">
            <div className="font-medium text-gray-900">{program.name}</div>
            <div className="text-sm text-gray-500 line-clamp-2">
              {program.description}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <div>Kategori</div>,
      cell: ({ row }) => {
        const category = row.getValue("category") as string;
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {category}
          </Badge>
        );
      },
    },
    {
      accessorKey: "level",
      header: () => <div>Level</div>,
      cell: ({ row }) => {
        const level = row.getValue("level") as string;
        const getLevelBadgeColor = (level: string) => {
          switch (level) {
            case "beginner": return "bg-green-100 text-green-800 border-green-200";
            case "intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "advanced": return "bg-red-100 text-red-800 border-red-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
          }
        };
        
        const getLevelLabel = (level: string) => {
          switch (level) {
            case "beginner": return "Pemula";
            case "intermediate": return "Menengah";
            case "advanced": return "Lanjutan";
            default: return level;
          }
        };

        return (
          <Badge variant="outline" className={getLevelBadgeColor(level)}>
            {getLevelLabel(level)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "educationLevel",
      header: () => <div>Jenjang Pendidikan</div>,
      cell: ({ row }) => {
        const educationLevel = row.getValue("educationLevel") as string;
        const getEducationLevelBadgeColor = (level: string) => {
          switch (level) {
            case "SD": return "bg-blue-100 text-blue-800 border-blue-200";
            case "SMP": return "bg-purple-100 text-purple-800 border-purple-200";
            case "SMA/SMK": return "bg-indigo-100 text-indigo-800 border-indigo-200";
            case "UMUM": return "bg-gray-100 text-gray-800 border-gray-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
          }
        };

        return (
          <Badge variant="outline" className={getEducationLevelBadgeColor(educationLevel)}>
            {educationLevel}
          </Badge>
        );
      },
    },
    {
      accessorKey: "duration",
      header: () => <div>Durasi</div>,
      cell: ({ row }) => {
        const duration = row.getValue("duration") as number;
        return (
          <div className="text-sm font-medium text-gray-900">
            {duration} minggu
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: () => <div>Status</div>,
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge 
            variant={isActive ? "default" : "secondary"}
            className={isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"}
          >
            {isActive ? "Aktif" : "Tidak Aktif"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Aksi</div>,
      cell: ({ row }) => {
        const program = row.original;
        
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                  onClick={() => window.location.href = `/dashboard/program/detail/${program.id}`}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.location.href = `/dashboard/program/edit/${program.id}`}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin menghapus program ini?')) {
                      // Handle delete logic here
                      alert('Fitur hapus program akan segera tersedia');
                    }
                  }}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  // Filter programs based on search and filters
  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || program.level === levelFilter;
    const matchesCategory = categoryFilter === "all" || program.category === categoryFilter;
    const matchesEducationLevel = educationLevelFilter === "all" || program.educationLevel === educationLevelFilter;
    
    return matchesSearch && matchesLevel && matchesCategory && matchesEducationLevel;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPrograms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrograms = filteredPrograms.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, levelFilter, categoryFilter, educationLevelFilter]);

  // Statistics
  const stats = [
    {
      title: "Total Program",
      value: programs.length,
      description: "Semua program",
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Program Aktif",
      value: programs.filter(p => p.isActive).length,
      description: "Sedang berjalan",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      color: "bg-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Kategori",
      value: new Set(programs.map(p => p.category)).size,
      description: "Jenis program",
      icon: <Users className="h-5 w-5 text-yellow-600" />,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50"
    },
    {
      title: "Rata-rata Durasi",
      value: `${Math.round(programs.reduce((acc, p) => acc + p.duration, 0) / programs.length)} minggu`,
      description: "Durasi program",
      icon: <Clock className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  // Filters
  const filters = [
    {
      key: "level",
      label: "Level",
      value: levelFilter,
      onChange: setLevelFilter,
      options: [
        { value: "all", label: "Semua Level" },
        { value: "beginner", label: "Pemula" },
        { value: "intermediate", label: "Menengah" },
        { value: "advanced", label: "Lanjutan" }
      ]
    },
    {
      key: "educationLevel",
      label: "Jenjang Pendidikan",
      value: educationLevelFilter,
      onChange: setEducationLevelFilter,
      options: [
        { value: "all", label: "Semua Jenjang" },
        { value: "SD", label: "SD" },
        { value: "SMP", label: "SMP" },
        { value: "SMA/SMK", label: "SMA/SMK" },
        { value: "UMUM", label: "UMUM" }
      ]
    },
    {
      key: "category",
      label: "Kategori",
      value: categoryFilter,
      onChange: setCategoryFilter,
      options: [
        { value: "all", label: "Semua Kategori" },
        { value: "Bahasa", label: "Bahasa" },
        { value: "Matematika", label: "Matematika" },
        { value: "Dasar", label: "Dasar" },
        { value: "Teknologi", label: "Teknologi" }
      ]
    }
  ];

  // Header actions
  const headerActions = [
    {
      label: "Tambah Program",
      href: "/dashboard/program/add",
      icon: <Plus className="h-4 w-4" />,
      variant: "default" as const
    }
  ];

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <Header
      header={{
        title: "Manajemen Program",
        description: "Kelola program pembelajaran yang tersedia",
        actions: headerActions
      }}
    >
      <TableLayout
        title="Daftar Program"
        description="Kelola dan pantau semua program pembelajaran"
        data={currentPrograms}
        columns={columns}
        searchQuery={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Cari program..."
        filters={filters}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredPrograms.length}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        stats={stats}
        showStats={true}
        showSearch={true}
        showFilters={true}
        showPagination={true}
      />
    </Header>
  );
}

