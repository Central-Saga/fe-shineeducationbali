"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, BookOpen, FileText } from 'lucide-react';
import { ClassSession } from '@/data/data-student/classes-data';
import Link from 'next/link';

interface ClassCardProps {
  session: ClassSession;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export function ClassCard({ session, isExpanded = false, onToggle }: ClassCardProps) {
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
      case 'submitted':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'graded':
        return 'bg-green-100 text-green-700';
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
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-[#C40503]" />
              <span>{session.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-5 h-5 rounded-full bg-[#DAA625] text-white flex items-center justify-center mr-2 text-xs">
                {session.teacher.charAt(0)}
              </div>
              <span>{session.teacher}</span>
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
                        <Link href={`/dashboard-student/materials/${materialId}`} className="hover:text-[#C40503]">
                          {materialTitle}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              
              {session.assignments && session.assignments.length > 0 && (
                <div>
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
                      <div className="flex items-center gap-2">
                        {assignment.score !== undefined && (
                          <span className="text-sm font-medium">{assignment.score}/100</span>
                        )}
                        <Badge className={getAssignmentStatusColor(assignment.status)}>
                          {assignment.status === 'submitted' ? 'Dikumpulkan' : 
                           assignment.status === 'pending' ? 'Belum Dikumpulkan' : 'Dinilai'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        
        <div className="border-t border-gray-100 p-4">
          <div className="flex justify-between">
            <div className="flex items-center">
              <button onClick={(e) => {
                e.stopPropagation();
                onToggle?.();
              }} className="text-sm text-[#C40503] hover:underline mr-4">
                {isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
              </button>
              
              <Link 
                href={`/dashboard-student/classes/${session.id}`} 
                className="text-sm text-[#DAA625] hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Detail Lengkap
              </Link>
            </div>
            
            {session.status === 'upcoming' && (
              <Link href={session.meetingLink ? session.meetingLink : `/dashboard-student/classes/${session.id}`}>
                <button className="text-sm font-medium text-white bg-[#C40503] px-4 py-1 rounded hover:bg-[#a60402] transition-colors">
                  Masuk Kelas
                </button>
              </Link>
            )}
            
            {session.status === 'ongoing' && (
              <Link href={session.meetingLink ? session.meetingLink : `/dashboard-student/classes/${session.id}`}>
                <button className="text-sm font-medium text-white bg-green-600 px-4 py-1 rounded hover:bg-green-700 transition-colors">
                  Masuk Kelas
                </button>
              </Link>
            )}
            
            {session.status === 'completed' && (
              <Link href={session.recordingUrl ? session.recordingUrl : `/dashboard-student/classes/${session.id}`}>
                <button className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-1 rounded hover:bg-gray-200 transition-colors">
                  Rekaman Kelas
                </button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
