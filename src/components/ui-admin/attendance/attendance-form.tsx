"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Attendance } from "@/types/attendance";
import { attendanceService } from "@/lib/services/attendance.service";

const formSchema = z.object({
  status: z.enum(["PRESENT", "ABSENT", "LATE", "SICK", "PERMISSION"]),
  notes: z.string().optional(),
});

interface AttendanceFormProps {
  studentId: string;
  classId: string;
  date: Date;
  onSuccess?: () => void;
  initialData?: Attendance;
}

export function AttendanceForm({
  studentId,
  classId,
  date,
  onSuccess,
  initialData,
}: AttendanceFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: initialData?.status || "PRESENT",
      notes: initialData?.notes || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await attendanceService.markAttendance({
        studentId,
        classId,
        date: date.toISOString(),
        ...values,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Failed to mark attendance:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Kehadiran</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status kehadiran" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PRESENT">Hadir</SelectItem>
                  <SelectItem value="ABSENT">Tidak Hadir</SelectItem>
                  <SelectItem value="LATE">Terlambat</SelectItem>
                  <SelectItem value="SICK">Sakit</SelectItem>
                  <SelectItem value="PERMISSION">Izin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keterangan (opsional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tambahkan keterangan..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Tambahkan detail atau alasan jika diperlukan
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          Simpan
        </Button>
      </form>
    </Form>
  );
}
