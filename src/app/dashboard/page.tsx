"use client";

import {
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const stats = [
    {
      name: "Total Murid",
      value: "120",
      icon: Users,
      description: "12% dari bulan lalu",
      trend: "up",
    },
    {
      name: "Total Kursus",
      value: "15",
      icon: GraduationCap,
      description: "3 kursus baru",
      trend: "up",
    },
    {
      name: "Kelas Aktif",
      value: "8",
      icon: Calendar,
      description: "2 kelas akan dimulai",
      trend: "neutral",
    },
    {
      name: "Pendapatan",
      value: "Rp 15.000.000",
      icon: DollarSign,
      description: "↗︎ 10% dari bulan lalu",
      trend: "up",
    },
  ];
  const recentActivities = [
    {
      user: "Ani Susanti",
      action: "mendaftar kursus",
      course: "Bahasa Inggris",
      time: "5 menit yang lalu",
    },
    {
      user: "Budi Santoso",
      action: "menyelesaikan kursus",
      course: "Matematika",
      time: "1 jam yang lalu",
    },
    {
      user: "Clara Dewi",
      action: "mengumpulkan tugas",
      course: "IPA",
      time: "2 jam yang lalu",
    },
    {
      user: "David Pratama",
      action: "mulai belajar",
      course: "Bahasa Mandarin",
      time: "3 jam yang lalu",
    },
    {
      user: "Eva Putri",
      action: "mengikuti ujian",
      course: "Komputer",
      time: "5 jam yang lalu",
    },
  ];
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Dashboard Admin
        </h2>
        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100">
          <span className="text-sm font-medium text-gray-700">Tahun Ajaran 2025/2026</span>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.name} className="overflow-hidden border-none shadow-md">
            <div className={`h-1 w-full ${
              index === 0 ? "bg-[#C40503]" : 
              index === 1 ? "bg-[#DAA625]" : 
              index === 2 ? "bg-gradient-to-r from-[#C40503] to-[#DAA625]" : 
              "bg-gradient-to-r from-[#DAA625] to-[#C40503]"
            }`}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <div className={`p-2 rounded-full ${
                index === 0 ? "bg-red-50" : 
                index === 1 ? "bg-amber-50" : 
                index === 2 ? "bg-orange-50" : 
                "bg-rose-50"
              }`}>
                <stat.icon className={`h-4 w-4 ${
                  index === 0 ? "text-[#C40503]" : 
                  index === 1 ? "text-[#DAA625]" : 
                  index === 2 ? "text-orange-600" : 
                  "text-rose-600"
                }`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === "up" ? "text-green-600" : 
                stat.trend === "down" ? "text-red-600" : 
                "text-gray-500"
              }`}>
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities and Course Popularity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Activities */}
        <Card className="col-span-4 border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#C40503]"></div>
          <CardHeader className="bg-gradient-to-r from-white to-red-50/30 pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2 text-[#C40503]">
                  <Activity className="h-5 w-5" />
                  Aktivitas Terkini
                </CardTitle>
                <CardDescription>
                  Ada {recentActivities.length} aktivitas terbaru hari ini
                </CardDescription>
              </div>
              <div className="bg-white border border-red-100 rounded-full px-3 py-1 text-xs font-medium text-[#C40503] shadow-sm">
                Lihat Semua
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 hover:bg-red-50/30 transition-colors"
                >
                  <Avatar className="h-10 w-10 border-2 border-red-100">
                    <AvatarFallback className={`${
                      index % 2 === 0 ? "bg-gradient-to-br from-[#C40503] to-[#DAA625]" : "bg-gradient-to-br from-[#DAA625] to-[#C40503]"
                    } text-white`}>
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium leading-none">
                        <span className="font-bold text-gray-800">{activity.user}</span>{" "}
                        <span className="text-gray-600">{activity.action}</span>{" "}
                        <span className="font-medium text-[#C40503]">{activity.course}</span>
                      </p>
                      <span className="bg-gray-100 text-gray-600 rounded-full px-2 py-1 text-xs">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {index % 2 === 0 ? "Melalui aplikasi mobile" : "Melalui website"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Courses */}
        <Card className="col-span-3 border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <CardHeader className="bg-gradient-to-r from-white to-amber-50/30 pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2 text-[#DAA625]">
                  <BookOpen className="h-5 w-5" />
                  Kursus Populer
                </CardTitle>
                <CardDescription>5 kursus dengan peserta terbanyak</CardDescription>
              </div>
              <div className="bg-white border border-amber-100 rounded-full px-3 py-1 text-xs font-medium text-[#DAA625] shadow-sm">
                Lihat Detail
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { name: "Bahasa Inggris", students: 45, progress: 90 },
                { name: "Matematika", students: 38, progress: 75 },
                { name: "IPA", students: 32, progress: 65 },
                { name: "Komputer", students: 28, progress: 55 },
                { name: "Bahasa Mandarin", students: 25, progress: 50 },
              ].map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? "bg-yellow-100" : 
                        index === 1 ? "bg-gray-100" : 
                        index === 2 ? "bg-amber-100" : 
                        "bg-red-50"
                      }`}>
                        <Award className={`h-4 w-4 ${
                          index === 0 ? "text-yellow-500" : 
                          index === 1 ? "text-gray-500" : 
                          index === 2 ? "text-amber-600" : 
                          "text-[#C40503]"
                        }`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {course.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {course.students} murid terdaftar
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-full px-2 py-1">
                      <span className={`text-xs font-medium ${
                        index === 0 ? "text-[#C40503]" : 
                        index === 1 ? "text-[#DAA625]" : 
                        index === 2 ? "text-amber-600" : 
                        "text-gray-600"
                      }`}>
                        {course.progress}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className={`h-1.5 rounded-full ${
                      index === 0 ? "bg-[#C40503]" : 
                      index === 1 ? "bg-[#DAA625]" : 
                      index === 2 ? "bg-gradient-to-r from-[#C40503] to-[#DAA625]" : 
                      "bg-gradient-to-r from-[#DAA625] to-[#C40503]"
                    }`} style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Dashboard Widgets */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Calendar & Upcoming Events */}
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#C40503] to-[#DAA625]"></div>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-gray-800">Kalender & Acara</CardTitle>
              <div className="bg-[#C40503] text-white rounded-full px-3 py-1 text-xs font-medium">
                Juli 2025
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="bg-red-50/50 p-4">
              <div className="text-sm font-medium text-[#C40503] mb-2">Acara Mendatang</div>
              <div className="space-y-3">
                {[
                  { date: "5 Jul", title: "Rapat Guru", time: "09:00 - 11:00" },
                  { date: "12 Jul", title: "Ujian Tengah Semester", time: "08:00 - 12:00" },
                  { date: "20 Jul", title: "Pertemuan Orang Tua", time: "13:00 - 15:00" }
                ].map((event, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <div className="bg-[#C40503] text-white rounded px-2 py-1 text-center w-12">
                      <div className="text-xs font-bold">{event.date}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{event.title}</div>
                      <div className="text-xs text-gray-500">{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-800">Performa Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Kehadiran", value: "92%", change: "+2%", isUp: true },
                { name: "Rata-rata Nilai", value: "85", change: "+5", isUp: true },
                { name: "Ketuntasan", value: "88%", change: "-3%", isUp: false }
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{stat.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-800">{stat.value}</span>
                    <span className={`text-xs ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mini Chart */}
            <div className="mt-6 h-20 w-full flex items-end justify-between">
              {[40, 35, 60, 75, 65, 80, 90].map((value, i) => (
                <div key={i} className="relative h-full flex items-end" style={{width: '12%'}}>
                  <div 
                    className="w-full bg-gradient-to-t from-[#C40503] to-[#DAA625] rounded-sm"
                    style={{height: `${value}%`}}
                  ></div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Sen</span>
              <span>Sel</span>
              <span>Rab</span>
              <span>Kam</span>
              <span>Jum</span>
              <span>Sab</span>
              <span>Min</span>
            </div>
          </CardContent>
        </Card>

        {/* Notes or Announcements */}
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-[#DAA625] to-[#C40503]"></div>
          <CardHeader className="pb-3 bg-gradient-to-r from-white to-red-50/20">
            <CardTitle className="text-gray-800">Pengumuman Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100 bg-amber-50/20">
              <div className="font-medium text-[#C40503]">Perubahan Jadwal Semester</div>
              <div className="text-xs text-gray-600 mt-1">Diposting 2 hari lalu</div>
              <p className="text-sm mt-2">
                Jadwal semester baru telah dirilis. Semua guru diminta untuk memeriksa dan mengkonfirmasi ketersediaan.
              </p>
            </div>
            <div className="p-4 border-b border-gray-100">
              <div className="font-medium text-[#DAA625]">Rapat Tahunan</div>
              <div className="text-xs text-gray-600 mt-1">Diposting 5 hari lalu</div>
              <p className="text-sm mt-2">
                Rapat tahunan akan diadakan pada tanggal 15 Juli 2025. Kehadiran seluruh staf diwajibkan.
              </p>
            </div>
            <div className="flex justify-center p-3 bg-gray-50">
              <button className="text-xs text-[#C40503] font-medium hover:underline">
                Lihat Semua Pengumuman
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
