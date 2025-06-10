"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Certificate } from "@/types/certificate";
import { certificateService } from "@/lib/services/certificate.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, FileText, Plus, Settings } from "lucide-react";
import { toast } from "sonner";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "grid">("list");

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

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Manajemen Sertifikat
          </h2>
          <p className="text-muted-foreground">
            Kelola sertifikat prestasi dan pencapaian siswa
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Terbitkan Sertifikat
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Pengaturan
          </Button>
        </div>
      </div>{" "}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sertifikat
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
            <p className="text-xs text-muted-foreground">
              Total sertifikat terbit
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Diterbitkan Bulan Ini
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                certificates.filter(
                  (c) =>
                    new Date(c.issueDate).getMonth() ===
                      new Date().getMonth() &&
                    new Date(c.issueDate).getFullYear() ===
                      new Date().getFullYear()
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Dalam 30 hari terakhir
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Template Aktif
            </CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Template yang dapat digunakan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Menunggu Persetujuan
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="certificates">
        <TabsList>
          <TabsTrigger value="certificates">Sertifikat</TabsTrigger>
          <TabsTrigger value="templates">Template</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Daftar Sertifikat</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Buat Sertifikat
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Judul Sertifikat</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Tanggal Terbit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {certificates.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell>{cert.studentId}</TableCell>
                      <TableCell className="font-medium">
                        {cert.title}
                      </TableCell>
                      <TableCell>
                        {cert.type === "COURSE_COMPLETION"
                          ? "Penyelesaian Kursus"
                          : cert.type === "ACHIEVEMENT"
                          ? "Prestasi"
                          : "Partisipasi"}
                      </TableCell>
                      <TableCell>
                        {new Date(cert.issueDate).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            cert.validUntil &&
                            new Date(cert.validUntil) < new Date()
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {cert.validUntil &&
                          new Date(cert.validUntil) < new Date()
                            ? "Kadaluarsa"
                            : "Aktif"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-2" />
                            Detail
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Unduh
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Template Sertifikat</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tambah Template
              </Button>
            </CardHeader>
            <CardContent>
              {/* Template grid akan ditambahkan di sini */}
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="aspect-[1.414/1] bg-gray-100 rounded-lg mb-4"></div>
                  <h3 className="font-medium">Template Default</h3>
                  <p className="text-sm text-gray-500">
                    Template standar untuk sertifikat umum
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pengaturan Sertifikat</CardTitle>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </Button>
            </CardHeader>
            <CardContent>
              {/* Pengaturan akan ditambahkan di sini */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Tanda Tangan Digital</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Atur tanda tangan default untuk sertifikat
                  </p>
                  {/* Form tanda tangan akan ditambahkan di sini */}
                </div>
                <div>
                  <h3 className="font-medium mb-2">Format Nomor Sertifikat</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Atur format penomoran untuk sertifikat baru
                  </p>
                  {/* Form format nomor akan ditambahkan di sini */}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
