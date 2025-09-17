"use client";

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
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, Video, Book } from "lucide-react";

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return <FileText className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    default:
      return <Book className="h-4 w-4" />;
  }
};

export default function CourseMaterialsPage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Materi Pembelajaran
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Cari materi..."
                className="pl-8 h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Materi
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul Materi</TableHead>
                <TableHead>Kursus</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>Ukuran</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Upload</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "MAT001",
                  title: "Pengenalan Aljabar",
                  course: "Matematika Dasar",
                  type: "PDF",
                  size: "2.5 MB",
                  status: "published",
                  uploadDate: "2024-02-01",
                },
                {
                  id: "MAT002",
                  title: "Tutorial Integral",
                  course: "Matematika Lanjutan",
                  type: "Video",
                  size: "156 MB",
                  status: "published",
                  uploadDate: "2024-02-05",
                },
                {
                  id: "MAT003",
                  title: "Latihan Soal Bab 1",
                  course: "Fisika Dasar",
                  type: "PDF",
                  size: "1.8 MB",
                  status: "draft",
                  uploadDate: "2024-02-10",
                },
              ].map((material) => (
                <TableRow key={material.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getFileIcon(material.type)}
                      {material.title}
                    </div>
                  </TableCell>
                  <TableCell>{material.course}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{material.type}</Badge>
                  </TableCell>
                  <TableCell>{material.size}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        material.status === "published"
                          ? "success"
                          : "secondary"
                      }
                    >
                      {material.status === "published" ? "Terbit" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(material.uploadDate).toLocaleDateString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Unduh
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Material Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Materi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">125</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dokumen PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Video</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">32</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lainnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">15</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
