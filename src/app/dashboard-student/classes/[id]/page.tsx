// ...existing code...
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useEffect, useState as useReactState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getClassDetail } from '@/data/data-student/class-detail-data';
import { ClassDetailHeader } from '@/components/ui-student/classes/class-detail/ClassDetailHeader';
import { ClassMaterials } from '@/components/ui-student/classes/class-detail/ClassMaterials';
import { ClassAssignments } from '@/components/ui-student/classes/class-detail/ClassAssignments';
import { ClassDiscussion } from '@/components/ui-student/classes/class-detail/ClassDiscussion';
import { ClassAnnouncements } from '@/components/ui-student/classes/class-detail/ClassAnnouncements';
import { ClassAttendance } from '@/components/ui-student/classes/class-detail/ClassAttendance';
import Link from 'next/link';
import { ChevronLeft, Clock, User, BookOpen, FileText, Download, Eye, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ClassDetailPage() {
  // Import dummy data dengan named exports
  // eslint-disable-next-line
  const { studentAssignments, studentMaterials } = require('@/data/data-student/student-materials-assignments');

  // State untuk search tugas & materi
  const [searchTerm, setSearchTerm] = useState("");

  // Filter tugas & materi berdasarkan search
  const filteredAssignments = (studentAssignments ?? []).filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMaterials = (studentMaterials ?? []).filter((item: any) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Next.js 15+ params is a Promise, must unwrap with React.use()
  const paramsPromise = useParams();
  const [classId, setClassId] = useReactState('');
  useEffect(() => {
    let isMounted = true;
    Promise.resolve(paramsPromise).then(params => {
      if (!isMounted) return;
      if (params && typeof params.id === 'string') {
        setClassId(params.id);
      } else if (params && Array.isArray(params.id)) {
        setClassId(params.id[0]);
      }
    });
    return () => { isMounted = false; };
  }, [paramsPromise]);

  // Checkbox progress tugas & materi, simpan ke localStorage agar sinkron dengan ClassCard
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const totalItems = filteredAssignments.length + filteredMaterials.length;
  useEffect(() => {
    if (typeof window !== 'undefined' && classId) {
      const saved = localStorage.getItem('classProgress_' + classId);
      setCheckedItems(saved ? JSON.parse(saved) : []);
    }
  }, [classId]);
  const handleCheckItem = (id: string) => {
    setCheckedItems(prev => {
      const updated = prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id];
      if (typeof window !== 'undefined' && classId) {
        localStorage.setItem('classProgress_' + classId, JSON.stringify(updated));
      }
      return updated;
    });
  };
  const [showAssignmentDetail, setShowAssignmentDetail] = useState(false);
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


  // ...existing code...

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link 
          href="/dashboard-student/classes"
          className="inline-flex items-center text-gray-600 hover:text-[#C40503] mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali ke Daftar Kelas
        </Link>
        
        {/* Class Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-2xl font-bold text-gray-900">{classDetail.title}</CardTitle>
                  {getStatusBadge(classDetail.status)}
                </div>
                <p className="text-gray-600">{classDetail.subject}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-[#DAA625]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Waktu</p>
                  <p className="font-medium">{formatDate(classDetail.date)}, {classDetail.timeStart} - {classDetail.timeEnd}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                <User className="h-5 w-5 text-[#DAA625]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pengajar</p>
                  <p className="font-medium">{classDetail.instructor.name}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-6">{classDetail.description}</p>
            <div className="flex gap-3">
              <Link href={`/dashboard-student/classes/${classId}/attendance`}>
                <Button variant="outline" className="text-[#DAA625] border-[#DAA625] hover:bg-[#DAA625] hover:text-white">
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Absensi
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-[#C40503]" />
                  Tugas Terbaru
                </CardTitle>
                <Link href="/dashboard-student/assignments">
                  <Button variant="ghost" size="sm" className="text-[#C40503] hover:text-[#a30402]">
                    Lihat Semua
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
          </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredAssignments.slice(0, 3).map((assignment: any) => (
                  <div key={assignment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="p-2 bg-[#C40503]/10 rounded-lg">
                      <FileText className="h-4 w-4 text-[#C40503]" />
                  </div>
                  <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{assignment.title}</h4>
                      <p className="text-xs text-gray-600 truncate">{assignment.description}</p>
                  </div>
                  <Link href={`/dashboard-student/classes/${classId}/assignment-detail?id=${assignment.id}`}>
                      <Button size="sm" className="bg-[#C40503] hover:bg-[#a30402]">
                        <Eye className="h-4 w-4 mr-1" />
                        Detail
                      </Button>
                  </Link>
                  </div>
              ))}
                {filteredAssignments.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Tidak ada tugas</p>
          </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#DAA625]" />
                  Materi Terbaru
                </CardTitle>
                <Link href="/dashboard-student/materials">
                  <Button variant="ghost" size="sm" className="text-[#C40503] hover:text-[#a30402]">
                    Lihat Semua
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredMaterials.slice(0, 3).map((material: any) => (
                  <div key={material.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="p-2 bg-[#DAA625]/10 rounded-lg">
                      <BookOpen className="h-4 w-4 text-[#DAA625]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{material.title}</h4>
                      <p className="text-xs text-gray-600 truncate">{material.description}</p>
                    </div>
                    <a 
                      href={material.fileUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="bg-[#DAA625] hover:bg-[#b88d1c]">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </a>
                  </div>
                ))}
                {filteredMaterials.length === 0 && (
                  <div className="text-center py-8">
                    <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Tidak ada materi</p>
          </div>
                )}
        </div>
            </CardContent>
          </Card>
      </div>
  {/* Simpan jumlah tugas & materi ke localStorage agar progress bar di ClassCard selalu sesuai */}

        </div>
      </div>
    </div>
  );
}
