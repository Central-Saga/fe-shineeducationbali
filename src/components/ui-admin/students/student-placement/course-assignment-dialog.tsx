"use client";

import { useState, useEffect } from "react";
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
import { toast } from "sonner";

const formSchema = z.object({
  packageId: z.string({
    required_error: "Pilih paket kursus",
  }),
});

interface CourseAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudents: Student[];
  onSuccess?: () => void;
}

export function CourseAssignmentDialog({
  open,
  onOpenChange,
  selectedStudents,
  onSuccess,
}: CourseAssignmentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [availablePackages, setAvailablePackages] = useState([
    { id: "pkg1", name: "Paket Reguler SD", type: "regular" },
    { id: "pkg2", name: "Paket Premium SD", type: "private" },
    { id: "pkg3", name: "Paket Reguler SMP", type: "regular" },
    { id: "pkg4", name: "Paket Premium SMP", type: "private" },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleAssignment = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      // Di sini implementasi logika untuk mendaftarkan siswa ke paket kursus
      // Contoh mock:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`${selectedStudents.length} siswa berhasil didaftarkan ke paket kursus`);
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to assign courses:", error);
      toast.error("Gagal mendaftarkan siswa ke paket kursus");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={isLoading ? undefined : onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pendaftaran Paket Kursus</DialogTitle>
          <DialogDescription>
            Pilih paket kursus untuk {selectedStudents.length} siswa terpilih
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAssignment)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="packageId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paket Kursus</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih paket kursus" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availablePackages.map((pkg) => (
                        <SelectItem key={pkg.id} value={pkg.id}>
                          {pkg.name} ({pkg.type === "regular" ? "Reguler" : "Private"})
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
                Daftarkan Siswa
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
