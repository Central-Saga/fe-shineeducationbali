"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { studentPlacementColumns } from "./columns";
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
import { BulkPlacementDialog } from "./bulk-placement-dialog";

interface StudentPlacementTableProps {
  students: Student[];
  onPlacementChange: () => void;
}

export function StudentPlacementTable({
  students,
  onPlacementChange,
}: StudentPlacementTableProps) {
  const { hasPermission: canEdit } = usePermission("student.edit");
  const [selectedRows, setSelectedRows] = useState<Student[]>([]);
  const [showPlacementDialog, setShowPlacementDialog] = useState(false);

  const handleBulkPlacement = () => {
    setShowPlacementDialog(true);
  };

  const handlePlacementSuccess = () => {
    setSelectedRows([]);
    onPlacementChange();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Penempatan Siswa</CardTitle>
        <CardDescription>
          Kelola penempatan siswa ke kelas berdasarkan paket yang telah dibeli
        </CardDescription>
      </CardHeader>
      <CardContent>
        {canEdit && selectedRows.length > 0 && (
          <div className="mb-4">
            <Button onClick={handleBulkPlacement}>
              Tempatkan {selectedRows.length} Siswa Terpilih
            </Button>
          </div>
        )}
        <DataTable<Student, any>
          columns={studentPlacementColumns}
          data={students}
          onRowSelection={setSelectedRows}
        />

        <BulkPlacementDialog
          open={showPlacementDialog}
          onOpenChange={setShowPlacementDialog}
          selectedStudents={selectedRows}
          onSuccess={handlePlacementSuccess}
        />
      </CardContent>
    </Card>
  );
}
