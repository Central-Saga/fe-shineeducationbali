"use client";

import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AttendanceDetailCardProps {
  selectedDay: Date | null;
  attendanceData: { 
    present: number; 
    absent: number; 
    late: number;
    checkIn?: string;
    checkOut?: string;
    note?: string;
  } | null;
  className?: string;
}

export function AttendanceDetailCard({ selectedDay, attendanceData, className = '' }: AttendanceDetailCardProps) {
  if (!selectedDay) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3 py-5">
        <CardTitle>Detail Kehadiran</CardTitle>
        <CardDescription>
          {format(selectedDay, 'EEEE, dd MMMM yyyy', { locale: id })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {attendanceData ? (
          <div className="space-y-5 ">
            <div className="flex items-center">
              <div className="font-semibold w-32">Present:</div>
              <Badge className="bg-green-100 text-green-800">
                {attendanceData.present}
              </Badge>
            </div>
            
            <div className="flex items-center">
              <div className="font-semibold w-32">Absent:</div>
              <Badge className="bg-red-100 text-red-800">
                {attendanceData.absent}
              </Badge>
            </div>
            
            <div className="flex items-center">
              <div className="font-semibold w-32">Late:</div>
              <Badge className="bg-yellow-100 text-yellow-800">
                {attendanceData.late}
              </Badge>
            </div>
            
            {attendanceData.checkIn && (
              <div className="flex items-center">
                <div className="font-semibold w-32">Check In:</div>
                <div>{attendanceData.checkIn}</div>
              </div>
            )}
            
            {attendanceData.checkOut && (
              <div className="flex items-center">
                <div className="font-semibold w-32">Check Out:</div>
                <div>{attendanceData.checkOut}</div>
              </div>
            )}
            
            {attendanceData.note && (
              <div className="flex pb-3">
                <div className="font-semibold w-32">Catatan:</div>
                <div>{attendanceData.note}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>Tidak ada data kehadiran untuk tanggal ini</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
