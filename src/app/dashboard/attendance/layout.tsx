"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCheck, Upload, FileText, Settings } from "lucide-react";
import Link from "next/link";

export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (pathname === "/dashboard/attendance") {
      setActiveTab("overview");
    } else if (pathname.includes("/students")) {
      setActiveTab("students");
    } else if (pathname.includes("/teachers")) {
      setActiveTab("teachers");
    } else if (pathname.includes("/reports")) {
      setActiveTab("reports");
    } else if (pathname.includes("/settings")) {
      setActiveTab("settings");
    }
  }, [pathname]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "overview") {
      window.location.href = "/dashboard/attendance";
    } else {
      window.location.href = `/dashboard/attendance/${value}`;
    }
  };

  return (
    <div className="space-y-6 p-5 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-500 mt-1">
            Monitor student and teacher attendance for teaching courses
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <div className="flex items-center justify-center bg-gray-100 p-1 rounded-lg w-full max-w-2xl mx-auto">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white py-2 text-xs"
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="students"
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white py-2 text-xs"
            >
              <UserCheck className="h-4 w-4 mr-1" />
              Students
            </TabsTrigger>
            <TabsTrigger
              value="teachers"
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white py-2 text-xs"
            >
              <Upload className="h-4 w-4 mr-1" />
              Teachers
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white py-2 text-xs"
            >
              <FileText className="h-4 w-4 mr-1" />
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white py-2 text-xs"
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-6">
          {children}
        </TabsContent>
      </Tabs>
    </div>
  );
}
