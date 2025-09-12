"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User2, Mail, Phone, Calendar, MapPin, Users, Edit2 } from "lucide-react";
import { studentService } from "@/lib/services/student.service";
import { toast } from "sonner";
import { Student } from "@/types/student";
import { Header } from "@/components/ui-admin/layout";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface StudentDetailProps {
  studentId: string;
}

export default function StudentDetail({ studentId }: StudentDetailProps) {
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  const router = useRouter();

  useEffect(() => {
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
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat data siswa");
        router.push("/dashboard/users/students");
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [studentId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Data siswa tidak ditemukan</p>
      </div>
    );
  }

  return (
    <Header
      header={{
        title: "Detail Siswa",
        description: "Informasi lengkap data siswa",
        showBackButton: true,
        backHref: "/dashboard/users/students",
        actions: [
          {
            label: "Edit Data",
            onClick: () => router.push(`/dashboard/users/students/edit/${studentId}`),
            icon: <Edit2 className="h-4 w-4" />,
            variant: "default",
          },
        ],
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardContent className="p-8 space-y-6">
            <div className="flex flex-col items-center">
              {student.profilePhoto ? (
                <img
                  src={student.profilePhoto}
                  alt={student.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center">
                  <User2 className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <h2 className="mt-4 text-xl font-semibold">{student.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={student.status === "active" ? "success" : "secondary"}
                >
                  {student.status === "active" ? "Aktif" : "Nonaktif"}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{student.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{student.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>
                  Terdaftar: {format(new Date(student.enrollmentDate), "dd MMMM yyyy", { locale: id })}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{student.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Informasi Pendidikan</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Jenjang Pendidikan:</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {student.educationLevel}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Paket Kursus</h3>
              <div className="flex flex-wrap gap-2">
                {student.packages && student.packages.length > 0 ? (
                  student.packages.map((pkg) => (
                    <Badge
                      key={pkg.id}
                      variant={pkg.type === "regular" ? "default" : "secondary"}
                      className={
                        pkg.type === "regular" 
                          ? "bg-[#DAA625]/10 text-[#DAA625] hover:bg-[#DAA625]/10 border-[#DAA625]/20" 
                          : "bg-[#C40503]/10 text-[#C40503] hover:bg-[#C40503]/10 border-[#C40503]/20"
                      }
                    >
                      {pkg.name}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">Belum ada paket kursus</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Informasi Orang Tua</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nama Orang Tua:</span>
                  <span>{student.parentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">No. Telepon Orang Tua:</span>
                  <span>{student.parentPhone}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Mata Pelajaran</h3>
              <div className="space-y-2">
                {student.packages && student.packages.length > 0 ? (
                  student.packages.flatMap((pkg) =>
                    pkg.courses.map((course) => (
                      <div
                        key={`${pkg.id}-${course.name}`}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 bg-[#C40503] rounded-full"></div>
                        <span className="text-sm">{course.name}</span>
                      </div>
                    ))
                  )
                ) : (
                  <span className="text-gray-500">Belum ada mata pelajaran</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
}
