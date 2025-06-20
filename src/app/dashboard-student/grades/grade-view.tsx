"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data untuk testing
const mockGrades = [
  {
    subject: "Matematika",
    assignment: "Ujian Tengah Semester",
    score: 85,
    date: "2025-06-01",
  },
  {
    subject: "Bahasa Inggris",
    assignment: "Tugas Mingguan",
    score: 90,
    date: "2025-06-03",
  },
  {
    subject: "Coding",
    assignment: "Project Akhir",
    score: 88,
    date: "2025-06-05",
  },
];

export default function GradeView() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Nilai Saya
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Tugas</TableHead>
                <TableHead>Nilai</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGrades.map((grade, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{grade.subject}</TableCell>
                  <TableCell>{grade.assignment}</TableCell>
                  <TableCell>
                    <span
                      className={`font-bold ${
                        grade.score >= 90
                          ? "text-green-600"
                          : grade.score >= 80
                          ? "text-blue-600"
                          : grade.score >= 70
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {grade.score}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(grade.date).toLocaleDateString("id-ID")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
