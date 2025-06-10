"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClassSchedule } from "@/types/class";
import { classService } from "@/lib/services/class.service";
import { Loading } from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClassScheduleViewProps {
  classId: string;
}

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

export function ClassScheduleView({ classId }: ClassScheduleViewProps) {
  const [schedule, setSchedule] = React.useState<ClassSchedule[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentView, setCurrentView] = React.useState<"calendar" | "list">(
    "list"
  );

  React.useEffect(() => {
    const loadSchedule = async () => {
      try {
        const data = await classService.getClassSchedule(classId);
        setSchedule(data);
      } catch (error) {
        console.error("Failed to load schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, [classId]);

  if (loading) {
    return <Loading />;
  }

  const sortedSchedule = [...schedule].sort((a, b) => {
    const dayA = daysOrder.indexOf(a.day);
    const dayB = daysOrder.indexOf(b.day);
    if (dayA !== dayB) return dayA - dayB;
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <Card className="p-6">
      <Tabs
        value={currentView}
        onValueChange={(v) => setCurrentView(v as "calendar" | "list")}
      >
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
                <TableHead>Pengajar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSchedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {dayLabels[item.day]}
                  </TableCell>
                  <TableCell>
                    {item.startTime} - {item.endTime}
                  </TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.teacher}</TableCell>
                </TableRow>
              ))}
              {sortedSchedule.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Tidak ada jadwal
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
