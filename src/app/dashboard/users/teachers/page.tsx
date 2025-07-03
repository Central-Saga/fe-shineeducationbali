"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Search, Plus, MoreHorizontal, Eye, Edit2, Trash2 } from "lucide-react";
import { Teacher, EducationLevel } from "@/types/teacher";
import { teacherService } from "@/lib/services/teacher.service";
import { toast } from "sonner";
import { TeacherDialog } from "@/components/ui-admin/teacher/TeacherDialog";

export default function TeachersPage() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<"all" | EducationLevel>(
    "all"
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<"active" | "inactive" | "all">("all");
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<EducationLevel | "all">("all");
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const data = await teacherService.getTeachers();
      setTeachers(data);
    } catch (error) {
      toast.error("Gagal memuat data guru");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.specialization.some((spec) =>
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLevel =
      selectedLevel === "all" || teacher.educationLevel.includes(selectedLevel);

    const matchesStatus =
      selectedStatus === "all" || (selectedStatus === "active" ? teacher.status === "ACTIVE" : teacher.status !== "ACTIVE");

    return matchesSearch && matchesLevel && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manajemen Guru
          </h1>
          <p className="text-gray-500 mt-1">Kelola data guru dan pengajar</p>
        </div>
        <Button 
          className="bg-[#C40503] hover:bg-[#a50402] text-white flex items-center gap-2 w-full sm:w-auto"
          onClick={() => router.push("/dashboard/users/teachers/add")}
        >
          <Plus className="h-4 w-4" />
          Tambah Guru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-[#C40503] to-[#ef4444] text-white">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium">Total Guru</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">{teachers.length}</div>
            <p className="text-sm opacity-80 mt-1">Semua guru terdaftar</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-[#DAA625] to-[#fbbf24] text-white">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium">Guru Aktif</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">
              {teachers.filter(t => t.status === "ACTIVE").length}
            </div>
            <p className="text-sm opacity-80 mt-1">Sedang mengajar aktif</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium">Kelas Aktif</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">
              {teachers.reduce((acc, t) => acc + ((t as any).activeClasses || 0), 0)}
            </div>
            <p className="text-sm opacity-80 mt-1">Total kelas berjalan</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2 pt-6">
            <CardTitle className="text-sm font-medium">Program Aktif</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">
              {Array.from(new Set(teachers.flatMap(t => (t as any).programs || []))).length}
            </div>
            <p className="text-sm opacity-80 mt-1">Program yang diajarkan</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari nama, email, atau spesialisasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-white w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Select
                value={selectedStatus}
                onValueChange={(value: "active" | "inactive" | "all") =>
                  setSelectedStatus(value)
                }
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedEducationLevel}
                onValueChange={(value: EducationLevel | "all") =>
                  setSelectedEducationLevel(value)
                }
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-white">
                  <SelectValue placeholder="Jenjang Mengajar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Jenjang</SelectItem>
                  <SelectItem value="TK">TK</SelectItem>
                  <SelectItem value="SD">SD</SelectItem>
                  <SelectItem value="SMP">SMP</SelectItem>
                  <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                  <SelectItem value="UMUM">UMUM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-center w-12">Profil</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Spesialisasi</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#C40503]"></div>
                      <span>Memuat data...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredTeachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">Tidak ada data guru</p>
                      <p className="text-gray-400 text-sm">Coba ubah filter atau tambahkan guru baru</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-gray-50">
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        {teacher.profilePhoto ? (
                          <img
                            src={teacher.profilePhoto}
                            alt={teacher.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-[#C40503]/10 flex items-center justify-center">
                            <span className="text-sm text-[#C40503] font-medium">
                              {teacher.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {teacher.name}
                    </TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {teacher.specialization?.map((spec: string, i: number) => (
                          <Badge 
                            key={i}
                            className="bg-[#DAA625]/10 text-[#DAA625] hover:bg-[#DAA625]/10 border-[#DAA625]/20"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          teacher.status === "ACTIVE" ? "success" : "secondary"
                        }
                        className={
                          teacher.status === "ACTIVE"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-none"
                            : "bg-[#C40503]/10 text-[#C40503] hover:bg-[#C40503]/10 border-none"
                        }
                      >
                        {teacher.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-[160px]"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/dashboard/users/teachers/detail/${teacher.id}`
                                )
                              }
                            >
                              <Eye className="h-4 w-4 mr-2 text-blue-600" />
                              Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/dashboard/users/teachers/edit/${teacher.id}`
                                )
                              }
                            >
                              <Edit2 className="h-4 w-4 mr-2 text-[#DAA625]" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-[#C40503]"
                              onClick={() => {
                                setSelectedTeacher(teacher);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Data Guru</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data guru ini? Tindakan ini
              tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteLoading}
              onClick={async () => {
                if (!selectedTeacher) return;

                try {
                  setDeleteLoading(true);
                  await teacherService.deleteTeacher(selectedTeacher.id);
                  await loadTeachers();
                  toast.success("Guru berhasil dihapus");
                  setDeleteDialogOpen(false);
                  setSelectedTeacher(null);
                } catch (error) {
                  toast.error("Gagal menghapus guru");
                  console.error(error);
                } finally {
                  setDeleteLoading(false);
                }
              }}
              className="bg-[#C40503] hover:bg-[#a50402] text-white"
            >
              {deleteLoading ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Teacher Dialog */}
      <TeacherDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        teacher={selectedTeacher as Teacher | undefined}
        onSubmit={async (data: any) => {
          try {
            if (selectedTeacher) {
              await teacherService.updateTeacher(selectedTeacher.id, data);
              toast.success("Guru berhasil diperbarui");
            } else {
              await teacherService.createTeacher(data);
              toast.success("Guru berhasil ditambahkan");
            }
            setDialogOpen(false);
            loadTeachers();
          } catch (error) {
            toast.error(
              selectedTeacher
                ? "Gagal memperbarui guru"
                : "Gagal menambahkan guru"
            );
            console.error(error);
          }
        }}
      />
    </div>
  );
}
