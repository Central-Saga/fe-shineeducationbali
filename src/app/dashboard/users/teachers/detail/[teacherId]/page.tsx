"use client";

import TeacherDetail from "@/components/ui-admin/teachers/TeacherDetail";
import { useParams } from "next/navigation";

export default function TeacherDetailPage() {
  const params = useParams();
  const teacherId = params.teacherId as string;

  return <TeacherDetail teacherId={teacherId} />;
}