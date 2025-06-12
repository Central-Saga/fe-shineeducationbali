"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { subjectsData } from "@/data/data-admin/grades-data/grades-data";

export function SubjectCards() {
  const router = useRouter();

  const handleDetailClick = (subjectId: number) => {
    router.push(`/dashboard/grades/${subjectId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          <Input placeholder="Cari mata pelajaran..." className="w-[300px]" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Semua Jenjang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Jenjang</SelectItem>
              <SelectItem value="SD">SD</SelectItem>
              <SelectItem value="SMP">SMP</SelectItem>
              <SelectItem value="SMA">SMA</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Urutkan berdasarkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nama</SelectItem>
              <SelectItem value="averageScore">Rata-rata Nilai</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="default">Input Nilai Baru</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjectsData.map((subject) => (
          <Card key={subject.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                {subject.name}
              </CardTitle>
              <Badge>{subject.level}</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Total Siswa</p>
                    <p className="font-medium">{subject.totalStudents}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Rata-rata</p>
                    <p className="font-medium">{subject.averageScore}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Nilai Tertinggi</p>
                    <p className="font-medium">{subject.highestScore}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Nilai Terendah</p>
                    <p className="font-medium">{subject.lowestScore}</p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDetailClick(subject.id)}
                  >
                    Detail
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Hapus
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
