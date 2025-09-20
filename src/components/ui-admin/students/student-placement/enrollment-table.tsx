"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { enrollmentColumns } from "./enrollment-columns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePermission } from "@/hooks/use-permission";
import { Student } from "@/types/student";
import { CourseAssignmentDialog } from "./course-assignment-dialog";

interface EnrollmentTableProps {
  students: Student[];
  onEnrollmentChange: () => void;
}

export function EnrollmentTable({
  students,
  onEnrollmentChange,
}: EnrollmentTableProps) {
  const { hasPermission: canEdit } = usePermission("student.edit");
  const [selectedRows, setSelectedRows] = useState<Student[]>([]);
  const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);

  const handleBulkEnrollment = () => {
    setShowEnrollmentDialog(true);
  };

  const handleEnrollmentSuccess = () => {
    setSelectedRows([]);
    onEnrollmentChange();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendaftaran Paket Kursus</CardTitle>
        <CardDescription>
          Kelola pendaftaran siswa ke paket kursus yang tersedia
        </CardDescription>
      </CardHeader>
      <CardContent>
        {canEdit && selectedRows.length > 0 && (
          <div className="mb-4">
            <Button onClick={handleBulkEnrollment}>
              Daftarkan {selectedRows.length} Siswa Terpilih
            </Button>
          </div>
        )}
        <DataTable
          columns={enrollmentColumns as any}
          data={students}
          onRowSelection={setSelectedRows}
        />

        <CourseAssignmentDialog
          open={showEnrollmentDialog}
          onOpenChange={setShowEnrollmentDialog}
          selectedStudents={selectedRows}
          onSuccess={handleEnrollmentSuccess}
        />
      </CardContent>
    </Card>
  );
}
