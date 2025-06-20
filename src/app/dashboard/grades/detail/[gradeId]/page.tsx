"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Printer, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Mock data untuk detail nilai
const getGradeDetail = (id: string) => {
  return {
    // Data Diri Siswa
    studentInfo: {
      id: "STD0097",
      name: "Ni Putu Sintya",
      class: "XII IPA 1",
      gender: "Perempuan",
      address: "Jl. Raya Sesetan No. 123, Denpasar",
      phone: "081234567890",
      parentName: "Made Wirya",
      parentPhone: "081234567891",
    },
    // Data Kursus
    courseInfo: {
      id: id,
      courseName: "Bahasa Inggris",
      level: "SMA/SMK", // Changed from "Advanced" to match our education levels
      instructor: "Mrs. Sarah Johnson",
      schedule: "Senin & Rabu, 15:00 - 17:00",
      startDate: "2025-01-15",
      endDate: "2025-06-30",
      totalSessions: 24,
      completedSessions: 20,
      scores: {
        speaking: 95,
        listening: 98,
        reading: 94,
        writing: 97,
        vocabulary: 97,
      },
      averageScore: 96.2,
      status: "Aktif",
      notes:
        "Excellent performance in all areas. Shows exceptional language skills.",
    },
  };
};

export default function GradeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const gradeId = params.gradeId as string;
  const gradeDetail = getGradeDetail(gradeId);

  return (
    <div className="p-6 space-y-6">
      {/* Header dengan tombol back dan actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Detail Nilai Siswa
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Cetak Detail
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Anda yakin ingin menghapus data ini?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara
                  permanen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive">
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Grid layout untuk informasi siswa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kolom Kiri - Data Diri Siswa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Data Diri Siswa</span>
              <Badge variant="outline">{gradeDetail.studentInfo.id}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Nama Lengkap</p>
                <p className="font-medium">{gradeDetail.studentInfo.name}</p>
              </div>
              <div className="space-y-1">
                {" "}
                <p className="text-sm text-muted-foreground">Jenjang</p>
                <p className="font-medium">{gradeDetail.courseInfo.level}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Jenis Kelamin</p>
                <p className="font-medium">{gradeDetail.studentInfo.gender}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Alamat</p>
                <p className="font-medium">{gradeDetail.studentInfo.address}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">No. Telepon</p>
                <p className="font-medium">{gradeDetail.studentInfo.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Nama Orang Tua</p>
                <p className="font-medium">
                  {gradeDetail.studentInfo.parentName}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Telepon Orang Tua
                </p>
                <p className="font-medium">
                  {gradeDetail.studentInfo.parentPhone}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kolom Kanan - Data Kursus */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Informasi Kursus</span>
                <Badge variant="success">{gradeDetail.courseInfo.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Mata Pelajaran
                  </p>
                  <p className="font-medium">
                    {gradeDetail.courseInfo.courseName}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="font-medium">{gradeDetail.courseInfo.level}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Pengajar</p>
                  <p className="font-medium">
                    {gradeDetail.courseInfo.instructor}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Jadwal</p>
                  <p className="font-medium">
                    {gradeDetail.courseInfo.schedule}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tanggal Mulai</p>
                  <p className="font-medium">
                    {new Date(
                      gradeDetail.courseInfo.startDate
                    ).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Tanggal Selesai
                  </p>
                  <p className="font-medium">
                    {new Date(
                      gradeDetail.courseInfo.endDate
                    ).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Total Pertemuan
                  </p>
                  <p className="font-medium">
                    {gradeDetail.courseInfo.totalSessions}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    Pertemuan Selesai
                  </p>
                  <p className="font-medium">
                    {gradeDetail.courseInfo.completedSessions}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nilai Komponen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(gradeDetail.courseInfo.scores).map(
                ([component, score]) => (
                  <div
                    key={component}
                    className="flex justify-between items-center"
                  >
                    <p className="text-sm capitalize">{component}</p>
                    <Badge
                      variant={
                        score >= 90
                          ? "success"
                          : score >= 80
                          ? "secondary"
                          : score >= 70
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {score}
                    </Badge>
                  </div>
                )
              )}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <p className="font-medium">Rata-rata</p>
                  <Badge variant="success" className="text-lg">
                    {gradeDetail.courseInfo.averageScore}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Catatan Pengajar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {gradeDetail.courseInfo.notes}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
