"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Certificate } from "@/types/certificate";

export function InvalidCertificates() {
  const [invalidCertificates] = useState<Certificate[]>([
    {
      id: "CERT004",
      studentId: "STD004",
      studentName: "I Komang Adi",
      courseId: "CRS004",
      courseName: "Advanced English",
      issueDate: "2024-12-15",
      certificateNumber: "SE/2024/004",
      status: "draft",
      grade: "C",
      teacherName: "Mr. John Smith",
      type: "COURSE_COMPLETION",
      signedBy: "Dr. I Made Sudiana, M.Pd",
      metadata: {
        revocationReason: "Ditemukan kecurangan dalam ujian",
        revokedDate: "2025-01-15",
        revokedBy: "Komite Etik",
      },
    },
  ]);

  const handleVerify = () => {
    // TODO: Implement verification logic
  };

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertDescription>
          Sertifikat yang ditampilkan di bawah ini telah dicabut atau dinyatakan
          tidak valid karena berbagai alasan
        </AlertDescription>
      </Alert>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nomor Sertifikat</TableHead>
              <TableHead>Nama Siswa</TableHead>
              <TableHead>Kursus</TableHead>
              <TableHead>Tanggal Terbit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invalidCertificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell>{cert.certificateNumber}</TableCell>
                <TableCell>{cert.studentName}</TableCell>
                <TableCell>{cert.courseName}</TableCell>
                <TableCell>
                  {new Date(cert.issueDate).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  <Badge variant="destructive">Tidak Valid</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerify()}
                  >
                    Verifikasi Ulang
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {invalidCertificates.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Tidak ada sertifikat yang tidak valid
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
