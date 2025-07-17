"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClassDetail } from '@/data/data-student/class-detail-data';
import { ClassDetailHeader } from '@/components/ui-student/class-detail/ClassDetailHeader';
import { ClassMaterials } from '@/components/ui-student/class-detail/ClassMaterials';
import { ClassAssignments } from '@/components/ui-student/class-detail/ClassAssignments';
import { ClassDiscussion } from '@/components/ui-student/class-detail/ClassDiscussion';
import { ClassAnnouncements } from '@/components/ui-student/class-detail/ClassAnnouncements';
import { ClassAttendance } from '@/components/ui-student/class-detail/ClassAttendance';
import { ClassMeetingsList } from '@/components/ui-student/class-detail/ClassMeetingsList';
import { MeetingCardMedium } from '@/components/ui-student/class-detail/MeetingCardMedium';
import Link from 'next/link';
import { ChevronLeft, Clock, MapPin, User, BookOpen, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ClassDetailPage() {
  // Use the useParams hook safely with Next.js 13+
  const params = useParams();
  // Convert the params object to a string and unwrap it properly
  const classId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const classDetail = getClassDetail(classId);
  
  const [activeTab, setActiveTab] = useState('pertemuan');

  // Redirect or show error if class not found
  if (!classDetail) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Kelas tidak ditemukan</h1>
          <p className="text-gray-600 mb-6">
            Kelas dengan ID {classId} tidak ditemukan atau tidak tersedia.
          </p>
          <Link 
            href="/dashboard-student/classes"
            className="inline-flex items-center text-[#C40503] hover:underline"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Kembali ke Daftar Kelas
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = date.toLocaleDateString('id-ID', { month: 'long' });
    const year = date.getFullYear();
    
    return `${dayName}, ${day} ${month} ${year}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-700">Akan Datang</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-700">Sedang Berlangsung</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700">Selesai</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/dashboard-student/classes"
          className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Kelas
        </Link>
        
        {/* Class Card - similar to the screenshot */}
        <div className="border rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold">{classDetail.title}</h1>
                  {getStatusBadge(classDetail.status)}
                </div>
                <p className="text-gray-600 mb-3">{classDetail.subject}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#DAA625]" />
                <div>
                  <p className="text-sm text-gray-500">Waktu</p>
                  <p>{formatDate(classDetail.date)}, {classDetail.timeStart} - {classDetail.timeEnd}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-[#C40503]" />
                <div>
                  <p className="text-sm text-gray-500">Lokasi</p>
                  <p>{classDetail.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-[#DAA625]" />
                <div>
                  <p className="text-sm text-gray-500">Pengajar</p>
                  <p>{classDetail.instructor.name}</p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-5">{classDetail.description}</p>
          </div>
        </div>
      </div>

      {/* Hanya tampilkan detail pertemuan, materi/tugas/kehadiran/diskusi/pengumuman dipindahkan ke halaman detail pertemuan */}
      <div className="mt-8">
        {/* Dropdown sortby untuk meeting */}
        {(() => {
          const meetings = [
            {
              id: "meeting1",
              title: "Pertemuan 1: Pengenalan Aljabar",
              description: "Pengenalan dasar-dasar aljabar dan konsep awal",
              date: "2024-07-10",
              timeStart: "08:00",
              timeEnd: "10:00",
              location: "Ruang Belajar 101",
              status: "completed",
              attendanceStatus: "present"
            },
            {
              id: "meeting2",
              title: "Pertemuan 2: Aljabar Linear",
              description: "Konsep aljabar linear dan aplikasinya",
              date: "2024-07-17",
              timeStart: "08:00",
              timeEnd: "10:00",
              location: "Ruang Belajar 101",
              status: "completed",
              attendanceStatus: "present"
            },
            {
              id: "meeting3",
              title: "Pertemuan 3: Matriks dan Determinan",
              description: "Pendalaman matriks dan cara menghitung determinan",
              date: "2024-07-24",
              timeStart: "08:00",
              timeEnd: "10:00",
              location: "Ruang Belajar 101",
              status: "ongoing",
              attendanceStatus: "present"
            },
            {
              id: "meeting4",
              title: "Pertemuan 4: Transformasi Linear",
              description: "Konsep transformasi linear dan aplikasinya",
              date: "2024-07-31",
              timeStart: "08:00",
              timeEnd: "10:00",
              location: "Ruang Belajar 101",
              status: "upcoming"
            }
          ];
          const [sortBy, setSortBy] = React.useState<string>("all");
          let filteredMeetings = meetings;
          if (sortBy === "upcoming") filteredMeetings = meetings.filter(m => m.status === "upcoming");
          else if (sortBy === "ongoing") filteredMeetings = meetings.filter(m => m.status === "ongoing");
          else if (sortBy === "completed") filteredMeetings = meetings.filter(m => m.status === "completed");
          // Urutkan: upcoming, ongoing, completed, lalu tanggal
          const statusOrder = { upcoming: 0, ongoing: 1, completed: 2 };
          filteredMeetings = filteredMeetings.slice().sort((a, b) => {
            const statusA = statusOrder[a.status as keyof typeof statusOrder] ?? 99;
            const statusB = statusOrder[b.status as keyof typeof statusOrder] ?? 99;
            if (statusA !== statusB) return statusA - statusB;
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });
          return (
            <>
              <div className="flex items-center gap-4 mb-6">
                <label htmlFor="sortby" className="font-semibold text-gray-700 text-lg flex items-center gap-2">
                  <svg width="20" height="20" fill="none" stroke="#C40503" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M3 12h12M3 18h6"/></svg>
                  Urutkan:
                </label>
                <div className="relative">
                  <select
                    id="sortby"
                    className="border border-[#C40503] rounded-lg px-4 py-2 pr-8 text-base font-medium text-gray-700 bg-white shadow focus:outline-none focus:ring-2 focus:ring-[#C40503] appearance-none"
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                  >
                    <option value="all">Semua</option>
                    <option value="ongoing">Sedang Berlangsung</option>
                    <option value="upcoming">Akan Datang</option>
                    <option value="completed">Selesai</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="18" height="18" fill="none" stroke="#C40503" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMeetings.length === 0 ? (
                  <div className="text-gray-500 col-span-full text-center py-8">Tidak ada pertemuan.</div>
                ) : (
                  filteredMeetings.map(meeting => (
                    <MeetingCardMedium key={meeting.id} meeting={meeting} classId={classDetail.id} />
                  ))
                )}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
