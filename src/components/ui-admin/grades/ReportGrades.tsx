"use client";

import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/ui-admin/layout/Header";
import { Download, BarChart3, TrendingUp } from "lucide-react";
import { apiRequest } from "@/lib/api";

interface GradeReport {
  subject: string;
  level: string;
  totalStudents: number;
  averageScore: number;
  gradeDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
  };
  topPerformers: Array<{
    studentName: string;
    averageScore: number;
  }>;
  improvementAreas: string[];
}

export function ReportGrades() {
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [reportData, setReportData] = useState<GradeReport[]>([]);

  const subjects = [
    { value: "all", label: "Semua Mata Pelajaran" },
    { value: "Bahasa Inggris", label: "Bahasa Inggris" },
    { value: "Komputer", label: "Komputer" },
  ];

  const levels = [
    { value: "all", label: "Semua Jenjang" },
    { value: "TK", label: "TK" },
    { value: "SD", label: "SD" },
    { value: "SMP", label: "SMP" },
    { value: "SMA/SMK", label: "SMA/SMK" },
    { value: "UMUM", label: "Umum" },
  ];

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedSubject !== "all") params.append("subject", selectedSubject);
      if (selectedLevel !== "all") params.append("level", selectedLevel);
      
      const data = await apiRequest<GradeReport[]>("GET", `/api/v1/grades/reports?${params.toString()}`);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching report data:", error);
      // Mock data for demonstration
      setReportData([
        {
          subject: "Bahasa Inggris",
          level: "SMP",
          totalStudents: 25,
          averageScore: 82.5,
          gradeDistribution: { A: 8, B: 12, C: 4, D: 1, E: 0 },
          topPerformers: [
            { studentName: "Ayu Putri", averageScore: 95.5 },
            { studentName: "Made Wirawan", averageScore: 92.3 },
            { studentName: "Putu Devi", averageScore: 89.7 },
          ],
          improvementAreas: ["Grammar", "Speaking"],
        },
        {
          subject: "Komputer",
          level: "SMA/SMK",
          totalStudents: 18,
          averageScore: 78.2,
          gradeDistribution: { A: 5, B: 8, C: 4, D: 1, E: 0 },
          topPerformers: [
            { studentName: "Kadek Ayu", averageScore: 91.2 },
            { studentName: "I Made", averageScore: 87.8 },
            { studentName: "Ni Putu", averageScore: 85.3 },
          ],
          improvementAreas: ["Programming Logic", "Database"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [selectedSubject, selectedLevel]);

  const handleExportPDF = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedSubject !== "all") params.append("subject", selectedSubject);
      if (selectedLevel !== "all") params.append("level", selectedLevel);
      
      const response = await apiRequest<Blob>("GET", `/api/v1/grades/reports/export?${params.toString()}`);
      // Handle PDF download
      const blob = new Blob([response], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `laporan-nilai-${selectedSubject}-${selectedLevel}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Gagal mengekspor laporan PDF");
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A": return "text-green-600 bg-green-100";
      case "B": return "text-[#DAA625] bg-[#DAA625]/10";
      case "C": return "text-orange-600 bg-orange-100";
      case "D": return "text-red-600 bg-red-100";
      case "E": return "text-[#C40503] bg-[#C40503]/10";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Header
      header={{
        title: "Laporan Nilai",
        description: "Analisis dan laporan nilai siswa untuk mata pelajaran Bahasa Inggris dan Komputer",
        actions: [
          {
            label: "Export PDF",
            icon: <Download className="h-4 w-4" />,
            onClick: handleExportPDF,
            variant: "default",
          },
        ],
      }}
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Laporan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Mata Pelajaran</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mata pelajaran" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>
                        {subject.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Jenjang</label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenjang" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Cards */}
        {loading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C40503]"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {reportData.map((report, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{report.subject}</CardTitle>
                      <p className="text-sm text-gray-500">Jenjang: {report.level}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#C40503]">
                        {report.averageScore}
                      </div>
                      <div className="text-sm text-gray-500">Rata-rata</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Statistics */}
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Statistik
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Total Siswa:</span>
                          <span className="font-medium">{report.totalStudents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Rata-rata:</span>
                          <span className="font-medium">{report.averageScore}</span>
                        </div>
                      </div>
                    </div>

                    {/* Grade Distribution */}
                    <div className="space-y-4">
                      <h4 className="font-semibold">Distribusi Nilai</h4>
                      <div className="space-y-2">
                        {Object.entries(report.gradeDistribution).map(([grade, count]) => (
                          <div key={grade} className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getGradeColor(grade)}`}>
                              {grade}
                            </span>
                            <span className="text-sm">{count} siswa</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Top Performers */}
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Top Performers
                      </h4>
                      <div className="space-y-2">
                        {report.topPerformers.slice(0, 3).map((performer, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <span className="text-sm">{performer.studentName}</span>
                            <span className="text-sm font-medium">{performer.averageScore}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Improvement Areas */}
                  {report.improvementAreas.length > 0 && (
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-semibold mb-2">Area Perbaikan</h4>
                      <div className="flex flex-wrap gap-2">
                        {report.improvementAreas.map((area, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Header>
  );
}
