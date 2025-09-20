"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { teacherService } from "@/lib/services/teacher.service";
import { toast } from "sonner";
import {
  EducationLevel,
  TeacherFormData,
  Teacher,
  defaultTeacherValues,
} from "@/types/teacher";
import { FormInputProps } from "@/types/form";
import { z } from "zod";
import { Header } from "@/components/ui-admin/layout";

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
  educationLevel: z.array(z.enum(["SD", "SMP", "SMA/SMK"] as const)).min(1, "Pilih minimal satu jenjang pendidikan"),
  specialization: z.array(z.string()).min(1, "Pilih minimal satu spesialisasi"),
  yearsOfExperience: z.number().min(0, "Pengalaman tidak boleh negatif"),
  certifications: z.array(z.string()),
  status: z.enum(["ACTIVE", "INACTIVE"] as const),
  schedule: z.record(z.string(), z.array(z.string())),
});

interface TeacherFormProps {
  teacherId?: string;
  isEdit?: boolean;
}

export default function TeacherForm({ teacherId, isEdit = false }: TeacherFormProps) {
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultTeacherValues,
  });

  useEffect(() => {
    if (isEdit && teacherId) {
      const loadTeacher = async () => {
        try {
          setLoading(true);
          const data = await teacherService.getTeacherById(teacherId);
          if (!data) {
            toast.error("Data guru tidak ditemukan");
            router.push("/dashboard/users/teachers");
            return;
          }
          setTeacher(data);
          form.reset({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            subjects: data.subjects,
            educationLevel: data.educationLevel,
            specialization: data.specialization,
            yearsOfExperience: data.yearsOfExperience,
            certifications: data.certifications,
            status: data.status,
            schedule: data.schedule,
          });
        } catch (error) {
          console.error(error);
          toast.error("Gagal memuat data guru");
          router.push("/dashboard/users/teachers");
        } finally {
          setLoading(false);
        }
      };

      loadTeacher();
    }
  }, [teacherId, isEdit, form, router]);

  // Generate initials from name
  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      
      if (isEdit && teacherId) {
        await teacherService.updateTeacher(teacherId, data);
        toast.success("Data guru berhasil diperbarui");
      } else {
        await teacherService.createTeacher(data);
        toast.success("Guru baru berhasil ditambahkan");
      }
      
      router.push("/dashboard/users/teachers");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(isEdit ? "Gagal memperbarui guru" : "Gagal menambahkan guru");
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Header
      header={{
        title: isEdit ? "Edit Data Guru" : "Tambah Guru Baru",
        description: isEdit ? "Perbarui informasi guru" : "Tambahkan guru baru ke sistem",
        showBackButton: true,
        backHref: "/dashboard/users/teachers",
        actions: [
          {
            label: isEdit ? "Simpan Perubahan" : "Tambah Guru",
            onClick: () => {
              const formElement = document.getElementById("teacher-form") as HTMLFormElement;
              if (formElement) {
                formElement.requestSubmit();
              }
            },
            icon: loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <Form {...form}>
        <form id="teacher-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
              {/* Profile Preview */}
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full bg-[#C40503] flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {form.watch("name") ? generateInitials(form.watch("name")) : "??"}
                  </span>
                </div>
              </div>

              {/* Basic Information */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama guru" {...field as FormInputProps} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Masukkan email" {...field as FormInputProps} />
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
                        <Input type="tel" placeholder="Masukkan no. telepon" {...field as FormInputProps} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Teaching Details */}
              <FormField
                control={form.control}
                name="subjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mata Pelajaran</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const currentValues = field.value || [];
                        if (!currentValues.includes(value)) {
                          field.onChange([...currentValues, value]);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih mata pelajaran" />
                        </SelectTrigger>
                      </FormControl>
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

              {/* Education Level */}
              <FormField
                control={form.control}
                name="educationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenjang Mengajar</FormLabel>
                    <Select
                      onValueChange={(value: EducationLevel) => {
                        const currentValues = field.value || [];
                        if (!currentValues.includes(value)) {
                          field.onChange([...currentValues, value]);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenjang" />
                        </SelectTrigger>
                      </FormControl>
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

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Aktif</SelectItem>
                        <SelectItem value="INACTIVE">Nonaktif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Specialization */}
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spesialisasi</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const currentValues = field.value || [];
                        if (!currentValues.includes(value)) {
                          field.onChange([...currentValues, value]);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih spesialisasi" />
                        </SelectTrigger>
                      </FormControl>
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

              {/* Years of Experience */}
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

              {/* Certifications */}
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
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEdit ? "Simpan Perubahan" : "Tambah Guru"}
                </Button>
              </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </Header>
  );
}
