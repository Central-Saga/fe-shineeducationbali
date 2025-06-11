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
import { Plus } from "lucide-react";

export default function CourseCategoriesPage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Kategori Kursus
          </CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Kategori
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kategori</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Jumlah Kursus</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "CAT001",
                  name: "Matematika",
                  description:
                    "Kursus-kursus matematika dari dasar hingga lanjutan",
                  courseCount: 12,
                  status: "active",
                },
                {
                  id: "CAT002",
                  name: "Fisika",
                  description: "Kursus fisika untuk persiapan ujian",
                  courseCount: 8,
                  status: "active",
                },
                {
                  id: "CAT003",
                  name: "Bahasa",
                  description: "Kursus bahasa asing dan lokal",
                  courseCount: 15,
                  status: "active",
                },
              ].map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.courseCount} kursus</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        category.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {category.status === "active" ? "Aktif" : "Nonaktif"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Kategori Aktif</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">6</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rata-rata Kursus/Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">11.6</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
