"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User2, Mail, Phone, Calendar } from "lucide-react";
import { teacherService } from "@/lib/services/teacher.service";
import { toast } from "sonner";
import { Teacher } from "@/types/teacher";

export default function TeacherDetailPage() {
  const [loading, setLoading] = useState(true);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const router = useRouter();
  const params = useParams();
  const teacherId = params.teacherId as string;

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

  if (loading || !teacher) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
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
          Detail Guru
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6 space-y-6">
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
          <CardContent className="p-6 space-y-6">
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
    </div>
  );
}
