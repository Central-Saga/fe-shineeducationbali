"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getClassDetail } from '@/data/data-student/class-detail-data';
import Link from 'next/link';
import { ChevronLeft, Clock, User, BookOpen, FileText, Download, Eye, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { studentMaterials } from '@/data/data-student/student-materials-assignments';
import { studentAssignments } from '@/data/data-student/classes/assignment-data';

interface ClassDetailProps {
  classId: string;
}

export default function ClassDetail({ classId }: ClassDetailProps) {

  // State untuk tracking submission status
  const [submissionStatus, setSubmissionStatus] = useState<Record<string, boolean>>({});

  // Filter tugas & materi berdasarkan search dengan useMemo
  const filteredAssignments = useMemo(() => {
    return (studentAssignments ?? []).filter((item: { title: string; description: string }) =>
      item.title.toLowerCase().includes("") ||
      item.description.toLowerCase().includes("")
    );
  }, []);
  
  const filteredMaterials = useMemo(() => {
    return (studentMaterials ?? []).filter((item: { title: string; description: string }) =>
      item.title.toLowerCase().includes("") ||
      item.description.toLowerCase().includes("")
    );
  }, []);

  // Fungsi untuk mengecek status submission
  const checkSubmissionStatus = useCallback((assignmentType: string) => {
    if (typeof window !== 'undefined') {
      const savedSubmission = localStorage.getItem(`assignment_submission_${assignmentType}`);
      return !!savedSubmission;
    }
    return false;
  }, []);

  // Update submission status saat component mount
  useEffect(() => {
    const status: Record<string, boolean> = {};
    filteredAssignments.forEach((assignment: { type: string }) => {
      status[assignment.type] = checkSubmissionStatus(assignment.type);
    });
    setSubmissionStatus(status);
  }, [filteredAssignments, checkSubmissionStatus]);

  // Listener untuk perubahan localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const status: Record<string, boolean> = {};
      filteredAssignments.forEach((assignment: { type: string }) => {
        status[assignment.type] = checkSubmissionStatus(assignment.type);
      });
      setSubmissionStatus(status);
    };

    // Listen untuk perubahan localStorage
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event untuk perubahan dalam tab yang sama
    window.addEventListener('assignmentSubmitted', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('assignmentSubmitted', handleStorageChange);
    };
  }, [filteredAssignments, checkSubmissionStatus]);

  const classDetail = getClassDetail(classId);

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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredAssignments.slice(0, 3).map((assignment: { id: string; title: string; description: string; type: string }) => {
                    const isSubmitted = submissionStatus[assignment.type] || false;
                    return (
                      <div key={assignment.id} className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors ${
                        isSubmitted ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}>
                        <div className={`p-2 rounded-lg ${
                          isSubmitted ? 'bg-green-100' : 'bg-[#C40503]/10'
                        }`}>
                          {isSubmitted ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <FileText className="h-4 w-4 text-[#C40503]" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-gray-900 text-sm truncate">{assignment.title}</h4>
                            {isSubmitted && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs px-2 py-0.5">
                                Terkirim
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 truncate">{assignment.description}</p>
                        </div>
                        <Link href={`/dashboard-student/classes/${classId}/assignment-detail?type=${assignment.type}`}>
                          <Button size="sm" className={`${
                            isSubmitted 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-[#C40503] hover:bg-[#a30402]'
                          }`}>
                            <Eye className="h-4 w-4 mr-1" />
                            {isSubmitted ? 'Lihat' : 'Detail'}
                          </Button>
                        </Link>
                      </div>
                    );
                  })}
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
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredMaterials.slice(0, 3).map((material: { id: string; title: string; description: string; fileUrl: string }) => (
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
        </div>
      </div>
    </div>
  );
}
