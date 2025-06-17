"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Image, Upload } from "lucide-react";
import { useState } from "react";

interface TemplateEditorProps {
  templateId?: string;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export function TemplateEditor({
  templateId,
  onSave,
  onCancel,
}: TemplateEditorProps) {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Background Sertifikat</CardTitle>
            <CardDescription>
              Upload dan atur background untuk template sertifikat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 text-center">
                {backgroundImage ? (
                  <div className="relative aspect-[1.414/1]">
                    <Image
                      className="h-4 w-4 absolute top-2 right-2 cursor-pointer"
                      onClick={() => setBackgroundImage(null)}
                    />
                    <img
                      src={backgroundImage}
                      alt="Background sertifikat"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                ) : (
                  <Button variant="outline" className="w-full h-32">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Background
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <Label>Dimensi</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Lebar (px)" />
                  <Input type="number" placeholder="Tinggi (px)" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logo</CardTitle>
            <CardDescription>
              Upload logo yang akan ditampilkan pada sertifikat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 text-center">
                {logo ? (
                  <div className="relative w-32 h-32 mx-auto">
                    <Image
                      className="h-4 w-4 absolute top-2 right-2 cursor-pointer"
                      onClick={() => setLogo(null)}
                    />
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <Button variant="outline" className="w-full h-32">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <Label>Posisi Logo</Label>
                <Select defaultValue="top-center">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih posisi logo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-left">Kiri Atas</SelectItem>
                    <SelectItem value="top-center">Tengah Atas</SelectItem>
                    <SelectItem value="top-right">Kanan Atas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Konten Sertifikat</CardTitle>
          <CardDescription>
            Atur teks dan konten yang akan ditampilkan pada sertifikat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Judul Sertifikat</Label>
                <Input placeholder="mis. Sertifikat Kursus Bahasa Inggris" />
              </div>
              <div className="space-y-2">
                <Label>Font Judul</Label>
                <Select defaultValue="montserrat">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih font untuk judul" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="playfair">Playfair Display</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Teks Konten</Label>
              <Textarea
                placeholder="Masukkan teks sertifikat. Gunakan {nama} untuk nama siswa, {tanggal} untuk tanggal, dll."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Tanda Tangan</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input placeholder="Nama penandatangan" />
                  <Input placeholder="Jabatan" />
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <Button variant="outline" className="w-full h-24">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Tanda Tangan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button onClick={() => onSave({})}>
          <FileText className="h-4 w-4 mr-2" />
          Simpan Template
        </Button>
      </div>
    </div>
  );
}
