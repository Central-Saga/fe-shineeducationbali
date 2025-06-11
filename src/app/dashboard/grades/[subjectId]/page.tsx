"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

// Dummy data untuk detail nilai siswa
const generateStudentGrades = (total: number) => {
  return Array.from({ length: total }, (_, index) => ({
    id: `SSW000${1000 + index}`,
    name: `Siswa ${index + 1}`,
    scores: {
      "Str & Voc": Math.floor(Math.random() * (95 - 75) + 75),
      Reading: Math.floor(Math.random() * (95 - 75) + 75),
      Speaking: Math.floor(Math.random() * (95 - 75) + 75),
      Listening: Math.floor(Math.random() * (95 - 75) + 75),
      Writing: Math.floor(Math.random() * (95 - 75) + 75),
      ACT: Math.floor(Math.random() * (95 - 75) + 75),
    },
  }));
};

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectId = params.subjectId as string;

  // Ini nanti akan diganti dengan data asli dari API
  const subject = {
    id: parseInt(subjectId),
    name: "Bahasa Inggris",
    level: "SMP",
    totalStudents: 45,
  };

  const students = generateStudentGrades(subject.totalStudents);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Detail Nilai - {subject.name} ({subject.level})
        </h1>
        <div className="flex gap-2">
          <Button variant="outline">Kembali</Button>
          <Button variant="default">Cetak Sertifikat Kelas</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">SISWA</TableHead>
              <TableHead>Str & Voc</TableHead>
              <TableHead>Reading</TableHead>
              <TableHead>Speaking</TableHead>
              <TableHead>Listening</TableHead>
              <TableHead>Writing</TableHead>
              <TableHead>ACT</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      ID: {student.id}
                    </div>
                    <div>{student.name}</div>
                  </div>
                </TableCell>
                <TableCell>{student.scores["Str & Voc"]}</TableCell>
                <TableCell>{student.scores.Reading}</TableCell>
                <TableCell>{student.scores.Speaking}</TableCell>
                <TableCell>{student.scores.Listening}</TableCell>
                <TableCell>{student.scores.Writing}</TableCell>
                <TableCell>{student.scores.ACT}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    Cetak Sertifikat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
