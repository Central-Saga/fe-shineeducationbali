"use client";

import { Metadata } from "next";
import PageTitle from "@/components/ui-teacher/PageTitle";
import { Card, CardContent } from "@/components/ui/card";
import AssignmentListPage from "./assignment-list";

export default function TeacherAssignmentsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageTitle 
        title="Tugas" 
        description="Kelola semua tugas untuk siswa Anda"
        breadcrumb={[
          { title: "Dashboard", link: "/dashboard-teacher" },
          { title: "Pembelajaran", link: "#" },
          { title: "Tugas", link: "/dashboard-teacher/assignments", active: true }
        ]}
      />
      
      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <AssignmentListPage />
        </CardContent>
      </Card>
    </div>
  );
}
