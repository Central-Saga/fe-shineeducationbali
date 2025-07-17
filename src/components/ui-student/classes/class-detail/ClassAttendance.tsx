"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Check, X, Clock, Calendar } from 'lucide-react';
import { StudentAttendance, SessionAttendance } from '@/data/data-student/class-detail-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ClassAttendanceProps {
  studentAttendance?: StudentAttendance;
  attendanceSessions: {
    sessionId: string;
    sessionNumber: number;
    date: string;
    topic: string;
  }[];
}

export function ClassAttendance({ studentAttendance, attendanceSessions }: ClassAttendanceProps) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  
  // Return empty state if no attendance data is available
  if (!studentAttendance) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#C40503]" />
            Kehadiran Saya
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            Data kehadiran tidak tersedia
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate attendance statistics once we know studentAttendance exists
  const totalSessions = attendanceSessions.length;
  const presentCount = studentAttendance.sessions.filter(s => s.attendanceStatus === 'present').length;
  const lateCount = studentAttendance.sessions.filter(s => s.attendanceStatus === 'late').length;
  const absentCount = studentAttendance.sessions.filter(s => s.attendanceStatus === 'absent').length;
  
  const attendancePercentage = totalSessions > 0 
    ? Math.round(((presentCount + lateCount) / totalSessions) * 100) 
    : 0;
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
            <Check className="h-3 w-3" />
            Hadir
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-red-100 text-red-700 flex items-center gap-1">
            <X className="h-3 w-3" />
            Tidak Hadir
          </Badge>
        );
      case 'late':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Terlambat
          </Badge>
        );
      default:
        return null;
    }
  };

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#C40503]" />
          Kehadiran Saya
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Attendance Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-4">
            {studentAttendance.avatar ? (
              <img 
                src={studentAttendance.avatar} 
                alt={studentAttendance.studentName} 
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#DAA625] text-white flex items-center justify-center text-lg">
                {studentAttendance.studentName.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="font-medium text-gray-800">{studentAttendance.studentName}</h3>
              <p className="text-sm text-gray-600">
                Total Kehadiran: <span className="font-medium">{attendancePercentage}%</span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Hadir</p>
              <p className="text-xl font-bold text-green-700">{presentCount}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Terlambat</p>
              <p className="text-xl font-bold text-yellow-700">{lateCount}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Tidak Hadir</p>
              <p className="text-xl font-bold text-red-700">{absentCount}</p>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="list">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="list" className="flex-1">Daftar Pertemuan</TabsTrigger>
            <TabsTrigger value="calendar" className="flex-1">Kalender</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            {/* Session List View */}
            <div className="space-y-3">
              {attendanceSessions.map((session) => {
                // Since we've already checked for studentAttendance above,
                // TypeScript should know it's not undefined here
                const sessionAttendance = studentAttendance?.sessions.find(
                  s => s.sessionId === session.sessionId
                );
                
                return (
                  <div 
                    key={session.sessionId} 
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">Pertemuan {session.sessionNumber}</h4>
                      <p className="text-sm text-gray-600">{formatDate(session.date)}</p>
                      <p className="text-sm text-gray-600">Materi: {session.topic}</p>
                      {sessionAttendance?.notes && (
                        <p className="text-sm text-gray-500 mt-1 italic">"{sessionAttendance.notes}"</p>
                      )}
                    </div>
                    
                    {sessionAttendance ? (
                      getStatusBadge(sessionAttendance.attendanceStatus)
                    ) : (
                      <Badge className="bg-gray-100 text-gray-500">
                        Belum Terdaftar
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="text-center text-gray-500 py-4">
                Tampilan kalender akan tersedia dalam pembaruan mendatang
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
