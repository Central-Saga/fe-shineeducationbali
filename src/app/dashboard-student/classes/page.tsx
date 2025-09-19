"use client";

import React, { useState } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassCard } from "@/components/ui-student/classes/ClassCard";
import { CalendarView } from "@/components/ui-student/classes/CalendarView";
import { studentClasses, pastClasses, ClassSession } from "@/data/data-student/classes-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CalendarDays, Clock, FileText, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ClassesPage() {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(studentClasses[0]?.id || null);
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("upcoming");

  // Get the selected day's classes
  const selectedDayClasses = studentClasses.find(schedule => schedule.id === selectedDayId)?.sessions || [];
  
  // Filter classes based on search query
  const filterClasses = (classes: ClassSession[]) => {
    if (!searchQuery) return classes;
    return classes.filter(session => 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const toggleExpandClass = (classId: string) => {
    setExpandedClassId(expandedClassId === classId ? null : classId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kelas Saya</h1>
          <p className="text-gray-600">
            Lihat jadwal kelas Anda, materi pembelajaran, dan tugas-tugas
          </p>
        </div>
      
        {/* Class Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jadwal Minggu Ini</p>
                  <p className="text-xl font-bold text-blue-600">5 Kelas</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jam Belajar Minggu Ini</p>
                  <p className="text-xl font-bold text-yellow-600">8 Jam</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tugas Belum Dikumpulkan</p>
                  <p className="text-xl font-bold text-orange-600">3 Tugas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
            {/* Calendar View for Upcoming Classes */}
      {sortBy === "upcoming" && (
        <CalendarView 
          schedules={studentClasses}
          onSelectDay={setSelectedDayId}
          selectedDayId={selectedDayId}
        />
      )}
      
        {/* Filter Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-[#C40001]" />
                  <span className="font-semibold text-gray-700">Urutkan:</span>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Kelas Mendatang</SelectItem>
                    <SelectItem value="past">Kelas Selesai</SelectItem>
                    <SelectItem value="all">Semua</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Cari kelas..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Class List */}
        <div>
          {(() => {
            let classList: ClassSession[] = [];
            if (sortBy === "upcoming") {
              classList = filterClasses(selectedDayClasses);
            } else if (sortBy === "past") {
              classList = filterClasses(pastClasses);
            } else {
              // Gabungkan semua kelas
              classList = filterClasses([
                ...studentClasses.flatMap(sch => sch.sessions),
                ...pastClasses
              ]);
            }
            if (classList.length === 0) {
              return (
                <Card>
                  <CardContent className="text-center py-12">
                    <CalendarDays className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kelas ditemukan</h3>
                    <p className="text-gray-600 mb-4">
                      {sortBy === "upcoming" ? "Pilih tanggal lain atau periksa jadwal lengkap di kalender" : "Coba gunakan kata kunci lain untuk pencarian"}
                    </p>
                    <button className="bg-[#C40001] text-white px-4 py-2 rounded hover:bg-[#a60402] transition-colors">
                      Lihat Semua Jadwal
                    </button>
                  </CardContent>
                </Card>
              );
            }
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {classList.map((session) => (
                  <ClassCard 
                    key={session.id}
                    session={session}
                    isExpanded={expandedClassId === session.id}
                    onToggle={() => toggleExpandClass(session.id)}
                  />
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
