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

// Mock data - nanti diganti dengan data dari API
const mockGrades = [
  {
    id: "INB0001081",
    studentName: "Ani Susanti",
    subject: "Bahasa Inggris",
    level: "SMP",
    grades: {
      speaking: 85,
      reading: 90,
      writing: 88,
    },
    status: "Selesai",
  },
  // Tambahkan data mock lainnya sesuai kebutuhan
];

export function GradeTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">Daftar Nilai Siswa</CardTitle>
        <Button className="bg-[#C40503] hover:bg-[#b30402]">
          Input Nilai Baru
        </Button>
      </CardHeader>
      <CardContent>
        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <Input
              placeholder="Cari nama siswa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Jenjang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jenjang</SelectItem>
              <SelectItem value="SD">SD</SelectItem>
              <SelectItem value="SMP">SMP</SelectItem>
              <SelectItem value="SMA">SMA</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Mata Pelajaran" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Mata Pelajaran</SelectItem>
              <SelectItem value="matematika">Matematika</SelectItem>
              <SelectItem value="english">Bahasa Inggris</SelectItem>
              <SelectItem value="ipa">IPA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grades Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Nilai</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Jenjang</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGrades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.id}</TableCell>
                  <TableCell>{grade.studentName}</TableCell>
                  <TableCell>{grade.subject}</TableCell>
                  <TableCell>{grade.level}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>Speaking: {grade.grades.speaking}</div>
                      <div>Reading: {grade.grades.reading}</div>
                      <div>Writing: {grade.grades.writing}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">{grade.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      Edit
                    </Button>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
