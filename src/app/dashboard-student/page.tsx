"use client";

import { useEffect, useState } from "react";
import { StudentNavbar } from "@/components/ui-student/dashboard/StudentNavbar";
import { StudentHero } from "@/components/ui-student/dashboard/StudentHero";
import { StatisticsCards } from "@/components/ui-student/dashboard/StatisticsCards";
import { ClassSchedule } from "@/components/ui-student/dashboard/ClassSchedule";
import { LearningProgress } from "@/components/ui-student/dashboard/LearningProgress";
import { AssignmentsAndGrades } from "@/components/ui-student/dashboard/AssignmentsAndGrades";

interface StudentData {
  nama: string;
  role: string[];
}

// Mock data untuk contoh
const mockAssignments = [
  {
    title: "Matematika - Bab 5",
    dueIn: "2 hari lagi",
  },
  {
    title: "Tugas Bahasa Inggris",
    dueIn: "5 hari lagi",
  },
];

const mockGrades = [
  {
    subject: "Ulangan IPA",
    score: 90,
    date: "Minggu lalu",
  },
  {
    subject: "Tugas Sejarah",
    score: 85,
    date: "2 minggu lalu",
  },
];

const mockSchedule = [
  {
    subject: "Matematika",
    time: "08:00 - 09:30",
    day: "Senin",
    icon: "/picprogram/matematika.png",
    teacher: "Bu Siti",
  },
  {
    subject: "Bahasa Inggris",
    time: "10:00 - 11:30",
    day: "Selasa",
    icon: "/picprogram/bahasainggris.png",
    teacher: "Mr. John",
  },
  {
    subject: "Coding",
    time: "13:00 - 14:30",
    day: "Rabu",
    icon: "/picprogram/coding.png",
    teacher: "Pak Rudi",
  },
];

const learningProgress = [
  {
    subject: "Matematika",
    progress: 75,
    totalModules: 12,
    completedModules: 9,
  },
  {
    subject: "Bahasa Inggris",
    progress: 60,
    totalModules: 10,
    completedModules: 6,
  },
  {
    subject: "Coding",
    progress: 45,
    totalModules: 8,
    completedModules: 4,
  },
];

export default function StudentOverview() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("pengguna");
    if (data) {
      setStudentData(JSON.parse(data));
    }
  }, []);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StudentNavbar studentName={studentData.nama} />
      <div className="pt-10 px-2 min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto space-y-4">
          <StudentHero studentName={studentData.nama} learningStreak={7} />

          <StatisticsCards
            enrolledClasses={5}
            pendingAssignments={3}
            averageGrade="85%"
            studyHours="24h"
          />

          <ClassSchedule schedule={mockSchedule} />
          <LearningProgress progress={learningProgress} />
          <AssignmentsAndGrades
            assignments={mockAssignments}
            grades={mockGrades}
          />
        </div>
      </div>
    </>
  );
}
