"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/ui-admin/layout/Header";
import { ArrowLeft, Save, X } from "lucide-react";
import { apiRequest } from "@/lib/api";

interface GradeFormData {
  studentName: string;
  subject: string;
  level: string;
  assignmentScore: number;
  quizScore: number;
  midtermScore: number;
  finalScore: number;
  attendanceScore: number;
  participationScore: number;
  notes: string;
}

export function AddGrades() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<GradeFormData>({
    studentName: "",
    subject: "",
    level: "",
    assignmentScore: 0,
    quizScore: 0,
    midtermScore: 0,
    finalScore: 0,
    attendanceScore: 0,
    participationScore: 0,
    notes: "",
  });

  const handleInputChange = (field: keyof GradeFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateAverageScore = () => {
    const { assignmentScore, quizScore, midtermScore, finalScore, attendanceScore, participationScore } = formData;
    const total = assignmentScore + quizScore + midtermScore + finalScore + attendanceScore + participationScore;
    return (total / 6).toFixed(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const averageScore = parseFloat(calculateAverageScore());
      const gradeData = {
        ...formData,
        averageScore,
        status: "SELESAI",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await apiRequest("POST", "/api/v1/grades", gradeData);
      router.push("/dashboard/grades");
    } catch (error) {
      console.error("Error creating grade:", error);
      alert("Gagal menyimpan data nilai");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard/grades");
  };

  return (
    <Header
      header={{
        title: "Tambah Nilai Siswa",
        description: "Input nilai siswa untuk mata pelajaran Bahasa Inggris atau Komputer",
        actions: [
          {
            label: "Kembali",
            icon: <ArrowLeft className="h-4 w-4" />,
            onClick: handleCancel,
            variant: "outline",
          },
        ],
      }}
    >
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Input Nilai</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Name */}
                <div className="space-y-2">
                  <Label htmlFor="studentName">Nama Siswa</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => handleInputChange("studentName", e.target.value)}
                    placeholder="Masukkan nama siswa"
                    required
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Mata Pelajaran</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleInputChange("subject", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mata pelajaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bahasa Inggris">Bahasa Inggris</SelectItem>
                      <SelectItem value="Komputer">Komputer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Level */}
                <div className="space-y-2">
                  <Label htmlFor="level">Jenjang</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => handleInputChange("level", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenjang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TK">TK</SelectItem>
                      <SelectItem value="SD">SD</SelectItem>
                      <SelectItem value="SMP">SMP</SelectItem>
                      <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                      <SelectItem value="UMUM">Umum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Average Score Display */}
                <div className="space-y-2">
                  <Label>Nilai Rata-rata</Label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <span className="text-2xl font-bold text-[#C40503]">
                      {calculateAverageScore()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Score Inputs */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Komponen Penilaian</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignmentScore">Nilai Tugas</Label>
                    <Input
                      id="assignmentScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.assignmentScore}
                      onChange={(e) => handleInputChange("assignmentScore", parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quizScore">Nilai Kuis</Label>
                    <Input
                      id="quizScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.quizScore}
                      onChange={(e) => handleInputChange("quizScore", parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="midtermScore">Nilai UTS</Label>
                    <Input
                      id="midtermScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.midtermScore}
                      onChange={(e) => handleInputChange("midtermScore", parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="finalScore">Nilai UAS</Label>
                    <Input
                      id="finalScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.finalScore}
                      onChange={(e) => handleInputChange("finalScore", parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attendanceScore">Nilai Kehadiran</Label>
                    <Input
                      id="attendanceScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.attendanceScore}
                      onChange={(e) => handleInputChange("attendanceScore", parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="participationScore">Nilai Partisipasi</Label>
                    <Input
                      id="participationScore"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.participationScore}
                      onChange={(e) => handleInputChange("participationScore", parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Catatan</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Masukkan catatan tambahan (opsional)"
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X className="h-4 w-4 mr-2" />
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#C40503] hover:bg-[#A30402]"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? "Menyimpan..." : "Simpan Nilai"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
}
