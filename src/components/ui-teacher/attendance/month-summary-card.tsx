"use client";

import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MonthSummaryCardProps {
  currentMonth: Date;
  monthData: any;
  previousMonth: () => void;
  nextMonth: () => void;
}

export function MonthSummaryCard({ currentMonth, monthData, previousMonth, nextMonth }: MonthSummaryCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 py-5">
        <div>
          <CardTitle>Ringkasan Bulan Ini</CardTitle>
          <CardDescription>
            Data kehadiran untuk bulan {format(currentMonth, 'MMMM yyyy', { locale: id })}
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={previousMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            disabled={new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) <= currentMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">{monthData.workDays}</div>
            <div className="text-sm text-blue-600 mt-1">Hari Kerja</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{monthData.attendanceRate}</div>
            <div className="text-sm text-green-600 mt-1">Tingkat Kehadiran</div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600">{monthData.totalWorkHours}</div>
            <div className="text-sm text-yellow-600 mt-1">Total Jam Kerja</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="text-3xl font-bold text-purple-600">{monthData.averageHoursPerDay}</div>
            <div className="text-sm text-purple-600 mt-1">Rata-rata Jam/Hari</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
