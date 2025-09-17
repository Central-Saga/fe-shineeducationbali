import { SubjectGradeConfig } from "@/types/grade";

export const subjectConfigs: SubjectGradeConfig[] = [
  {
    name: "Bahasa Inggris",
    code: "english",
    scoreComponents: [
      { name: "Tugas", key: "assignments", weight: 0.2, required: true },
      { name: "Speaking", key: "speaking", weight: 0.2, required: true },
      { name: "Writing", key: "writing", weight: 0.2, required: true },
      { name: "UTS", key: "midterm", weight: 0.15, required: true },
      { name: "UAS", key: "final", weight: 0.15, required: true },
      { name: "Kehadiran", key: "attendance", weight: 0.1, required: true },
    ],
  },
  {
    name: "Matematika",
    code: "math",
    scoreComponents: [
      { name: "Tugas", key: "assignments", weight: 0.3, required: true },
      { name: "UTS", key: "midterm", weight: 0.3, required: true },
      { name: "UAS", key: "final", weight: 0.3, required: true },
      { name: "Kehadiran", key: "attendance", weight: 0.1, required: true },
    ],
  },
  {
    name: "Computer Science",
    code: "computerScience",
    scoreComponents: [
      { name: "Tugas", key: "assignments", weight: 0.25, required: true },
      { name: "Praktikum", key: "practical", weight: 0.25, required: true },
      { name: "UTS", key: "midterm", weight: 0.2, required: true },
      { name: "UAS", key: "final", weight: 0.2, required: true },
      { name: "Kehadiran", key: "attendance", weight: 0.1, required: true },
    ],
  },
  {
    name: "Bahasa Indonesia",
    code: "indonesian",
    scoreComponents: [
      { name: "Tugas", key: "assignments", weight: 0.2, required: true },
      { name: "Speaking", key: "speaking", weight: 0.2, required: true },
      { name: "Writing", key: "writing", weight: 0.2, required: true },
      { name: "UTS", key: "midterm", weight: 0.15, required: true },
      { name: "UAS", key: "final", weight: 0.15, required: true },
      { name: "Kehadiran", key: "attendance", weight: 0.1, required: true },
    ],
  },
];
