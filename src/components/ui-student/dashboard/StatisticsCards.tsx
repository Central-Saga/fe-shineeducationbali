"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface StatisticsProps {
  enrolledClasses: number;
  pendingAssignments: number;
  averageGrade: string;
  studyHours: string;
}

export function StatisticsCards({
  enrolledClasses,
  pendingAssignments,
  averageGrade,
  studyHours,
}: StatisticsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Image
              src="/icons/book.svg"
              alt="Classes"
              width={20}
              height={20}
              className="opacity-70"
            />
            Kelas Terdaftar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-700">
            {enrolledClasses}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tugas Menunggu</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingAssignments}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageGrade}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Jam Belajar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{studyHours}</div>
        </CardContent>
      </Card>
    </div>
  );
}
