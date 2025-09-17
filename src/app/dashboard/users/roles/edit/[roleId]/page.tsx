"use client";

import EditRole from "@/components/ui-admin/roles/EditRole";

interface EditRolePageProps {
  params: {
    roleId: string;
  };
}

export default function EditRolePage({ params }: EditRolePageProps) {
  return <EditRole roleId={params.roleId} />;
}
