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

  // Progress bar membaca data centang dari localStorage agar sinkron dengan detail
  const classId = session.id;
  // Ambil jumlah tugas & materi dari localStorage agar progress bar sesuai data detail
  const [completedItems, setCompletedItems] = React.useState(0);
  const [totalItems, setTotalItems] = React.useState(0);
  React.useEffect(() => {
    if (typeof window !== 'undefined' && classId) {
      // Ambil data progress dari localStorage
      const saved = localStorage.getItem('classProgress_' + classId);
      const arr = saved ? JSON.parse(saved) : [];
      setCompletedItems(arr.length);
      // Ambil data detail dari localStorage (jumlah tugas & materi yang ada di detail)
      const detailData = localStorage.getItem('classDetailItems_' + classId);
      let total = 0;
      if (detailData && !isNaN(Number(detailData))) {
        total = Number(detailData);
      } else {
        // fallback ke jumlah dari session jika belum ada
        const totalAssignments = Array.isArray(session.assignments) ? session.assignments.length : 0;
        const totalMaterials = Array.isArray(session.materials) ? session.materials.length : 0;
        total = totalAssignments + totalMaterials;
      }
      setTotalItems(total);
    }
  }, [classId, session.assignments, session.materials]);
  const progressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

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

          {/* Progress bar tugas & materi di halaman depan class, membaca data dari localStorage */}
          {(totalItems > 0) && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold flex items-center mb-2">
                <FileText className="h-4 w-4 mr-1 text-[#DAA625]" />
                Progress Tugas & Materi
              </h4>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-40 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-[#C40503] rounded-full"
                    style={{ width: `${progressPercent}%`, transition: 'width 0.3s' }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 font-semibold">{completedItems}/{totalItems} Selesai</span>
              </div>
            </div>
          )}

          {/* Detail materi & tugas hanya di halaman detail (isExpanded) */}
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
          <div className="flex justify-end items-center">
            {/* Tombol detail kelas */}
            <div>
              {session.status === 'upcoming' && (
                <Link href={`/dashboard-student/classes/${session.id}`}>
                  <button className="text-sm font-medium text-white bg-[#C40503] px-4 py-1 rounded hover:bg-[#a60402] transition-colors">
                    Detail Kelas
                  </button>
                </Link>
              )}
              {session.status === 'ongoing' && (
                <Link href={`/dashboard-student/classes/${session.id}`}>
                  <button className="text-sm font-medium text-white bg-green-600 px-4 py-1 rounded hover:bg-green-700 transition-colors">
                    Detail Kelas
                  </button>
                </Link>
              )}
              {session.status === 'completed' && (
                <Link href={`/dashboard-student/classes/${session.id}`}>
                  <button className="text-sm font-medium text-gray-600 bg-gray-100 px-4 py-1 rounded hover:bg-gray-200 transition-colors">
                    Detail Kelas
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
