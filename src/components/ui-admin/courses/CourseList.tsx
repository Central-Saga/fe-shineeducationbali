"use client";

import { useState } from "react";
import { Course } from "@/types/course";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Daftar Kursus</h2>
          <p className="text-muted-foreground">
            Kelola kursus dan program pembelajaran
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>Tambah Kursus</Button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Cari kursus..." />
        </div>
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="academic">Akademik</SelectItem>
              <SelectItem value="language">Bahasa</SelectItem>
              <SelectItem value="computer">Komputer</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Level</SelectItem>
              <SelectItem value="SD">SD</SelectItem>
              <SelectItem value="SMP">SMP</SelectItem>
              <SelectItem value="SMA">SMA</SelectItem>
              <SelectItem value="UMUM">Umum</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kode</TableHead>
              <TableHead>Nama Kursus</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Kapasitas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Sample data */}
            <TableRow>
              <TableCell>ENG001</TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">Bahasa Inggris Dasar</p>
                  <p className="text-sm text-muted-foreground">
                    Speaking dan Grammar untuk pemula
                  </p>
                </div>
              </TableCell>
              <TableCell>Bahasa</TableCell>
              <TableCell>SMP</TableCell>
              <TableCell>90 menit</TableCell>
              <TableCell>20 siswa</TableCell>
              <TableCell>
                <Badge variant="success">Aktif</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Materi
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
