"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

// Define the interface for the ClassDetailData
interface ClassDetailData {
  id: string;
  title: string;
  subject: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  instructor: {
    name: string;
    subject: string;
  };
  attendees: Array<{ id: string; name: string; avatar?: string }>;
}

interface ClassDetailHeaderProps {
  classDetail: ClassDetailData;
}

export function ClassDetailHeader({ classDetail }: ClassDetailHeaderProps) {
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

  const getMeetingStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Akan Datang';
      case 'ongoing':
        return 'Sedang Berlangsung';
      case 'completed':
        return 'Telah Selesai';
      default:
        return 'Unknown';
    }
  };

  const formattedDate = new Date(classDetail.date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Card className="overflow-hidden border-[#C40503]/20">
      <CardContent className="p-6">
        <div className="mb-4">
          <p className="text-lg text-gray-600 mb-1">{classDetail.subject}</p>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {classDetail.title}
            </h1>
            <Badge className={getStatusColor(classDetail.status)}>
              {getMeetingStatusLabel(classDetail.status)}
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <p className="text-gray-600">{classDetail.description}</p>
          </div>
          
          <div className="flex flex-col gap-2 md:text-right">
            {classDetail.status === 'upcoming' && (
              <Link href={`/dashboard-student/classes/${classDetail.id}`}>
                <Button className="bg-[#C40503] hover:bg-[#a60402]">
                  Detail Pertemuan
                </Button>
              </Link>
            )}
            
            {classDetail.status === 'ongoing' && (
              <Link href={`/dashboard-student/classes/${classDetail.id}`}>
                <Button className="bg-green-600 hover:bg-green-700">
                  Detail Pertemuan
                </Button>
              </Link>
            )}
            
            {classDetail.status === 'completed' && (
              <Link href={`/dashboard-student/classes/${classDetail.id}`}>
                <Button className="bg-[#DAA625] hover:bg-[#b88d1c]">
                  Detail Pertemuan
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#DAA625]" />
              <div>
                <p className="text-sm text-gray-500">Waktu</p>
                <p className="text-gray-700">{formattedDate}, {classDetail.timeStart} - {classDetail.timeEnd}</p>
              </div>
            </div>
            
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DAA625] text-white flex items-center justify-center text-lg">
                {classDetail.instructor.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Pengajar</p>
                <p className="text-gray-700 font-medium">{classDetail.instructor.name}</p>
                <p className="text-sm text-gray-600">{classDetail.instructor.subject}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[#C40503]" />
              <div>
                <p className="text-sm text-gray-500">Peserta</p>
                <p className="text-gray-700">{classDetail.attendees.length} Siswa</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
