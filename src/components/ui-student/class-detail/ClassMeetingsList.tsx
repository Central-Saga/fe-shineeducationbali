"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Check } from 'lucide-react';
import Link from 'next/link';

interface Meeting {
  id: string;
  title: string;
  description?: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  status: 'completed' | 'upcoming' | 'ongoing';
  attendanceStatus?: 'present' | 'absent' | 'late';
}

interface ClassMeetingsListProps {
  meetings: Meeting[];
  classId: string;
}

export function ClassMeetingsList({ meetings, classId }: ClassMeetingsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-700">Telah Selesai</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-700">Sedang Berlangsung</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-700">Akan Datang</Badge>;
      default:
        return null;
    }
  };

  const getAttendanceStatusBadge = (status?: string) => {
    if (!status) return null;
    
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-700 ml-2">Hadir</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-700 ml-2">Tidak Hadir</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-700 ml-2">Terlambat</Badge>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-[#C40503]" />
        Jadwal Pertemuan Kelas
      </h2>

      <div className="space-y-4">
        {meetings.map((meeting, index) => (
          <Card key={meeting.id} className="p-4 border-l-4 hover:shadow-md transition-all duration-200 relative overflow-hidden"
                style={{ borderLeftColor: meeting.status === 'completed' ? '#DAA625' : 
                                         meeting.status === 'ongoing' ? '#10b981' : 
                                         '#3b82f6' }}>
            <div className="flex justify-between items-start">
              <div className="flex-grow">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium">
                    Pertemuan {index + 1} - {meeting.title}
                  </h3>
                  {meeting.status === 'completed' && (
                    <Check className="h-5 w-5 text-green-500 ml-2" />
                  )}
                  {getAttendanceStatusBadge(meeting.attendanceStatus)}
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-[#DAA625]" />
                    <span className="text-sm text-gray-600">
                      {formatDate(meeting.date)}, {meeting.timeStart} - {meeting.timeEnd}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-[#C40503]" />
                    <span className="text-sm text-gray-600">{meeting.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                {getStatusBadge(meeting.status)}
                
                <div className="mt-2">
                  {meeting.status === 'completed' ? (
                    <Link href={`/dashboard-student/classes/${classId}/meetings/${meeting.id}`}>
                      <Button size="sm" variant="outline" className="text-[#DAA625] border-[#DAA625] hover:bg-[#DAA625]/10">
                        Detail
                      </Button>
                    </Link>
                  ) : meeting.status === 'ongoing' ? (
                    <Link href={`/dashboard-student/classes/${classId}/meetings/${meeting.id}`}>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Detail
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/dashboard-student/classes/${classId}/meetings/${meeting.id}`}>
                      <Button size="sm" variant="outline" className="text-[#C40503] border-[#C40503] hover:bg-[#C40503]/10">
                        Detail
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
