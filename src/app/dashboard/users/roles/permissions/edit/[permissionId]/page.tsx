"use client";

import EditPermission from "@/components/ui-admin/roles/EditPermission";
import { use } from "react";

interface EditPermissionPageProps {
  params: Promise<{
    permissionId: string;
  }>;
}

export default function EditPermissionPage({ params }: EditPermissionPageProps) {
  const { permissionId } = use(params);
  return <EditPermission permissionId={permissionId} />;
}
