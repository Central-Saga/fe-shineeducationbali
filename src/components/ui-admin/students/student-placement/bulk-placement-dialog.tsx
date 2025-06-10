"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Student } from "@/types/student";
import { Class } from "@/types/class";
import { classService } from "@/lib/services/class.service";

const formSchema = z.object({
  classId: z.string({
    required_error: "Pilih kelas tujuan",
  }),
});

interface BulkPlacementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudents: Student[];
  onSuccess?: () => void;
}

export function BulkPlacementDialog({
  open,
  onOpenChange,
  selectedStudents,
  onSuccess,
}: BulkPlacementDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [availableClasses, setAvailableClasses] = useState<Class[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handlePlacement = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      // Implement bulk placement logic here using classService
      await classService.bulkPlaceStudents(
        selectedStudents.map((student) => ({
          studentId: student.id,
          classId: values.classId,
          placementDate: new Date().toISOString(),
          status: "active",
        }))
      );
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to place students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={isLoading ? undefined : onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Penempatan Siswa</DialogTitle>
          <DialogDescription>
            Pilih kelas untuk {selectedStudents.length} siswa terpilih
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePlacement)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kelas</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableClasses.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name} - {cls.subject} ({cls.currentStudents}/
                          {cls.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                Tempatkan Siswa
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
