"use client";

import { TeacherReports } from "@/components/ui-teacher/reports/TeacherReports";

export default function ReportsPage() {
  // Mock data - in real app, this would come from API
  const reports = [
    {
      id: "1",
      title: "Laporan Kehadiran Juli 2025",
      type: "attendance" as const,
      period: "Juli 2025",
      generatedDate: "2025-07-01T10:00:00Z",
      status: "ready" as const,
      downloadUrl: "/reports/attendance-july-2025.pdf"
    },
    {
      id: "2",
      title: "Laporan Nilai Semester 1",
      type: "grades" as const,
      period: "Semester 1 2025",
      generatedDate: "2025-06-30T15:30:00Z",
      status: "ready" as const,
      downloadUrl: "/reports/grades-semester-1.pdf"
    },
    {
      id: "3",
      title: "Laporan Performa Kelas A",
      type: "performance" as const,
      period: "Juni 2025",
      generatedDate: "2025-06-28T09:15:00Z",
      status: "ready" as const,
      downloadUrl: "/reports/performance-class-a.pdf"
    },
    {
      id: "4",
      title: "Ringkasan Kelas Bahasa Inggris",
      type: "summary" as const,
      period: "Minggu Ini",
      generatedDate: "2025-07-01T08:00:00Z",
      status: "generating" as const
    },
    {
      id: "5",
      title: "Laporan Kehadiran Juni 2025",
      type: "attendance" as const,
      period: "Juni 2025",
      generatedDate: "2025-06-30T12:00:00Z",
      status: "error" as const
    }
  ];

  const handleGenerateReport = (type: string, period: string) => {
    console.log("Generate report:", type, period);
    // API call to generate report
    // This would typically show a loading state and update the reports list
  };

  const handleDownloadReport = (reportId: string) => {
    console.log("Download report:", reportId);
    // API call to download report
    // This would typically trigger a file download
  };

  return (
    <TeacherReports
      reports={reports}
      onGenerateReport={handleGenerateReport}
      onDownloadReport={handleDownloadReport}
    />
  );
}