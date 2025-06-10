"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/ui-admin/students/DataTable";
import { columns } from "@/components/ui-admin/students/columns";
import { StudentDialog } from "@/components/ui-admin/students/StudentDialog";
import { Student, studentService } from "@/lib/services/student.service";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Load students
  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getStudents();
      setStudents(data);
    } catch (error) {
      toast.error("Gagal memuat data siswa");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initialize event listeners
  useEffect(() => {
    loadStudents();

    // Handle edit
    const handleEdit = (e: CustomEvent<Student>) => {
      setSelectedStudent(e.detail);
      setDialogOpen(true);
    };

    // Handle delete
    const handleDelete = (e: CustomEvent<Student>) => {
      setSelectedStudent(e.detail);
      setDeleteDialogOpen(true);
    };

    document.addEventListener("EDIT_STUDENT", handleEdit as EventListener);
    document.addEventListener("DELETE_STUDENT", handleDelete as EventListener);

    return () => {
      document.removeEventListener("EDIT_STUDENT", handleEdit as EventListener);
      document.removeEventListener(
        "DELETE_STUDENT",
        handleDelete as EventListener
      );
    };
  }, []);

  // Handle student deletion
  const handleDeleteConfirm = async () => {
    if (!selectedStudent) return;

    try {
      setDeleteLoading(true);
      await studentService.deleteStudent(selectedStudent.id);
      await loadStudents();
      toast.success("Siswa berhasil dihapus");
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Gagal menghapus siswa");
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manajemen Siswa</h2>
          <p className="text-muted-foreground">
            Kelola data siswa dan penempatan kelas
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedStudent(null);
            setDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah Siswa
        </Button>
      </div>

      <DataTable columns={columns} data={students} />

      <StudentDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialData={selectedStudent || undefined}
        onSuccess={loadStudents}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Siswa</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data siswa ini? Tindakan ini
              tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteLoading}
            >
              {deleteLoading && (
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
