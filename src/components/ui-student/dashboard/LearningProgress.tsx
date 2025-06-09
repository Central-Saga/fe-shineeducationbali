"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";

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
    <Card className="p-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Progress Belajar 📚
      </h2>
      <div className="space-y-6">
        {progress.map((subject, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Image
                  src={`/picprogram/${subject.subject
                    .toLowerCase()
                    .replace(/\s+/g, "")}.png`}
                  alt={subject.subject}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="font-medium text-gray-800">
                  {subject.subject}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {subject.completedModules} dari {subject.totalModules} modul
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                style={{ width: `${subject.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 text-right">
              {subject.progress}% selesai
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
