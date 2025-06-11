"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Search, Plus } from "lucide-react";
import { Teacher } from "@/types/teacher";
import { teacherService } from "@/lib/services/teacher.service";
import { toast } from "sonner";
import { TeacherDialog } from "@/components/ui-admin/users/TeacherDialog";

export default function TeachersPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<
    "all" | "SD" | "SMP" | "SMA"
  >("all");

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

    return matchesSearch && matchesLevel;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Daftar Guru
        </h1>
        <p className="text-muted-foreground">
          Kelola data guru dan penugasan mengajar
        </p>

        {/* Filters and Search */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari guru..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={selectedLevel}
              onValueChange={(value: "all" | "SD" | "SMP" | "SMA") =>
                setSelectedLevel(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Jenjang Mengajar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenjang</SelectItem>
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA">SMA</SelectItem>
              </SelectContent>
            </Select>
          </div>{" "}
          <Button
            className="bg-[#C40503] hover:bg-[#b30402]"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Guru
          </Button>
          <TeacherDialog open={dialogOpen} onOpenChange={setDialogOpen} />
        </div>

        {/* Teachers Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              {" "}
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">ID</TableHead>
                  <TableHead className="text-center">Nama</TableHead>
                  <TableHead className="text-center">
                    Kursus yang Diminati
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Kelas Aktif</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : filteredTeachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      Tidak ada data guru
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      <TableCell>{teacher.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {teacher.profilePhoto ? (
                            <img
                              src={teacher.profilePhoto}
                              alt={teacher.name}
                              className="h-8 w-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <span className="text-sm text-gray-600">
                                {teacher.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {teacher.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.specialization.map((spec, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="whitespace-nowrap"
                            >
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            teacher.status === "ACTIVE"
                              ? "success"
                              : "secondary"
                          }
                        >
                          {teacher.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {teacher.educationLevel.map((level, index) => (
                            <Badge key={index} variant="outline">
                              {level}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" className="mr-2">
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
