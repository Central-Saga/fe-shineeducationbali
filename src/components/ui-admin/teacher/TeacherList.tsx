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
import { Edit2, Trash2 } from "lucide-react";

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
        <Button
          onClick={() => setDialogOpen(true)}
          className="bg-[#C40503] hover:bg-[#a50402] text-white"
        >
          Tambah Guru
        </Button>
      </div>

      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>NIP</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Spesialisasi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Kelas Aktif</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="hover:bg-gray-50">
                <TableCell>T{2023000 + i}</TableCell>
                <TableCell className="font-medium">
                  {["Budi Santoso", "Siti Rahayu", "Ahmad Wijaya", "Rina Kusuma", "Doni Pratama"][
                    i
                  ]}
                </TableCell>
                <TableCell>
                  <Badge className="bg-[#DAA625]/10 text-[#DAA625] hover:bg-[#DAA625]/10 border-[#DAA625]/20">
                    {["Matematika", "Bahasa Inggris", "IPA", "Seni", "Komputer"][i]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 border-none">
                    Aktif
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{i + 1}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-[#DAA625]"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 text-[#C40503]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TeacherDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        teacher={selectedTeacher as Teacher | undefined}
      />
    </div>
  );
}
