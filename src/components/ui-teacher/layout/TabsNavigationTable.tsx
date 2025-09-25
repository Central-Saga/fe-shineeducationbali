"use client";

import React from "react";
import { TableLayout, TableColumn, commonActions } from "./TableLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  BookOpen,
  FileText,
  GraduationCap,
  Plus
} from "lucide-react";

export interface ClassDetailData {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "completed" | "in-progress" | "upcoming";
  type: "assignment" | "material" | "exam";
  progress?: number;
  totalStudents?: number;
  submittedCount?: number;
}

interface ClassDetailTableProps {
  data: ClassDetailData[];
  onEdit?: (item: ClassDetailData) => void;
  onDelete?: (item: ClassDetailData) => void;
  onView?: (item: ClassDetailData) => void;
  onExport?: () => void;
  onSearch?: (query: string) => void;
  onAdd?: () => void;
  title?: string;
  description?: string;
  addButtonText?: string;
  addButtonLink?: string;
}

export function ClassDetailTable({
  data,
  onEdit,
  onDelete,
  onView,
  onExport,
  onSearch,
  onAdd,
  title = "Detail Kelas",
  description = "Kelola tugas, materi, dan aktivitas kelas",
  addButtonText = "Tambah Data",
}: ClassDetailTableProps) {
  // Remove unused description parameter warning
  void description;
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Selesai
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Sedang Berlangsung
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Akan Datang
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="h-4 w-4 text-[#C40503]" />;
      case "material":
        return <BookOpen className="h-4 w-4 text-[#DAA625]" />;
      case "exam":
        return <GraduationCap className="h-4 w-4 text-[#C40503]" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "assignment":
        return "Tugas";
      case "material":
        return "Materi";
      case "exam":
        return "Ujian";
      default:
        return type;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Determine if this is for students based on title or data
  const isStudentTable = title?.toLowerCase().includes('siswa') || title?.toLowerCase().includes('student');

  const columns: TableColumn[] = isStudentTable ? [
    {
      key: "id",
      label: "ID",
      render: (value) => (
        <span className="font-mono text-sm text-gray-600">{String(value)}</span>
      ),
    },
    {
      key: "title",
      label: "Nama Siswa",
      render: (value) => (
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[#C40001]" />
          <span className="font-medium">{String(value)}</span>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Mata Pelajaran",
      render: (value) => (
        <span className="text-sm text-gray-600">{value as string}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: () => (
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Aktif
        </Badge>
      ),
    },
  ] : [
    {
      key: "id",
      label: "ID",
      render: (value) => (
        <span className="font-mono text-sm text-gray-600">{String(value)}</span>
      ),
    },
    {
      key: "title",
      label: "Judul",
      render: (value, row) => (
        <div className="flex items-center gap-2">
          {getTypeIcon(row.type as string)}
          <span className="font-medium">{String(value)}</span>
        </div>
      ),
    },
    {
      key: "subject",
      label: "Mata Pelajaran",
      render: (value) => (
        <span className="text-sm text-gray-600">{value as string}</span>
      ),
    },
    {
      key: "type",
      label: "Jenis",
      render: (value) => (
        <Badge variant="outline" className="text-xs">
          {getTypeLabel(String(value))}
        </Badge>
      ),
    },
    {
      key: "dueDate",
      label: "Tenggat Waktu",
      render: (value) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-3 w-3 text-gray-400" />
          {formatDate(value as string)}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => getStatusBadge(value as string),
    },
    {
      key: "progress",
      label: "Progress",
      render: (value, row) => {
        if (row.type === "assignment" && row.totalStudents && row.submittedCount !== undefined) {
          const progress = Math.round((Number(row.submittedCount) / Number(row.totalStudents)) * 100);
          return (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Users className="h-3 w-3" />
                {String(row.submittedCount)}/{String(row.totalStudents)}
              </div>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#DAA625] h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">{progress}%</span>
            </div>
          );
        }
        return value ? `${value}%` : "-";
      },
    },
  ];

  const actions = [];
  
  if (onView) {
    actions.push(commonActions.view((row) => onView(row as unknown as ClassDetailData)));
  }
  
  if (onEdit) {
    actions.push(commonActions.edit((row) => onEdit(row as unknown as ClassDetailData)));
  }
  
  if (onDelete) {
    actions.push(commonActions.delete((row) => onDelete(row as unknown as ClassDetailData)));
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
            {isStudentTable ? (
              <Users className="h-5 w-5 text-[#C40001]" />
            ) : data.length > 0 && data[0].type === "assignment" ? (
              <FileText className="h-5 w-5 text-[#C40001]" />
            ) : data.length > 0 && data[0].type === "material" ? (
              <BookOpen className="h-5 w-5 text-[#C40001]" />
            ) : (
              <FileText className="h-5 w-5 text-[#C40001]" />
            )}
            {title}
          </CardTitle>
          <Button 
            className="bg-[#C40001] hover:bg-[#A60000] text-white"
            onClick={onAdd}
          >
            <Plus className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <TableLayout
          title=""
          description=""
          columns={columns}
          data={data as unknown as Record<string, unknown>[]}
          actions={actions}
          searchPlaceholder="Cari berdasarkan judul atau mata pelajaran..."
          showSearch={true}
          showExport={false}
          onExport={onExport}
          onSearch={onSearch}
        />
      </CardContent>
    </Card>
  );
}
