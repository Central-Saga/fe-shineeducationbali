"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

// Dummy data untuk mata pelajaran
const subjectsData = [
  {
    id: 1,
    name: "Bahasa Inggris",
    totalStudents: 45,
    averageScore: 85.5,
    highestScore: 98,
    lowestScore: 65,
    level: "SMP",
  },
  {
    id: 2,
    name: "Matematika",
    totalStudents: 50,
    averageScore: 78.3,
    highestScore: 95,
    lowestScore: 60,
    level: "SMP",
  },
  {
    id: 3,
    name: "IPA",
    totalStudents: 48,
    averageScore: 82.7,
    highestScore: 96,
    lowestScore: 68,
    level: "SMP",
  },
  {
    id: 4,
    name: "Bahasa Indonesia",
    totalStudents: 52,
    averageScore: 88.2,
    highestScore: 99,
    lowestScore: 70,
    level: "SMP",
  },
  {
    id: 5,
    name: "IPS",
    totalStudents: 47,
    averageScore: 81.5,
    highestScore: 94,
    lowestScore: 63,
    level: "SMP",
  },
];

export function SubjectCards() {
  const router = useRouter();

  const handleDetailClick = (subjectId: number) => {
    router.push(`/dashboard/grades/${subjectId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Cari mata pelajaran..."
            className="w-[300px]"
          />
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
        <Button variant="default">
          Input Nilai Baru
        </Button>
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
