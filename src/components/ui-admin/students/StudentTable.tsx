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
    if (sortField === "packages") {
      const aPackages = a.packages?.length || 0;
      const bPackages = b.packages?.length || 0;
      return sortDirection === "asc"
        ? aPackages - bPackages
        : bPackages - aPackages;
    }

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
            </TableHead>{" "}
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("packages")}
                className="h-8 px-2"
              >
                Paket Kursus
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
              {" "}
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.email}</TableCell>{" "}
              <TableCell>
                <div className="space-y-2">
                  {student.packages && student.packages.length > 0 ? (
                    student.packages.map((pkg) => (
                      <div key={pkg.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              pkg.type === "regular"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {pkg.name}
                          </span>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${
                              pkg.status === "active"
                                ? "bg-green-100 text-green-800"
                                : pkg.status === "completed"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {pkg.status === "active"
                              ? "⏺ Aktif"
                              : pkg.status === "completed"
                              ? "✓ Selesai"
                              : "⨯ Dibatalkan"}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 pl-2">
                          {pkg.courses.map((course, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              • {course.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500">Belum ada paket</span>
                  )}
                </div>
              </TableCell>
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
                    {" "}
                    {canEdit && (
                      <>
                        <DropdownMenuItem
                          onClick={() => handleEditClick(student)}
                        >
                          Edit Profil
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            // TODO: Implement package management dialog
                            console.log("Manage packages for:", student.name);
                          }}
                        >
                          Kelola Paket Kursus
                        </DropdownMenuItem>
                      </>
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

      {canEdit && (        <StudentDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          student={selectedStudent}
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
