"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Save } from "lucide-react";
import { studentService } from "@/lib/services/student.service";
import { toast } from "sonner";
import { Student, StudentPackage } from "@/types/student";
import { Header } from "@/components/ui-admin/layout";

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
  educationLevel: z.enum(["TK", "SD", "SMP", "SMA/SMK", "UMUM"] as const, {
    required_error: "Pilih jenjang pendidikan.",
  }),
  address: z.string().min(1, {
    message: "Alamat harus diisi.",
  }),
  parentName: z.string().min(1, {
    message: "Nama orang tua harus diisi.",
  }),
  parentPhone: z.string().min(10, {
    message: "No. Telepon orang tua tidak valid.",
  }),
  status: z.enum(["active", "inactive"] as const, {
    required_error: "Pilih status.",
  }),
  enrollmentDate: z.string().min(1, "Tanggal pendaftaran harus diisi"),
  packages: z.array(z.string()).min(1, "Pilih minimal satu paket kursus"),
  profilePhoto: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  name: "",
  email: "",
  phoneNumber: "",
  educationLevel: "SD",
  address: "",
  parentName: "",
  parentPhone: "",
  status: "active",
  enrollmentDate: new Date().toISOString().split("T")[0],
  packages: [],
  profilePhoto: "",
};

interface StudentFormProps {
  studentId?: string;
  isEdit?: boolean;
}

export default function StudentForm({ studentId, isEdit = false }: StudentFormProps) {
  const [loading, setLoading] = useState(false);
  const [, setStudent] = useState<Student | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isEdit && studentId) {
      const loadStudent = async () => {
        try {
          setLoading(true);
          const data = await studentService.getStudentById(studentId);
          if (!data) {
            toast.error("Data siswa tidak ditemukan");
            router.push("/dashboard/users/students");
            return;
          }
          setStudent(data);
          form.reset({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            educationLevel: data.educationLevel,
            address: data.address,
            parentName: data.parentName,
            parentPhone: data.parentPhone,
            status: data.status,
            enrollmentDate: data.enrollmentDate,
            packages: data.packages.map((p) => p.id),
            profilePhoto: data.profilePhoto || "",
          });
        } catch (error) {
          console.error(error);
          toast.error("Gagal memuat data siswa");
          router.push("/dashboard/users/students");
        } finally {
          setLoading(false);
        }
      };

      loadStudent();
    }
  }, [studentId, isEdit, form, router]);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      const { packages, ...createData } = data;
      
      // Convert packages from string[] to StudentPackage[]
      const studentPackages: StudentPackage[] = packages.map((pkgId, index) => ({
        id: `pkg-${index}`,
        name: `Paket ${pkgId}`,
        type: "regular" as const,
        programs: [],
        duration: 6,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: "active" as const,
        price: 0,
      }));
      
      const studentData = {
        ...createData,
        packages: studentPackages,
      };
      
      if (isEdit && studentId) {
        await studentService.updateStudent(studentId, studentData);
        toast.success("Data siswa berhasil diperbarui");
      } else {
        await studentService.createStudent(studentData);
        toast.success("Siswa baru berhasil ditambahkan");
      }
      
      router.push("/dashboard/users/students");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(isEdit ? "Gagal memperbarui siswa" : "Gagal menambahkan siswa");
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
        title: isEdit ? "Edit Data Siswa" : "Tambah Siswa Baru",
        description: isEdit ? "Perbarui informasi siswa" : "Tambahkan siswa baru ke sistem",
        showBackButton: true,
        backHref: "/dashboard/users/students",
        actions: [
          {
            label: isEdit ? "Simpan Perubahan" : "Tambah Siswa",
            onClick: () => {
              const formElement = document.getElementById("student-form") as HTMLFormElement;
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
        <form id="student-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama siswa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="educationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenjang Pendidikan</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jenjang pendidikan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TK">TK</SelectItem>
                          <SelectItem value="SD">SD</SelectItem>
                          <SelectItem value="SMP">SMP</SelectItem>
                          <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                          <SelectItem value="UMUM">UMUM</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Masukkan alamat email"
                        {...field}
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
                      <Input
                        type="tel"
                        placeholder="Masukkan nomor telepon"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paket Kursus</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Select
                          onValueChange={(value) => {
                            if (!field.value.includes(value)) {
                              field.onChange([...field.value, value]);
                            }
                          }}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih paket kursus" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">
                              Basic Package
                            </SelectItem>
                            <SelectItem value="standard">
                              Standard Package
                            </SelectItem>
                            <SelectItem value="premium">
                              Premium Package
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    {field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((packageId) => (
                          <Badge
                            key={packageId}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {packageId === "basic"
                              ? "Basic Package"
                              : packageId === "standard"
                              ? "Standard Package"
                              : "Premium Package"}
                            <button
                              type="button"
                              onClick={() => {
                                field.onChange(
                                  field.value.filter((id) => id !== packageId)
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
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Aktif</SelectItem>
                          <SelectItem value="inactive">Nonaktif</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukkan alamat lengkap"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Orang Tua</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nama orang tua"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="parentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telepon Orang Tua</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Masukkan nomor telepon orang tua"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="enrollmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Pendaftaran</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEdit ? "Simpan Perubahan" : "Tambah Siswa"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </Header>
  );
}
