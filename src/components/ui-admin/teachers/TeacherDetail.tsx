"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User2, Mail, Phone, Calendar, Edit2 } from "lucide-react";
import { teacherService } from "@/lib/services/teacher.service";
import { toast } from "sonner";
import { Teacher } from "@/types/teacher";
import { Header } from "@/components/ui-admin/layout";

interface TeacherDetailProps {
  teacherId: string;
}

export default function TeacherDetail({ teacherId }: TeacherDetailProps) {
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const router = useRouter();

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
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat data guru");
        router.push("/dashboard/users/teachers");
      } finally {
        setLoading(false);
      }
    };

    loadTeacher();
  }, [teacherId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Data guru tidak ditemukan</p>
      </div>
    );
  }

  return (
    <Header
      header={{
        title: "Detail Guru",
        description: "Informasi lengkap data guru",
        showBackButton: true,
        backHref: "/dashboard/users/teachers",
        actions: [
          {
            label: "Edit Data",
            onClick: () => router.push(`/dashboard/users/teachers/edit/${teacherId}`),
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
              {teacher.profilePhoto ? (
                <img
                  src={teacher.profilePhoto}
                  alt={teacher.name}
                  className="h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center">
                  <User2 className="h-16 w-16 text-gray-400" />
                </div>
              )}
              <h2 className="mt-4 text-xl font-semibold">{teacher.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant={teacher.status === "ACTIVE" ? "success" : "secondary"}
                >
                  {teacher.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{teacher.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{teacher.yearsOfExperience} tahun pengalaman</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="p-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Jenjang Mengajar</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.educationLevel.map((level, index) => (
                  <Badge key={index} variant="outline">
                    {level}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Mata Pelajaran</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.subjects.map((subject, index) => (
                  <Badge key={index} variant="secondary">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Spesialisasi</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.specialization.map((spec, index) => (
                  <Badge key={index} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Sertifikasi</h3>
              <div className="flex flex-wrap gap-2">
                {teacher.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Jadwal Mengajar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(teacher.schedule).map(([day, times]) => (
                  <div key={day} className="border rounded-lg p-3">
                    <div className="font-medium capitalize mb-2">{day}</div>
                    <div className="space-y-1">
                      {times.map((time, index) => (
                        <div key={index} className="text-sm text-gray-600">
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
}
