"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, Activity, TrendingUp, UserPlus } from "lucide-react";
import { gradesOverview } from "@/data/data-admin/grades-data/grades-overview";

export function Overview() {
  return (
    <div>
     
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Nilai Diinput</h3>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gradesOverview.totalScores}
            </div>
            <p className="text-xs text-muted-foreground">
              +{gradesOverview.lastMonthIncrease} dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Rata-rata Nilai</h3>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gradesOverview.averageScore}
            </div>
            <p className="text-xs text-muted-foreground">
              +{gradesOverview.lastPeriodIncrease}% dari periode sebelumnya
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Siswa Dinilai</h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gradesOverview.scoredStudents}
            </div>
            <p className="text-xs text-muted-foreground">
              Dari total {gradesOverview.totalStudents} siswa
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Belum Dinilai</h3>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {gradesOverview.unscoredStudents}
            </div>
            <p className="text-xs text-muted-foreground">
              Siswa belum memiliki nilai
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
