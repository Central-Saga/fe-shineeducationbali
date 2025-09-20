"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, "Judul sertifikat harus diisi"),
  type: z.enum(["COURSE_COMPLETION", "ACHIEVEMENT", "PARTICIPATION"]),
  level: z.enum(["TK", "SD", "SMP", "SMA/SMK", "UMUM"]),
  program: z.enum(["ENGLISH", "MATH", "CODING", "CALISTUNG"]),
  description: z.string().min(1, "Deskripsi harus diisi"),
  achievementDate: z.string().min(1, "Tanggal harus diisi"),
  validityPeriod: z.enum(["12", "24", "36", "0"]),
  templateId: z.string().min(1, "Template harus dipilih"),
});

const templates = [
  {
    id: "template1",
    name: "Template Standar",
    thumbnail: "/certificates/english-basic-thumb.jpg",
    preview: "/certificates/english-basic.jpg",
    description: "Template standar untuk sertifikat penyelesaian kursus",
  },
  {
    id: "template2",
    name: "Template Prestasi",
    thumbnail: "/certificates/achievement-thumb.jpg",
    preview: "/certificates/achievement.jpg",
    description: "Template untuk sertifikat prestasi",
  },
  {
    id: "template3",
    name: "Template Spesial",
    thumbnail: "/certificates/special-thumb.jpg",
    preview: "/certificates/special.jpg",
    description: "Template untuk sertifikat spesial",
  },
];

export type CertificateFormData = z.infer<typeof formSchema>;

export interface CertificateFormProps {
  onSubmit: (data: CertificateFormData) => Promise<void>;
  showCancelButton?: boolean;
}

export function CertificateForm({
  onSubmit,
  showCancelButton = true,
}: CertificateFormProps) {
  const router = useRouter();
  const form = useForm<CertificateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: undefined,
      level: undefined,
      program: undefined,
      validityPeriod: "24",
      templateId: undefined,
    },
  });

  const [selectedTemplate, setSelectedTemplate] = useState<
    string | undefined
  >();

  const handleSubmit = async (data: CertificateFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error("Failed to issue certificate:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Certificate Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detail Sertifikat</CardTitle>
              <CardDescription>
                Isi informasi detail untuk sertifikat yang akan diterbitkan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Sertifikat</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Masukkan nama sertifikat"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Sertifikat</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis sertifikat" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="COURSE_COMPLETION">
                            Penyelesaian Kursus
                          </SelectItem>
                          <SelectItem value="ACHIEVEMENT">Prestasi</SelectItem>
                          <SelectItem value="PARTICIPATION">
                            Partisipasi
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenjang Pendidikan</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenjang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TK">TK</SelectItem>
                          <SelectItem value="SD">SD</SelectItem>
                          <SelectItem value="SMP">SMP</SelectItem>
                          <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                          <SelectItem value="UMUM">Umum</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="program"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ENGLISH">
                            Bahasa Inggris
                          </SelectItem>
                          <SelectItem value="MATH">Matematika</SelectItem>
                          <SelectItem value="CODING">Coding</SelectItem>
                          <SelectItem value="CALISTUNG">Calistung</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Masukkan deskripsi sertifikat"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="achievementDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Sertifikat</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="validityPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Masa Berlaku</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih masa berlaku" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="12">12 Bulan</SelectItem>
                          <SelectItem value="24">24 Bulan</SelectItem>
                          <SelectItem value="36">36 Bulan</SelectItem>
                          <SelectItem value="0">Tidak ada batas</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Template Selection & Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Template Sertifikat</CardTitle>
              <CardDescription>
                Pilih dan preview template sertifikat yang akan digunakan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {" "}
              <FormField
                control={form.control}
                name="templateId"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>Pilih Template</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedTemplate(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih template sertifikat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-8 relative">
                                <Image
                                  src={template.thumbnail}
                                  alt={template.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {template.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {template.description}
                                </div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>{" "}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Template Preview */}
              {selectedTemplate && (
                <div className="mt-8 space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      Preview Template
                    </h4>
                    <p className="text-sm text-gray-500">
                      {
                        templates.find((t) => t.id === selectedTemplate)
                          ?.description
                      }
                    </p>
                  </div>
                  <div className="rounded-lg border-2 border-gray-200 overflow-hidden bg-white shadow-sm">
                    <div className="aspect-[1.4] relative">
                      <Image
                        src={
                          templates.find((t) => t.id === selectedTemplate)
                            ?.preview || templates[0].preview
                        }
                        alt="Template Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2">
          {showCancelButton && (
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Batal
            </Button>
          )}
          <Button type="submit" className="bg-[#C40503] hover:bg-[#DAA625]">
            Terbitkan Sertifikat
          </Button>
        </div>
      </form>
    </Form>
  );
}
