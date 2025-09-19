"use client";

import { useState } from "react";
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
import { Certificate } from "@/types/certificate";
import { certificateService } from "@/lib/services/certificate.service";
import { format } from "date-fns";
import { Download, Plus } from "lucide-react";
import { toast } from "sonner";
import { CertificateFormDialog } from "./certificate-form-dialog";

interface CertificateListProps {
  studentId: string;
  studentName: string;
}

export function CertificateList({
  studentId,
  studentName,
}: CertificateListProps) {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const data = await certificateService.getStudentCertificates(studentId);
      setCertificates(data);
    } catch (error) {
      console.error("Failed to load certificates:", error);
      toast.error("Gagal memuat data sertifikat");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (certificateId: string) => {
    try {
      await certificateService.downloadCertificate(certificateId);
      toast.success("Sertifikat berhasil diunduh");
    } catch (error) {
      console.error("Failed to download certificate:", error);
      toast.error("Gagal mengunduh sertifikat");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Sertifikat</CardTitle>
        <Button onClick={() => setDialogOpen(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Buat Sertifikat
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Jenis</TableHead>
              <TableHead>Tanggal Pencapaian</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.title}</TableCell>
                <TableCell>
                  {cert.type === "COURSE_COMPLETION"
                    ? "Penyelesaian Kursus"
                    : cert.type === "ACHIEVEMENT"
                    ? "Prestasi"
                    : "Partisipasi"}
                </TableCell>
                <TableCell>
                  {format(new Date(cert.issueDate), "dd MMMM yyyy")}
                </TableCell>
                <TableCell>
                  {cert.validUntil && new Date(cert.validUntil) < new Date()
                    ? "Kadaluarsa"
                    : "Aktif"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(cert.id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Unduh
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {certificates.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  Belum ada sertifikat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <CertificateFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        studentId={studentId}
        studentName={studentName}
        onSuccess={loadCertificates}
      />
    </Card>
  );
}
