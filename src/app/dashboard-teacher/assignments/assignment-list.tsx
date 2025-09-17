"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AssignmentList } from "@/components/ui-teacher/assignments/AssignmentList";
import { AssignmentForm } from "@/components/ui-teacher/assignments/AssignmentForm";
import { assignmentsData } from "@/data/data-teacher/assignments/assignments-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

// Transform data to match our component's expected format
const formattedAssignments = assignmentsData.map((assignment) => ({
  id: assignment.id,
  title: assignment.title,
  className: assignment.class,
  classId: assignment.id, // Using assignment.id as a classId since it doesn't exist in the data
  dueDate: assignment.dueDate,
  submissionCount: assignment.submittedCount || 0,
  status: (assignment.status === "Active" ? "active" : 
           assignment.status === "Upcoming" ? "draft" : "expired") as "active" | "draft" | "expired"
}));

// Extract unique classes from the assignment data
const classes = assignmentsData.map((assignment) => ({
  id: assignment.id,
  name: assignment.class
})).filter((value, index, self) => 
  self.findIndex(v => v.name === value.name) === index
);

export default function AssignmentListPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  const handleView = (id: string) => {
    console.log("Viewing assignment:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Editing assignment:", id);
    setSelectedAssignment(id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log("Deleting assignment:", id);
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      // Delete logic would go here
      alert("Tugas berhasil dihapus!");
    }
  };

  const handleDownload = (id: string) => {
    console.log("Downloading assignment:", id);
  };

  const handleFormSubmit = (data: any) => {
    console.log("Form submitted:", data);
    setIsDialogOpen(false);
    // Here you would update your data with the new values
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#C40503] to-[#DAA625] bg-clip-text text-transparent">
            Daftar Tugas
          </CardTitle>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Buat Tugas Baru
          </Button>
        </CardHeader>
        <CardContent>
          <AssignmentList
            assignments={formattedAssignments}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDownload={handleDownload}
          />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogTitle>
            {selectedAssignment ? "Edit Tugas" : "Buat Tugas Baru"}
          </DialogTitle>
          <AssignmentForm
            classes={classes}
            onSubmit={handleFormSubmit}
            initialData={
              selectedAssignment
                ? formattedAssignments.find(a => a.id === selectedAssignment)
                : undefined
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
