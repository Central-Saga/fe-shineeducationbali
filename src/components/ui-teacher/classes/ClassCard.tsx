"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, BookOpen, FileText, Users, BarChart2 } from 'lucide-react';
import { TeacherClassSession } from '@/data/data-teacher/classes-data';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

interface ClassCardProps {
  session: TeacherClassSession;
  isExpanded?: boolean;
  onToggle?: () => void;
  onAttendanceClick?: (session: TeacherClassSession) => void;
}

export function ClassCard({ session, isExpanded = false, onToggle, onAttendanceClick }: ClassCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'ongoing':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getAssignmentStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'ongoing':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formattedDate = new Date(session.date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${isExpanded ? 'border-[#C40503]' : ''}`}>
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{session.title}</h3>
              <p className="text-sm text-gray-600">{session.subject}</p>
            </div>
            <Badge className={getStatusColor(session.status)}>
              {session.status === 'upcoming' ? 'Akan Datang' : 
               session.status === 'ongoing' ? 'Sedang Berlangsung' : 'Selesai'}
            </Badge>
          </div>
          
          <div className="flex flex-col gap-2 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-[#DAA625]" />
              <span>{formattedDate}, {session.timeStart} - {session.timeEnd}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-[#C40503]" />
                <span>{session.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-[#DAA625]" />
                <span>{session.studentCount} Siswa</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BarChart2 className="h-4 w-4 text-[#C40503]" />
              <span>Progress:</span>
              <div className="w-full max-w-[150px]">
                <Progress value={session.completionProgress} className="h-2" />
              </div>
              <span className="font-medium">{session.completionProgress}%</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{session.description}</p>
          
          {isExpanded && (
            <>
              <div className="mb-4">
                <h4 className="text-sm font-semibold flex items-center mb-2">
                  <BookOpen className="h-4 w-4 mr-1 text-[#C40503]" />
                  Materi Pembelajaran
                </h4>
                <ul className="pl-6 list-disc text-sm text-gray-600">
                  {session.materials.map((material, index) => {
                    // Check if material is a string or an object
                    const isString = typeof material === 'string';
                    const materialId = isString ? index.toString() : (material as any).id || index.toString();
                    const materialTitle = isString ? material : (material as any).title;
                    
                    return (
                      <li key={index} className="mb-1">
                        <Link href={`/dashboard-teacher/materials/${materialId}`} className="hover:text-[#C40503]">
                          {materialTitle}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              {session.assignments && session.assignments.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold flex items-center mb-2">
                    <FileText className="h-4 w-4 mr-1 text-[#DAA625]" />
                    Tugas
                  </h4>
                  {session.assignments.map((assignment) => (
                    <div key={assignment.id} className="mb-2 flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{assignment.title}</p>
                        <p className="text-xs text-gray-500">Tenggat: {new Date(assignment.dueDate).toLocaleDateString('id-ID')}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {assignment.submissionCount !== undefined && assignment.totalStudents && (
                          <span className="text-xs text-gray-600">
                            Pengumpulan: {assignment.submissionCount}/{assignment.totalStudents}
                          </span>
                        )}
                        <Badge className={getAssignmentStatusColor(assignment.status)}>
                          {assignment.status === 'completed' ? 'Selesai' : 
                           assignment.status === 'ongoing' ? 'Sedang Berlangsung' : 'Akan Datang'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {session.attendanceRecord && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold flex items-center mb-2">
                    <Users className="h-4 w-4 mr-1 text-[#C40503]" />
                    Kehadiran
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-gray-50 p-2 rounded text-center">
                      <p className="text-xs text-gray-500">Total</p>
                      <p className="text-sm font-medium">{session.attendanceRecord.total}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded text-center">
                      <p className="text-xs text-green-600">Hadir</p>
                      <p className="text-sm font-medium text-green-700">{session.attendanceRecord.present}</p>
                    </div>
                    <div className="bg-red-50 p-2 rounded text-center">
                      <p className="text-xs text-red-600">Tidak Hadir</p>
                      <p className="text-sm font-medium text-red-700">{session.attendanceRecord.absent}</p>
                    </div>
                    <div className="bg-yellow-50 p-2 rounded text-center">
                      <p className="text-xs text-yellow-600">Terlambat</p>
                      <p className="text-sm font-medium text-yellow-700">{session.attendanceRecord.late}</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="border-t border-gray-100 p-4">
          <div className="flex justify-between">
            
            {session.status === 'upcoming' && (
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // We'll update this later to handle attendance modal
                    if (onAttendanceClick) onAttendanceClick(session);
                  }}
                  className="text-sm font-medium text-[#C40503] border border-[#C40503] px-3 py-1 rounded hover:bg-[#C40503] hover:text-white transition-colors"
                >
                  Persiapan Kelas
                </button>
                <Link href={`/dashboard-teacher/classes/${session.id}`}>
                  <button className="text-sm font-medium text-white bg-[#C40503] px-4 py-1 rounded hover:bg-[#a60402] transition-colors">
                    Detail Kelas
                  </button>
                </Link>
              </div>
            )}
            
            {session.status === 'ongoing' && (
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // We'll update this later to handle attendance modal
                    if (onAttendanceClick) onAttendanceClick(session);
                  }}
                  className="text-sm font-medium text-white bg-[#DAA625] px-4 py-1 rounded hover:bg-[#b88d1c] transition-colors"
                >
                  Absensi
                </button>
                <Link href={`/dashboard-teacher/classes/${session.id}`}>
                  <button className="text-sm font-medium text-white bg-green-600 px-4 py-1 rounded hover:bg-green-700 transition-colors">
                    Detail Kelas
                  </button>
                </Link>
              </div>
            )}
            
            {session.status === 'completed' && (
              <div className="flex gap-2">
                <Link href={`/dashboard-teacher/classes/${session.id}/grades`}>
                  <button className="text-sm font-medium text-[#DAA625] border border-[#DAA625] px-3 py-1 rounded hover:bg-[#DAA625] hover:text-white transition-colors">
                    Nilai
                  </button>
                </Link>
                <Link href={`/dashboard-teacher/classes/${session.id}`}>
                  <button className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-1 rounded hover:bg-gray-200 transition-colors">
                    Detail Kelas
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
