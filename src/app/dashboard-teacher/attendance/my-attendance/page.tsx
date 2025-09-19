"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { isSameDay } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { mockTeacherAttendance } from '@/data/data-teacher/attendance/teacher-attendance-data';
import { CheckInCard } from '@/components/ui-teacher/attendance/check-in-card';
import { AttendanceCalendar } from '@/components/ui-teacher/attendance/attendance-calendar';
import { AttendanceDetailCard } from '@/components/ui-teacher/attendance/attendance-detail-card';

export default function MyAttendancePage() {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [attendanceData, setAttendanceData] = useState<{
    id: string;
    date: Date;
    checkIn?: string;
    checkOut?: string;
    status: string;
    note?: string;
  } | null>(null);
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [checkInNote, setCheckInNote] = useState('');

  useEffect(() => {
    // Check if there's attendance data for today
    const today = new Date();
    const todayAttendance = mockTeacherAttendance.find(a => isSameDay(a.date, today));
    
    // If we have data for today, select today to show its details
    if (todayAttendance) {
      setSelectedDay(today);
      setAttendanceData(todayAttendance);
    }
  }, []);

  const handleDaySelected = (day: Date, data: {
    id: string;
    date: Date;
    checkIn?: string;
    checkOut?: string;
    status: string;
    note?: string;
  }) => {
    setSelectedDay(day);
    setAttendanceData(data);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pb-2"
      >
        <h1 className="text-3xl font-bold mb-3">Kehadiran Saya</h1>
        <p className="text-gray-500">Kelola dan lihat riwayat kehadiran Anda</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Check In Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CheckInCard />
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <AttendanceCalendar 
            onSelectDay={handleDaySelected} 
            selectedDay={selectedDay} 
          />
        </motion.div>
      </div>

      {/* Selected Day Details */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AttendanceDetailCard 
            selectedDay={selectedDay}
            attendanceData={attendanceData}
          />
        </motion.div>
      )}

      {/* Check In Dialog */}
      <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check In Terlambat</DialogTitle>
            <DialogDescription>
              Anda terlambat check in. Silakan berikan alasan keterlambatan.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="note">Alasan Keterlambatan</Label>
              <Textarea
                id="note"
                placeholder="Contoh: Macet, Urusan Keluarga, dll"
                value={checkInNote}
                onChange={(e) => setCheckInNote(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckInDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => {
              toast({
                title: "Berhasil Check In",
                description: "Alasan keterlambatan telah dicatat",
              });
              setIsCheckInDialogOpen(false);
            }}>
              Check In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
