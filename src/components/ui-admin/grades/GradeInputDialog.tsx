"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface GradeFormData {
  studentId: string;
  level: string;
  subject: string;
  teacherId: string;
  scores: {
    speaking: number;
    reading: number;
    writing: number;
    listening: number;
    vocabulary: number;
  };
}

const initialFormData: GradeFormData = {
  studentId: "",
  level: "",
  subject: "",
  teacherId: "",
  scores: {
    speaking: 0,
    reading: 0,
    writing: 0,
    listening: 0,
    vocabulary: 0,
  },
};

export function GradeInputDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<GradeFormData>(initialFormData);
  const router = useRouter();

  const handleInputChange = (field: keyof GradeFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleScoreChange = (
    component: keyof GradeFormData["scores"],
    value: string
  ) => {
    const numValue = value === "" ? 0 : Math.min(100, Math.max(0, parseInt(value)));
    setFormData((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [component]: numValue,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      // TODO: Implement API call
      const response = await fetch("/api/v1/grades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setOpen(false);
        setFormData(initialFormData);
        router.refresh(); // Refresh the page to show new data
      } else {
        console.error("Failed to save grade");
      }
    } catch (error) {
      console.error("Error saving grade:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Input Nilai Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Input Nilai Siswa</DialogTitle>
          <DialogDescription>
            Masukkan nilai siswa sesuai dengan komponen penilaian
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">ID Nilai</Label>
            <Input
              className="col-span-3"
              disabled
              value="INB0001082"
              placeholder="Auto-generated"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Nama Siswa</Label>
            <Select
              value={formData.studentId}
              onValueChange={(value) => handleInputChange("studentId", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih siswa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Ani Susanti</SelectItem>
                <SelectItem value="2">Budi Santoso</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Level</Label>
            <Select
              value={formData.level}
              onValueChange={(value) => handleInputChange("level", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SD">SD</SelectItem>
                <SelectItem value="SMP">SMP</SelectItem>
                <SelectItem value="SMA">SMA</SelectItem>
                <SelectItem value="UMUM">Umum</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Mata Pelajaran</Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleInputChange("subject", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih mata pelajaran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">Bahasa Inggris</SelectItem>
                <SelectItem value="math">Matematika</SelectItem>
                <SelectItem value="computer">Komputer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Pengajar</Label>
            <Select
              value={formData.teacherId}
              onValueChange={(value) => handleInputChange("teacherId", value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih pengajar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Kadek Mawar Sopiani, S.Pd</SelectItem>
                <SelectItem value="2">Made Wijaya, S.Pd</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg p-4 space-y-4">
            <h4 className="font-medium mb-2">Komponen Nilai</h4>
            {Object.entries(formData.scores).map(([component, score]) => (
              <div key={component} className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right capitalize">{component}</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={score}
                  onChange={(e) =>
                    handleScoreChange(
                      component as keyof GradeFormData["scores"],
                      e.target.value
                    )
                  }
                  placeholder="0-100"
                  className="col-span-3"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setFormData(initialFormData);
            }}
          >
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan Nilai</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
