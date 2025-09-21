"use client";

import { useState } from "react";
// import { CourseMaterial } from "@/types/course";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Video, HelpCircle, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

export function MaterialList() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Materi Pembelajaran
          </h2>
          <p className="text-muted-foreground">
            Kelola materi dan konten pembelajaran
          </p>
        </div>
        <Button>Tambah Materi</Button>
      </div>

      {/* Course Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pilih Kursus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Pilih kursus untuk melihat materi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eng001">Bahasa Inggris Dasar</SelectItem>
                <SelectItem value="math001">Matematika SD</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Cari materi..." className="flex-1" />
          </div>
        </CardContent>
      </Card>

      {/* Materials List */}
      {selectedCourse && (
        <div className="space-y-4">
          {/* Sample Material Item */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <GripVertical className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <h3 className="font-medium">Pengenalan Grammar Dasar</h3>
                    <Badge variant="outline">Dokumen</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Materi pengenalan tenses dan struktur kalimat dasar
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Published</Badge>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <GripVertical className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <h3 className="font-medium">Tutorial Pronunciation</h3>
                    <Badge variant="outline">Video</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Video tutorial cara pengucapan yang benar
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Draft</Badge>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <GripVertical className="h-5 w-5 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    <h3 className="font-medium">Latihan Soal Pertemuan 1</h3>
                    <Badge variant="outline">Quiz</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kuis dan latihan untuk mengukur pemahaman
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Published</Badge>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    Preview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
