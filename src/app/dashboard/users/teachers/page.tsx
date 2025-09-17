"use client";

import UsersManagement from "@/components/ui-admin/users/UsersManagement";

export default function TeachersPage() {
  return (
    <UsersManagement 
      userType="teacher"
      title="Teacher Management"
      description="Manage teacher data and teaching schedule"
    />
  );
}
