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
import { ProgramAssignmentDialog } from "./program-assignment-dialog";

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
        <CardTitle>Pendaftaran Paket Program</CardTitle>
        <CardDescription>
          Kelola pendaftaran siswa ke paket program yang tersedia
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          columns={enrollmentColumns as any}
          data={students}
          onRowSelection={setSelectedRows}
        />

        <ProgramAssignmentDialog
          open={showEnrollmentDialog}
          onOpenChange={setShowEnrollmentDialog}
          selectedStudents={selectedRows}
          onSuccess={handleEnrollmentSuccess}
        />
      </CardContent>
    </Card>
  );
}
