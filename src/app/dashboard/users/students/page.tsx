"use client";

import UsersManagement from "@/components/ui-admin/users/UsersManagement";

export default function StudentsPage() {
  return (
    <UsersManagement 
      userType="student"
      title="Student Management"
      description="Manage student data and class placement"
    />
  );
}
