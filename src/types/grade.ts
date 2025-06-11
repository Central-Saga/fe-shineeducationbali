export interface Grade {
  id: string; // Format: INBxxxxxxx
  studentId: string;
  courseId: string;
  teacherId: string;
  classId: string;
  semester: number;
  academicYear: string;
  components: GradeComponents;
  finalGrade: number;
  status: "DRAFT" | "PUBLISHED";
  createdAt: Date;
  updatedAt: Date;
}

export interface GradeComponents {
  // Bahasa Inggris
  speaking?: number;
  listening?: number;
  reading?: number;
  writing?: number;
  structureAndVocab?: number;

  // Matematika
  pemahaman?: number;
  penalaran?: number;
  pemecahanMasalah?: number;

  // Umum
  tugas?: number;
  ujianTengah?: number;
  ujianAkhir?: number;
  kehadiran?: number;
  praktik?: number;

  // Index signature untuk komponen dinamis
  [key: string]: number | undefined;
}

export interface GradeTemplate {
  courseId: string;
  components: {
    name: string;
    weight: number;
    required: boolean;
  }[];
  passingGrade: number;
  certificationThreshold: number;
}

export type GradeFormData = Omit<
  Grade,
  "id" | "finalGrade" | "createdAt" | "updatedAt"
>;

export interface GradeSummary {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  finalGrade: number;
  status: "PASS" | "FAIL" | "PENDING";
  certEligible: boolean;
}
