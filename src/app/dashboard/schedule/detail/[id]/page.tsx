"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { scheduleData } from "@/data/data-admin/schedule/schedule-data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ScheduleDetail() {
  const params = useParams();
  const router = useRouter();
  const scheduleId = params.id as string;

  const schedule = scheduleData.find((s) => s.id === scheduleId);

  if (!schedule) {
    return (
      <div className="container mx-auto py-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Jadwal tidak ditemukan</h2>
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Detail Jadwal</h2>
          <p className="text-muted-foreground">{schedule.id}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Cetak Jadwal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Informasi Jadwal</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nama Jadwal</p>
              <p className="font-medium">{schedule.title}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tipe Jadwal</p>{" "}
                <Badge>
                  {schedule.schedule_type === "REGULAR"
                    ? "Reguler"
                    : schedule.schedule_type === "EXAM"
                    ? "Ujian"
                    : schedule.schedule_type === "EVENT"
                    ? "Event"
                    : "Libur"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="outline">{schedule.status}</Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tahun Akademik</p>
                <p className="font-medium">{schedule.academic_year}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Semester</p>
                <p className="font-medium">{schedule.semester}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jenjang</p>
                <p className="font-medium">{schedule.education_level}</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Mulai</p>
                <p className="font-medium">{schedule.start_date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Selesai</p>
                <p className="font-medium">{schedule.end_date}</p>
              </div>
              {schedule.day_of_week && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Hari</p>
                    <p className="font-medium">{schedule.day_of_week}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Waktu</p>
                    <p className="font-medium">
                      {schedule.start_time} - {schedule.end_time}
                    </p>
                  </div>
                </>
              )}
            </div>

            {schedule.description && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Deskripsi</p>
                  <p className="font-medium">{schedule.description}</p>
                </div>
              </>
            )}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Guru</h3>
            <div className="space-y-4">
              {schedule.teacher_schedules.map((teacher, index) => (
                <div
                  key={teacher.teacher_id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{teacher.teacher_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {teacher.subject}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Daftar Kelas</h3>
            <div className="space-y-4">
              {schedule.class_schedules.map((class_schedule, index) => (
                <div
                  key={class_schedule.class_id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{class_schedule.class_name}</p>
                    {class_schedule.room && (
                      <p className="text-sm text-muted-foreground">
                        Ruang: {class_schedule.room}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
