"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, Eye, Edit2, Trash2, MoreHorizontal } from "lucide-react";
import { Student, EducationLevel } from "@/types/student";
import { studentService } from "@/lib/services/student.service";

import { toast } from "sonner";

export default function StudentsManagement() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<EducationLevel | "all">(
    "all"
  );
  const [selectedStatus, setSelectedStatus] = useState<
    "active" | "inactive" | "all"
  >("all");
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

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

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel =
        selectedLevel === "all" || student.educationLevel === selectedLevel;
      const matchesStatus =
        selectedStatus === "all" || student.status === selectedStatus;
      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [students, searchQuery, selectedLevel, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: students.length,
      active: students.filter((s) => s.status === "active").length,
      byLevel: {
        TK: students.filter((s) => s.educationLevel === "TK").length,
        SD: students.filter((s) => s.educationLevel === "SD").length,
        SMP: students.filter((s) => s.educationLevel === "SMP").length,
        "SMA/SMK": students.filter((s) => s.educationLevel === "SMA/SMK")
          .length,
        UMUM: students.filter((s) => s.educationLevel === "UMUM").length,
      },
    };
  }, [students]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manajemen Siswa
          </h1>
          <p className="text-gray-500 mt-1">Kelola akun dan data siswa</p>
        </div>
        <Button 
          className="bg-[#C40503] hover:bg-[#a50402] text-white flex items-center gap-2 w-full sm:w-auto"
          onClick={() => router.push("/dashboard/users/students/add")}
        >
          <Plus className="h-4 w-4" />
          Tambah Siswa
        </Button>
      </div>

      {/* Statistics Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-[#C40503] to-[#ef4444] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
            <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm opacity-80 mt-1">Semua siswa terdaftar</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-gradient-to-br from-[#DAA625] to-[#fbbf24] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
            <CardTitle className="text-sm font-medium">Siswa Aktif</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-sm opacity-80 mt-1">Siswa dengan status aktif</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
            <CardTitle className="text-sm font-medium">TK/SD/SMP</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">
              {stats.byLevel.TK + stats.byLevel.SD + stats.byLevel.SMP}
            </div>
            <p className="text-sm opacity-80 mt-1">Jenjang dasar & menengah</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-6">
            <CardTitle className="text-sm font-medium">SMA/SMK/UMUM</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-6">
            <div className="text-2xl font-bold">
              {stats.byLevel["SMA/SMK"] + stats.byLevel.UMUM}
            </div>
            <p className="text-sm opacity-80 mt-1">Jenjang atas & umum</p>
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
                placeholder="Cari siswa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 bg-white w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Select
                value={selectedLevel}
                onValueChange={(value: EducationLevel | "all") =>
                  setSelectedLevel(value)
                }
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-white">
                  <SelectValue placeholder="Jenjang Pendidikan" />
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
              <Select
                value={selectedStatus}
                onValueChange={(value: "active" | "inactive" | "all") =>
                  setSelectedStatus(value)
                }
              >
                <SelectTrigger className="w-[180px] bg-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-center w-12">Inisial</TableHead>
                <TableHead className="text-center">Nama</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">No. Telepon</TableHead>
                <TableHead className="text-center">Jenjang</TableHead>
                <TableHead className="text-center">Paket Kursus</TableHead>
                <TableHead className="text-center">Mata Pelajaran</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#C40503]"></div>
                      <span>Memuat data...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">Tidak ada data siswa</p>
                      <p className="text-gray-400 text-sm">Coba ubah filter atau tambahkan siswa baru</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-center">
                      <div className="flex items-center justify-center gap-2">
                        {student.profilePhoto ? (
                          <img
                            src={student.profilePhoto}
                            alt={student.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-[#DAA625]/10 flex items-center justify-center">
                            <span className="text-sm text-[#DAA625] font-medium">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.email}
                    </TableCell>
                    <TableCell className="text-center">
                      {student.phoneNumber}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        {student.educationLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-wrap gap-1 justify-center">
                        {student.packages?.length > 0 ? (
                          student.packages.map((pkg) => (
                            <Badge
                              key={pkg.id}
                              variant={
                                pkg.type === "regular" ? "default" : "secondary"
                              }
                              className={`whitespace-nowrap ${
                                pkg.type === "regular" 
                                  ? "bg-[#DAA625]/10 text-[#DAA625] hover:bg-[#DAA625]/10 border-[#DAA625]/20" 
                                  : "bg-[#C40503]/10 text-[#C40503] hover:bg-[#C40503]/10 border-[#C40503]/20"
                              }`}
                            >
                              {pkg.name}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col gap-1">
                        {student.packages?.length > 0 ? (
                          student.packages.flatMap((pkg) =>
                            pkg.courses.map((course) => (
                              <div
                                key={`${pkg.id}-${course.name}`}
                                className="text-sm flex items-center gap-1"
                              >
                                <span className="font-medium">
                                  {course.name}
                                </span>
                              </div>
                            ))
                          )
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          student.status === "active" ? "success" : "secondary"
                        }
                        className={
                          student.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-none"
                            : "bg-[#C40503]/10 text-[#C40503] hover:bg-[#C40503]/10 border-none"
                        }
                      >
                        {student.status === "active" ? "Aktif" : "Nonaktif"}
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
                                  `/dashboard/users/students/detail/${student.id}`
                                )
                              }
                            >
                              <Eye className="h-4 w-4 mr-2 text-blue-600" />
                              Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                router.push(
                                  `/dashboard/users/students/edit/${student.id}`
                                )
                              }
                            >
                              <Edit2 className="h-4 w-4 mr-2 text-[#DAA625]" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-[#C40503]"
                              onClick={() => {
                                setSelectedStudent(student);
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
            <AlertDialogTitle>Hapus Data Siswa</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus data siswa ini? Tindakan ini
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
                if (!selectedStudent) return;

                try {
                  setDeleteLoading(true);
                  await studentService.deleteStudent(selectedStudent.id);
                  await loadStudents();
                  toast.success("Siswa berhasil dihapus");
                  setDeleteDialogOpen(false);
                  setSelectedStudent(null);
                } catch (error) {
                  toast.error("Gagal menghapus siswa");
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
    </div>
  );
}
