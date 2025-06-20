"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

interface ScheduleItem {
  subject: string;
  time: string;
  day: string;
  icon: string;
  teacher: string;
}

interface ClassScheduleProps {
  schedule: ScheduleItem[];
}

export function ClassSchedule({ schedule }: ClassScheduleProps) {
  return (
    <Card className="p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Jadwal Kelas Minggu Ini 🎯
      </h2>
      <div className="space-y-4">
        {schedule.map((scheduleItem, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-100 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white p-2 shadow-sm">
                <Image
                  src={scheduleItem.icon}
                  alt={scheduleItem.subject}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {scheduleItem.subject}
                </h3>
                <p className="text-sm text-gray-600">{scheduleItem.teacher}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {scheduleItem.day}
                  </span>
                  <span className="text-xs text-gray-500">
                    {scheduleItem.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
