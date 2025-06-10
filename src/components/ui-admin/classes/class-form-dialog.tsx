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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClassFormData {
  name: string;
  teacher: string;
  schedule: string;
  description?: string;
  maxStudents: number;
}

interface ClassFormDialogProps {
  mode: "create" | "edit";
  initialData?: Partial<ClassFormData>;
  onSubmit: (data: ClassFormData) => void;
  trigger: React.ReactNode;
}

export function ClassFormDialog({
  mode,
  initialData,
  onSubmit,
  trigger,
}: ClassFormDialogProps) {
  const [formData, setFormData] = useState<ClassFormData>({
    name: initialData?.name || "",
    teacher: initialData?.teacher || "",
    schedule: initialData?.schedule || "",
    description: initialData?.description || "",
    maxStudents: initialData?.maxStudents || 30,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Class" : "Edit Class"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new class to your schedule"
              : "Update the class details"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Class Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Mathematics Grade 10"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacher">Teacher</Label>
            <Input
              id="teacher"
              value={formData.teacher}
              onChange={(e) =>
                setFormData({ ...formData, teacher: e.target.value })
              }
              placeholder="e.g., Mr. John Smith"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              id="schedule"
              value={formData.schedule}
              onChange={(e) =>
                setFormData({ ...formData, schedule: e.target.value })
              }
              placeholder="e.g., Monday & Wednesday, 09:00 - 10:30"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Class description..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxStudents">Maximum Students</Label>
            <Input
              id="maxStudents"
              type="number"
              value={formData.maxStudents}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxStudents: parseInt(e.target.value),
                })
              }
              min={1}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit">
              {mode === "create" ? "Create Class" : "Update Class"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
