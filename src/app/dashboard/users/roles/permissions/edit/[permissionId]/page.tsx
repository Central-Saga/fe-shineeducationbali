"use client";

import EditPermission from "@/components/ui-admin/roles/EditPermission";

interface EditPermissionPageProps {
  params: {
    permissionId: string;
  };
}

export default function EditPermissionPage({ params }: EditPermissionPageProps) {
  return <EditPermission permissionId={params.permissionId} />;
}
