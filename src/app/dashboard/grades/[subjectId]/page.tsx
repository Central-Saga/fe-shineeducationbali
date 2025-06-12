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
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mockGradeDetails } from "@/data/data-admin/grades-data/grades-data";

export default function SubjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId as string;

  const handlePrintCertificate = (studentId: string) => {
    console.log("Printing certificate for:", studentId);
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600";
    if (grade >= 80) return "text-blue-600";
    if (grade >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Detail Nilai - Bahasa Inggris (SMP)
          </h1>
        </div>
        <Button variant="outline" className="gap-2">
          <Printer className="h-4 w-4" />
          Cetak Nilai Kelas
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center w-[100px]">ID</TableHead>
                <TableHead className="text-center">Nama Siswa</TableHead>
                <TableHead className="text-center">Str & Voc</TableHead>
                <TableHead className="text-center">Reading</TableHead>
                <TableHead className="text-center">Speaking</TableHead>
                <TableHead className="text-center">Listening</TableHead>
                <TableHead className="text-center">Writing</TableHead>
                <TableHead className="text-center">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockGradeDetails.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="text-center font-medium">
                    {grade.id}
                  </TableCell>
                  <TableCell className="text-center">
                    {grade.studentName}
                  </TableCell>
                  <TableCell
                    className={`text-center font-medium ${getGradeColor(
                      grade.strVoc
                    )}`}
                  >
                    {grade.strVoc}
                  </TableCell>
                  <TableCell
                    className={`text-center font-medium ${getGradeColor(
                      grade.reading
                    )}`}
                  >
                    {grade.reading}
                  </TableCell>
                  <TableCell
                    className={`text-center font-medium ${getGradeColor(
                      grade.speaking
                    )}`}
                  >
                    {grade.speaking}
                  </TableCell>
                  <TableCell
                    className={`text-center font-medium ${getGradeColor(
                      grade.listening
                    )}`}
                  >
                    {grade.listening}
                  </TableCell>
                  <TableCell
                    className={`text-center font-medium ${getGradeColor(
                      grade.writing
                    )}`}
                  >
                    {grade.writing}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handlePrintCertificate(grade.id)}
                    >
                      <Printer className="h-4 w-4" />
                      Cetak Sertifikat
                    </Button>
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
