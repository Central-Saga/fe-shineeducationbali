"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

export default function MeetingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#C40503] to-[#DAA625] text-transparent bg-clip-text">
            Pertemuan Kelas
          </h1>
          <p className="text-gray-500 mt-1">
            Kelola pertemuan kelas dan absensi siswa
          </p>
        </div>
        <Link href="/dashboard-teacher/classes">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Kelas
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2 border-b bg-[#C40503]/5">
            <CardTitle>Daftar Pertemuan</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BookOpen className="h-16 w-16 text-[#C40503]/20 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">Tidak Ada Pertemuan yang Ditampilkan</h3>
              <p className="text-gray-500 max-w-md mb-6">
                Anda dapat mengakses pertemuan kelas dengan memilih kelas tertentu di halaman Kelas atau mengklik tombol "Pertemuan" pada kartu kelas.
              </p>
              <Link href="/dashboard-teacher/classes">
                <Button className="bg-gradient-to-r from-[#C40503] to-[#DAA625] hover:from-[#a60402] hover:to-[#b78a1e]">
                  Lihat Kelas Saya
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
