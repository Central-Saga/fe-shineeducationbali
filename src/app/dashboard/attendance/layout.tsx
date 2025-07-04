"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CalendarIcon, FileText } from "lucide-react";

export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("daily");

  useEffect(() => {
    if (pathname.includes("/daily")) {
      setActiveTab("daily");
    } else if (pathname.includes("/report")) {
      setActiveTab("report");
    } else {
      setActiveTab("daily");
    }
  }, [pathname]);

  return (
    <div className="space-y-6 p-5 md:p-8">
      <Tabs value={activeTab} onValueChange={(val) => {
        setActiveTab(val);
        router.push(`/dashboard/attendance/${val}`);
      }} className="space-y-6">
        <div className="flex items-center justify-center bg-gray-100 p-1 rounded-lg w-full max-w-md mx-auto">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger
              value="daily"
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white py-2"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Kehadiran Harian
            </TabsTrigger>
            <TabsTrigger
              value="report"
              className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white py-2"
            >
              <FileText className="h-4 w-4 mr-2" />
              Laporan Kehadiran
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
