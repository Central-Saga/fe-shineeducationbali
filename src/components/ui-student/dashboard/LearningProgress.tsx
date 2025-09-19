"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart } from "lucide-react";

interface ProgressItem {
  subject: string;
  progress: number;
  totalModules: number;
  completedModules: number;
}

interface LearningProgressProps {
  progress: ProgressItem[];
}

export function LearningProgress({ progress }: LearningProgressProps) {
  return (
    <Card className="p-6 bg-white shadow-md rounded-xl border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <BarChart className="h-5 w-5 text-[#C40503]" />
        <h2 className="text-xl font-semibold text-gray-800">
          Progress Belajar
        </h2>
      </div>
      
      <div className="space-y-6">
        {progress.map((subject, index) => (
          <motion.div 
            key={index} 
            className="space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#C40503]/10">
                  <Image
                    src={`/picprogram/${subject.subject
                      .toLowerCase()
                      .replace(/\s+/g, "")}.png`}
                    alt={subject.subject}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="font-medium text-gray-800">
                  {subject.subject}
                </span>
              </div>
              <span className="text-sm font-medium px-2 py-1 bg-[#DAA625]/10 text-[#DAA625] rounded-full">
                {subject.completedModules} dari {subject.totalModules} modul
              </span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${subject.progress}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className="h-full bg-[#C40001] rounded-full"
              />
            </div>
            <p className="text-xs text-gray-500 text-right mt-1">
              {subject.progress}% selesai
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
