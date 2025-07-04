"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileText, ListChecks, UserCheck } from "lucide-react";
import Link from "next/link";

export default function AttendancePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manajemen Kehadiran
          </h1>
          <p className="text-gray-500 mt-1">
            Kelola rekap kehadiran siswa dan pengajar
          </p>
        </div>
        <Button className="bg-[#C40503] hover:bg-[#a50402] text-white">
          <UserCheck className="h-4 w-4 mr-2" />
          Input Kehadiran Baru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-[#C40503] to-[#ef4444] text-white">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium opacity-80">Total Kehadiran</span>
              <span className="text-2xl font-bold">87%</span>
              <span className="text-sm opacity-80">Rata-rata keseluruhan</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-[#DAA625] to-[#fbbf24] text-white">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium opacity-80">Siswa Hadir Hari Ini</span>
              <span className="text-2xl font-bold">42</span>
              <span className="text-sm opacity-80">Dari 45 siswa terdaftar</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium opacity-80">Kelas Aktif</span>
              <span className="text-2xl font-bold">12</span>
              <span className="text-sm opacity-80">Pertemuan hari ini</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium opacity-80">Guru Aktif</span>
              <span className="text-2xl font-bold">8</span>
              <span className="text-sm opacity-80">Mengajar hari ini</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/attendance/daily">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-gray-100 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-[#C40503]/10 p-3 rounded-full">
                <CalendarIcon className="h-8 w-8 text-[#C40503]" />
              </div>
              <CardTitle>Kehadiran Harian</CardTitle>
              <p className="text-gray-500">Catat dan lihat kehadiran siswa per hari</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/dashboard/attendance/report">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-gray-100 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-[#DAA625]/10 p-3 rounded-full">
                <FileText className="h-8 w-8 text-[#DAA625]" />
              </div>
              <CardTitle>Laporan Kehadiran</CardTitle>
              <p className="text-gray-500">Lihat laporan kehadiran per periode dan kelas</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/dashboard/attendance/summary">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-gray-100 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ListChecks className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Ringkasan Kehadiran</CardTitle>
              <p className="text-gray-500">Lihat statistik dan ringkasan kehadiran</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
