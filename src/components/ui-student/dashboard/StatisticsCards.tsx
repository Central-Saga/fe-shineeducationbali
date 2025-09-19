"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckSquare, PieChart, Clock } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="bg-[#C40001]/5 border border-[#C40001]/20 overflow-hidden relative shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#C40001]" />
              Kelas Terdaftar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#C40001]">
              {enrolledClasses}
            </div>
            <p className="text-xs text-gray-500 mt-1">Kelas aktif saat ini</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="bg-[#DAA625]/5 border border-[#DAA625]/20 overflow-hidden relative shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-[#DAA625]" />
              Tugas Menunggu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-[#DAA625]">
              {pendingAssignments}
            </div>
            <p className="text-xs text-gray-500 mt-1">Perlu dikerjakan segera</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="bg-[#DAA521]/5 border border-[#DAA521]/20 overflow-hidden relative shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <PieChart className="h-5 w-5 text-[#DAA521]" />
              Rata-rata Nilai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {averageGrade}
            </div>
            <p className="text-xs text-gray-500 mt-1">Prestasi belajar</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className="bg-blue-100/50 border border-blue-200 overflow-hidden relative shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#DAA625]" />
              Jam Belajar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {studyHours}
            </div>
            <p className="text-xs text-gray-500 mt-1">Minggu ini</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
