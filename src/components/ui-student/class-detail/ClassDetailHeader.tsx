"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Video, Users, Globe } from 'lucide-react';
import { ClassDetailData } from '@/data/data-student/class-detail-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

  const formattedDate = new Date(classDetail.date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Card className="overflow-hidden border-[#C40503]/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{classDetail.title}</h1>
              <Badge className={getStatusColor(classDetail.status)}>
                {classDetail.status === 'upcoming' ? 'Akan Datang' : 
                 classDetail.status === 'ongoing' ? 'Sedang Berlangsung' : 'Selesai'}
              </Badge>
            </div>
            <p className="text-lg text-gray-600 mb-2">{classDetail.subject}</p>
            <p className="text-gray-600">{classDetail.description}</p>
          </div>
          
          <div className="flex flex-col gap-2 md:text-right">
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
                  <Video className="h-4 w-4 mr-2" />
                  Tonton Rekaman
                </Button>
              </Link>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-[#DAA625]" />
              <div>
                <p className="text-sm text-gray-500">Waktu</p>
                <p className="text-gray-700">{formattedDate}, {classDetail.timeStart} - {classDetail.timeEnd}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[#C40503]" />
              <div>
                <p className="text-sm text-gray-500">Lokasi</p>
                <p className="text-gray-700">{classDetail.location}</p>
              </div>
            </div>
            
            {classDetail.meetingLink && (
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-[#DAA625]" />
                <div>
                  <p className="text-sm text-gray-500">Link Meeting</p>
                  <a 
                    href={classDetail.meetingLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#C40503] hover:underline"
                  >
                    {classDetail.meetingLink}
                  </a>
                </div>
              </div>
            )}
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
