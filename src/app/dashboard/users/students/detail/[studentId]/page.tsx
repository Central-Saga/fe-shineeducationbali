"use client";

import StudentDetail from "@/components/ui-admin/students/StudentDetail";
import { useParams } from "next/navigation";

export default function StudentDetailPage() {
  const params = useParams();
  const studentId = params.studentId as string;

  return <StudentDetail studentId={studentId} />;
}
