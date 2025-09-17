"use client";

import { useParams } from "next/navigation";
import { DetailStudentPackage } from "@/components/ui-admin/payments/DetailStudentPackage";

export default function StudentPackageDetailPage() {
  const params = useParams();
  const packageId = params.packageId as string;
  
  return <DetailStudentPackage packageId={packageId} />;
}
