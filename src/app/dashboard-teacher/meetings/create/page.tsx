"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CalendarIcon, ClockIcon, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreateMeetingPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    materials: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting meeting data:", formData);
    // Here you would typically send this data to your API
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard-teacher/meetings">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-[#C40503] to-[#DAA625] text-transparent bg-clip-text">
            Tambah Pertemuan Baru
          </h1>
          <p className="text-gray-500 mt-1">
            Buat pertemuan baru untuk kelas Anda
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b bg-[#C40503]/5">
          <CardTitle>Detail Pertemuan</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-base">
                  Judul Pertemuan
                </Label>
                <Input
                  id="title"
                  placeholder="Contoh: Pertemuan 1 - Pengenalan Materi"
                  className="mt-1.5"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date" className="text-base flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    Tanggal Pertemuan
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="mt-1.5"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="startTime" className="text-base flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                    Waktu Mulai
                  </Label>
                  <Input
                    id="startTime"
                    type="time"
                    className="mt-1.5"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime" className="text-base flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                    Waktu Selesai
                  </Label>
                  <Input
                    id="endTime"
                    type="time"
                    className="mt-1.5"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-base">
                  Deskripsi Pertemuan
                </Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan materi yang akan dibahas dalam pertemuan ini..."
                  className="mt-1.5 min-h-32"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-base block mb-2">
                  Materi Pembelajaran
                </Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50">
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Drag & drop file materi disini, atau{" "}
                    <span className="text-[#C40503] font-medium">cari file</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Mendukung PDF, PPT, DOC, dan file gambar (maks 10MB)
                  </p>
                  <input type="file" className="hidden" id="file-upload" multiple />
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Pilih File
                  </Button>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    File yang terunggah akan muncul disini
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t">
              <Button variant="outline" type="button">
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#C40503] to-[#DAA625] hover:from-[#a60402] hover:to-[#b78a1e]"
              >
                Simpan Pertemuan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
