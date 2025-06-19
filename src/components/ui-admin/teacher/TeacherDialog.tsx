"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { Teacher, TeacherFormData, EducationLevel } from "@/types/teacher";
import { teacherService } from "@/lib/services/teacher.service";
import { uploadImage } from "@/lib/utils/upload";
import { toast } from "sonner";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  phoneNumber: z.string().min(10, {
    message: "No. Telepon tidak valid.",
  }),
  subjects: z.array(z.string()).min(1, "Pilih minimal satu mata pelajaran"),
  educationLevel: z.array(z.enum(["SD", "SMP", "SMA/SMK"])).min(1, "Pilih minimal satu jenjang pendidikan"),
  specialization: z.array(z.string()).min(1, "Pilih minimal satu spesialisasi"),
  yearsOfExperience: z.number().min(0, "Pengalaman tidak boleh negatif"),
  certifications: z.array(z.string()),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  profilePhoto: z.string().min(1, "Foto profil harus diupload"),
  schedule: z.record(z.string(), z.array(z.string()))
}) satisfies z.ZodType<TeacherFormData>;

const subjects = [
  "Matematika",
  "IPA",
  "IPS",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Fisika",
  "Kimia",
  "Biologi",
];

interface TeacherDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: "create" | "edit";
  teacher?: Teacher;
}

export function TeacherDialog({
  open,
  onOpenChange,
  mode = "create",
  teacher,
}: TeacherDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(teacher?.profilePhoto || null);

  const form = useForm<TeacherFormData>({
    resolver: zodResolver(formSchema as any),
    defaultValues: teacher || {
      name: "",
      email: "",
      phoneNumber: "",
      subjects: [],
      educationLevel: [],
      status: "ACTIVE",
      specialization: [],
      yearsOfExperience: 0,
      certifications: [],
      profilePhoto: "",
      schedule: {},
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      form.setValue("profilePhoto", imageUrl);
      setImagePreview(imageUrl);
    } catch (error) {
      toast.error("Gagal mengupload gambar");
    }
  };

  async function onSubmit(data: TeacherFormData) {
    try {
      setIsLoading(true);
      if (mode === "create") {
        await teacherService.createTeacher(data);
        toast.success("Guru berhasil ditambahkan");
      } else if (teacher?.id) {
        await teacherService.updateTeacher(teacher.id, data);
        toast.success("Data guru berhasil diperbarui");
      }
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Tambah Guru Baru" : "Edit Data Guru"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Photo */}
            <div className="flex justify-center">
              <FormField
                control={form.control}
                name="profilePhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary relative">
                        {imagePreview ? (
                          <Image
                            src={imagePreview}
                            alt="Profile preview"
                            width={128}
                            height={128}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400" />
                            <span className="text-sm text-gray-500 mt-2">Upload Foto</span>
                          </>
                        )}
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama lengkap" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Masukkan email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telepon</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Masukkan no. telepon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mata Pelajaran</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (!field.value.includes(value)) {
                        field.onChange([...field.value, value]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mata pelajaran" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((subject) => (
                        <Badge
                          key={subject}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {subject}
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((s) => s !== subject)
                              );
                            }}
                            className="ml-1 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenjang Mengajar</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (!field.value.includes(value as EducationLevel)) {
                        field.onChange([...field.value, value as EducationLevel]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenjang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SD">SD</SelectItem>
                      <SelectItem value="SMP">SMP</SelectItem>
                      <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((level) => (
                        <Badge
                          key={level}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {level}
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((l) => l !== level)
                              );
                            }}
                            className="ml-1 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Aktif</SelectItem>
                      <SelectItem value="INACTIVE">Nonaktif</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Spesialisasi</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      if (!field.value.includes(value)) {
                        field.onChange([...field.value, value]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih spesialisasi" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((specialization) => (
                        <Badge
                          key={specialization}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {specialization}
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((s) => s !== specialization)
                              );
                            }}
                            className="ml-1 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pengalaman Mengajar (Tahun)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="certifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sertifikasi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan sertifikasi dan tekan Enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = e.currentTarget.value.trim();
                          if (value && !field.value.includes(value)) {
                            field.onChange([...field.value, value]);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                  </FormControl>
                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((cert) => (
                        <Badge
                          key={cert}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          {cert}
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((c) => c !== cert)
                              );
                            }}
                            className="ml-1 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "create" ? "Tambah" : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
