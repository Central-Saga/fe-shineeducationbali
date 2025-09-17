"use client";

import { useParams } from "next/navigation";
import { EditStudentPackage } from "@/components/ui-admin/payments/EditStudentPackage";

export default function EditStudentPackagePage() {
  const params = useParams();
  const packageId = params.packageId as string;
  
  return <EditStudentPackage packageId={packageId} />;
}
