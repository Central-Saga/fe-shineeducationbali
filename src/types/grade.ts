export type SubjectType =
  | "english"
  | "math"
  | "computerScience"
  | "indonesian"
  | "calistung";

export type SubjectName =
  | "Matematika"
  | "Bahasa Inggris"
  | "Computer Science"
  | "Bahasa Indonesia"
  | "Calistung";

export type StatusType = "SELESAI" | "PENDING" | "TIDAK_LULUS";

// Interface untuk data grade yang digunakan di UI (data lama)
export interface GradeDisplay {
  id: string;
  studentName: string;
  subject: SubjectName;
  level: "TK" | "SD" | "SMP" | "SMA/SMK" | "UMUM";
  averageScore: number;
  status: StatusType;
}

// Interface untuk service (data baru)
export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  teacherId: string;
  components: GradeComponents;
  finalGrade: number;
  status: "DRAFT" | "PUBLISHED";
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubjectGradeConfig {
  name: string;
  code: SubjectType;
  scoreComponents: {
    name: string;
    key: string;
    weight: number;
    required: boolean;
  }[];
}

export interface StudentDetail {
  id: string;
  name: string;
  level: "SD" | "SMP" | "SMA";
  class: string;
  enrollmentDate: string;
  photoUrl?: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  courses: {
    current: Array<{
      name: string;
      progress: number;
      teacher: string;
    }>;
    completed: Array<{
      name: string;
      grade: number;
      completionDate: string;
    }>;
  };
}

// Tipe-tipe yang dibutuhkan oleh grade.service.ts
export interface GradeFormData {
  studentId: string;
  courseId: string;
  teacherId: string;
  components: GradeComponents;
  comments?: string;
}

export interface GradeTemplate {
  id: string;
  courseId: string;
  name: string;
  components: Array<{
    name: string;
    weight: number;
    required: boolean;
    description?: string;
  }>;
}

export interface GradeSummary {
  courseId: string;
  courseName: string;
  finalGrade: number;
  status: "DRAFT" | "PUBLISHED";
  lastUpdated: string;
}

export interface GradeComponents {
  [key: string]: number;
}
