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
import { Plus, Search } from "lucide-react";

export default function ClassListPage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Daftar Kelas
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Cari kelas..."
                className="pl-8 h-9 w-64 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Tambah Kelas Baru
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kelas</TableHead>
                <TableHead>Pengajar</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead>Jumlah Siswa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "CLASS001",
                  name: "Matematika X-A",
                  teacher: "Dr. Yusuf Maulana",
                  schedule: "Senin & Rabu, 08:00 - 09:30",
                  students: 25,
                  status: "Aktif",
                },
                {
                  id: "CLASS002",
                  name: "Fisika XI-B",
                  teacher: "Drs. Adi Wijaya",
                  schedule: "Selasa & Kamis, 10:00 - 11:30",
                  students: 20,
                  status: "Aktif",
                },
                {
                  id: "CLASS003",
                  name: "Bahasa Inggris XII-A",
                  teacher: "Elisabeth Sari, M.Ed",
                  schedule: "Senin & Jumat, 13:00 - 14:30",
                  students: 28,
                  status: "Nonaktif",
                },
              ].map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">
                    {classItem.name}
                  </TableCell>
                  <TableCell>{classItem.teacher}</TableCell>
                  <TableCell>{classItem.schedule}</TableCell>
                  <TableCell>{classItem.students}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        classItem.status === "Aktif"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {classItem.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Detail
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
    </div>
  );
}
