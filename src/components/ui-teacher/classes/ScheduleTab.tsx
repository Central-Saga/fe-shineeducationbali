"use client";

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search, Filter, X, Check, Clock, User, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";

// Import data
import { scheduleData } from "@/data/data-teacher/schedule/schedule-data";
import { scheduleSessions } from "@/data/data-teacher/schedule/schedule-sessions";
import { AttendanceModal } from './AttendanceModal';
import { getStudentsByClassId, ClassStudentMapping } from '@/data/data-teacher/class-student-map';

// Interface definitions moved to class-student-map.ts

export function ScheduleTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [attendanceData, setAttendanceData] = useState<Record<number, string>>({});
  const [studentAttendanceData, setStudentAttendanceData] = useState<ClassStudentMapping | undefined>(undefined);
  
  // Removed sample students as we use data from class-student-map.ts
  
  // Function moved to AttendanceModal component
  
  // Function to submit attendance
  const submitAttendance = (attendanceData: any) => {
    console.log("Submitting attendance:", attendanceData);
    // Here you would typically send this data to your API
    setShowAttendanceModal(false);
  };
  
  // Handler untuk memunculkan modal kehadiran
  const handleAttendanceClick = (schedule: any) => {
    setSelectedSchedule(schedule);
    
    // Get session ID if available from scheduleSessions
    const sessionId = schedule.sessionId || schedule.id;
    
    // Ambil data siswa berdasarkan kelas
    const students = getStudentsByClassId(sessionId);
    setStudentAttendanceData(students);
    setShowAttendanceModal(true);
  };

  // Get days from schedule data
  const days = [...new Set(scheduleData.map(schedule => schedule.dayOfWeek))];
  
  // Get classes from schedule data
  const classes = [...new Set(scheduleData.map(schedule => schedule.className))];

  // Filter schedule data
  const filteredSchedule = scheduleData.filter(schedule => {
    let match = true;
    
    // Filter by search query
    if (searchQuery) {
      match = schedule.className.toLowerCase().includes(searchQuery.toLowerCase()) || 
              schedule.subject.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Filter by day
    if (dayFilter !== "all") {
      match = match && (schedule.dayOfWeek === dayFilter);
    }
    
    // Filter by class
    if (classFilter !== "all") {
      match = match && (schedule.className === classFilter);
    }
    
    return match;
  }).sort((a, b) => {
    // First sort by day of week
    const dayOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    const dayDiff = dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
    if (dayDiff !== 0) return dayDiff;
    
    // Then sort by start time
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="space-y-6">
      {/* Schedule Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Cari berdasarkan kelas atau mata pelajaran..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-40">
            <Select value={dayFilter} onValueChange={setDayFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Hari" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Hari</SelectItem>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-48">
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                {classes.map((className) => (
                  <SelectItem key={className} value={className}>
                    {className}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList className="mb-4 bg-gray-100 p-1">
          <TabsTrigger value="table" className="data-[state=active]:bg-white data-[state=active]:text-[#C40503] data-[state=active]:border-b-2 data-[state=active]:border-[#C40503]">
            <Calendar className="h-4 w-4 mr-2" />
            Tabel Jadwal
          </TabsTrigger>
          <TabsTrigger value="weekly" className="data-[state=active]:bg-white data-[state=active]:text-[#C40503] data-[state=active]:border-b-2 data-[state=active]:border-[#C40503]">
            <Calendar className="h-4 w-4 mr-2" />
            Tampilan Mingguan
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="table" className="mt-0">
          {/* Schedule Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="w-[100px] font-semibold">Hari</TableHead>
                  <TableHead className="font-semibold">Kelas</TableHead>
                  <TableHead className="font-semibold">Mata Pelajaran</TableHead>
                  <TableHead className="text-center font-semibold">Waktu</TableHead>
                  <TableHead className="text-center font-semibold">Lokasi</TableHead>
                  <TableHead className="text-right font-semibold">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedule.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell className="font-medium">
                      <Badge 
                        variant="outline" 
                        className={`
                          ${schedule.dayOfWeek === "Senin" ? "bg-blue-50 text-blue-700 border-blue-200" : 
                            schedule.dayOfWeek === "Selasa" ? "bg-green-50 text-green-700 border-green-200" :
                            schedule.dayOfWeek === "Rabu" ? "bg-purple-50 text-purple-700 border-purple-200" :
                            schedule.dayOfWeek === "Kamis" ? "bg-orange-50 text-orange-700 border-orange-200" :
                            schedule.dayOfWeek === "Jumat" ? "bg-red-50 text-red-700 border-red-200" :
                            "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        `}
                      >
                        {schedule.dayOfWeek}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{schedule.className}</TableCell>
                    <TableCell className="text-blue-700">{schedule.subject}</TableCell>
                    <TableCell className="text-center font-medium">{schedule.startTime} - {schedule.endTime}</TableCell>
                    <TableCell className="text-center">{schedule.location}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setShowAttendanceModal(true);
                        }}
                      >
                        Absensi
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="hover:bg-[#C40503] hover:text-white transition-colors"
                        onClick={() => {
                          const matchingSession = scheduleSessions.find(s => s.id === schedule.id)?.sessionId;
                          if (matchingSession) {
                            // Jika ada session yang sesuai, bisa navigasi ke detail class
                            window.location.href = `/dashboard-teacher/classes/${matchingSession}`;
                          }
                        }}
                      >
                        Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSchedule.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Tidak ada jadwal yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Menampilkan {filteredSchedule.length} dari {scheduleData.length} jadwal
          </div>
        </TabsContent>
        
        <TabsContent value="weekly" className="mt-0">
          {/* Weekly Schedule View */}
          <div className="border rounded-md overflow-auto shadow-sm">
            <div className="grid grid-cols-7 border-b min-w-[800px] bg-gray-50">
              {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => (
                <div key={day} className="text-center font-medium py-3 border-r last:border-r-0 text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 min-h-[300px] min-w-[800px]">
              {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => {
                // Apply filters to day schedules
                const daySchedules = scheduleData.filter(schedule => {
                  return schedule.dayOfWeek === day && 
                  (classFilter === "all" || schedule.className === classFilter) &&
                  (searchQuery === "" || 
                   schedule.className.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   schedule.subject.toLowerCase().includes(searchQuery.toLowerCase()));
                });
                
                return (
                  <div key={day} className="p-3 border-r last:border-r-0 min-h-[300px]">
                    {daySchedules.length > 0 ? (
                      <div className="space-y-3">
                        {daySchedules.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((schedule) => (
                          <div
                            key={schedule.id}
                            className="p-3 rounded-md text-xs border-l-4 border-l-[#C40503] bg-red-50 hover:bg-red-100 transition-colors cursor-pointer shadow-sm mb-4"
                            onClick={() => {
                              const matchingSession = scheduleSessions.find(s => s.id === schedule.id)?.sessionId;
                              if (matchingSession) {
                                // Jika ada session yang sesuai, bisa navigasi ke detail class
                                window.location.href = `/dashboard-teacher/classes/${matchingSession}`;
                              }
                            }}
                          >
                            <p className="font-medium text-sm mb-1">{schedule.className}</p>
                            <p className="text-gray-600 mb-2">{schedule.subject}</p>
                            <div className="flex justify-between items-center">
                              <span className="bg-white px-2 py-1 rounded border text-xs">{schedule.startTime}-{schedule.endTime}</span>
                              <span className="bg-white px-2 py-1 rounded border text-xs">{schedule.location}</span>
                            </div>
                            <div className="mt-3 flex gap-2">
                              <button 
                                className="bg-blue-100 text-blue-700 rounded px-2 py-1 hover:bg-blue-200 text-xs flex items-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Open attendance modal
                                  setSelectedSchedule(schedule);
                                  setShowAttendanceModal(true);
                                }}
                              >
                                <span>Absensi</span>
                              </button>
                              <button 
                                className="bg-green-100 text-green-700 rounded px-2 py-1 hover:bg-green-200 text-xs flex items-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>Materi</span>
                              </button>
                              <button 
                                className="bg-purple-100 text-purple-700 rounded px-2 py-1 hover:bg-purple-200 text-xs flex items-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <span>Nilai</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400 text-xs">
                        Tidak ada jadwal
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    
      {/* Attendance Modal */}
      {/* Attendance Modal */}
      {selectedSchedule && (
        <AttendanceModal 
          isOpen={showAttendanceModal}
          onClose={() => setShowAttendanceModal(false)}
          classData={{
            id: selectedSchedule.sessionId || selectedSchedule.id,
            title: `${selectedSchedule.className} - ${selectedSchedule.subject}`,
            date: new Date().toISOString(), // Isi dengan tanggal sesuai dengan data schedule yang ada
            timeStart: selectedSchedule.startTime,
            timeEnd: selectedSchedule.endTime
          }}
          studentData={studentAttendanceData}
          onSave={submitAttendance}
        />
      )}
    </div>
  );
}
