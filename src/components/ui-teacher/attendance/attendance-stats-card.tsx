"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, CheckCircle, Clock } from 'lucide-react';
import { teacherAttendanceSummary } from "@/data/data-teacher/attendance/teacher-attendance-data";

interface AttendanceStatsCardProps {
  className?: string;
}

export function AttendanceStatsCard({ className = '' }: AttendanceStatsCardProps) {
  const { present, late, absent, leave, total, streak, workHours, monthlyTarget } = teacherAttendanceSummary;
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Statistik Kehadiran Bulan Ini</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-600 font-medium mb-1">Hadir</div>
            <div className="text-2xl font-bold">{present}</div>
            <div className="text-sm text-gray-500">{Math.round((present / total) * 100)}% dari total</div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="text-amber-600 font-medium mb-1">Terlambat</div>
            <div className="text-2xl font-bold">{late}</div>
            <div className="text-sm text-gray-500">{Math.round((late / total) * 100)}% dari total</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-red-600 font-medium mb-1">Tidak Hadir</div>
            <div className="text-2xl font-bold">{absent}</div>
            <div className="text-sm text-gray-500">{Math.round((absent / total) * 100)}% dari total</div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-600 font-medium mb-1">Cuti</div>
            <div className="text-2xl font-bold">{leave}</div>
            <div className="text-sm text-gray-500">{Math.round((leave / total) * 100)}% dari total</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
            <CheckCircle className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-sm text-gray-600">Streak Kehadiran</div>
              <div className="font-bold text-xl">{streak} hari</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
            <Clock className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-sm text-gray-600">Total Jam Kerja</div>
              <div className="font-bold text-xl">{workHours} jam</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
            <BarChart className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-sm text-gray-600">Target Bulanan</div>
              <div className="font-bold text-xl">{Math.round((workHours / monthlyTarget) * 100)}%</div>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="text-sm text-gray-600 mb-2">Progress Jam Kerja</div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${Math.min(100, (workHours / monthlyTarget) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <div>{workHours} jam</div>
            <div>Target: {monthlyTarget} jam</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
