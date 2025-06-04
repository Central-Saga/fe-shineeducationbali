'use client';

import { 
  Users, BookOpen, GraduationCap, Calendar,
  DollarSign, TrendingUp, Award, Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const stats = [
    { 
      name: 'Total Murid',
      value: '120',
      icon: Users,
      description: '12% dari bulan lalu',
      trend: 'up'
    },
    { 
      name: 'Total Kursus',
      value: '15',
      icon: GraduationCap,
      description: '3 kursus baru',
      trend: 'up'
    },
    { 
      name: 'Kelas Aktif',
      value: '8',
      icon: Calendar,
      description: '2 kelas akan dimulai',
      trend: 'neutral'
    },
    { 
      name: 'Pendapatan',
      value: 'Rp 15.000.000',
      icon: DollarSign,
      description: '↗︎ 10% dari bulan lalu',
      trend: 'up'
    },
  ];
  const recentActivities = [
    { user: 'Ani Susanti', action: 'mendaftar kursus', course: 'Bahasa Inggris', time: '5 menit yang lalu' },
    { user: 'Budi Santoso', action: 'menyelesaikan kursus', course: 'Matematika', time: '1 jam yang lalu' },
    { user: 'Clara Dewi', action: 'mengumpulkan tugas', course: 'IPA', time: '2 jam yang lalu' },
    { user: 'David Pratama', action: 'mulai belajar', course: 'Bahasa Mandarin', time: '3 jam yang lalu' },
    { user: 'Eva Putri', action: 'mengikuti ujian', course: 'Komputer', time: '5 jam yang lalu' }
  ];
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Aktivitas Terkini</CardTitle>
            <CardDescription>
              Ada {recentActivities.length} aktivitas terbaru
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg p-3 hover:bg-accent">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium">{activity.course}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Kursus Populer</CardTitle>
            <CardDescription>
              5 kursus dengan peserta terbanyak
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Bahasa Inggris", students: 45 },
                { name: "Matematika", students: 38 },
                { name: "IPA", students: 32 },
                { name: "Komputer", students: 28 },
                { name: "Bahasa Mandarin", students: 25 }
              ].map((course, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {course.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {course.students} murid
                    </p>
                  </div>
                  <Award className={cn(
                    "h-4 w-4",
                    index === 0 ? "text-yellow-500" :
                    index === 1 ? "text-gray-400" :
                    index === 2 ? "text-amber-600" :
                    "text-muted-foreground"
                  )} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>      {/* Add more sections here */}
    </div>
  );
}