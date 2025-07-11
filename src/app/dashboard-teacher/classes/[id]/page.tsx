"use client";

import { ClassDetails } from "@/components/ui-teacher/classes/class-details";
import { useParams } from "next/navigation";

// Sample data for demo purposes
const classData = {
  id: "c1",
  name: "Aljabar Linear",
  subject: "Matematika",
  level: "Kelas 10",
  schedule: "Senin, Rabu, Jumat",
  time: "08:00 - 09:30",
  room: "Ruang Belajar 101",
  teacher: "Budi Santoso",
  studentCount: 25,
  progress: 35,
  status: "active",
  description: "Pengenalan konsep aljabar linear dan aplikasinya. Kelas ini akan fokus pada pemahaman dasar tentang matriks, determinan, dan sistem persamaan linear.",
  syllabus: [
    "Pengenalan Aljabar Linear",
    "Matriks dan Operasinya",
    "Determinan",
    "Sistem Persamaan Linear",
    "Vektor dan Ruang Vektor",
    "Transformasi Linear"
  ],
  students: [
    {
      id: "s1",
      name: "Ahmad Rizal",
      attendance: "85%",
      grade: "A"
    },
    {
      id: "s2",
      name: "Siti Nurhaliza",
      attendance: "90%",
      grade: "A-"
    },
    {
      id: "s3",
      name: "Budi Prakoso",
      attendance: "75%",
      grade: "B+"
    },
    {
      id: "s4",
      name: "Diana Putri",
      attendance: "80%",
      grade: "B"
    },
    {
      id: "s5",
      name: "Eko Prasetyo",
      attendance: "95%",
      grade: "A"
    }
  ],
  assignments: [
    {
      id: "a1",
      title: "Tugas Aljabar Linear Pertemuan 1",
      dueDate: "18 Juli 2025",
      status: "completed"
    },
    {
      id: "a2",
      title: "Latihan Soal Matriks dan Operasinya",
      dueDate: "22 Juli 2025",
      status: "ongoing"
    },
    {
      id: "a3",
      title: "Quiz Determinan",
      dueDate: "29 Juli 2025",
      status: "pending"
    }
  ],
  materials: [
    {
      id: "m1",
      title: "Modul Aljabar Linear",
      type: "PDF",
      uploadedDate: "10 Juli 2025"
    },
    {
      id: "m2",
      title: "Presentasi Matriks dan Operasinya",
      type: "PowerPoint",
      uploadedDate: "10 Juli 2025"
    },
    {
      id: "m3",
      title: "Latihan Soal Aljabar Linear",
      type: "PDF",
      uploadedDate: "12 Juli 2025"
    }
  ]
};

export default function ClassDetailsPage() {
  // In a real app, you would fetch the class data based on the ID
  // const classData = await getClassById(params.id);
  
  // Gunakan useParams dari next/navigation untuk client components
  const params = useParams();
  const classId = params.id as string;
  console.log("Class ID:", classId);
  
  return <ClassDetails classData={classData} />;
}
