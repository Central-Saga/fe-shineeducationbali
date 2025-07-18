"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import { teacherService } from "@/lib/services/teacher.service";
import { uploadImage } from "@/lib/utils/upload";
import { toast } from "sonner";
import {
  EducationLevel,
  TeacherFormData,
  Teacher,
  defaultTeacherValues,
} from "@/types/teacher";
import { FormInputProps } from "@/types/form";
import { z } from "zod";
import Image from "next/image";

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
  educationLevel: z
    .array(z.enum(["SD", "SMP", "SMA/SMK"] as const))
    .min(1, "Pilih minimal satu jenjang pendidikan"),
  specialization: z.array(z.string()).min(1, "Pilih minimal satu spesialisasi"),
  yearsOfExperience: z.number().min(0, "Pengalaman tidak boleh negatif"),
  certifications: z.array(z.string()),
  status: z.enum(["ACTIVE", "INACTIVE"] as const),
  profilePhoto: z.union([z.string(), z.null()]),
  schedule: z.record(z.string(), z.array(z.string())),
});

export default function EditTeacherPage() {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const router = useRouter();
  const params = useParams();
  const teacherId = params.teacherId as string;

  const form = useForm<TeacherFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultTeacherValues,
  });

  useEffect(() => {
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
        setImagePreview(data.profilePhoto);
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
          profilePhoto: data.profilePhoto,
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
  }, [teacherId, form, router]);

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

  const onSubmit = async (data: TeacherFormData) => {
    try {
      setLoading(true);
      await teacherService.updateTeacher(teacherId, data);
      toast.success("Data guru berhasil diperbarui");
      router.push("/dashboard/users/teachers");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Gagal memperbarui data guru");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !teacher) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Edit Data Guru
        </h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                              <span className="text-sm text-gray-500 mt-2">
                                Upload Foto
                              </span>
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
                  Simpan
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
