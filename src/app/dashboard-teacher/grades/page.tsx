"use client";

import { GradeManagement } from "@/components/ui-teacher/grades/GradeManagement";

export default function GradesPage() {
  // Mock data - in real app, this would come from API
  const grades = [
    {
      id: "1",
      studentId: "1",
      studentName: "John Doe",
      classId: "1",
      className: "Bahasa Inggris A",
      materialId: "1",
      materialName: "Grammar Dasar",
      assignmentId: "1",
      assignmentName: "Latihan Grammar",
      gradeCategoryId: "1",
      gradeCategoryName: "Tugas",
      score: 85,
      maxScore: 100,
      inputDate: "2025-06-28",
      notes: "Bagus, perlu perbaikan di tenses"
    },
    {
      id: "2",
      studentId: "2",
      studentName: "Jane Smith",
      classId: "1",
      className: "Bahasa Inggris A",
      materialId: "1",
      materialName: "Grammar Dasar",
      assignmentId: "1",
      assignmentName: "Latihan Grammar",
      gradeCategoryId: "1",
      gradeCategoryName: "Tugas",
      score: 92,
      maxScore: 100,
      inputDate: "2025-06-28",
      notes: "Excellent work!"
    },
    {
      id: "3",
      studentId: "1",
      studentName: "John Doe",
      classId: "1",
      className: "Bahasa Inggris A",
      materialId: "2",
      materialName: "Pronunciation",
      gradeCategoryId: "2",
      gradeCategoryName: "UTS",
      score: 78,
      maxScore: 100,
      inputDate: "2025-06-30",
      notes: "Perlu latihan lebih"
    }
  ];

  const gradeCategories = [
    {
      id: "1",
      name: "Tugas",
      description: "Nilai tugas harian",
      weight: 30,
      programId: "1"
    },
    {
      id: "2",
      name: "UTS",
      description: "Ujian Tengah Semester",
      weight: 30,
      programId: "1"
    },
    {
      id: "3",
      name: "UAS",
      description: "Ujian Akhir Semester",
      weight: 40,
      programId: "1"
    }
  ];

  const students = [
    { id: "1", name: "John Doe", classId: "1", className: "Bahasa Inggris A" },
    { id: "2", name: "Jane Smith", classId: "1", className: "Bahasa Inggris A" },
    { id: "3", name: "Bob Johnson", classId: "1", className: "Bahasa Inggris A" }
  ];

  const materials = [
    { id: "1", name: "Grammar Dasar", programId: "1" },
    { id: "2", name: "Pronunciation", programId: "1" },
    { id: "3", name: "Vocabulary", programId: "1" }
  ];

  const assignments = [
    { id: "1", name: "Latihan Grammar", classId: "1" },
    { id: "2", name: "Latihan Pronunciation", classId: "1" },
    { id: "3", name: "Latihan Vocabulary", classId: "1" }
  ];

  const handleAddGrade = (grade: {
    studentId: string;
    studentName: string;
    classId: string;
    className: string;
    materialId: string;
    materialName: string;
    assignmentId?: string;
    assignmentName?: string;
    gradeCategoryId: string;
    gradeCategoryName: string;
    score: number;
    maxScore: number;
    notes?: string;
  }) => {
    console.log("Add grade:", grade);
    // API call to add grade
  };

  const handleEditGrade = (id: string, grade: Partial<{
    studentId: string;
    studentName: string;
    classId: string;
    className: string;
    materialId: string;
    materialName: string;
    assignmentId?: string;
    assignmentName?: string;
    gradeCategoryId: string;
    gradeCategoryName: string;
    score: number;
    maxScore: number;
    notes?: string;
  }>) => {
    console.log("Edit grade:", id, grade);
    // API call to edit grade
  };

  const handleDeleteGrade = (id: string) => {
    console.log("Delete grade:", id);
    // API call to delete grade
  };

  return (
    <GradeManagement
      grades={grades}
      gradeCategories={gradeCategories}
      students={students}
      materials={materials}
      assignments={assignments}
      onAddGrade={handleAddGrade}
      onEditGrade={handleEditGrade}
      onDeleteGrade={handleDeleteGrade}
    />
  );
}