"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Certificate } from "@/types/certificate";
import { certificateService } from "@/lib/services/certificate.service";
import { pdfGenerator } from "@/lib/services/pdf-generator.service";
import { Download, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function CertificatesList() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCertificates = async () => {
    try {
      setLoading(true);
      const data = await certificateService.getCertificates();
      setCertificates(data);
    } catch (error) {
      toast.error("Gagal memuat data sertifikat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handlePreview = async (certificate: Certificate) => {
    try {
      await pdfGenerator.generatePDF(certificate);
    } catch (error) {
      toast.error("Gagal membuka preview sertifikat");
    }
  };

  const handleDownload = async (certificate: Certificate) => {
    try {
      await certificateService.downloadCertificate(certificate.id);
      toast.success("Sertifikat berhasil diunduh");
    } catch (error) {
      toast.error("Gagal mengunduh sertifikat");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Sertifikat</TableHead>
            <TableHead>Nama Siswa</TableHead>
            <TableHead>Jenis</TableHead>
            <TableHead>Tanggal Terbit</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                Memuat data...
              </TableCell>
            </TableRow>
          ) : certificates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-10">
                Belum ada sertifikat
              </TableCell>
            </TableRow>
          ) : (
            certificates.map((certificate) => (
              <TableRow key={certificate.id}>
                <TableCell className="font-medium">{certificate.id}</TableCell>
                <TableCell>{certificate.studentId}</TableCell>
                <TableCell>
                  {certificate.type === "COURSE_COMPLETION"
                    ? "Penyelesaian Kursus"
                    : certificate.type === "ACHIEVEMENT"
                    ? "Prestasi"
                    : "Partisipasi"}
                </TableCell>
                <TableCell>
                  {new Date(certificate.issueDate).toLocaleDateString("id-ID")}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      certificate.status === "issued"
                        ? "bg-green-50 text-green-700"
                        : certificate.status === "draft"
                        ? "bg-gray-50 text-gray-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {certificate.status === "issued"
                      ? "Terbit"
                      : certificate.status === "draft"
                      ? "Draft"
                      : "Menunggu"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Buka menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handlePreview(certificate)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDownload(certificate)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Unduh
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
