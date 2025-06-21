"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { certificateRecords } from "@/data/data-admin/certificates-data/records";

export function CertificateRecords() {
  const [records] = useState(certificateRecords);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Sertifikat</TableHead>
            <TableHead>Nama Siswa</TableHead>
            <TableHead>Jenis</TableHead>
            <TableHead>Tanggal Terbit</TableHead>
            <TableHead>Diterbitkan Oleh</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.certificateId}</TableCell>
              <TableCell>{record.studentName}</TableCell>
              <TableCell>
                {record.type === "COURSE_COMPLETION"
                  ? "Penyelesaian Kursus"
                  : record.type === "ACHIEVEMENT"
                  ? "Prestasi"
                  : "Partisipasi"}
              </TableCell>
              <TableCell>
                {new Date(record.issueDate).toLocaleDateString("id-ID")}
              </TableCell>
              <TableCell>{record.issuedBy}</TableCell>
              <TableCell>
                <Badge
                  className={
                    record.status === "success"
                      ? "bg-green-500"
                      : record.status === "failed"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }
                >
                  {record.status === "success"
                    ? "Berhasil"
                    : record.status === "failed"
                    ? "Gagal"
                    : "Dicabut"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {records.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                Belum ada catatan penerbitan sertifikat
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
