"use client";

import { useState } from "react";
import { usePermission } from "@/hooks/use-permission";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, ChevronDown, ArrowUpDown } from "lucide-react";
import { StudentDialog } from "./StudentDialog";
import { DeleteAlertDialog } from "./DeleteAlertDialog";
import { studentService } from "@/lib/services/student.service";
import type { Student } from "@/types/student";

interface StudentTableProps {
  students: Student[];
  onStudentChange: () => void;
}

export function StudentTable({ students, onStudentChange }: StudentTableProps) {
  const { hasPermission: canCreate } = usePermission("student.create");
  const { hasPermission: canEdit } = usePermission("student.edit");
  const { hasPermission: canDelete } = usePermission("student.delete");

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [sortField, setSortField] = useState<keyof Student>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedStudents = [...students].sort((a, b) => {
    const aValue = a[sortField] ?? "";
    const bValue = b[sortField] ?? "";

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const handleSort = (field: keyof Student) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedStudent) return;
    await studentService.deleteStudent(selectedStudent.id);
    onStudentChange();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daftar Siswa</h2>
        {canCreate && (
          <Button onClick={() => setIsEditDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Siswa
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="h-8 px-2"
              >
                Nama Siswa
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("email")}
                className="h-8 px-2"
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("class")}
                className="h-8 px-2"
              >
                Kelas
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("status")}
                className="h-8 px-2"
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[100px]">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    student.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {student.status === "active" ? "Aktif" : "Non-aktif"}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {canEdit && (
                      <DropdownMenuItem
                        onClick={() => handleEditClick(student)}
                      >
                        Edit
                      </DropdownMenuItem>
                    )}
                    {canDelete && (
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => handleDeleteClick(student)}
                      >
                        Hapus
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {canEdit && (
        <StudentDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          initialData={
            selectedStudent
              ? {
                  ...selectedStudent,
                  class: selectedStudent.class || "",
                }
              : undefined
          }
          onSuccess={() => {
            onStudentChange();
            setSelectedStudent(null);
          }}
        />
      )}

      {canDelete && (
        <DeleteAlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDelete}
          title="Hapus Data Siswa"
          description={`Apakah Anda yakin ingin menghapus data siswa ${selectedStudent?.name}? Tindakan ini tidak dapat dibatalkan.`}
        />
      )}
    </div>
  );
}
