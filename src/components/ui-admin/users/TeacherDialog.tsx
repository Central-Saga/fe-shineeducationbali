"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { teacherService } from "@/lib/services/teacher.service";
import type { Teacher } from "@/types/teacher";

const teacherFormSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Email tidak valid"),
  phoneNumber: z.string().min(1, "No. Telepon harus diisi"),
  profilePhoto: z.union([z.string(), z.null()]),
  subjects: z.array(z.string()).min(1, "Pilih minimal satu mata pelajaran"),
  educationLevel: z
    .array(z.enum(["SD", "SMP", "SMA"]))
    .min(1, "Pilih minimal satu tingkat pendidikan"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  specialization: z.array(z.string()).min(1, "Pilih minimal satu spesialisasi"),
  yearsOfExperience: z.number().min(0, "Pengalaman mengajar harus valid"),
  certifications: z.array(z.string()),
  schedule: z.record(z.string(), z.array(z.string())),
});

type FormValues = z.infer<typeof teacherFormSchema>;

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

  const form = useForm<FormValues>({
    resolver: zodResolver(teacherFormSchema),
    defaultValues: teacher || {
      name: "",
      email: "",
      phoneNumber: "",
      profilePhoto: null,
      subjects: [],
      educationLevel: [],
      status: "ACTIVE",
      specialization: [],
      yearsOfExperience: 0,
      certifications: [],
      schedule: {},
    },
  });

  async function onSubmit(data: FormValues) {
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
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Masukkan nama lengkap" />
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
                      <Input
                        {...field}
                        type="email"
                        placeholder="Masukkan email"
                      />
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
                      <Input {...field} placeholder="Masukkan nomor telepon" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="profilePhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto Profil</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // You'll need to implement file upload and get URL
                          // For now, we'll just store null
                          field.onChange(null);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subjects"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mata Pelajaran</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const current = field.value || [];
                      if (!current.includes(value)) {
                        field.onChange([...current, value]);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih mata pelajaran" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="matematika">Matematika</SelectItem>
                      <SelectItem value="bahasa_inggris">
                        Bahasa Inggris
                      </SelectItem>
                      <SelectItem value="ipa">IPA</SelectItem>
                      <SelectItem value="ips">IPS</SelectItem>
                      <SelectItem value="coding">Coding</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((subject) => (
                        <div
                          key={subject}
                          className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                        >
                          <span>{subject}</span>
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((item) => item !== subject)
                              );
                            }}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </div>
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
                  <FormLabel>Tingkat Pendidikan</FormLabel>
                  <Select
                    onValueChange={(value: "SD" | "SMP" | "SMA") => {
                      const current = field.value || [];
                      if (!current.includes(value)) {
                        field.onChange([...current, value]);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tingkat pendidikan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SD">SD</SelectItem>
                      <SelectItem value="SMP">SMP</SelectItem>
                      <SelectItem value="SMA">SMA</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((level) => (
                        <div
                          key={level}
                          className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                        >
                          <span>{level}</span>
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((item) => item !== level)
                              );
                            }}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </div>
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Aktif</SelectItem>
                      <SelectItem value="INACTIVE">Tidak Aktif</SelectItem>
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
                      const current = field.value || [];
                      if (!current.includes(value)) {
                        field.onChange([...current, value]);
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih spesialisasi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="matematika">Matematika</SelectItem>
                      <SelectItem value="bahasa_inggris">
                        Bahasa Inggris
                      </SelectItem>
                      <SelectItem value="ipa">IPA</SelectItem>
                      <SelectItem value="ips">IPS</SelectItem>
                      <SelectItem value="coding">Coding</SelectItem>
                    </SelectContent>
                  </Select>
                  {field.value?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {field.value.map((spec) => (
                        <div
                          key={spec}
                          className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                        >
                          <span>{spec}</span>
                          <button
                            type="button"
                            onClick={() => {
                              field.onChange(
                                field.value.filter((item) => item !== spec)
                              );
                            }}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </div>
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
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="Masukkan jumlah tahun pengalaman"
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
                    <div className="space-y-2">
                      <Input
                        placeholder="Tambahkan sertifikasi"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const value = e.currentTarget.value.trim();
                            if (value) {
                              field.onChange([...(field.value || []), value]);
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                      />
                      {field.value?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((cert) => (
                            <div
                              key={cert}
                              className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                            >
                              <span>{cert}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  field.onChange(
                                    field.value.filter((item) => item !== cert)
                                  );
                                }}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Menyimpan..."
                  : mode === "create"
                  ? "Simpan"
                  : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
