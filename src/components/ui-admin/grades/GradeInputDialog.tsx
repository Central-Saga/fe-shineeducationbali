"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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

export function GradeInputDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Input Nilai Baru</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Input Nilai Siswa</DialogTitle>
          <DialogDescription>
            Masukkan nilai siswa sesuai dengan komponen penilaian yang tersedia
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
            <Select>
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
            <Select>
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
            <Select>
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
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Pilih pengajar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Kadek Mawar Sopiani, S.Pd</SelectItem>
                <SelectItem value="2">Made Wijaya, S.Pd</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Komponen Nilai - akan muncul sesuai mata pelajaran yang dipilih */}
          <div className="border rounded-lg p-4 space-y-4">
            <h4 className="font-medium mb-2">Komponen Nilai</h4>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Speaking</Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Reading</Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Writing</Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Listening</Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Structure & Vocabulary</Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0-100"
                className="col-span-3"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button type="submit">Simpan Nilai</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
