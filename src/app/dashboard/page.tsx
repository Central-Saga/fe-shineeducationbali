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
  Settings,
  Bell,
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
import { Header } from "@/components/ui-admin/layout";

export default function DashboardPage() {
  const stats = [
    {
      name: "Total Students",
      value: "120",
      icon: Users,
      description: "12% from last month",
      trend: "up",
    },
    {
      name: "Total Courses",
      value: "15",
      icon: GraduationCap,
      description: "3 new courses",
      trend: "up",
    },
    {
      name: "Active Classes",
      value: "8",
      icon: Calendar,
      description: "2 classes starting soon",
      trend: "neutral",
    },
    {
      name: "Revenue",
      value: "Rp 15.000.000",
      icon: DollarSign,
      description: "↗︎ 10% from last month",
      trend: "up",
    },
  ];
  const recentActivities = [
    {
      user: "Ani Susanti",
      action: "enrolled in course",
      course: "English",
      time: "5 minutes ago",
    },
    {
      user: "Budi Santoso",
      action: "completed course",
      course: "Mathematics",
      time: "1 hour ago",
    },
    {
      user: "Clara Dewi",
      action: "submitted assignment",
      course: "Science",
      time: "2 hours ago",
    },
    {
      user: "David Pratama",
      action: "started learning",
      course: "Mandarin",
      time: "3 hours ago",
    },
    {
      user: "Eva Putri",
      action: "took exam",
      course: "Computer",
      time: "5 hours ago",
    },
  ];
  return (
    <Header
      header={{
        title: "Admin Dashboard",
        description: "Selamat datang di dashboard admin SHINE Education",
        actions: [
          {
            label: "Academic Year 2025/2026",
            onClick: () => console.log("Change academic year"),
            icon: <Calendar className="h-4 w-4" />,
            variant: "outline",
          },
        ],
      }}
    >
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={stat.name} className="overflow-hidden border-none shadow-md">
            <div className={`h-1 w-full ${
              index === 0 ? "bg-[#C40503]" : 
              index === 1 ? "bg-[#DAA625]" : 
              index === 2 ? "bg-[#C40503]" : 
              "bg-[#DAA625]"
            }`}></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
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
            <CardContent className="pt-2 pb-5">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs mt-1 ${
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
          <CardHeader className="bg-red-50/30 pb-3 pt-5">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2 text-[#C40503]">
                  <Activity className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
                <CardDescription className="mt-1">
                  {recentActivities.length} recent activities today
                </CardDescription>
              </div>
              <div className="bg-white border border-red-100 rounded-full px-3 py-1 text-xs font-medium text-[#C40503] shadow-sm">
                View All
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 py-2">
            <div className="divide-y divide-gray-100">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 py-4.5 hover:bg-red-50/30 transition-colors"
                >
                  <Avatar className="h-10 w-10 border-2 border-red-100">
                    <AvatarFallback className="bg-gradient-to-br from-[#C40503] to-red-600 text-white">
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
                      {index % 2 === 0 ? "Via mobile app" : "Via website"}
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
          <CardHeader className="bg-amber-50/30 pb-3 pt-5">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2 text-[#DAA625]">
                  <BookOpen className="h-5 w-5" />
                  Popular Courses
                </CardTitle>
                <CardDescription className="mt-1">5 courses with most participants</CardDescription>
              </div>
              <div className="bg-white border border-amber-100 rounded-full px-3 py-1 text-xs font-medium text-[#DAA625] shadow-sm">
                View Details
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2 pb-5">
            <div className="space-y-6">
              {[
                { name: "English", students: 45, progress: 90 },
                { name: "Mathematics", students: 38, progress: 75 },
                { name: "Science", students: 32, progress: 65 },
                { name: "Computer", students: 28, progress: 55 },
                { name: "Mandarin", students: 25, progress: 50 },
              ].map((course, index) => (
                <div key={index} className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                        index === 0 ? "bg-yellow-100" : 
                        index === 1 ? "bg-gray-100" : 
                        index === 2 ? "bg-amber-100" : 
                        "bg-red-50"
                      }`}>
                        <Award className={`h-4.5 w-4.5 ${
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
                        <p className="text-xs text-gray-500 mt-1.5">
                          {course.students} students enrolled
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
                      index === 2 ? "bg-[#C40503]" : 
                      "bg-[#DAA625]"
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
          <div className="h-1 w-full bg-[#C40503]"></div>
          <CardHeader className="pb-3 pt-5">
            <div className="flex justify-between items-center">
              <CardTitle className="text-gray-800">Calendar & Events</CardTitle>
              <div className="bg-[#C40503] text-white rounded-full px-3 py-1 text-xs font-medium">
                July 2025
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 pb-4">
            <div className="bg-red-50/50 p-4 py-5">
              <div className="text-sm font-medium text-[#C40503] mb-3">Upcoming Events</div>
              <div className="space-y-3">
                {[
                  { date: "5 Jul", title: "Teacher Meeting", time: "09:00 - 11:00" },
                  { date: "12 Jul", title: "Midterm Exam", time: "08:00 - 12:00" },
                  { date: "20 Jul", title: "Parent Meeting", time: "13:00 - 15:00" }
                ].map((event, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white p-3.5 rounded-lg shadow-sm">
                    <div className="bg-[#C40503] text-white rounded px-2 py-1.5 text-center w-12">
                      <div className="text-xs font-bold">{event.date}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{event.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{event.time}</div>
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
          <CardHeader className="pb-3 pt-5">
            <CardTitle className="text-gray-800">Student Performance</CardTitle>
          </CardHeader>
          <CardContent className="pt-2 pb-5">
            <div className="space-y-4">
              {[
                { name: "Attendance", value: "92%", change: "+2%", isUp: true },
                { name: "Average Grade", value: "85", change: "+5", isUp: true },
                { name: "Completion Rate", value: "88%", change: "-3%", isUp: false }
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
                    className="w-full bg-[#C40503] rounded-sm"
                    style={{height: `${value}%`}}
                  ></div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>

        {/* Notes or Announcements */}
        <Card className="border-none shadow-md overflow-hidden">
          <div className="h-1 w-full bg-[#DAA625]"></div>
          <CardHeader className="pb-3 pt-5 bg-red-50/20">
            <CardTitle className="text-gray-800">Latest Announcements</CardTitle>
          </CardHeader>
          <CardContent className="p-0 pb-0">
            <div className="p-5 border-b border-gray-100 bg-amber-50/20">
              <div className="font-medium text-[#C40503]">Semester Schedule Changes</div>
              <div className="text-xs text-gray-600 mt-1">Posted 2 days ago</div>
              <p className="text-sm mt-2">
                New semester schedule has been released. All teachers are requested to check and confirm availability.
              </p>
            </div>
            <div className="p-5 border-b border-gray-100">
              <div className="font-medium text-[#DAA625]">Annual Meeting</div>
              <div className="text-xs text-gray-600 mt-1">Posted 5 days ago</div>
              <p className="text-sm mt-2">
                Annual meeting will be held on July 15, 2025. Attendance of all staff is required.
              </p>
            </div>
            <div className="flex justify-center p-4 bg-gray-50">
              <button className="text-xs text-[#C40503] font-medium hover:underline">
                View All Announcements
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Header>
  );
}
