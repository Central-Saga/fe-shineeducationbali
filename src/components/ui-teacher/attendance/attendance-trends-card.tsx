"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Clock } from 'lucide-react';

export function AttendanceTrendsCard() {
  return (
    <Card>
      <CardHeader className="pb-3 py-5">
        <CardTitle>Tren Kehadiran</CardTitle>
        <CardDescription>Analisis pola kehadiran Anda selama 6 bulan terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="attendance">
          <TabsList className="mb-4">
            <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
            <TabsTrigger value="workHours">Jam Kerja</TabsTrigger>
          </TabsList>
          
          <TabsContent value="attendance" className="space-y-4">
            <div className="relative h-[300px] w-full">
              {/* This is a placeholder for a chart. In a real app, you would use a charting library like Chart.js or Recharts */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Data tren kehadiran akan ditampilkan di sini</p>
                  <p className="text-xs text-gray-400 mt-1">Implementasi chart akan menggunakan Chart.js atau Recharts</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="workHours" className="space-y-4">
            <div className="relative h-[300px] w-full">
              {/* This is a placeholder for a chart. In a real app, you would use a charting library like Chart.js or Recharts */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Data tren jam kerja akan ditampilkan di sini</p>
                  <p className="text-xs text-gray-400 mt-1">Implementasi chart akan menggunakan Chart.js atau Recharts</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
