"use client";

import { StatsCard } from "@/components/ui-admin/layout/StatsCard";
import { Users, Activity, TrendingUp, UserPlus } from "lucide-react";
import { gradesOverview } from "@/data/data-admin/grades-data/grades-overview";

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Nilai Diinput"
        value={gradesOverview.totalScores}
        description={`+${gradesOverview.lastMonthIncrease} dari bulan lalu`}
        icon={<Activity className="h-6 w-6 text-[#C40503]" />}
        color="bg-[#C40503]"
        bgColor="bg-red-50"
        trend={{
          value: gradesOverview.lastMonthIncrease,
          isPositive: true,
          label: "vs bulan lalu"
        }}
      />
      
      <StatsCard
        title="Rata-rata Nilai"
        value={gradesOverview.averageScore}
        description={`+${gradesOverview.lastPeriodIncrease}% dari periode sebelumnya`}
        icon={<TrendingUp className="h-6 w-6 text-[#DAA625]" />}
        color="bg-[#DAA625]"
        bgColor="bg-yellow-50"
        trend={{
          value: gradesOverview.lastPeriodIncrease,
          isPositive: true,
          label: "vs periode sebelumnya"
        }}
      />
      
      <StatsCard
        title="Siswa Dinilai"
        value={gradesOverview.scoredStudents}
        description={`Dari total ${gradesOverview.totalStudents} siswa`}
        icon={<Users className="h-6 w-6 text-blue-600" />}
        color="bg-blue-600"
        bgColor="bg-blue-50"
      />
      
      <StatsCard
        title="Siswa Belum Dinilai"
        value={gradesOverview.unscoredStudents}
        description="Menunggu penilaian"
        icon={<UserPlus className="h-6 w-6 text-purple-600" />}
        color="bg-purple-600"
        bgColor="bg-purple-50"
      />
    </div>
  );
}
