"use client";

import { useParams } from "next/navigation";
import { GradeDetailView } from "@/components/ui-admin/grades/GradeDetailView";

export default function GradeDetailPage() {
  const params = useParams();
  const gradeId = params.gradeId as string;

  return <GradeDetailView gradeId={gradeId} />;
}
