"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassCard } from "@/components/ui-student/classes/ClassCard";
import { CalendarView } from "@/components/ui-student/classes/CalendarView";
import { studentClasses, pastClasses } from "@/data/data-student/classes-data";
import { Input } from "@/components/ui/input";
import { Search, CalendarDays, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ClassesPage() {
  const [selectedDayId, setSelectedDayId] = useState<string | null>(studentClasses[0]?.id || null);
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("upcoming");

  // Get the selected day's classes
  const selectedDayClasses = studentClasses.find(schedule => schedule.id === selectedDayId)?.sessions || [];
  
  // Filter past classes based on search query
  const filteredPastClasses = pastClasses.filter(session => 
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpandClass = (classId: string) => {
    setExpandedClassId(expandedClassId === classId ? null : classId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Kelas</h1>
        <p className="text-gray-600">
          Lihat jadwal kelas Anda, materi pembelajaran, dan tugas-tugas
        </p>
      </div>
      
      {/* Class Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-red-50">
              <CalendarDays className="h-6 w-6 text-[#C40503]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Jadwal Minggu Ini</p>
              <h4 className="text-2xl font-bold">5 Kelas</h4>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock className="h-6 w-6 text-[#DAA625]" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Jam Belajar Minggu Ini</p>
              <h4 className="text-2xl font-bold">8 Jam</h4>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-red-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[#C40503]">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                <path d="M9 14h6"></path>
                <path d="M9 10h6"></path>
                <path d="M9 18h6"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tugas Belum Dikumpulkan</p>
              <h4 className="text-2xl font-bold">3 Tugas</h4>
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
      
      {/* Sortby dropdown for classes */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor="sortby" className="font-semibold text-gray-700 text-lg flex items-center gap-2">
            <svg width="20" height="20" fill="none" stroke="#C40503" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M3 12h12M3 18h6"/></svg>
            Urutkan:
          </label>
          <select
            id="sortby"
            className="border border-[#C40503] rounded-lg px-4 py-2 pr-8 text-base font-medium text-gray-700 bg-white shadow focus:outline-none focus:ring-2 focus:ring-[#C40503] appearance-none"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="upcoming">Kelas Mendatang</option>
            <option value="past">Kelas Selesai</option>
            <option value="all">Semua</option>
          </select>
        </div>
        {sortBy === "past" && (
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Cari kelas sebelumnya..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Class List */}
      <div className="mt-6">
        {(() => {
          let classList: any[] = [];
          if (sortBy === "upcoming") {
            classList = selectedDayClasses;
          } else if (sortBy === "past") {
            classList = filteredPastClasses;
          } else {
            // Gabungkan semua kelas
            classList = [
              ...studentClasses.flatMap(sch => sch.sessions),
              ...pastClasses
            ];
          }
          if (classList.length === 0) {
            return (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada kelas ditemukan</h3>
                <p className="text-gray-600 mb-4">
                  {sortBy === "upcoming" ? "Pilih tanggal lain atau periksa jadwal lengkap di kalender" : "Coba gunakan kata kunci lain untuk pencarian"}
                </p>
                <button className="bg-[#C40503] text-white px-4 py-2 rounded hover:bg-[#a60402] transition-colors">
                  Lihat Semua Jadwal
                </button>
              </div>
            );
          }
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {classList.map((session) => (
                <div key={session.id} className="border-2 border-[#C40503]/30 rounded-2xl p-6 bg-gradient-to-br from-white via-[#f8fafc] to-[#f3f4f6] shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <ClassCard 
                    session={session}
                    isExpanded={expandedClassId === session.id}
                    onToggle={() => toggleExpandClass(session.id)}
                  />
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
