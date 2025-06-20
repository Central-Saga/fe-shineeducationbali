"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Certificate } from "@/types/certificate";

const formSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  title: z.string().min(1, "Title is required"),
  type: z.enum(["COURSE_COMPLETION", "ACHIEVEMENT", "PARTICIPATION"]),
  description: z.string().min(1, "Description is required"),
  achievementDate: z.string().min(1, "Achievement date is required"),
  metadata: z.object({
    courseId: z.string().optional(),
    courseName: z.string().optional(),
    grade: z.string().optional(),
    achievementDetails: z.string().optional(),
  }),
  templateId: z.string().min(1, "Template is required"),
});

interface CertificateFormData extends z.infer<typeof formSchema> {}

export interface IssueCertificateModalProps {
  onSubmit: (data: CertificateFormData) => Promise<void>;
}

export function IssueCertificateModal({
  onSubmit,
}: IssueCertificateModalProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<CertificateFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      metadata: {},
    },
  });

  const handleSubmit = async (data: CertificateFormData) => {
    try {
      await onSubmit(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to issue certificate:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Terbitkan Sertifikat</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Issue New Certificate</DialogTitle>
          <DialogDescription>
            Fill in the details to issue a new certificate for a student.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a certificate type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="COURSE_COMPLETION">
                        Course Completion
                      </SelectItem>
                      <SelectItem value="ACHIEVEMENT">Achievement</SelectItem>
                      <SelectItem value="PARTICIPATION">
                        Participation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="achievementDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Achievement Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="templateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Certificate Template</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a template" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="template1">
                        Default Template
                      </SelectItem>
                      <SelectItem value="template2">
                        Achievement Template
                      </SelectItem>
                      <SelectItem value="template3">
                        Course Completion Template
                      </SelectItem>
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
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Terbitkan Sertifikat</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
