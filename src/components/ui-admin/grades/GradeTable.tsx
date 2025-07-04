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
import { StatusType } from "@/types/grade";

// Helper functions for grade conversion
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

// Helper function to display status in Indonesian
const getStatusDisplay = (status: StatusType): string => {
  switch (status) {
    case 'SELESAI':
      return 'Lulus';
    case 'TIDAK_LULUS':
      return 'Tidak Lulus';
    case 'PENDING':
      return 'Sedang Dinilai';
    default:
      return status;
  }
};

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
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Daftar Nilai Siswa</CardTitle>
        <Button className="bg-[#C40503] hover:bg-[#a50402] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Input Nilai Baru
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari nama siswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 bg-white"
            />
          </div>
          <div className="flex gap-3">
            <Select
              value={selectedSubject}
              onValueChange={setSelectedSubject}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter Mata Pelajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
                <SelectItem value="Matematika">Matematika</SelectItem>
                <SelectItem value="Bahasa Inggris">Bahasa Inggris</SelectItem>
                <SelectItem value="IPA">IPA</SelectItem>
                <SelectItem value="Komputer">Komputer</SelectItem>
                <SelectItem value="Coding">Coding</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedLevel}
              onValueChange={setSelectedLevel}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Filter Jenjang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenjang</SelectItem>
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA">SMA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Jenjang</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead className="text-center">Nilai</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">Tidak ada data nilai</p>
                      <p className="text-gray-400 text-sm">Coba ubah filter atau tambahkan nilai baru</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredGrades.map((grade) => (
                  <TableRow key={grade.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{grade.studentName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">
                        {grade.level}
                      </Badge>
                    </TableCell>
                    <TableCell>{grade.subject}</TableCell>
                    <TableCell className="text-center font-medium">{grade.averageScore}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={`
                          ${getGradeLetterClass(grade.averageScore)}
                          border-none
                        `}
                      >
                        {getGradeLetter(grade.averageScore)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={grade.status === 'SELESAI' ? 'default' : 'secondary'}
                        className={`
                          ${grade.status === 'SELESAI' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          ${grade.status === 'TIDAK_LULUS' ? 'bg-[#C40503]/10 text-[#C40503] hover:bg-[#C40503]/10' : ''}
                          ${grade.status === 'PENDING' ? 'bg-[#DAA625]/10 text-[#DAA625] hover:bg-[#DAA625]/10' : ''}
                          border-none
                        `}
                      >
                        {getStatusDisplay(grade.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/dashboard/grades/detail/${grade.id}`)}
                        className="hover:bg-gray-100 text-blue-600"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Lihat
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
