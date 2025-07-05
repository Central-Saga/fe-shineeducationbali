"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AttendanceDistributionCardProps {
  monthData: any;
}

export function AttendanceDistributionCard({ monthData }: AttendanceDistributionCardProps) {
  return (
    <div className="rounded-lg border p-6">
      <h3 className="font-semibold text-lg mb-4">Distribusi Kehadiran</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Hadir Tepat Waktu</span>
            </div>
            <span>{monthData.present} hari</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(monthData.present / monthData.workDays) * 100}%` }}></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
              <span>Terlambat</span>
            </div>
            <span>{monthData.late} hari</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(monthData.late / monthData.workDays) * 100}%` }}></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Tidak Hadir</span>
            </div>
            <span>{monthData.absent} hari</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${(monthData.absent / monthData.workDays) * 100}%` }}></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Cuti</span>
            </div>
            <span>{monthData.leave} hari</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(monthData.leave / monthData.workDays) * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
