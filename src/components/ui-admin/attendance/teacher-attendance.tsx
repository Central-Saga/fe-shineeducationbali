"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePermission } from "@/hooks/use-permission";
// import { Attendance } from "@/types/attendance";
import { attendanceService } from "@/lib/services/attendance.service";
import { classService } from "@/lib/services/class.service";
import { DataTable } from "@/components/ui/data-table";
import { teacherAttendanceColumns, type TeacherAttendance as TeacherAttendanceType } from "./teacher-attendance-columns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loading } from "@/components/ui/loading";
import { Upload } from "lucide-react";

interface TeacherAttendanceProps {
  classId: string;
  className?: string;
}

export function TeacherAttendance({ classId, className }: TeacherAttendanceProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceData, setAttendanceData] = useState<TeacherAttendanceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teachers, setTeachers] = useState<Array<{ id: string; name: string }>>(
    []
  );
  const { hasPermission: canView } = usePermission("attendance.view");

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        setLoading(true);
        const data = await attendanceService.getClassAttendance(
          classId,
          selectedDate.toISOString()
        );
        // Transform the data to include teacherName and className
        const transformedData = data.map((item) => ({
          ...item,
          teacherId: "default-teacher-id", // Add required teacherId property
          teacherName: "Guru Kelas", // Default teacher name since Attendance doesn't have teacherId
          className: className || "",
          uploadTime: item.createdAt || "",
          attachment: item.notes || "",
        }));
        setAttendanceData(transformedData);
      } catch (error) {
        console.error("Failed to load teacher attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, [classId, selectedDate]);

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        const classData = await classService.getClassById(classId);
        if (classData) {
          // Since Class only has teacherId, create a single teacher entry
          if (classData.teacherId) {
            setTeachers([
              {
                id: classData.teacherId,
                name: "Guru Kelas", // Default name since we don't have teacher details
              }
            ]);
          } else {
            setTeachers([]);
          }
        }
      } catch (error) {
        console.error("Failed to load teachers:", error);
      }
    };

    loadTeachers();
  }, [classId]);

  // const handleViewDocument = (attachment: string) => {
  //   // Handle document viewing logic
  //   console.log("Viewing document:", attachment);
  // };

  // const handleDownloadDocument = (attachment: string) => {
  //   // Handle document download logic
  //   console.log("Downloading document:", attachment);
  // };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kehadiran Guru {className}</CardTitle>
        <CardDescription>
          Pantau kehadiran guru yang di-upload sendiri untuk kelas terpilih
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date: Date | undefined) => date && setSelectedDate(date)}
            className="rounded-md border"
          />

          {canView && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Dokumen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Dokumen Kehadiran</DialogTitle>
                  <DialogDescription>
                    Upload dokumen kehadiran untuk tanggal{" "}
                    {selectedDate.toLocaleDateString("id-ID")}
                  </DialogDescription>
                </DialogHeader>

                {!selectedTeacher ? (
                  <Select onValueChange={setSelectedTeacher}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih guru" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher: { id: string; name: string }) => (
                        <SelectItem key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Drag & drop dokumen kehadiran atau klik untuk memilih file
                      </p>
                      <Button variant="outline" className="mt-2">
                        Pilih File
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setSelectedTeacher(null);
                          setDialogOpen(false);
                        }}
                        variant="outline"
                      >
                        Batal
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedTeacher(null);
                          setDialogOpen(false);
                        }}
                        className="bg-[#C40503] hover:bg-[#a50402]"
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>

        <DataTable
          columns={teacherAttendanceColumns}
          data={attendanceData}
          onRowSelection={() => {}}
        />
      </CardContent>
    </Card>
  );
}
