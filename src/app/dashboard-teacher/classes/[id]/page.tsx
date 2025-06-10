"use client";

import { ClassDetails } from "@/components/ui-admin/classes/class-details";

// Mock data for testing
const mockClassData = {
  classId: "CLS001",
  className: "Mathematics Grade 10",
  teacher: "Mr. John Smith",
  schedule: "Monday & Wednesday, 09:00 - 10:30",
  totalStudents: 25,
  averageGrade: "85%",
  students: [
    {
      id: "STD001",
      name: "Alex Johnson",
      email: "alex.j@student.com",
      attendance: 95,
      grade: "A",
    },
    {
      id: "STD002",
      name: "Sarah Smith",
      email: "sarah.s@student.com",
      attendance: 88,
      grade: "B+",
    },
    {
      id: "STD003",
      name: "Mike Brown",
      email: "mike.b@student.com",
      attendance: 92,
      grade: "A-",
    },
  ],
  materials: [
    {
      id: "MAT001",
      title: "Introduction to Algebra",
      type: "PDF",
      uploadDate: "2024-02-01",
    },
    {
      id: "MAT002",
      title: "Geometry Basics",
      type: "Video",
      uploadDate: "2024-02-05",
    },
    {
      id: "MAT003",
      title: "Practice Problems - Week 1",
      type: "PDF",
      uploadDate: "2024-02-10",
    },
  ],
};

export default function ClassView() {
  return (
    <div className="p-6">
      <ClassDetails {...mockClassData} />
    </div>
  );
}
