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
import Link from 'next/link';
import { ChevronLeft, Clock, MapPin, User, BookOpen, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ClassDetailPage() {
  // Type assertion for params to handle newer versions of Next.js
  const params = useParams();
  const paramsObj = params as { id: string };
  const classId = paramsObj.id;
  const classDetail = getClassDetail(classId);
  
  const [activeTab, setActiveTab] = useState('detail');

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
          
          <div className="border-t border-gray-100 p-6">
            <div className="mb-5">
              <h2 className="font-semibold text-lg mb-3 flex items-center">
                <BookOpen className="h-5 w-5 text-[#C40503] mr-2" />
                Materi Pembelajaran
              </h2>
              <ul className="pl-7 list-disc space-y-1">
                {classDetail.materials.slice(0, 3).map(material => (
                  <li key={material.id}>
                    <a href="#" onClick={() => setActiveTab('materials')} className="hover:text-[#C40503] hover:underline">
                      {material.title}
                    </a>
                  </li>
                ))}
                {classDetail.materials.length > 3 && (
                  <li className="text-sm text-gray-500">
                    <a href="#" onClick={() => setActiveTab('materials')} className="hover:text-[#C40503] hover:underline">
                      +{classDetail.materials.length - 3} materi lainnya
                    </a>
                  </li>
                )}
              </ul>
            </div>
            
            <div className="mb-5">
              <h2 className="font-semibold text-lg mb-3 flex items-center">
                <FileText className="h-5 w-5 text-[#DAA625] mr-2" />
                Tugas
              </h2>
              {classDetail.assignments.length > 0 ? (
                <div className="space-y-3">
                  {classDetail.assignments.map((assignment) => (
                    <div key={assignment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-gray-500">Tenggat: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}</p>
                        </div>
                        <Badge className={
                          assignment.status === 'graded' ? 'bg-green-100 text-green-700' : 
                          assignment.status === 'submitted' ? 'bg-blue-100 text-blue-700' : 
                          'bg-yellow-100 text-yellow-700'
                        }>
                          {assignment.status === 'graded' ? 'Dinilai' : 
                           assignment.status === 'submitted' ? 'Dikumpulkan' : 'Belum Dikumpulkan'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Tidak ada tugas untuk kelas ini</p>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline"
                className="text-[#C40503] border-[#C40503] hover:bg-[#C40503]/10"
                onClick={() => setActiveTab('detail')}
              >
                Lihat Detail Lengkap
              </Button>
              
              {classDetail.status === 'upcoming' && (
                <Link href={classDetail.meetingLink || '#'}>
                  <Button className="bg-[#C40503] hover:bg-[#a60402]">
                    Masuk Kelas
                  </Button>
                </Link>
              )}
              
              {classDetail.status === 'ongoing' && (
                <Link href={classDetail.meetingLink || '#'}>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Masuk Kelas Sekarang
                  </Button>
                </Link>
              )}
              
              {classDetail.status === 'completed' && classDetail.recordingUrl && (
                <Link href={classDetail.recordingUrl}>
                  <Button className="bg-[#DAA625] hover:bg-[#b88d1c]">
                    Tonton Rekaman
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="detail" className="text-sm">
            Detail
          </TabsTrigger>
          <TabsTrigger value="materials" className="text-sm">
            Materi
          </TabsTrigger>
          <TabsTrigger value="assignments" className="text-sm">
            Tugas
          </TabsTrigger>
          <TabsTrigger value="discussion" className="text-sm">
            Diskusi
          </TabsTrigger>
          <TabsTrigger value="announcements" className="text-sm">
            Pengumuman
          </TabsTrigger>
          <TabsTrigger value="attendance" className="text-sm">
            Kehadiran
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="detail">
          <ClassDetailHeader classDetail={classDetail} />
          
          {/* Optional syllabus section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-bold mb-4">Silabus Kelas</h2>
            <p className="text-gray-700">
              {classDetail.syllabus || 
               `Silabus lengkap untuk kelas ${classDetail.title} akan segera ditambahkan. 
               Silakan hubungi pengajar untuk informasi lebih lanjut.`}
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="materials">
          <ClassMaterials materials={classDetail.materials} />
        </TabsContent>
        
        <TabsContent value="assignments">
          <ClassAssignments assignments={classDetail.assignments} />
        </TabsContent>
        
        <TabsContent value="discussion">
          <ClassDiscussion discussion={classDetail.discussion} />
        </TabsContent>
        
        <TabsContent value="announcements">
          <ClassAnnouncements announcements={classDetail.announcements} />
        </TabsContent>
        
        <TabsContent value="attendance">
          <ClassAttendance 
            studentAttendance={classDetail.studentAttendance} 
            attendanceSessions={classDetail.attendanceSessions || []} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
