"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowUpDown, 
  Calendar, 
  CheckCircle, 
  Download, 
  FileText, 
  Plus, 
  Search,
  X
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import data
import { scheduleData } from "@/data/data-teacher/schedule/schedule-data";

export default function SchedulePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dayFilter, setDayFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Jadwal Mengajar
        </h1>
        <div className="flex gap-3">
          <Button variant="outline" className="border-[#DAA625] text-[#DAA625]">
            <Download className="mr-3 h-4 w-4" />
            Ekspor Jadwal
          </Button>
          <Button className="bg-[#C40503] hover:bg-[#A60000]">
            <Plus className="mr-3 h-4 w-4" />
            Tambah Jadwal
          </Button>
        </div>
      </div>

      {/* Schedule Filter */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Calendar className="mr-3 h-5 w-5 text-[#C40503]" /> 
            Jadwal Kelas
          </CardTitle>
          <CardDescription>
            Lihat dan kelola jadwal mengajar Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
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

          {/* Schedule Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Hari</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Mata Pelajaran</TableHead>
                  <TableHead className="text-center">Waktu</TableHead>
                  <TableHead className="text-center">Lokasi</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
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
                    <TableCell>{schedule.className}</TableCell>
                    <TableCell>{schedule.subject}</TableCell>
                    <TableCell className="text-center">{schedule.startTime} - {schedule.endTime}</TableCell>
                    <TableCell className="text-center">{schedule.location}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
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
        </CardContent>
        <CardFooter className="border-t pt-4">
          <p className="text-sm text-gray-500">
            Menampilkan {filteredSchedule.length} dari {scheduleData.length} jadwal
          </p>
        </CardFooter>
      </Card>

      {/* Weekly Schedule View */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <Calendar className="mr-3 h-5 w-5 text-[#DAA625]" />
            Jadwal Mingguan
          </CardTitle>
          <CardDescription>
            Tampilan mingguan jadwal mengajar Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <div className="grid grid-cols-7 border-b min-w-[800px]">
            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => (
              <div key={day} className="text-center font-medium py-3 border-r last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 min-h-[300px] min-w-[800px]">
            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((day) => {
              const daySchedules = scheduleData.filter(schedule => schedule.dayOfWeek === day);
              
              return (
                <div key={day} className="p-3 border-r last:border-r-0 min-h-[300px]">
                  {daySchedules.length > 0 ? (
                    <div className="space-y-3">
                      {daySchedules.sort((a, b) => a.startTime.localeCompare(b.startTime)).map((schedule) => (
                        <div
                          key={schedule.id}
                          className="p-2 rounded-md text-xs border-l-4 border-l-[#C40503] bg-red-50 hover:bg-red-100 transition-colors"
                        >
                          <p className="font-medium truncate">{schedule.className}</p>
                          <p className="text-gray-600 truncate">{schedule.subject}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span>{schedule.startTime}-{schedule.endTime}</span>
                            <span className="text-[10px] bg-white px-1 rounded border">{schedule.location}</span>
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
        </CardContent>
      </Card>
    </div>
  );
}
