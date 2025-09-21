"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface MonthlyAttendanceData {
  month: string;
  workDays: number;
  present: number;
  late: number;
  absent: number;
  leave: number;
  total: number;
  percentage: number;
  totalWorkHours: number;
  averageHoursPerDay: number;
  attendanceRate: number;
}

interface AttendanceHistoryTableProps {
  data: MonthlyAttendanceData[];
  year: string;
  onYearChange: (year: string) => void;
  years: string[];
}

export function AttendanceHistoryTable({ data, year, onYearChange, years }: AttendanceHistoryTableProps) {
  return (
    <Card>
      <CardHeader className="pb-3 py-5">
        <div className="flex items-center justify-between">
          <CardTitle>Riwayat Kehadiran Bulanan</CardTitle>
          <Select value={year} onValueChange={onYearChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              {years.map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bulan</TableHead>
              <TableHead>Hadir</TableHead>
              <TableHead>Terlambat</TableHead>
              <TableHead>Tidak Hadir</TableHead>
              <TableHead>Cuti</TableHead>
              <TableHead>Tingkat Kehadiran</TableHead>
              <TableHead>Jam Kerja</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data
              .filter(data => data.month.includes(year))
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.month}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {item.present}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700">
                      {item.late}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      {item.absent}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {item.leave}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.attendanceRate.toFixed(1)}%</TableCell>
                  <TableCell>{item.totalWorkHours.toFixed(1)} jam</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
