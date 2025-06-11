"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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

export default function StudentAssignmentPage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
              Penempatan Siswa
            </CardTitle>
            <CardDescription>
              Kelola penempatan siswa ke kelas berdasarkan paket yang telah
              dibeli
            </CardDescription>
          </div>
          <Button>Penempatan Massal</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>Paket Aktif</TableHead>
                <TableHead>Kelas Saat Ini</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terdaftar</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: "STD001",
                  name: "Ahmad Fauzi",
                  packages: [
                    { id: "PKG1", name: "Paket Reguler", type: "offline" },
                  ],
                  currentClass: "X-A Matematika",
                  status: "active",
                  registeredDate: "2024-01-15",
                },
                {
                  id: "STD002",
                  name: "Siti Rahma",
                  packages: [
                    { id: "PKG2", name: "Paket Premium", type: "offline" },
                    { id: "PKG3", name: "Online Course", type: "online" },
                  ],
                  currentClass: "XI-B Fisika",
                  status: "active",
                  registeredDate: "2024-01-20",
                },
                {
                  id: "STD003",
                  name: "Budi Santoso",
                  packages: [],
                  currentClass: "",
                  status: "inactive",
                  registeredDate: "2024-01-25",
                },
              ].map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {student.packages.map((pkg) => (
                        <Badge
                          key={pkg.id}
                          variant={
                            pkg.type === "offline" ? "default" : "outline"
                          }
                        >
                          {pkg.name}
                        </Badge>
                      ))}
                      {student.packages.length === 0 && "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {student.currentClass || "Belum ditempatkan"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "active" ? "success" : "destructive"
                      }
                    >
                      {student.status === "active" ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(student.registeredDate).toLocaleDateString(
                      "id-ID"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Tempatkan
                      </Button>
                      <Button variant="outline" size="sm">
                        Detail
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
