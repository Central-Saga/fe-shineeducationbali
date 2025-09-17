"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { coursesData } from "@/data/data-admin/courses-data/courses-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.courseId as string;

  // Find course data
  const course = coursesData.find(
    (c) => "COURSE" + String(c.id).padStart(3, "0") === courseId
  );

  if (!course) {
    return <div>Kursus tidak ditemukan</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{course.name}</h1>
          <p className="text-muted-foreground">{course.schedule}</p>
        </div>
        <Badge variant={course.status === "ACTIVE" ? "success" : "secondary"}>
          {course.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="materials">Materi</TabsTrigger>
          <TabsTrigger value="students">Siswa</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kategori</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{course.category}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{course.level}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Durasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">90 menit</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Jumlah Siswa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{course.totalStudents}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Pengajar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">{course.teacher}</div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Daftar Materi</CardTitle>
              <Button>Upload Materi</Button>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                Belum ada materi yang diupload
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Siswa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                Menampilkan {course.totalStudents} siswa terdaftar
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
