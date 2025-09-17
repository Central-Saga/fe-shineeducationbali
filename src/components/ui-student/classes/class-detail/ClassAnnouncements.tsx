"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BellRing } from 'lucide-react';

interface ClassAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
}

interface ClassAnnouncementsProps {
  announcements: ClassAnnouncement[];
}

export function ClassAnnouncements({ announcements }: ClassAnnouncementsProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BellRing className="h-5 w-5 text-[#DAA625]" />
          Pengumuman
        </CardTitle>
      </CardHeader>
      <CardContent>
        {announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                  {announcement.isImportant && (
                    <Badge className="bg-red-100 text-red-700">Penting</Badge>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{announcement.content}</p>
                <p className="text-xs text-gray-500">Diumumkan pada: {formatDate(announcement.date)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada pengumuman</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
