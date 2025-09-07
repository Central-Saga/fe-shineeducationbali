"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { ClassSchedule } from '@/data/data-student/classes-data';

interface CalendarViewProps {
  schedules: ClassSchedule[];
  onSelectDay: (scheduleId: string) => void;
  selectedDayId: string | null;
}

export function CalendarView({ schedules, onSelectDay, selectedDayId }: CalendarViewProps) {
  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('id-ID', { month: 'short' })
    };
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-lg">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Jadwal Kelas Mendatang
          </CardTitle>
          <button className="text-[#C40503] text-sm hover:underline">
            Lihat Kalender Lengkap
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {schedules.map((schedule) => {
            const { day, month } = formatDate(schedule.date);
            const isSelected = selectedDayId === schedule.id;
            
            return (
              <button
                key={schedule.id}
                className={`flex flex-col items-center min-w-[90px] p-3 rounded-lg transition-colors
                  ${isSelected 
                    ? 'bg-[#C40503] text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                onClick={() => onSelectDay(schedule.id)}
              >
                <span className="text-xs font-medium">
                  {schedule.day}
                </span>
                <span className="text-2xl font-bold my-1">
                  {day}
                </span>
                <span className="text-xs">
                  {month}
                </span>
                {schedule.sessions.length > 0 && (
                  <span className={`text-xs mt-1 px-2 py-0.5 rounded-full
                    ${isSelected 
                      ? 'bg-white text-[#C40503]' 
                      : 'bg-[#DAA625] text-white'
                    }`}
                  >
                    {schedule.sessions.length} Kelas
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
