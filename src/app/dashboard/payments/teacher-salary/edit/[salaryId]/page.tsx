"use client";

import { useParams } from "next/navigation";
import { EditTeacherSalary } from "@/components/ui-admin/payments/EditTeacherSalary";

export default function EditTeacherSalaryPage() {
  const params = useParams();
  const salaryId = params.salaryId as string;
  
  return <EditTeacherSalary salaryId={salaryId} />;
}
