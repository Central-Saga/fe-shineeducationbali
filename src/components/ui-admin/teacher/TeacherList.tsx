"use client";

import { useState } from "react";
import { Teacher } from "@/types/teacher";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeacherDialog } from "./TeacherDialog";
import { Badge } from "@/components/ui/badge";

export function TeacherList() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Daftar Guru</h2>
          <p className="text-muted-foreground">
            Kelola data guru dan penugasan mengajar
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>Tambah Guru</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NIP</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Spesialisasi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Kelas Aktif</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{/* Data guru akan di-map di sini */}</TableBody>
        </Table>
      </div>

      <TeacherDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        teacher={selectedTeacher || undefined}
      />
    </div>
  );
}
