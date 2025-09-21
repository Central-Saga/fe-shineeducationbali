"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Users,
  Award,
  Calendar
} from "lucide-react";

interface ReportData {
  id: string;
  title: string;
  type: 'attendance' | 'grades' | 'performance' | 'summary';
  period: string;
  generatedDate: string;
  status: 'ready' | 'generating' | 'error';
  downloadUrl?: string;
}

interface TeacherReportsProps {
  reports: ReportData[];
  onGenerateReport: (type: string, period: string) => void;
  onDownloadReport: (reportId: string) => void;
}

export function TeacherReports({ 
  reports, 
  onGenerateReport, 
  onDownloadReport 
}: TeacherReportsProps) {
  const [selectedType, setSelectedType] = useState("attendance");
  const [selectedPeriod, setSelectedPeriod] = useState("current_month");

  const reportTypes = [
    { value: "attendance", label: "Laporan Kehadiran", icon: Users },
    { value: "grades", label: "Laporan Nilai", icon: Award },
    { value: "performance", label: "Laporan Performa", icon: TrendingUp },
    { value: "summary", label: "Ringkasan Kelas", icon: BarChart3 }
  ];

  const periods = [
    { value: "current_week", label: "Minggu Ini" },
    { value: "current_month", label: "Bulan Ini" },
    { value: "last_month", label: "Bulan Lalu" },
    { value: "current_semester", label: "Semester Ini" },
    { value: "custom", label: "Periode Kustom" }
  ];

  const getStatusBadge = (status: ReportData['status']) => {
    switch (status) {
      case 'ready':
        return <Badge className="bg-green-100 text-green-800">Siap</Badge>;
      case 'generating':
        return <Badge className="bg-yellow-100 text-yellow-800">Generating</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: ReportData['type']) => {
    const typeConfig = reportTypes.find(t => t.value === type);
    return typeConfig ? <typeConfig.icon className="h-4 w-4" /> : <FileText className="h-4 w-4" />;
  };

  const handleGenerateReport = () => {
    onGenerateReport(selectedType, selectedPeriod);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#C40503]">Laporan & Analytics</h1>
          <p className="text-gray-600">Generate dan download laporan performa kelas</p>
        </div>
        <Button className="bg-[#C40503] hover:bg-[#A60000]">
          <Download className="h-4 w-4 mr-2" />
          Download Semua
        </Button>
      </div>

      {/* Generate Report Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-[#C40503]" />
            Generate Laporan Baru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Laporan</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        <type.icon className="h-4 w-4 mr-2" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Periode</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(period => (
                    <SelectItem key={period.value} value={period.value}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleGenerateReport} className="w-full">
                Generate Laporan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Laporan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#C40503]">{reports.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Siap Download</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === 'ready').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Sedang Diproses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {reports.filter(r => r.status === 'generating').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {reports.filter(r => r.status === 'error').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="attendance">Kehadiran</TabsTrigger>
          <TabsTrigger value="grades">Nilai</TabsTrigger>
          <TabsTrigger value="performance">Performa</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Semua Laporan</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Laporan</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Periode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal Generate</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(report.type)}
                          <div>
                            <div className="font-medium">{report.title}</div>
                            <div className="text-sm text-gray-500">ID: {report.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {reportTypes.find(t => t.value === report.type)?.label || report.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(report.generatedDate).toLocaleDateString('id-ID')}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {report.status === 'ready' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDownloadReport(report.id)}
                            className="text-[#C40503] hover:text-[#A60000]"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        ) : (
                          <span className="text-sm text-gray-500">
                            {report.status === 'generating' ? 'Sedang diproses...' : 'Tidak tersedia'}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {reports.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Belum ada laporan yang di-generate
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {reportTypes.slice(1).map(type => (
          <TabsContent key={type.value} value={type.value} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <type.icon className="h-5 w-5 mr-2 text-[#C40503]" />
                  {type.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Laporan</TableHead>
                      <TableHead>Periode</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tanggal Generate</TableHead>
                      <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.filter(r => r.type === type.value).map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <type.icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{report.title}</div>
                              <div className="text-sm text-gray-500">ID: {report.id}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{report.period}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(report.generatedDate).toLocaleDateString('id-ID')}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {report.status === 'ready' ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDownloadReport(report.id)}
                              className="text-[#C40503] hover:text-[#A60000]"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          ) : (
                            <span className="text-sm text-gray-500">
                              {report.status === 'generating' ? 'Sedang diproses...' : 'Tidak tersedia'}
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {reports.filter(r => r.type === type.value).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          Belum ada laporan {type.label.toLowerCase()}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
