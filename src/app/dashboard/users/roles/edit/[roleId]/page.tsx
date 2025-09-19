"use client";

import EditRole from "@/components/ui-admin/roles/EditRole";
import { use } from "react";

interface EditRolePageProps {
  params: Promise<{
    roleId: string;
  }>;
}

export default function EditRolePage({ params }: EditRolePageProps) {
  const { roleId } = use(params);
  return <EditRole roleId={roleId} />;
}
