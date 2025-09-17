"use client";

import { useParams } from "next/navigation";
import { EditGrades } from "@/components/ui-admin/grades/EditGrades";

export default function EditGradesPage() {
  const params = useParams();
  const gradeId = params.gradeId as string;
  
  return <EditGrades gradeId={gradeId} />;
}
