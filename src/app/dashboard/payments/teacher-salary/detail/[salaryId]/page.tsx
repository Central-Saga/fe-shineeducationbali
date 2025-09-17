"use client";

import { useParams } from "next/navigation";
import { DetailTeacherSalary } from "@/components/ui-admin/payments/DetailTeacherSalary";

export default function TeacherSalaryDetailPage() {
  const params = useParams();
  const salaryId = params.salaryId as string;
  
  return <DetailTeacherSalary salaryId={salaryId} />;
}
