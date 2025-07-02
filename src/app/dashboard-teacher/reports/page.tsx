"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Download,
  FileBarChart,
  FileText,
  Filter,
  PieChart,
  Plus,
  Search,
  Share2,
  Star
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import data
import { reportsData, reportsSummary } from "@/data/data-teacher/reports/reports-data";

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter reports data
  const filteredReports = reportsData.filter(report => {
    let match = true;
    
    // Filter by search query
    if (searchQuery) {
      match = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
              report.className.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // Filter by type
    if (typeFilter !== "all") {
      match = match && (report.type === typeFilter);
    }
    
    // Filter by status
    if (statusFilter !== "all") {
      match = match && (report.status === statusFilter);
    }
    
    return match;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
          Laporan
        </h1>
        <Button className="bg-[#C40503] hover:bg-[#A60000]">
          <Plus className="mr-3 h-4 w-4" /> 
          Buat Laporan Baru
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Total Laporan</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-[#C40503]">{reportsSummary.totalReports}</div>
            <p className="text-xs text-gray-500 mt-1">Laporan</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Laporan Terpublikasi</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-[#DAA625]">{reportsSummary.publishedReports}</div>
            <p className="text-xs text-gray-500 mt-1">Laporan</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Laporan Draft</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-gray-700">{reportsSummary.draftReports}</div>
            <p className="text-xs text-gray-500 mt-1">Laporan</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow transition-shadow">
          <CardHeader className="py-3 pb-0">
            <CardTitle className="text-sm font-medium text-gray-500">Rata-Rata Nilai</CardTitle>
          </CardHeader>
          <CardContent className="pb-3 pt-2">
            <div className="text-2xl font-bold text-gray-700">
              {Object.values(reportsSummary.averageScores).reduce((a, b) => a + b, 0) / 
               Object.values(reportsSummary.averageScores).length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Nilai</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for report types */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center">
            <FileBarChart className="mr-3 h-5 w-5 text-[#C40503]" /> 
            Daftar Laporan
          </CardTitle>
          <CardDescription>
            Lihat dan kelola semua laporan akademik, kehadiran, dan proyek
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full mb-6">
            <TabsList className="bg-white p-1 gap-2 border rounded-md shadow-sm">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm"
                onClick={() => setTypeFilter("all")}
              >
                Semua
              </TabsTrigger>
              <TabsTrigger 
                value="academic" 
                className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm"
                onClick={() => setTypeFilter("academic")}
              >
                Akademik
              </TabsTrigger>
              <TabsTrigger 
                value="attendance" 
                className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm"
                onClick={() => setTypeFilter("attendance")}
              >
                Kehadiran
              </TabsTrigger>
              <TabsTrigger 
                value="project" 
                className="data-[state=active]:bg-[#C40503] data-[state=active]:text-white data-[state=active]:shadow-sm"
                onClick={() => setTypeFilter("project")}
              >
                Proyek
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Cari laporan..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="published">Terpublikasi</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reports Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Judul Laporan</TableHead>
                  <TableHead>Kelas</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{report.className}</TableCell>
                    <TableCell>
                      {report.type === "academic" && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          Akademik
                        </Badge>
                      )}
                      {report.type === "attendance" && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Kehadiran
                        </Badge>
                      )}
                      {report.type === "project" && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          Proyek
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {report.status === "published" ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Terpublikasi
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Draft
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(report.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredReports.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      Tidak ada laporan yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <p className="text-sm text-gray-500">
            Menampilkan {filteredReports.length} dari {reportsData.length} laporan
          </p>
          <Button variant="outline" className="text-[#C40503]">
            <Download className="mr-2 h-4 w-4" />
            Ekspor Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
