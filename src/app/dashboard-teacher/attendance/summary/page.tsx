"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, subMonths, addMonths } from 'date-fns';
import { id } from 'date-fns/locale';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, BarChart3, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Import components
import { MonthSummaryCard } from '@/components/ui-teacher/attendance/month-summary-card';
import { AttendanceDistributionCard } from '@/components/ui-teacher/attendance/attendance-distribution-card';
import { PerformanceCard } from '@/components/ui-teacher/attendance/performance-card';
import { AttendanceHistoryTable } from '@/components/ui-teacher/attendance/attendance-history-table';
import { AttendanceTrendsCard } from '@/components/ui-teacher/attendance/attendance-trends-card';

// Import data
import { 
  generateMockData, 
  monthlyData 
} from '@/data/data-teacher/attendance/teacher-attendance-summary-data';

export default function AttendanceSummaryPage() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  
  const monthData = generateMockData(currentMonth);
  
  const previousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };
  
  const nextMonth = () => {
    const next = addMonths(currentMonth, 1);
    if (next <= new Date()) {
      setCurrentMonth(next);
    }
  };
  
  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - i).toString());
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Rekap Kehadiran</h1>
        <p className="text-gray-500 mb-6">Lihat ringkasan kehadiran bulanan Anda</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <MonthSummaryCard 
          currentMonth={currentMonth}
          monthData={monthData}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col md:col-span-2 space-y-6">
            <AttendanceDistributionCard monthData={monthData} />
          </div>
          
          <div className="flex flex-col space-y-6">
            <PerformanceCard monthData={monthData} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AttendanceHistoryTable 
          data={monthlyData}
          year={year}
          onYearChange={setYear}
          years={years}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <AttendanceTrendsCard />
      </motion.div>
    </div>
  );
}
