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
import Link from "next/link";
import { classesData } from "@/data/data-teacher/classes/classes-data";

export default function ClassList() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Kelas
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
            <Button className="bg-[#C40503] hover:bg-[#A60000]">
              <Plus className="mr-2 h-4 w-4" />
              Buat Kelas Baru
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Kelas</TableHead>
                <TableHead>Mata Pelajaran</TableHead>
                <TableHead>Jadwal</TableHead>
                <TableHead>Jumlah Siswa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classesData.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">
                    {classItem.name}
                  </TableCell>
                  <TableCell>{classItem.subject}</TableCell>
                  <TableCell>{classItem.schedule}</TableCell>
                  <TableCell>{classItem.studentCount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        classItem.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {classItem.status === "active" ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/dashboard-teacher/classes/${classItem.id}`}>
                        <Button variant="outline" size="sm">
                          Lihat Detail
                        </Button>
                      </Link>
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
