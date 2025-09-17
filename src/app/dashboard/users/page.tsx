"use client";

import UsersManagement from "@/components/ui-admin/users/UsersManagement";

export default function UsersPage() {
  return (
    <UsersManagement 
      userType="all"
      title="All Users Management"
      description="Manage all user accounts in the system"
    />
  );
}
