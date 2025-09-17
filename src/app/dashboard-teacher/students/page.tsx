"use client";

import { StudentManagement } from "@/components/ui-teacher/students/StudentManagement";
import { studentsData } from "@/data/data-teacher/students-data";

export default function StudentsPage() {
  // Mock data - in real app, this would come from API
  const students = studentsData.map(student => ({
    id: student.id,
    name: student.name,
    email: student.email || `${student.name.toLowerCase().replace(' ', '.')}@example.com`,
    class: student.class,
    program: "Bahasa Inggris", // This should come from program data
    attendance: student.attendance,
    averageGrade: student.grade === "A" ? 90 : student.grade === "B" ? 80 : 70,
    status: 'active' as const,
    joinDate: "2025-01-15",
    lastActivity: "2025-07-01"
  }));

  const handleViewStudent = (studentId: string) => {
    console.log("View student:", studentId);
    // Navigate to student detail page
  };

  const handleEditStudent = (studentId: string) => {
    console.log("Edit student:", studentId);
    // Open edit dialog or navigate to edit page
  };

  const handleMessageStudent = (studentId: string) => {
    console.log("Message student:", studentId);
    // Open messaging interface
  };

  return (
    <StudentManagement
      students={students}
      onViewStudent={handleViewStudent}
      onEditStudent={handleEditStudent}
      onMessageStudent={handleMessageStudent}
    />
  );
}