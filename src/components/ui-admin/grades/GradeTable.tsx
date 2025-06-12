"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit2, Search, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { studentGrades } from "@/data/data-admin/grades-data/student-grades";

export function GradeTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const router = useRouter();

  const filteredGrades = studentGrades.filter((grade) => {
    const matchesSearch = grade.studentName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" || grade.subject === selectedSubject;
    const matchesLevel =
      selectedLevel === "all" || grade.level === selectedLevel;
    return matchesSearch && matchesSubject && matchesLevel;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Daftar Nilai Siswa</CardTitle>
        <Button className="bg-[#C40503] text-white hover:bg-[#A00503]">
          <Plus className="h-4 w-4 mr-2" />
          Input Nilai Baru
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari nama siswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Semua Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
                <SelectItem value="Matematika">Matematika</SelectItem>
                <SelectItem value="Bahasa Inggris">Bahasa Inggris</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Bahasa Indonesia">Bahasa Indonesia</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Jenjang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA">SMA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Nilai</TableHead>
              <TableHead>Nama Siswa</TableHead>
              <TableHead>Mata Pelajaran</TableHead>
              <TableHead>Jenjang</TableHead>
              <TableHead>Rata-rata</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGrades.map((grade) => (
              <TableRow key={grade.id}>
                <TableCell>{grade.id}</TableCell>
                <TableCell className="font-medium">{grade.studentName}</TableCell>
                <TableCell>{grade.subject}</TableCell>
                <TableCell>{grade.level}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      grade.averageScore >= 90
                        ? "success"
                        : grade.averageScore >= 80
                        ? "secondary"
                        : grade.averageScore >= 70
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {grade.averageScore.toFixed(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-100">
                    {grade.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                      onClick={() =>
                        router.push(`/dashboard/grades/${grade.id}`)
                      }
                    >
                      <Eye className="h-4 w-4" />
                      <span>Detail</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span>Edit</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
