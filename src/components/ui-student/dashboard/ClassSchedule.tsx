"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";

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
    <Card className="p-6 bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#C40503]" />
          Jadwal Kelas Minggu Ini
        </h2>
        
        <motion.div
          className="bg-[#C40503]/10 text-[#C40503] text-sm px-3 py-1 rounded-full font-medium"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1.5 
          }}
        >
          Up Next
        </motion.div>
      </div>
      
      <div className="space-y-4">
        {schedule.map((scheduleItem, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 ${
              index === 0 
                ? "bg-[#C40001]/5 border-[#C40001]/20" 
                : "bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full p-2 shadow-sm ${
                index === 0 ? "bg-[#C40001]/10" : "bg-white"
              }`}>
                <Image
                  src={scheduleItem.icon}
                  alt={scheduleItem.subject}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {scheduleItem.subject}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <User className="h-3 w-3" />
                  <p>{scheduleItem.teacher}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    index === 0 
                      ? "bg-[#C40503]/10 text-[#C40503]" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {scheduleItem.day}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {scheduleItem.time}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
