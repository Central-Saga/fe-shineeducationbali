"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, Activity, TrendingUp, UserPlus } from "lucide-react";
import { gradesOverview } from "@/data/data-admin/grades-data/grades-overview";

export function Overview() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-[#C40503] to-[#ef4444] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium py-5">Total Nilai Diinput</h3>
            <Activity className="h-4 w-4 text-white opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gradesOverview.totalScores}
            </div>
            <p className="text-xs opacity-80 pb-3">
              +{gradesOverview.lastMonthIncrease} dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-gradient-to-br from-[#DAA625] to-[#fbbf24] text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium py-5">Rata-rata Nilai</h3>
            <TrendingUp className="h-4 w-4 text-white opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gradesOverview.averageScore}
            </div>
            <p className="text-xs opacity-80 pb-3">
              +{gradesOverview.lastPeriodIncrease}% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium py-5">Siswa Dinilai</h3>
            <Users className="h-4 w-4 text-white opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gradesOverview.scoredStudents}
            </div>
            <p className="text-xs opacity-80 pb-3">
              Dari total {gradesOverview.totalStudents} siswa
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium py-5">Siswa Belum Dinilai</h3>
            <UserPlus className="h-4 w-4 text-white opacity-80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gradesOverview.unscoredStudents}
            </div>
            <p className="text-xs opacity-80 pb-3">
              Menunggu penilaian
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
