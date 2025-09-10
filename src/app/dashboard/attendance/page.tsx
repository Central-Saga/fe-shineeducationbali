"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, FileText, ListChecks, UserCheck, Upload } from "lucide-react";
import Link from "next/link";

export default function AttendancePage() {
  return (
    <div className="space-y-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-md bg-gradient-to-br from-[#C40503] to-[#ef4444] text-white">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium opacity-80">Kehadiran Siswa</span>
              <span className="text-2xl font-bold">87%</span>
              <span className="text-sm opacity-80">Rata-rata kehadiran siswa</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md bg-gradient-to-br from-[#DAA625] to-[#fbbf24] text-white">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-medium opacity-80">Kehadiran Guru</span>
              <span className="text-2xl font-bold">92%</span>
              <span className="text-sm opacity-80">Rata-rata kehadiran guru</span>
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
              <span className="text-sm font-medium opacity-80">Dokumen Upload</span>
              <span className="text-2xl font-bold">15</span>
              <span className="text-sm opacity-80">Dokumen kehadiran hari ini</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard/attendance/students">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-gray-100 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-[#C40503]/10 p-3 rounded-full">
                <UserCheck className="h-8 w-8 text-[#C40503]" />
              </div>
              <CardTitle>Kehadiran Siswa</CardTitle>
              <p className="text-gray-500">Pantau kehadiran siswa yang diinput oleh guru</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/dashboard/attendance/teachers">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-gray-100 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-[#DAA625]/10 p-3 rounded-full">
                <Upload className="h-8 w-8 text-[#DAA625]" />
              </div>
              <CardTitle>Kehadiran Guru</CardTitle>
              <p className="text-gray-500">Pantau kehadiran guru yang di-upload sendiri</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/dashboard/attendance/reports">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-gray-100 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Laporan Kehadiran</CardTitle>
              <p className="text-gray-500">Lihat laporan dan statistik kehadiran</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/dashboard/attendance/settings">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 border-gray-100 h-full">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="bg-green-100 p-3 rounded-full">
                <ListChecks className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Pengaturan Kehadiran</CardTitle>
              <p className="text-gray-500">Konfigurasi sistem kehadiran</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
