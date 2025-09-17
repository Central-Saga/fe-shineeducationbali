"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit2, Plus, MoreHorizontal, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Header, TableLayout } from "@/components/ui-admin/layout";
import { studentGrades } from "@/data/data-admin/grades-data/student-grades";
import { SubjectCards } from "@/components/ui-admin/grades/SubjectCards";
import { Overview } from "@/components/ui-admin/grades/Overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GradesPageContent() {
  const [grades, setGrades] = useState(studentGrades);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [levelFilter, setLevelFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Helper functions
  const getGradeLetter = (score: number): string => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'E';
  };

  const getGradeLetterClass = (score: number): string => {
    const letter = getGradeLetter(score);
    switch (letter) {
      case 'A':
        return 'bg-green-100 text-green-800';
      case 'B':
        return 'bg-[#DAA625]/10 text-[#DAA625]';
      case 'C':
        return 'bg-orange-100 text-orange-800';
      case 'D':
      case 'E':
        return 'bg-[#C40503]/10 text-[#C40503]';
      default:
        return '';
    }
  };

  const filteredGrades = grades.filter(
    (grade) =>
      (grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
       grade.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (levelFilter === "all" || grade.level === levelFilter) &&
      (subjectFilter === "all" || grade.subject === subjectFilter) &&
      (statusFilter === "all" || grade.status === statusFilter)
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredGrades.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGrades = filteredGrades.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, levelFilter, subjectFilter, statusFilter]);

  // Define columns for DataTable
  const columns: ColumnDef<typeof studentGrades[0]>[] = [
    {
      id: "no",
      header: () => <div>No</div>,
      cell: ({ row }) => {
        return <div className="font-medium text-gray-600">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "id",
      header: () => <div>ID Nilai</div>,
      cell: ({ row }) => {
        const gradeId = row.getValue("id") as string;
        return (
          <div>
            <Link href={`/dashboard/grades/detail/${gradeId}`} className="font-medium text-[#C40503] hover:underline">
              {gradeId}
            </Link>
          </div>
        );
      },
    },
    {
      accessorKey: "studentName",
      header: () => <div>Nama Siswa</div>,
      cell: ({ row }) => {
        const studentName = row.getValue("studentName") as string;
        return (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
              {studentName.charAt(0)}
            </div>
            <span>{studentName}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "subject",
      header: () => <div>Mata Pelajaran</div>,
      cell: ({ row }) => {
        const subject = row.getValue("subject") as string;
        return (
          <div>
            <div className="font-medium">{subject}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "level",
      header: () => <div>Jenjang</div>,
      cell: ({ row }) => {
        const level = row.getValue("level") as string;
        return (
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors">
            {level}
          </Badge>
        );
      },
    },
    {
      accessorKey: "averageScore",
      header: () => <div>Nilai Rata-rata</div>,
      cell: ({ row }) => {
        const score = row.getValue("averageScore") as number;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">{score}</span>
            <Badge className={getGradeLetterClass(score)}>
              {getGradeLetter(score)}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div>Aksi</div>,
      cell: ({ row }) => {
        const gradeData = row.original;
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
                  onClick={() => window.open(`/dashboard/grades/detail/${gradeData.id}`, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open(`/dashboard/grades/edit/${gradeData.id}`, '_blank')}
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (window.confirm('Apakah Anda yakin ingin menghapus nilai ini?')) {
                      // Handle delete logic here
                      alert('Fitur hapus nilai akan segera tersedia');
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

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <Header
      header={{
        title: "Grade Management",
        description: "Kelola nilai siswa dan penilaian akademik",
        actions: [
          {
            label: "Tambah Nilai",
            href: "/dashboard/grades/add",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      {/* Overview Cards */}
      <Overview />

      {/* Grade Management Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 rounded-lg">
          <TabsTrigger 
            value="all"
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white px-6 py-2"
          >
            Grade List
          </TabsTrigger>
          <TabsTrigger 
            value="subjects"
            className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white px-6 py-2"
          >
            By Subject
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <TableLayout
            title="Student Grades Table"
            description="Kelola dan lihat daftar nilai siswa"
            data={currentGrades}
            columns={columns}
            searchQuery={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Cari nama siswa atau ID nilai..."
            filters={[
              {
                key: "level",
                label: "Jenjang",
                value: levelFilter,
                onChange: setLevelFilter,
                options: [
                  { value: "all", label: "Semua Jenjang" },
                  { value: "TK", label: "TK" },
                  { value: "SD", label: "SD" },
                  { value: "SMP", label: "SMP" },
                  { value: "SMA/SMK", label: "SMA/SMK" },
                  { value: "UMUM", label: "Umum" },
                ],
              },
              {
                key: "subject",
                label: "Mata Pelajaran",
                value: subjectFilter,
                onChange: setSubjectFilter,
                options: [
                  { value: "all", label: "Semua Mata Pelajaran" },
                  { value: "Bahasa Inggris", label: "Bahasa Inggris" },
                  { value: "Komputer", label: "Komputer" },
                ],
              },
              {
                key: "status",
                label: "Status",
                value: statusFilter,
                onChange: setStatusFilter,
                options: [
                  { value: "all", label: "Semua Status" },
                  { value: "SELESAI", label: "Sudah Dinilai" },
                  { value: "DRAFT", label: "Draft" },
                  { value: "PENDING", label: "Belum Dinilai" },
                ],
              },
            ]}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredGrades.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            showStats={false}
            showSearch={true}
            showFilters={true}
            showPagination={true}
          />
        </TabsContent>

        <TabsContent value="subjects">
          <SubjectCards />
        </TabsContent>
      </Tabs>
    </Header>
  );
}
