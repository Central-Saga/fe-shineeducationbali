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
import { Attendance } from "@/types/attendance";
import { attendanceService } from "@/lib/services/attendance.service";
import { classService } from "@/lib/services/class.service";
import { DataTable } from "@/components/ui/data-table";
import { attendanceColumns } from "./columns";
import { AttendanceForm } from "./attendance-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loading } from "@/components/ui/loading";

interface DailyAttendanceProps {
  classId: string;
  className?: string;
}

export function DailyAttendance({ classId, className }: DailyAttendanceProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceData, setAttendanceData] = useState<
    (Attendance & { studentName: string; className: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [students, setStudents] = useState<Array<{ id: string; name: string }>>(
    []
  );
  const { hasPermission: canEdit } = usePermission("attendance.edit");

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        setLoading(true);
        const data = await attendanceService.getClassAttendance(
          classId,
          selectedDate.toISOString()
        );
        // Transform the data to include studentName and className
        const transformedData = data.map((item) => ({
          ...item,
          studentName:
            students.find((s) => s.id === item.studentId)?.name || "",
          className: className || "",
        }));
        setAttendanceData(transformedData);
      } catch (error) {
        console.error("Failed to load attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendance();
  }, [classId, selectedDate]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        // For now, we'll use mock data since the class service doesn't return students
        // In a real implementation, you would fetch students for this class
        const mockStudents = [
          { id: "1", name: "John Doe" },
          { id: "2", name: "Jane Smith" },
          { id: "3", name: "Bob Johnson" },
        ];
        setStudents(mockStudents);
      } catch (error) {
        console.error("Failed to load students:", error);
      }
    };

    loadStudents();
  }, [classId]);

  useEffect(() => {
    const handleEditAttendance = (event: CustomEvent<Attendance>) => {
      setSelectedStudent(event.detail.studentId);
      setDialogOpen(true);
    };

    document.addEventListener(
      "EDIT_ATTENDANCE",
      handleEditAttendance as EventListener
    );

    return () => {
      document.removeEventListener(
        "EDIT_ATTENDANCE",
        handleEditAttendance as EventListener
      );
    };
  }, []);
  const handleAttendanceSuccess = async () => {
    setSelectedStudent(null);
    setDialogOpen(false);
    // Refresh attendance data
    try {
      const data = await attendanceService.getClassAttendance(
        classId,
        selectedDate.toISOString()
      );
      // Transform data before setting state
      const transformedData = data.map((item) => ({
        ...item,
        studentName: students.find((s) => s.id === item.studentId)?.name || "",
        className: className || "",
      }));
      setAttendanceData(transformedData);
    } catch (error) {
      console.error("Failed to refresh attendance:", error);
    }
  };
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
        <CardTitle>Absensi Harian {className}</CardTitle>
        <CardDescription>
          Kelola absensi siswa untuk kelas terpilih
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

          {canEdit && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Input Absensi Baru</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Input Absensi</DialogTitle>
                  <DialogDescription>
                    Masukkan data absensi siswa untuk tanggal{" "}
                    {selectedDate.toLocaleDateString("id-ID")}
                  </DialogDescription>
                </DialogHeader>

                {!selectedStudent ? (
                  <Select onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih siswa" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student: { id: string; name: string }) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <AttendanceForm
                    studentId={selectedStudent}
                    classId={classId}
                    date={selectedDate}
                    onSuccess={handleAttendanceSuccess}
                  />
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>

        <DataTable<
          Attendance & { studentName: string; className: string },
          "PRESENT" | "ABSENT" | "LATE" | "SICK" | "PERMISSION"
        >
          columns={attendanceColumns}
          data={attendanceData}
          onRowSelection={() => {}}
        />
      </CardContent>
    </Card>
  );
}
