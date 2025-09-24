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

export interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  subject: SubjectName;
  level: "TK" | "SD" | "SMP" | "SMA/SMK" | "UMUM";
  averageScore: number;
  finalGrade: number;
  components: GradeComponents;
  status: "DRAFT" | "PUBLISHED";
  notes?: string;
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
  programs: {
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

// Grade Template untuk konfigurasi komponen nilai
export interface GradeTemplate {
  id: string;
  courseId: string;
  courseName: string;
  components: Array<{
    name: string;
    weight: number;
    required: boolean;
    description?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// Komponen nilai individual
export interface GradeComponents {
  [key: string]: number;
}

// Summary nilai siswa
export interface GradeSummary {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  finalGrade: number;
  status: "DRAFT" | "PUBLISHED";
  components: GradeComponents;
  createdAt: string;
  updatedAt: string;
}

// Form data untuk input nilai
export interface GradeFormData {
  studentId: string;
  courseId: string;
  components: GradeComponents;
  notes?: string;
}