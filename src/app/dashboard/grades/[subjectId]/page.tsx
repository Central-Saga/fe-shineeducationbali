"use client";

import { useParams } from "next/navigation";
import { SubjectDetailView } from "@/components/ui-admin/grades/SubjectDetailView";

export default function SubjectDetailPage() {
  const params = useParams();
  const subjectId = params.subjectId as string;

  return <SubjectDetailView subjectId={subjectId} />;
}
