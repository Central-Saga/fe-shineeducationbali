"use client";

import { format, isSameDay } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar as CalendarIcon, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { mockTeacherAttendance } from '@/data/data-teacher/attendance/teacher-attendance-data';

interface AttendanceCalendarProps {
  onSelectDay: (day: Date, attendanceData: any) => void;
  selectedDay?: Date | null;
  className?: string;
}

export function AttendanceCalendar({ onSelectDay, selectedDay, className = '' }: AttendanceCalendarProps) {
  const handleDayClick = (day: Date | undefined) => {
    if (!day) return;
    
    const dayAttendance = mockTeacherAttendance.find(a => isSameDay(a.date, day));
    onSelectDay(day, dayAttendance || null);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3 py-5">
        <CardTitle>Kalender Kehadiran</CardTitle>
        <CardDescription>Lihat riwayat kehadiran bulan ini</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 text-center mb-6">
          <div className="bg-green-100 text-green-700 rounded p-3 flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-2" /> Hadir
          </div>
          <div className="bg-amber-100 text-amber-700 rounded p-3 flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2" /> Terlambat
          </div>
          <div className="bg-red-100 text-red-700 rounded p-3 flex items-center justify-center">
            <XCircle className="h-4 w-4 mr-2" /> Tidak Hadir
          </div>
          <div className="bg-blue-100 text-blue-700 rounded p-3 flex items-center justify-center">
            <AlertCircle className="h-4 w-4 mr-2" /> Cuti
          </div>
          <div className="bg-gray-100 text-gray-700 rounded p-3 md:col-span-3 flex items-center justify-center">
            <CalendarIcon className="h-4 w-4 mr-2" /> Klik tanggal untuk detail
          </div>
        </div>
        
        <Calendar
          mode="single"
          selected={selectedDay || undefined}
          onSelect={handleDayClick}
          className="rounded-md border p-1"
          classNames={{
            day_selected: "bg-blue-600 text-white",
            day_today: "bg-orange-100 text-orange-600 font-bold",
            day: "p-3 h-12"
          }}
        />
      </CardContent>
    </Card>
  );
}
