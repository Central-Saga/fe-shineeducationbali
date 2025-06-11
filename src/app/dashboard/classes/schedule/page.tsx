"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

const daysOrder = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

const dayLabels: Record<(typeof daysOrder)[number], string> = {
  MONDAY: "Senin",
  TUESDAY: "Selasa",
  WEDNESDAY: "Rabu",
  THURSDAY: "Kamis",
  FRIDAY: "Jumat",
  SATURDAY: "Sabtu",
};

export default function ClassSchedulePage() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Jadwal Kelas
          </CardTitle>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Tambah Jadwal
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list">
            <TabsList className="mb-4">
              <TabsTrigger value="calendar">Kalender</TabsTrigger>
              <TabsTrigger value="list">Daftar</TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <Calendar
                mode="single"
                selected={new Date()}
                className="rounded-md border"
              />
            </TabsContent>

            <TabsContent value="list">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hari</TableHead>
                    <TableHead>Jam</TableHead>
                    <TableHead>Mata Pelajaran</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Pengajar</TableHead>
                    <TableHead>Ruang</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: "SCH001",
                      day: "MONDAY" as const,
                      startTime: "08:00",
                      endTime: "09:30",
                      subject: "Matematika",
                      class: "X-A",
                      teacher: "Dr. Yusuf Maulana",
                      room: "R101",
                    },
                    {
                      id: "SCH002",
                      day: "MONDAY" as const,
                      startTime: "10:00",
                      endTime: "11:30",
                      subject: "Fisika",
                      class: "XI-B",
                      teacher: "Drs. Adi Wijaya",
                      room: "R102",
                    },
                    {
                      id: "SCH003",
                      day: "TUESDAY" as const,
                      startTime: "13:00",
                      endTime: "14:30",
                      subject: "Bahasa Inggris",
                      class: "XII-A",
                      teacher: "Elisabeth Sari, M.Ed",
                      room: "R103",
                    },
                  ].map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{dayLabels[schedule.day]}</TableCell>
                      <TableCell>
                        {schedule.startTime} - {schedule.endTime}
                      </TableCell>
                      <TableCell>{schedule.subject}</TableCell>
                      <TableCell>{schedule.class}</TableCell>
                      <TableCell>{schedule.teacher}</TableCell>
                      <TableCell>{schedule.room}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
