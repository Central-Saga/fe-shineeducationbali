export type SubjectType = "english" | "math" | "computerScience" | "indonesian";

export type SubjectName =
  | "Matematika"
  | "Bahasa Inggris"
  | "Computer Science"
  | "Bahasa Indonesia";

export type StatusType = "SELESAI" | "PENDING" | "TIDAK_LULUS";

export interface Grade {
  id: string;
  studentName: string;
  subject: SubjectName;
  level: "SD" | "SMP" | "SMA";
  averageScore: number;
  status: StatusType;
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
